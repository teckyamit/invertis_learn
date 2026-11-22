/**
 * scripts/seed-curated-cse-resources.js
 * 
 * Master Academic Resource Seeding & Integration Script
 * Ingests the 79 verified academic resources and mappings from
 * data/academic-resources/ into the Invertis Learn database / catalogue.
 * 
 * Safety Guarantees:
 * 1. Fully idempotent: Re-running multiple times produces identical state without duplicates.
 * 2. 100% preservation: ZERO mutations or deletions of AcademicResource (PYQs, uploaded notes, lab manuals).
 * 3. Dry-run support: Use --dry-run to audit actions without making changes.
 * 4. Dual-mode support: Seamlessly updates Neon PostgreSQL when connected, or prisma/catalogue.json in offline/sandboxed environments.
 */

const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const DATA_DIR = path.join(__dirname, '..', 'data', 'academic-resources');
const CATALOGUE_PATH = path.join(__dirname, '..', 'prisma', 'catalogue.json');

const REGISTRY_FILE = path.join(DATA_DIR, 'resource-registry.json');
const MAPPINGS_FILE = path.join(DATA_DIR, 'subject-resource-mappings.json');
const ACTIONS_FILE = path.join(DATA_DIR, 'existing-resource-actions.json');

const isDryRun = process.argv.includes('--dry-run');

async function main() {
  console.log('==================================================================');
  console.log(`  INVERTIS LEARN — MASTER ACADEMIC RESOURCE SEEDING ${isDryRun ? '[DRY RUN]' : ''}`);
  console.log('==================================================================\n');

  if (!fs.existsSync(REGISTRY_FILE) || !fs.existsSync(MAPPINGS_FILE)) {
    console.error('[!] Missing canonical datasets in data/academic-resources/. Run merge-academic-datasets.cjs first.');
    process.exit(1);
  }

  const registry = JSON.parse(fs.readFileSync(REGISTRY_FILE, 'utf8'));
  const mappings = JSON.parse(fs.readFileSync(MAPPINGS_FILE, 'utf8'));
  const existingActions = fs.existsSync(ACTIONS_FILE) ? JSON.parse(fs.readFileSync(ACTIONS_FILE, 'utf8')) : [];

  console.log(`[*] Loaded canonical registry: ${registry.length} resources`);
  console.log(`[*] Loaded subject mappings: ${mappings.length} subject entries`);
  console.log(`[*] Loaded existing actions: ${existingActions.length} evaluated actions\n`);

  // Build registry lookup map by resourceId
  const regMap = new Map();
  registry.forEach(r => regMap.set(r.resourceId, r));

  // Determine whether we can connect to Prisma Neon database
  let dbConnected = false;
  try {
    const testCount = await prisma.subject.count();
    dbConnected = true;
    console.log(`[+] Database connection verified! Active subjects in database: ${testCount}`);
  } catch (err) {
    console.log(`[-] Remote database direct connection unavailable (${err.message.split('\n')[0]}).`);
    console.log(`[*] Operating in Offline / Local Catalogue Mode (updating prisma/catalogue.json).`);
  }

  if (dbConnected) {
    await seedDatabase(registry, mappings, existingActions, regMap);
  } else {
    await seedCatalogueJson(registry, mappings, existingActions, regMap);
  }

  console.log('\n==================================================================');
  console.log(`  SEEDING COMPLETE — ${isDryRun ? 'DRY RUN FINISHED (NO WRITES)' : 'SUCCESS'}`);
  console.log('==================================================================');
}

