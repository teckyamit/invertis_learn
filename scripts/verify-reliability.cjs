const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
const {PrismaClient}=require('@prisma/client'),{PDFDocument}=require('pdf-lib');
const {resourcePath}=require('./lib/storage-path.cjs');
const db=new PrismaClient();
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:3000';
async function main(){
 let checks=0;
 async function route(url,status=200,options){const r=await fetch(base+url,{signal:AbortSignal.timeout(30000),...options});assert.equal(r.status,status,`${url}: ${r.status}, expected ${status}`);checks++;return r;}
 for(const url of ['/','/engineering','/resources','/programmes','/syllabus','/notes','/labs','/pyq','/projects','/career-pathways','/about','/search','/admin','/api/health'])await route(url);
 for(const code of ['BTECH-CSE-LE','BTECH-CSE-AI-LE']){
  for(const family of ['syllabus','notes','labs','pyq']){await route(`/${family}/${code}`);await route(`/${family}/${code}/semester/3`);await route(`/${family}/${code}/semester/1`,404);await route(`/${family}/${code}/semester/3junk`,404);}
 }
 await route('/pyq/BTECH-CSE-LE/semester/3/BCS-301');
 await route('/api/pyq',401,{method:'POST'});
 await route('/api/admin/resources',401);
 await route('/api/admin/resources',401,{method:'PATCH',body:'{}'});
 await route('/api/admin/session',403,{method:'POST',headers:{origin:'https://invalid.example'},body:'{}'});
 await route('/api/pyq?page=0',400);await route('/api/pyq?limit=10000',400);
 const listing=await (await route('/api/pyq?limit=1')).json();assert.ok(listing.pyqs.length<=1);assert.ok(listing.total>=listing.pyqs.length);checks+=2;
 const search=await (await route('/search?q=BCS-301&programme=BTECH-CSE&semester=3')).text();assert.ok(search.includes('Data Structures'));checks++;
 const resource=await db.academicResource.findFirst({where:{isPublished:true,category:{code:'SYLLABUS'}}});assert.ok(resource);
 const download=await route(`/api/syllabus/download?id=${resource.id}`);assert.equal(download.headers.get('content-type'),'application/pdf');assert.equal((await download.arrayBuffer()).byteLength,fs.statSync(resourcePath(resource.storagePath)).size);checks+=2;
 const partial=await route('/'+resource.storagePath,206,{headers:{range:'bytes=0-9'}});assert.equal((await partial.arrayBuffer()).byteLength,10);checks++;
 await route('/api/syllabus/download?file=..%2F..%2F.env',400);await route('/uploads/not-registered.pdf',404);
 const all=await db.academicResource.findMany();
 for(const resource of all){const bytes=fs.readFileSync(resourcePath(resource.storagePath));assert.equal(bytes.length,resource.fileSizeBytes,resource.id);assert.ok((await PDFDocument.load(bytes)).getPageCount()>0);checks+=2;}
 const groups=await db.curriculumVersion.groupBy({by:['programmeId'],where:{isCurrent:true},_count:true});assert.ok(groups.every(g=>g._count<=1));checks++;
 assert.ok(fs.existsSync(path.join('public',resource.storagePath)) || fs.existsSync(resourcePath(resource.storagePath)));checks++;
 console.log(`Reliability regression: ${checks} checks passed. No application data changed.`);
}
main().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>db.$disconnect());
