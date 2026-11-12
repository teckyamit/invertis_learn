const fs = require('fs');
const path = require('path');

const userUploadedDir = path.join(
  process.env.USERPROFILE || 'C:\\Users\\amitp',
  '.gemini',
  'antigravity',
  'brain',
  'b8f499ed-4ced-49c7-9a45-e44e4aa6579c',
  '.user_uploaded'
);

const destDir = path.join(process.cwd(), 'public', 'uploads', 'syllabus', 'btech_cse_cc');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const map = [
  { src: 'media_1794217481486_b16af621.pdf', dest: 'BTech_CSE_CC_Year_1_Syllabus.pdf' },
  { src: 'media_1794217481423_88dcfe26.pdf', dest: 'BTech_CSE_CC_Year_2_Syllabus.pdf' },
  { src: 'media_1794217481378_345509a0.pdf', dest: 'BTech_CSE_CC_Year_3_Syllabus.pdf' },
  { src: 'media_1794217481378_f3607196.pdf', dest: 'BTech_CSE_CC_Year_4_Syllabus.pdf' }
];

for (const item of map) {
  const srcPath = path.join(userUploadedDir, item.src);
  const destPath = path.join(destDir, item.dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${item.src} -> ${destPath} (${fs.statSync(destPath).size} bytes)`);
  } else {
    console.warn(`File not found: ${srcPath}`);
  }
}

