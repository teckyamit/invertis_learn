// Run with the application stopped, so DB records and uploaded files represent one point in time.
const { PrismaClient } = require('@prisma/client');
const fs = require('fs/promises'), path = require('path'), crypto = require('crypto');
const db = new PrismaClient();
const hash = b => crypto.createHash('sha256').update(b).digest('hex');

const models = [
  'department', 'user', 'programme', 'curriculumVersion', 'semester',
  'subject', 'resourceCategory', 'academicResource', 'externalResource',
  'videoLecture', 'auditEvent'
];

async function walk(dir) {
  try {
    return (await Promise.all((await fs.readdir(dir, { withFileTypes: true })).map(e =>
      e.isDirectory() ? walk(path.join(dir, e.name)) : Promise.resolve([path.join(dir, e.name)])
    ))).flat();
  } catch (e) {
    if (e.code === 'ENOENT') return [];
    throw e;
  }
}

async function main() {
  const destination = path.resolve('backups', new Date().toISOString().replace(/[:.]/g, '-'));
  await fs.mkdir(destination, { recursive: true });

  console.log('Backing up database records across all models...');
  const data = {};
  for (const model of models) {
    data[model] = await db[model].findMany();
  }
  const snapshotJson = JSON.stringify({ format: 2, createdAt: new Date().toISOString(), data }, null, 2);
  const snapshotPath = path.join(destination, 'database-snapshot.json');
  await fs.writeFile(snapshotPath, snapshotJson, 'utf8');

  const root = path.resolve(process.env.PRIVATE_STORAGE_PATH || 'storage/uploads');
  const manifest = {
    format: 2,
    createdAt: new Date().toISOString(),
    databaseHash: hash(Buffer.from(snapshotJson)),
    files: []
  };

  for (const file of await walk(root)) {
    if (!(await fs.lstat(file)).isFile()) throw Error('Non-regular storage file');
    const relative = path.relative(root, file).replace(/\\/g, '/');
    const output = path.join(destination, 'uploads', relative);
    const bytes = await fs.readFile(file);
    await fs.mkdir(path.dirname(output), { recursive: true });
    await fs.writeFile(output, bytes, { flag: 'wx' });
    manifest.files.push({ path: relative, sha256: hash(bytes) });
  }

  await fs.writeFile(path.join(destination, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(`Backup saved: ${destination}\nDatabase records: ${Object.values(data).reduce((s, r) => s + r.length, 0)}, Files: ${manifest.files.length}. Keep an encrypted off-device copy.`);
}

main().catch(e => { console.error(e); process.exitCode = 1; }).finally(() => db.$disconnect());