async function seedDatabase(registry, mappings, existingActions, regMap) {
  let createdExtCount = 0;
  let updatedExtCount = 0;
  let createdVidCount = 0;
  let updatedVidCount = 0;

  for (const subMapping of mappings) {
    const subjectCode = subMapping.subjectCode;
    const subject = await prisma.subject.findFirst({
      where: {
        code: { equals: subjectCode, mode: 'insensitive' },
        isActive: true
      }
    });

    if (!subject) {
      console.log(`[WARN] Subject code ${subjectCode} not found in database. Skipping.`);
      continue;
    }

    for (const item of subMapping.resourceMappings) {
      const res = regMap.get(item.resourceId);
      if (!res) continue;

      if (item.section === 'video_lectures') {
        const isPlaylist = res.type === 'playlist';
        const plMatch = res.url.match(/[?&]list=([^&]+)/);
        const vidMatch = res.url.match(/[?&]v=([^&]+)/);
        const youtubeId = plMatch ? plMatch[1] : (vidMatch ? vidMatch[1] : res.resourceId);

        const existingVid = await prisma.videoLecture.findFirst({
          where: {
            subjectId: subject.id,
            OR: [{ youtubeUrl: res.url }, { youtubeId }]
          }
        });

        if (!isDryRun) {
          if (existingVid) {
            await prisma.videoLecture.update({
              where: { id: existingVid.id },
              data: {
                title: res.title,
                channelName: res.provider,
                description: `${res.title} curated from ${res.provider}. Quality score: ${res.qualityScore}/100.`,
                pricingType: res.isFree ? 'FREE' : 'PAID'
              }
            });
            updatedVidCount++;
          } else {
            await prisma.videoLecture.create({
              data: {
                subjectId: subject.id,
                title: res.title,
                youtubeUrl: res.url,
                youtubeId,
                videoType: isPlaylist ? 'PLAYLIST' : 'INDIVIDUAL_VIDEO',
                channelName: res.provider,
                unitNumber: item.coveredUnits?.[0] ? parseInt(item.coveredUnits[0].replace(/\D/g, '')) || null : null,
                topic: item.coveredUnits?.join(', ') || null,
                description: `${res.title} curated from ${res.provider}. Academic level: ${res.academicLevel}.`,
                pricingType: res.isFree ? 'FREE' : 'PAID'
              }
            });
            createdVidCount++;
          }
        } else {
          if (existingVid) updatedVidCount++; else createdVidCount++;
        }
      } else {
        // External Resource
        const existingExt = await prisma.externalResource.findFirst({
          where: {
            subjectId: subject.id,
            url: res.url
          }
        });

        const category = res.type === 'notes' ? 'Lecture Notes'
          : res.type === 'textbook' ? 'Reference Book'
          : res.type === 'documentation' ? 'Official Documentation'
          : res.type === 'practical' ? 'Practical Simulation'
          : 'Free Online Course';

        if (!isDryRun) {
          if (existingExt) {
            await prisma.externalResource.update({
              where: { id: existingExt.id },
              data: {
                title: res.title,
                platform: res.provider,
                description: `${res.title} curated from ${res.platform}. Academic level: ${res.academicLevel}.`,
                isVerified: true
              }
            });
            updatedExtCount++;
          } else {
            await prisma.externalResource.create({
              data: {
                subjectId: subject.id,
                title: res.title,
                platform: res.provider,
                url: res.url,
                description: `${res.title} curated from ${res.platform}. Academic level: ${res.academicLevel}.`,
                category,
                unitNumber: item.coveredUnits?.[0] ? parseInt(item.coveredUnits[0].replace(/\D/g, '')) || null : null,
                topic: item.coveredUnits?.join(', ') || null,
                pricingType: res.isFree ? 'FREE' : 'PAID',
                resourceType: res.type.toUpperCase(),
                isVerified: true
              }
            });
            createdExtCount++;
          }
        } else {
          if (existingExt) updatedExtCount++; else createdExtCount++;
        }
      }
    }
  }

  console.log(`\n[Database Summary]`);
  console.log(`  External Resources: ${createdExtCount} created, ${updatedExtCount} updated`);
  console.log(`  Video Lectures:     ${createdVidCount} created, ${updatedVidCount} updated`);
}

