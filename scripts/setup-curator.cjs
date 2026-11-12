const fs=require('fs'),crypto=require('crypto');
const file='.env';
let content=fs.existsSync(file)?fs.readFileSync(file,'utf8'):fs.readFileSync('.env.example','utf8');
const match=content.match(/^CURATOR_ACCESS_KEY=["']?([^"'\r\n]*)/m);
if(match && match[1].length>=32){console.log('A curator key is already configured; it was not changed.');}
else {
 const line='CURATOR_ACCESS_KEY="'+crypto.randomBytes(48).toString('base64url')+'"';
 content=/^CURATOR_ACCESS_KEY=.*$/m.test(content)?content.replace(/^CURATOR_ACCESS_KEY=.*$/m,line):content.trimEnd()+'\n'+line+'\n';
 fs.writeFileSync(file,content,{mode:0o600});console.log('A unique curator key was saved privately in .env. Open .env locally to copy it into /admin. Restart the server after configuration changes.');
}
