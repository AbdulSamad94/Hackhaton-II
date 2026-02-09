"""
MCP Tool: add_task
Purpose: Create new task for the user
"""

from pydantic import Field
from typing import Dict, Any, Optional
from datetime import datetime
from database import get_session_context
from sqlmodel import Session


async def add_task(
    user_id: str = Field(description="User's ID from JWT context"),
    title: str = Field(
        description="Task title (required, max 200 chars)", min_length=1, max_length=200
    ),
    description: str = Field(
        description="Optional task description (max 1000 chars)",
        max_length=1000,
        default="",
    ),
    due_date: Optional[str] = Field(
        description="Due date in ISO format (e.g., '2025-12-31T10:00:00')",
        default=None,
    ),
    priority: Optional[str] = Field(
        description="Priority level: 'low', 'medium', or 'high'",
        default="medium",
    ),
    tags: Optional[str] = Field(
        description="Comma-separated tags (e.g., 'work, important')",
        default=None,
    ),
    recurring: Optional[str] = Field(
        description="Recurrence pattern: 'daily', 'weekly', or 'monthly'",
        default=None,
    ),
) -> Dict[str, Any]:
    """
    Create a new task for the user.

    Args:
        user_id: User's ID from JWT context
        title: Task title (required, max 200 chars)
        description: Optional task description (max 1000 chars)
        due_date: Due date in ISO format (optional)
        priority: Priority level (optional, default: medium)
        tags: Comma-separated tags (optional)
        recurring: Recurrence pattern (optional)

    Returns:
        dict: {task_id, title, status, message}
    """
    try:
        # Validate inputs for empty title
        if not title or len(title.strip()) == 0:
            return {"error": "Title cannot be empty", "status": "error"}

        # Validate priority
        if priority and priority not in ["low", "medium", "high"]:
            return {
                "error": "Priority must be 'low', 'medium', or 'high'",
                "status": "error",
            }

        # Validate recurring
        if recurring and recurring not in ["daily", "weekly", "monthly"]:
            return {
                "error": "Recurring must be 'daily', 'weekly', or 'monthly'",
                "status": "error",
            }

        # Parse due_date if provided
        parsed_due_date = None
        if due_date:
            try:
                parsed_due_date = datetime.fromisoformat(due_date)
            except ValueError:
                return {
                    "error": "Invalid due_date format. Use ISO format (e.g., '2025-12-31T10:00:00')",
                    "status": "error",
                }

        # Use the existing database session context
        with get_session_context() as db:
            # Import TaskService
            from services.task_service import TaskService

            task_service = TaskService()

            # Prepare task data
            from schemas.task_schemas import TaskCreate

            task_create = TaskCreate(
                title=title.strip(),
                description=description.strip() if description else None,
                due_date=parsed_due_date,
                priority=priority,
                tags=tags.strip() if tags else None,
                recurring=recurring,
            )

            # Call existing TaskService
            task = task_service.create_task(user_id=user_id, task=task_create, db=db)

            # Return MCP-compliant response
            return {
                "task_id": task.id,
                "title": task.title,
                "due_date": task.due_date.isoformat() if task.due_date else None,
                "priority": task.priority,
                "tags": task.tags,
                "recurring": task.recurring,
                "status": "created",
                "message": f"Task '{task.title}' created successfully",
            }

    except Exception as e:
        from sqlalchemy.exc import SQLAlchemyError

        if isinstance(e, SQLAlchemyError):
            return {"error": f"Database error: {str(e)}", "status": "error"}
        return {"error": f"Unexpected error: {str(e)}", "status": "error"}
