param(
    [string]$ZipPath = "C:\Users\amitp\.gemini\antigravity\brain\b8f499ed-4ced-49c7-9a45-e44e4aa6579c\.user_uploaded\media_1794417870248_fb0dfa7f.zip",
    [string]$DestDir = "G:\invertis learn\storage\temp_pyq_extract"
)

Add-Type -AssemblyName System.IO.Compression.FileSystem

if (!(Test-Path $DestDir)) {
    New-Item -ItemType Directory -Path $DestDir -Force | Out-Null
}

Write-Host "Opening ZIP archive..."
$zip = [System.IO.Compression.ZipFile]::OpenRead($ZipPath)
$count = 0

foreach ($entry in $zip.Entries) {
    if ($entry.FullName.EndsWith('/') -or $entry.FullName.EndsWith('\')) {
        continue
    }
    $targetPath = [System.IO.Path]::Combine($DestDir, $entry.FullName)
    $targetDir = [System.IO.Path]::GetDirectoryName($targetPath)
    if (!(Test-Path $targetDir)) {
        New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
    }
    [System.IO.Compression.ZipFileExtensions]::ExtractToFile($entry, $targetPath, $true)
    $count++
}

$zip.Dispose()
Write-Host "Successfully extracted $count files to $DestDir"

