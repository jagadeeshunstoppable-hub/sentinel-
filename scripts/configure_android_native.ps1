$ErrorActionPreference = "Stop"
$root = "e:\tata updated\tata"
$androidRoot = "$root\android"
$res = "$androidRoot\app\src\main\res"

Write-Output "Configuring Android Native settings..."

# 1. Write local.properties
$localProps = "sdk.dir=C:\\Android\\sdk"
Set-Content -Path "$androidRoot\local.properties" -Value $localProps -Encoding ASCII
Write-Output "Written android\local.properties"

# 2. Update AndroidManifest.xml with permissions
$manifestPath = "$androidRoot\app\src\main\AndroidManifest.xml"
$manifest = Get-Content -Path $manifestPath -Raw -Encoding UTF8

$permissions = @"
    <!-- Emergency Permissions for SENTINEL-X -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
    <uses-permission android:name="android.permission.VIBRATE" />

    <uses-feature android:name="android.hardware.location.gps" android:required="false" />
    <uses-feature android:name="android.hardware.microphone" android:required="false" />
"@

if (-not ($manifest -match "ACCESS_FINE_LOCATION")) {
    $manifest = $manifest -replace "<uses-permission android:name=""android.permission.INTERNET"" />", $permissions
    Set-Content -Path $manifestPath -Value $manifest -Encoding UTF8
    Write-Output "Updated AndroidManifest.xml with emergency permissions"
}

# 3. Generate Android Mipmap densities from C:\Android\assets\icon.png and ic_launcher_foreground.png
Add-Type -AssemblyName System.Drawing

$srcIcon = "C:\Android\assets\icon.png"
$srcFg = "C:\Android\assets\ic_launcher_foreground.png"
$srcSplash = "C:\Android\assets\splash.png"

$iconImg = [System.Drawing.Image]::FromFile($srcIcon)
$fgImg = [System.Drawing.Image]::FromFile($srcFg)

function Resize-And-Save($img, $w, $h, $dest) {
    $bmp = New-Object System.Drawing.Bitmap $w, $h
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.DrawImage($img, 0, 0, $w, $h)
    $g.Dispose()
    $bmp.Save($dest, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
}

$densities = @{
    "mipmap-mdpi"    = @{ icon = 48;  fg = 108 }
    "mipmap-hdpi"    = @{ icon = 72;  fg = 162 }
    "mipmap-xhdpi"   = @{ icon = 96;  fg = 216 }
    "mipmap-xxhdpi"  = @{ icon = 144; fg = 324 }
    "mipmap-xxxhdpi" = @{ icon = 192; fg = 432 }
}

foreach ($d in $densities.Keys) {
    $targetDir = "$res\$d"
    New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
    
    $szIcon = $densities[$d].icon
    $szFg   = $densities[$d].fg
    
    Resize-And-Save $iconImg $szIcon $szIcon "$targetDir\ic_launcher.png"
    Resize-And-Save $iconImg $szIcon $szIcon "$targetDir\ic_launcher_round.png"
    Resize-And-Save $fgImg   $szFg   $szFg   "$targetDir\ic_launcher_foreground.png"
    Write-Output "Updated icons for $d"
}

$iconImg.Dispose()
$fgImg.Dispose()

# 4. Splash Screen assets
$drawables = @("drawable", "drawable-land", "drawable-port")
foreach ($dr in $drawables) {
    $dir = "$res\$dr"
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
    Copy-Item $srcSplash "$dir\splash.png" -Force
}
Write-Output "Updated splash screens in drawables"

Write-Output "Android native configuration complete!"
