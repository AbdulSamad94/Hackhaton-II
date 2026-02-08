$ErrorActionPreference = "Stop"

# --- 1. CONFIGURATION ---
$scriptPath = $PSScriptRoot
$projectRoot = Split-Path -Parent $scriptPath
$envFile = Join-Path $projectRoot ".env"
$chartPath = Join-Path $projectRoot "helm-chart"
$secretFile = Join-Path $projectRoot "temp-secrets.json"
$releaseName = "todo-app"

Write-Host "DEPLOY SCRIPT STARTING..." -ForegroundColor Cyan

# --- 2. LOAD ENV ---
if (-not (Test-Path $envFile)) {
    Write-Host "ERROR: .env file missing at $envFile" -ForegroundColor Red
    exit 1
}

$envLines = Get-Content $envFile
foreach ($line in $envLines) {
    if (-not [string]::IsNullOrWhiteSpace($line) -and -not $line.Trim().StartsWith("#")) {
        $parts = $line.Split("=")
        if ($parts.Count -ge 2) {
            $name = $parts[0].Trim()
            $val = $parts[1].Trim()
            # Simple unquote if needed
            if ($val.StartsWith('"') -and $val.EndsWith('"')) {
                $val = $val.Substring(1, $val.Length - 2)
            }
            [System.Environment]::SetEnvironmentVariable($name, $val, "Process")
        }
    }
}

# --- 3. CREATE SECRETS JSON ---
$payload = @{
    secrets = @{
        DATABASE_URL = [System.Environment]::GetEnvironmentVariable("DATABASE_URL")
        SECRET_KEY = [System.Environment]::GetEnvironmentVariable("SECRET_KEY")
        GEMINI_API_KEY = [System.Environment]::GetEnvironmentVariable("GEMINI_API_KEY")
        OPENAI_API_KEY = [System.Environment]::GetEnvironmentVariable("OPENAI_API_KEY")
        GITHUB_CLIENT_ID = [System.Environment]::GetEnvironmentVariable("GITHUB_CLIENT_ID")
        GITHUB_CLIENT_SECRET = [System.Environment]::GetEnvironmentVariable("GITHUB_CLIENT_SECRET")
        GOOGLE_CLIENT_ID = [System.Environment]::GetEnvironmentVariable("GOOGLE_CLIENT_ID")
        GOOGLE_CLIENT_SECRET = [System.Environment]::GetEnvironmentVariable("GOOGLE_CLIENT_SECRET")
    }
    backend = @{
        env = @{
            FRONTEND_URL = [System.Environment]::GetEnvironmentVariable("FRONTEND_URL")
        }
    }
}

$payload | ConvertTo-Json -Depth 5 | Out-File $secretFile -Encoding ASCII
Write-Host "Secrets file generated." -ForegroundColor Green

# --- 4. DEPLOY HELM ---
Write-Host "Disabling Ingress Admission Webhook (Fix for Minikube)..." -ForegroundColor Magenta
kubectl delete validatingwebhookconfigurations ingress-nginx-admission --ignore-not-found

Write-Host "Upgrading Helm release..." -ForegroundColor Yellow
Write-Host "Upgrading Helm release..." -ForegroundColor Yellow
helm upgrade --install $releaseName $chartPath -f $secretFile

if ($LASTEXITCODE -ne 0) {
    Write-Host "HELM UPGRADE FAILED!" -ForegroundColor Red
    exit 1
}

# --- 5. RESTART PODS ---
Write-Host "Restarting deployments..." -ForegroundColor Yellow
kubectl rollout restart deployment todo-backend todo-frontend

# --- 6. CLEANUP ---
if (Test-Path $secretFile) {
    Remove-Item $secretFile
}

Write-Host "DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "Check status with: kubectl get pods"

Write-Host "`n🌍 INGRESS ACCESS:" -ForegroundColor Cyan
Write-Host "   Frontend: http://todo.local"
Write-Host "   (Requires 'minikube tunnel' in another Admin terminal)"

Write-Host "`n⚠️  TROUBLESHOOTING: If the URL above doesn't work..." -ForegroundColor Yellow
$response = Read-Host "   Do you want to start LOCAL PORT-FORWARDING instead? (y/n)"

if ($response -eq 'y') {
    Write-Host "   ⏳ Waiting for pods to be ready..." -ForegroundColor Yellow
    
    # Wait for pods to be ready (max 60 seconds)
    $maxAttempts = 12
    $attempt = 0
    do {
        Start-Sleep -Seconds 5
        $attempt++
        $frontendReady = kubectl get pods -l app=todo-frontend -o jsonpath='{.items[0].status.containerStatuses[0].ready}' 2>$null
        $backendReady = kubectl get pods -l app=todo-backend -o jsonpath='{.items[0].status.containerStatuses[0].ready}' 2>$null
        Write-Host "   Attempt $attempt/$maxAttempts - Frontend: $frontendReady, Backend: $backendReady"
    } while (($frontendReady -ne "true" -or $backendReady -ne "true") -and $attempt -lt $maxAttempts)
    
    if ($frontendReady -eq "true" -and $backendReady -eq "true") {
        Write-Host "   🚀 Pods ready! Launching port-forwards..." -ForegroundColor Green
        
        # Start Backend Forwarder (8000)
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "kubectl port-forward svc/todo-backend 8000:8000"
        
        # Start Frontend Forwarder (3000)
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "kubectl port-forward svc/todo-frontend 3000:80"
    
        Write-Host "`n   ✅ Port-Forwarding Active!"
        Write-Host "   Frontend: http://localhost:3000"
        Write-Host "   Backend:  http://localhost:8000/docs"
    } else {
        Write-Host "   ❌ Pods not ready after 60 seconds. Try again later." -ForegroundColor Red
        Write-Host "   Run: kubectl get pods to check status."
    }
}
