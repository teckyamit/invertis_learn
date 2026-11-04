const fs = require('fs');
const res = JSON.parse(fs.readFileSync('scripts/standardization-results.json'));
console.log('In review / pending count:', res.inReviewOrPending.length);
console.log('Items in review:');
for (const item of res.inReviewOrPending) {
  console.log(`- [${item.code}] ${item.name} (${item.programme} Sem ${item.semester}) -> ${item.reason}`);
}
