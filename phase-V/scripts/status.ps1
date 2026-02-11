# Phase V - Quick Status Check
# Shows pod status, service URLs, and Dapr component health

Write-Host "=== Phase V: Cluster Status ===" -ForegroundColor Cyan

Write-Host "`n--- Pods ---" -ForegroundColor Yellow
kubectl get pods

Write-Host "`n--- Services ---" -ForegroundColor Yellow
kubectl get svc

Write-Host "`n--- Dapr Components ---" -ForegroundColor Yellow
kubectl get components.dapr.io

Write-Host "`n--- Dapr Status ---" -ForegroundColor Yellow
dapr status -k

Write-Host "`n--- Quick Health Check ---" -ForegroundColor Yellow
$pods = kubectl get pods -o jsonpath='{range .items[*]}{.metadata.name}={.status.phase}{"\n"}{end}'
$running = ($pods | Where-Object { $_ -match "Running" }).Count
$total = ($pods | Where-Object { $_ -ne "" }).Count
Write-Host "Pods Running: $running/$total" -ForegroundColor $(if ($running -eq $total) { "Green" } else { "Red" })
