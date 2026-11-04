const fs = require('fs');
const files = fs.readdirSync('public/uploads/syllabus/subjects');
console.log('Sample filenames:');
console.log(files.slice(0, 30));
