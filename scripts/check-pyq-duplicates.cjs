const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../storage/pyq-classification-full.json"), "utf-8"));
const verified = data.classified.filter(c => c.status === "MATCHED" || c.status === "SHARED_CSE");

console.log(`Checking checksums for ${verified.length} verified candidate files...`);

const checksumMap = new Map();
const duplicates = [];

for (const item of verified) {
  const buf = fs.readFileSync(item.file);
  const hash = crypto.createHash("sha256").update(buf).digest("hex");
  item.sha256 = hash;

  if (checksumMap.has(hash)) {
    const existing = checksumMap.get(hash);
    duplicates.push({
      original: existing,
      duplicate: item,
      hash
    });
  } else {
    checksumMap.set(hash, item);
  }
}

console.log(`Found ${duplicates.length} duplicate file pairs across folders:`);
duplicates.forEach((d, idx) => {
  console.log(`[${idx + 1}] File A: ${d.original.relPath}`);
  console.log(`     File B: ${d.duplicate.relPath}`);
  console.log(`     Hash:   ${d.hash.slice(0, 16)}...`);
  console.log("");
});

fs.writeFileSync(path.resolve(__dirname, "../storage/pyq-duplicates.json"), JSON.stringify(duplicates, null, 2), "utf-8");

