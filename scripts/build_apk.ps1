$ErrorActionPreference = "Stop"
$root = "e:\tata updated\tata"
$androidRoot = "$root\android"

$env:JAVA_HOME = "C:\Program Files\Microsoft\jdk-17.0.20.101-hotspot"
$env:ANDROID_HOME = "C:\Android\sdk"
$env:ANDROID_SDK_ROOT = "C:\Android\sdk"
$env:PATH = "$env:JAVA_HOME\bin;C:\Android\sdk\platform-tools;$env:PATH"

Write-Output "Building SENTINEL-X Android APK with Gradle..."
Set-Location $androidRoot

cmd.exe /c "gradlew.bat assembleDebug"
if ($LASTEXITCODE -ne 0) {
    throw "Gradle build failed with exit code $LASTEXITCODE"
}

$apkPath = "$androidRoot\app\build\outputs\apk\debug\app-debug.apk"
if (Test-Path $apkPath) {
    $apkItem = Get-Item $apkPath
    $sizeMB = [math]::Round($apkItem.Length / 1MB, 2)
    Write-Output "BUILD SUCCESSFUL! APK generated at: $apkPath ($sizeMB MB)"
} else {
    Write-Error "APK build did not produce app-debug.apk"
}
