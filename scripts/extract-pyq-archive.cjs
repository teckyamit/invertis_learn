const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const zipPath = "C:\\Users\\amitp\\.gemini\\antigravity\\brain\\b8f499ed-4ced-49c7-9a45-e44e4aa6579c\\.user_uploaded\\media_1794417870248_fb0dfa7f.zip";
const destDir = path.resolve(__dirname, "../storage/temp_pyq_extract");

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

console.log("Extracting ZIP cleanly using .NET ZipFileExtensions...");
const script = `
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::OpenRead('${zipPath}')
$count = 0
foreach ($entry in $zip.Entries) {
    if ($entry.FullName.EndsWith('/')) { continue }
    $targetPath = Join-Path '${destDir}' $entry.FullName
    $targetDir = Split-Path $targetPath -Parent
    if (!(Test-Path $targetDir)) { New-Item -ItemType Directory -Path $targetDir -Force | Out-Null }
    [System.IO.Compression.ZipFileExtensions]::ExtractToFile($entry, $targetPath, $true)
    $count++
}
$zip.Dispose()
Write-Output "Successfully extracted $count files."
`;

const output = execSync(`powershell -NoProfile -Command "${script.replace(/\r?\n/g, ' ')}"`, { encoding: "utf-8" });
console.log(output);
