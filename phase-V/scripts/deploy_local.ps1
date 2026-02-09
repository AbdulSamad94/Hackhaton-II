$ErrorActionPreference = "Stop"

Write-Host "🚀 Starting Local Deployment for TodoFlow (Phase V)..." -ForegroundColor Cyan

# 1. Build Docker Images
Write-Host "`n📦 Building Docker Images..." -ForegroundColor Yellow

# Backend
Write-Host "Building Backend..."
docker build -t todo-backend:latest ./backend
if ($LASTEXITCODE -ne 0) { Write-Error "Backend build failed"; exit 1 }

# Frontend
Write-Host "Building Frontend..."
docker build -t todo-frontend:latest --build-arg NEXT_PUBLIC_API_URL=http://localhost:8000/api ./frontend
if ($LASTEXITCODE -ne 0) { Write-Error "Frontend build failed"; exit 1 }

# Notification Service
Write-Host "Building Notification Service..."
docker build -t notification-service:latest ./services/notification-service
if ($LASTEXITCODE -ne 0) { Write-Error "Notification Service build failed"; exit 1 }

# Recurring Task Service
Write-Host "Building Recurring Task Service..."
docker build -t recurring-task-service:latest ./services/recurring-task-service
if ($LASTEXITCODE -ne 0) { Write-Error "Recurring Task Service build failed"; exit 1 }

# 2. Load Images into Minikube
Write-Host "`n🚚 Loading Images into Minikube..." -ForegroundColor Yellow
minikube image load todo-backend:latest
minikube image load todo-frontend:latest
minikube image load notification-service:latest
minikube image load recurring-task-service:latest

# 3. Deploy with Helm
Write-Host "`n⚓ Deploying to Kubernetes..." -ForegroundColor Yellow

# Load secrets from .env file
if (Test-Path .env) {
    Get-Content .env | ForEach-Object {
        if ($_ -match '^([^#=]+)=(.*)$') {
            $name = $matches[1].Trim()
            $value = $matches[2].Trim()
            [Environment]::SetEnvironmentVariable($name, $value)
        }
    }
}

# Update Helm dependencies
helm dependency update ./helm-chart

# Deploy
helm upgrade --install todo-app ./helm-chart `
    -f ./helm-chart/values-local.yaml `
    --set secrets.DATABASE_URL=$env:DATABASE_URL `
    --set secrets.SECRET_KEY=$env:SECRET_KEY `
    --set secrets.GEMINI_API_KEY=$env:GEMINI_API_KEY `
    --set secrets.OPENAI_API_KEY=$env:OPENAI_API_KEY `
    --set secrets.GITHUB_CLIENT_ID=$env:GITHUB_CLIENT_ID `
    --set secrets.GITHUB_CLIENT_SECRET=$env:GITHUB_CLIENT_SECRET `
    --set secrets.GOOGLE_CLIENT_ID=$env:GOOGLE_CLIENT_ID `
    --set secrets.GOOGLE_CLIENT_SECRET=$env:GOOGLE_CLIENT_SECRET

Write-Host "`n✅ Deployment Complete!" -ForegroundColor Green
Write-Host "Verify with: kubectl get pods"
Write-Host "Access Frontend: kubectl port-forward svc/todo-frontend 3000:3000"
Write-Host "Access Backend: kubectl port-forward svc/todo-backend 8000:8000"
