# Phase V - Minikube Port Forward Script
# Opens frontend (3000) and backend (8000) for local access

Write-Host "Starting port-forwarding..." -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Green
Write-Host "Backend:  http://localhost:8000" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""

# Start backend port-forward in background
$backend = Start-Job -ScriptBlock {
    kubectl port-forward svc/todo-backend 8000:8000
}

# Start frontend port-forward in foreground
try {
    kubectl port-forward svc/todo-frontend 3000:3000
} finally {
    # Clean up backend job when frontend is stopped
    Stop-Job $backend -ErrorAction SilentlyContinue
    Remove-Job $backend -ErrorAction SilentlyContinue
    Write-Host "`nPort-forwarding stopped." -ForegroundColor Red
}