async function seedCatalogueJson(registry, mappings, existingActions, regMap) {
  if (!fs.existsSync(CATALOGUE_PATH)) {
    console.error(`[!] Catalogue file not found at ${CATALOGUE_PATH}`);
    return;
  }

  const cat = JSON.parse(fs.readFileSync(CATALOGUE_PATH, 'utf8'));
  const subjects = cat.data.subject;

  let createdExtCount = 0;
  let updatedExtCount = 0;
  let createdVidCount = 0;
  let updatedVidCount = 0;

  for (const subMapping of mappings) {
    const subjectCode = subMapping.subjectCode;
    const subject = subjects.find(s => s.code.toLowerCase() === subjectCode.toLowerCase() && s.isActive);

    if (!subject) {
      continue;
    }

    for (const item of subMapping.resourceMappings) {
      const res = regMap.get(item.resourceId);
      if (!res) continue;

      if (item.section === 'video_lectures') {
        const isPlaylist = res.type === 'playlist';
        const plMatch = res.url.match(/[?&]list=([^&]+)/);
        const vidMatch = res.url.match(/[?&]v=([^&]+)/);
        const youtubeId = plMatch ? plMatch[1] : (vidMatch ? vidMatch[1] : res.resourceId);

        const existingVid = cat.data.videoLecture.find(
          v => v.subjectId === subject.id && (v.youtubeUrl === res.url || v.youtubeId === youtubeId)
        );

        if (existingVid) {
          if (!isDryRun) {
            existingVid.title = res.title;
            existingVid.channelName = res.provider;
            existingVid.description = `${res.title} curated from ${res.provider}. Quality score: ${res.qualityScore}/100.`;
            existingVid.pricingType = res.isFree ? 'FREE' : 'PAID';
            existingVid.updatedAt = new Date().toISOString();
          }
          updatedVidCount++;
        } else {
          if (!isDryRun) {
            cat.data.videoLecture.push({
              id: `vid_${res.resourceId}_${subject.id.slice(-6)}`,
              subjectId: subject.id,
              title: res.title,
              youtubeUrl: res.url,
              youtubeId,
              videoType: isPlaylist ? 'PLAYLIST' : 'INDIVIDUAL_VIDEO',
              channelName: res.provider,
              unitNumber: item.coveredUnits?.[0] ? parseInt(item.coveredUnits[0].replace(/\D/g, '')) || null : null,
              topic: item.coveredUnits?.join(', ') || null,
              description: `${res.title} curated from ${res.provider}. Academic level: ${res.academicLevel}.`,
              pricingType: res.isFree ? 'FREE' : 'PAID',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            });
          }
          createdVidCount++;
        }
      } else {
        // External Resource
        const existingExt = cat.data.externalResource.find(
          e => e.subjectId === subject.id && e.url === res.url
        );

        const category = res.type === 'notes' ? 'Lecture Notes'
          : res.type === 'textbook' ? 'Reference Book'
          : res.type === 'documentation' ? 'Official Documentation'
          : res.type === 'practical' ? 'Practical Simulation'
          : 'Free Online Course';

        if (existingExt) {
          if (!isDryRun) {
            existingExt.title = res.title;
            existingExt.platform = res.provider;
            existingExt.description = `${res.title} curated from ${res.platform}. Academic level: ${res.academicLevel}.`;
            existingExt.isVerified = true;
            existingExt.updatedAt = new Date().toISOString();
          }
          updatedExtCount++;
        } else {
          if (!isDryRun) {
            cat.data.externalResource.push({
              id: `ext_${res.resourceId}_${subject.id.slice(-6)}`,
              subjectId: subject.id,
              title: res.title,
              platform: res.provider,
              url: res.url,
              description: `${res.title} curated from ${res.platform}. Academic level: ${res.academicLevel}.`,
              category,
              unitNumber: item.coveredUnits?.[0] ? parseInt(item.coveredUnits[0].replace(/\D/g, '')) || null : null,
              topic: item.coveredUnits?.join(', ') || null,
              pricingType: res.isFree ? 'FREE' : 'PAID',
              resourceType: res.type.toUpperCase(),
              isVerified: true,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            });
          }
          createdExtCount++;
        }
      }
    }
  }

  if (!isDryRun) {
    fs.writeFileSync(CATALOGUE_PATH, JSON.stringify(cat, null, 2), 'utf8');
    console.log(`[+] Successfully wrote updates to ${CATALOGUE_PATH}`);
  }

  console.log(`\n[Catalogue Summary]`);
  console.log(`  External Resources: ${createdExtCount} created, ${updatedExtCount} updated`);
  console.log(`  Video Lectures:     ${createdVidCount} created, ${updatedVidCount} updated`);
  console.log(`  Total Active Catalogue Subjects: ${subjects.length}`);
  console.log(`  Total Academic Resources Preserved: ${cat.data.academicResource.length}`);
}

main().catch(err => {
  console.error('[!] Fatal error in seeding:', err);
  process.exit(1);
}).finally(() => {
  prisma.$disconnect();
});
