// Synchronize all 494 PDF files from storage/ to public/ for Vercel Edge CDN delivery
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const db = new PrismaClient();
const hash = (buf) => crypto.createHash("sha256").update(buf).digest("hex");

async function main() {
  console.log("Synchronizing all Academic Resource PDFs to public/uploads/...");
  const resources = await db.academicResource.findMany({
    select: {
      id: true,
      title: true,
      storagePath: true,
      fileSizeBytes: true,
    },
  });

  console.log(`Auditing ${resources.length} registered resources...`);
  let alreadyInPublic = 0;
  let copiedToPublic = 0;
  let verified = 0;

  for (const r of resources) {
    const storageFilePath = path.resolve("storage", r.storagePath);
    const publicFilePath = path.resolve("public", r.storagePath);

    if (!fs.existsSync(storageFilePath)) {
      throw new Error(`Critical: Resource ${r.id} missing from storage at ${storageFilePath}`);
    }

    const storageBytes = fs.readFileSync(storageFilePath);
    if (storageBytes.length !== r.fileSizeBytes) {
      console.warn(`Size mismatch for ${r.id}: disk=${storageBytes.length}, db=${r.fileSizeBytes}`);
    }

    if (!fs.existsSync(publicFilePath)) {
      fs.mkdirSync(path.dirname(publicFilePath), { recursive: true });
      fs.copyFileSync(storageFilePath, publicFilePath);
      copiedToPublic++;
    } else {
      alreadyInPublic++;
    }

    const publicBytes = fs.readFileSync(publicFilePath);
    const hStorage = hash(storageBytes);
    const hPublic = hash(publicBytes);
    if (hStorage !== hPublic) {
      throw new Error(`Checksum mismatch between storage and public for ${r.storagePath}`);
    }
    verified++;
  }

  console.log(`\nPDF Synchronization Summary:`);
  console.log(`  - Total Resources Audited: ${resources.length}`);
  console.log(`  - Already in public/: ${alreadyInPublic}`);
  console.log(`  - Newly Copied to public/: ${copiedToPublic}`);
  console.log(`  - Verified Identical Checksums: ${verified} / ${resources.length}`);
}

main()
  .catch((e) => {
    console.error("Sync error:", e);
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());

