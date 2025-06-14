# Create directory for Chinese content
$zhDir = "i18n/zh/docusaurus-plugin-content-docs/current/account-security"
if (-not (Test-Path $zhDir)) {
    New-Item -Path $zhDir -ItemType Directory -Force
}

# Copy Chinese content to zh directory
Copy-Item -Path "docs/account-security/*" -Destination $zhDir -Recurse -Force

# Backup English content
$backupDir = "migrate-temp/account-security-en-backup"
if (-not (Test-Path $backupDir)) {
    New-Item -Path $backupDir -ItemType Directory -Force
}
Copy-Item -Path "i18n/en/docusaurus-plugin-content-docs/current/account-security/*" -Destination $backupDir -Recurse -Force

# Copy English content to docs directory
Copy-Item -Path "i18n/en/docusaurus-plugin-content-docs/current/account-security/*" -Destination "docs/account-security/" -Recurse -Force

Write-Host "Migration completed!"
Write-Host "Chinese content copied to: $zhDir"
Write-Host "English content copied to: docs/account-security/"
Write-Host "English content backed up to: $backupDir" 