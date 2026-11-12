// Idempotent migration. Stop the app, take a backup, and run Prisma db push first.
const { PrismaClient } = require('@prisma/client');
const fs = require('fs/promises'), path = require('path'), crypto = require('crypto');
const db = new PrismaClient();
const workspace = process.cwd();
const publicRoot = path.resolve(workspace, 'public/uploads');
const privateRoot = path.resolve(process.env.PRIVATE_STORAGE_PATH || 'storage/uploads');
const digest = b => crypto.createHash('sha256').update(b).digest('hex');
async function files(dir) {
  try { const entries=await fs.readdir(dir,{withFileTypes:true}); return (await Promise.all(entries.map(e=>e.isDirectory()?files(path.join(dir,e.name)):Promise.resolve([path.join(dir,e.name)])))).flat(); }
  catch(e) { if(e.code==='ENOENT')return []; throw e; }
}
async function main() {
  if (!publicRoot.startsWith(workspace + path.sep) || privateRoot.startsWith(path.resolve('public') + path.sep)) throw Error('Unsafe storage paths');
  const sourceFiles = await files(publicRoot);
  for (const source of sourceFiles) {
    const relative = path.relative(publicRoot, source), destination = path.resolve(privateRoot, relative);
    if (!destination.startsWith(privateRoot + path.sep) || !(await fs.lstat(source)).isFile()) throw Error('Unsafe file');
    const data = await fs.readFile(source);
    await fs.mkdir(path.dirname(destination), {recursive:true});
    try { const existing=await fs.readFile(destination); if(digest(existing)!==digest(data))throw Error('Destination collision: '+relative); }
    catch(e) { if(e.code==='ENOENT')await fs.writeFile(destination,data,{flag:'wx'});else throw e; }
    if(digest(await fs.readFile(destination))!==digest(data))throw Error('Copy verification failed');
  }
  const resources = await db.academicResource.findMany({include:{category:true}});
  let sizes=0, practice=0;
  // Identify known generated assets by filenames actually used in the committed generator scripts.
  const generated = new Set();
  for(const name of ['generate-pyq-pdfs.js','generate-and-seed-phase3-notes.js','generate-and-seed-phase4-labs.js','generate-and-seed-phase5-projects.js']) {
    const source = await fs.readFile(path.join('scripts',name),'utf8');
    for(const match of source.matchAll(/['"]([^'"\n]+\.pdf)['"]/g)) generated.add(path.basename(match[1]));
  }
  await db.$transaction(async tx => {
    for(const resource of resources) {
      const relative=resource.storagePath.replace(/^uploads\//,'');
      const target=path.resolve(privateRoot,relative);
      if(!target.startsWith(privateRoot+path.sep))throw Error('Invalid DB path');
      const stat=await fs.stat(target);
      const data={fileSizeBytes:stat.size};
      if(stat.size!==resource.fileSizeBytes)sizes++;
      if(generated.has(resource.storedFileName) && resource.provenanceStatus==='UNVERIFIED') {
        data.provenanceStatus='PRACTICE'; data.sourceReference='Repository-generated practice material; not an authenticated university original';
        data.authorName=null; data.title=resource.title.replace(/Official\s+/gi,'').replace(/^Practice: /,''); data.title='Practice: '+data.title;
        data.reviewNote='Classified from repository generator filename; academic correctness has not been independently verified.'; practice++;
      }
      await tx.academicResource.update({where:{id:resource.id},data});
    }
    await tx.auditEvent.create({data:{action:'RELIABILITY_MIGRATION',actor:'local migration',detail:JSON.stringify({copiedFiles:sourceFiles.length,sizeCorrections:sizes,practiceClassifications:practice})}});
  }, {timeout:60000});
  // Only verified copies are removed from the publicly served tree. Snapshot retains originals.
  for(const source of sourceFiles) {
    if(!source.startsWith(publicRoot+path.sep))throw Error('Unsafe removal');
    await fs.unlink(source);
  }
  console.log(JSON.stringify({copiedFiles:sourceFiles.length,sizeCorrections:sizes,practiceClassifications:practice}));
}
main().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>db.$disconnect());
