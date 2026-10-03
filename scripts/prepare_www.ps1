$ErrorActionPreference = "Stop"
$root = "e:\tata updated\tata"
$www = "$root\www"

Write-Output "Assembling Android Web Application Staging Directory ($www)..."
if (Test-Path $www) {
    Remove-Item -Path $www -Recurse -Force
}
New-Item -ItemType Directory -Path $www -Force | Out-Null

# 1. Copy root HTML files
$htmlFiles = @("index.html", "app.html", "auth.html", "stakeholders-impacts.html", "project-workflow.html", "test-suite.html")
foreach ($f in $htmlFiles) {
    if (Test-Path "$root\$f") {
        Copy-Item "$root\$f" "$www\$f" -Force
        Write-Output "Copied $f"
    }
}

# 2. Copy root engine scripts
$jsFiles = @(
    "twin-engine.js",
    "library-twin-engine.js",
    "satellite-globe-engine.js",
    "satellite-textures-data.js",
    "state-engine.js",
    "fable-bridge.js",
    "rbac-engine.js",
    "coordination-engine.js"
)
foreach ($f in $jsFiles) {
    if (Test-Path "$root\$f") {
        Copy-Item "$root\$f" "$www\$f" -Force
        Write-Output "Copied $f"
    }
}

# 3. Copy directories
$dirs = @("civilian", "assets", "photo")
foreach ($d in $dirs) {
    if (Test-Path "$root\$d") {
        Copy-Item "$root\$d" "$www\$d" -Recurse -Force
        Write-Output "Copied directory $d"
    }
}

# 4. Inject Android Native Back Button Handler & Capacitor Bridge into www/index.html, www/civilian/index.html, www/app.html
$androidBackScript = @"
<script>
// SENTINEL-X Android Native Navigation & Hardware Back Button Bridge
document.addEventListener('DOMContentLoaded', () => {
    if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App) {
        window.Capacitor.Plugins.App.addListener('backButton', ({ canGoBack }) => {
            // Priority 1: Close any active modal
            const modals = document.querySelectorAll('[id$=\"-modal\"]:not(.hidden), .fixed.inset-0:not(.hidden)');
            for (let m of modals) {
                if (m.id && m.id.includes('modal') && !m.classList.contains('hidden')) {
                    m.classList.add('hidden');
                    return;
                }
            }
            // Priority 2: Close mobile drawer if open
            const drawer = document.getElementById('mobile-drawer');
            if (drawer && !drawer.classList.contains('hidden')) {
                drawer.classList.add('hidden');
                return;
            }
            // Priority 3: If on dispatcher/easy mode in civilian, return to citizen view
            if (typeof currentInterfaceMode !== 'undefined' && currentInterfaceMode !== 'citizen') {
                if (typeof setInterfaceMode === 'function') {
                    setInterfaceMode('citizen');
                    return;
                }
            }
            // Priority 4: Return to home / back navigation
            if (window.location.pathname.includes('civilian') || window.location.pathname.includes('app.html')) {
                window.location.href = '../index.html';
            } else if (canGoBack) {
                window.history.back();
            } else {
                window.Capacitor.Plugins.App.exitApp();
            }
        });
    }
});
</script>
"@

# Inject right before </body> in civilian/index.html and app.html and index.html
$pagesToPatch = @("$www\index.html", "$www\civilian\index.html", "$www\app.html")
foreach ($p in $pagesToPatch) {
    if (Test-Path $p) {
        $content = Get-Content -Path $p -Raw -Encoding UTF8
        if (-not ($content -match "Capacitor.Plugins.App")) {
            $content = $content -replace "</body>", "$androidBackScript`n</body>"
            Set-Content -Path $p -Value $content -Encoding UTF8
            Write-Output "Injected Android Back Button bridge into $p"
        }
    }
}

# 5. Sync to Android Native assets/public directory
$androidPublic = "$root\android\app\src\main\assets\public"
if (Test-Path "$root\android") {
    Write-Output "Syncing staging assets to Android Native container ($androidPublic)..."
    if (Test-Path $androidPublic) {
        Remove-Item -Path $androidPublic -Recurse -Force
    }
    Copy-Item -Path $www -Destination $androidPublic -Recurse -Force
    Write-Output "Synced www to Android assets/public successfully!"
}

Write-Output "www staging directory and Android native assets assembled successfully!"
