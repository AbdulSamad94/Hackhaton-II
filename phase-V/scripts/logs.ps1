# Phase V - View Logs
# Usage: .\scripts\logs.ps1 [service-name]
# Examples:
#   .\scripts\logs.ps1 backend
#   .\scripts\logs.ps1 notification
#   .\scripts\logs.ps1 recurring
#   .\scripts\logs.ps1 frontend

param(
    [Parameter(Position=0)]
    [ValidateSet("backend", "notification", "recurring", "frontend", "redis")]
    [string]$Service = "backend"
)

$mapping = @{
    "backend"      = @{ label = "app=todo-backend"; container = "backend" }
    "notification" = @{ label = "app=notification-service"; container = "notification-service" }
    "recurring"    = @{ label = "app=recurring-task-service"; container = "recurring-task-service" }
    "frontend"     = @{ label = "app=todo-frontend"; container = "" }
    "redis"        = @{ label = "app=redis"; container = "" }
}

$config = $mapping[$Service]

Write-Host "=== Logs: $Service ===" -ForegroundColor Cyan

if ($config.container) {
    kubectl logs -l $config.label -c $config.container --tail=50 -f
} else {
    kubectl logs -l $config.label --tail=50 -f
}
