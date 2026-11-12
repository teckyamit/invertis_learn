// Restores into a NEW directory only. Switch DATABASE_URL/storage configuration after verification.
const fs=require('fs/promises'),path=require('path'),crypto=require('crypto');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
async function main(){
 const [sourceArg,targetArg]=process.argv.slice(2);if(!sourceArg||!targetArg)throw Error('Usage: node scripts/restore-backup.cjs BACKUP_DIRECTORY NEW_TARGET_DIRECTORY');
 const source=path.resolve(sourceArg),target=path.resolve(targetArg);
 if(target===source || target.startsWith(source+path.sep))throw Error('Target must be separate from backup');
 try{await fs.access(target);throw Error('Restore target must not exist');}catch(e){if(e.code!=='ENOENT')throw e;}
 const manifest=JSON.parse(await fs.readFile(path.join(source,'manifest.json'),'utf8'));
 if(manifest.format!==1)throw Error('Unsupported backup format');
 const database=await fs.readFile(path.join(source,'database.db'));if(hash(database)!==manifest.databaseHash)throw Error('Database checksum mismatch');
 const files=[];
 for(const entry of manifest.files){
  const root=path.join(source,'uploads'),file=path.resolve(root,entry.path);
  if(!file.startsWith(root+path.sep))throw Error('Unsafe manifest path');
  const bytes=await fs.readFile(file);if(hash(bytes)!==entry.sha256)throw Error('File checksum mismatch: '+entry.path);files.push({path:entry.path,bytes});
 }
 await fs.mkdir(target);await fs.writeFile(path.join(target,'database.db'),database,{flag:'wx'});
 for(const file of files){const output=path.join(target,'uploads',file.path);await fs.mkdir(path.dirname(output),{recursive:true});await fs.writeFile(output,file.bytes,{flag:'wx'});}
 console.log(`Verified and restored ${files.length} files and database to ${target}. Original data was not overwritten.`);
}
main().catch(e=>{console.error(e);process.exitCode=1});
