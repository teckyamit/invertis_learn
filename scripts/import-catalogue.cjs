const { PrismaClient } = require('@prisma/client');
const fs=require('fs'),path=require('path');
const db=new PrismaClient();
const models=['department','programme','curriculumVersion','semester','subject','resourceCategory','academicResource','externalResource','videoLecture'];
async function main(){
  if(await db.department.count()) { console.log('Database already contains a catalogue; no records changed.'); return; }
  const snapshot=JSON.parse(fs.readFileSync(path.join(__dirname,'../prisma/catalogue.json'),'utf8'));
  if(snapshot.format!==1)throw Error('Unsupported catalogue format');
  await db.$transaction(async tx=>{for(const model of models)for(const original of snapshot.data[model]){
    const row={...original};for(const key of ['createdAt','updatedAt','reviewedAt'])if(row[key])row[key]=new Date(row[key]);
    if(model==='academicResource')row.uploadedById=null;
    await tx[model].create({data:row});
  }},{timeout:60000});
  console.log('Imported catalogue. Credentials and users are not seeded.');
}
main().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>db.$disconnect());
