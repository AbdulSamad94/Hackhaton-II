# Phase V - Build & Deploy Script for Minikube
# Builds all images inside Minikube and deploys via Helm

Write-Host "=== Phase V: Build & Deploy ===" -ForegroundColor Cyan

# Step 1: Connect to Minikube Docker
Write-Host "`n[1/4] Connecting to Minikube Docker daemon..." -ForegroundColor Yellow
minikube -p minikube docker-env | Invoke-Expression

# Step 2: Build images
Write-Host "`n[2/4] Building images inside Minikube..." -ForegroundColor Yellow

Write-Host "  Building todo-backend..." -ForegroundColor Gray
docker build -t todo-backend:latest ./backend
if ($LASTEXITCODE -ne 0) { Write-Host "FAILED: todo-backend" -ForegroundColor Red; exit 1 }

Write-Host "  Building todo-frontend..." -ForegroundColor Gray
docker build -t todo-frontend:latest ./frontend
if ($LASTEXITCODE -ne 0) { Write-Host "FAILED: todo-frontend" -ForegroundColor Red; exit 1 }

Write-Host "  Building notification-service..." -ForegroundColor Gray
docker build -t notification-service:latest ./services/notification-service
if ($LASTEXITCODE -ne 0) { Write-Host "FAILED: notification-service" -ForegroundColor Red; exit 1 }

Write-Host "  Building recurring-task-service..." -ForegroundColor Gray
docker build -t recurring-task-service:latest ./services/recurring-task-service
if ($LASTEXITCODE -ne 0) { Write-Host "FAILED: recurring-task-service" -ForegroundColor Red; exit 1 }

Write-Host "  All images built successfully!" -ForegroundColor Green

# Step 3: Apply Dapr components & deploy Helm chart
Write-Host "`n[3/4] Deploying to Minikube..." -ForegroundColor Yellow
kubectl apply -f dapr-components/
helm upgrade --install todo-app ./helm-chart

# Step 4: Restart deployments to pick up new images
Write-Host "`n[4/4] Restarting deployments..." -ForegroundColor Yellow
kubectl rollout restart deployment todo-backend todo-frontend notification-service recurring-task-service

Write-Host "`n=== Deployment complete! ===" -ForegroundColor Green
Write-Host "Run 'kubectl get pods' to check status" -ForegroundColor Cyan
Write-Host "Run '.\scripts\port-forward.ps1' to access the app" -ForegroundColor Cyan
