# Complete migration script for Docusaurus i18n
# This script will copy all Chinese content from /docs to /i18n/zh/docusaurus-plugin-content-docs/current

# First, ensure target directory exists
$zhDocsDir = "i18n/zh/docusaurus-plugin-content-docs/current"
if (-not (Test-Path $zhDocsDir)) {
    New-Item -Path $zhDocsDir -ItemType Directory -Force
    Write-Host "Created directory: $zhDocsDir"
}

# Get all directories in the docs folder
$docDirs = Get-ChildItem -Path "docs" -Directory

# Process each directory
foreach ($dir in $docDirs) {
    $dirName = $dir.Name
    $targetDir = Join-Path -Path $zhDocsDir -ChildPath $dirName
    
    # Create target directory if it doesn't exist
    if (-not (Test-Path $targetDir)) {
        New-Item -Path $targetDir -ItemType Directory -Force
        Write-Host "Created directory: $targetDir"
    }
    
    # Copy all files from source to target
    Copy-Item -Path "docs/$dirName/*" -Destination $targetDir -Recurse -Force
    Write-Host "Copied content from docs/$dirName to $targetDir"
}

# Copy root files
Copy-Item -Path "docs/*.md" -Destination $zhDocsDir -Force
Write-Host "Copied root markdown files to $zhDocsDir"

# Copy root JSON files if they exist
if (Test-Path "docs/*.json") {
    Copy-Item -Path "docs/*.json" -Destination $zhDocsDir -Force
    Write-Host "Copied root JSON files to $zhDocsDir"
}

Write-Host "Complete migration finished!"
Write-Host "All Chinese content has been copied to the i18n/zh directory structure."
Write-Host "You can now build or start your Docusaurus site to see the changes." 