$ErrorActionPreference = "Stop"
$root = "e:\tata updated\tata"
$apkSrc = "$root\android\app\build\outputs\apk\debug\app-debug.apk"
$distDir = "$root\SENTINEL-X-Android"
$destApk = "$distDir\SENTINEL-X.apk"
$rootApk = "$root\SENTINEL-X.apk"
$zipOut = "$root\SENTINEL-X-Android.zip"

if (-not (Test-Path $apkSrc)) {
    Write-Error "Source APK not found at $apkSrc"
}

Write-Output "Copying APK to distribution directory..."
Copy-Item $apkSrc $destApk -Force
Copy-Item $apkSrc $rootApk -Force

$item = Get-Item $destApk
$sizeMB = [math]::Round($item.Length / 1MB, 2)
Write-Output "APK placed at: $destApk ($sizeMB MB)"

# Compute checksums
$sha256 = (Get-FileHash -Path $destApk -Algorithm SHA256).Hash
$md5 = (Get-FileHash -Path $destApk -Algorithm MD5).Hash

$checksumContent = @"
SENTINEL-X ANDROID APK CHECKSUMS
================================
File: SENTINEL-X.apk
Size: $sizeMB MB ($($item.Length) bytes)
MD5:    $md5
SHA256: $sha256
Package ID: com.sentinelx.emergency
Target SDK: 34 (Android 14)
Built: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
"@

Set-Content -Path "$distDir\CHECKSUMS.txt" -Value $checksumContent

# Create ZIP
Write-Output "Creating distribution zip $zipOut..."
if (Test-Path $zipOut) {
    Remove-Item $zipOut -Force
}

# Use 7za or Compress-Archive
if (Test-Path "E:\7za.exe") {
    & "E:\7za.exe" a -tzip "$zipOut" "$distDir\*" | Out-Null
} else {
    Compress-Archive -Path "$distDir\*" -DestinationPath "$zipOut" -Force
}

$zipItem = Get-Item $zipOut
$zipSizeMB = [math]::Round($zipItem.Length / 1MB, 2)
Write-Output "Distribution package ready: $zipOut ($zipSizeMB MB)"
