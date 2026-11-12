const fs=require('fs'),path=require('path');
const root=path.resolve('.recovery/browser-test');
fs.mkdirSync(root,{recursive:true});
fs.copyFileSync(path.resolve('prisma/dev.db'),path.join(root,'test.db'));
fs.cpSync(path.resolve('storage/uploads'),path.join(root,'uploads'),{recursive:true});
console.log('Prepared isolated browser-test database and storage.');
