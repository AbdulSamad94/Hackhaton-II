"""
MCP Tool: list_tasks
Purpose: List user's tasks with optional filtering, searching, and sorting
"""

from pydantic import Field
from typing import Dict, Any, List, Optional
from database import get_session_context
from sqlmodel import select, or_


async def list_tasks(
    user_id: str = Field(description="User's ID from JWT context"),
    status: str = Field(
        description="Filter by status: 'all', 'pending', or 'completed'", default="all"
    ),
    priority: Optional[str] = Field(
        description="Filter by priority: 'low', 'medium', or 'high'", default=None
    ),
    tag: Optional[str] = Field(
        description="Filter by tag (partial match)", default=None
    ),
    search: Optional[str] = Field(
        description="Search in title and description", default=None
    ),
    sort_by: Optional[str] = Field(
        description="Sort by: 'created_at', 'due_date', or 'priority'",
        default="created_at",
    ),
) -> Dict[str, Any]:
    """
    List tasks for the user with optional filtering, searching, and sorting.

    Args:
        user_id: User's ID from JWT context
        status: Filter by status - "all", "pending", or "completed"
        priority: Filter by priority - "low", "medium", or "high"
        tag: Filter by tag (partial match)
        search: Search in title and description
        sort_by: Sort by - "created_at", "due_date", or "priority"

    Returns:
        dict: {tasks, count, status}
    """
    try:
        # Validate status parameter
        if status not in ["all", "pending", "completed"]:
            return {
                "error": "Status must be 'all', 'pending', or 'completed'",
                "status": "error",
            }

        # Validate priority parameter
        if priority and priority not in ["low", "medium", "high"]:
            return {
                "error": "Priority must be 'low', 'medium', or 'high'",
                "status": "error",
            }

        # Validate sort_by parameter
        if sort_by and sort_by not in ["created_at", "due_date", "priority"]:
            return {
                "error": "sort_by must be 'created_at', 'due_date', or 'priority'",
                "status": "error",
            }

        # Use the existing database session context
        with get_session_context() as db:
            # Import Task model
            from models.task import Task

            # Use SQLModel's select instead of session.query
            statement = select(Task).where(Task.user_id == user_id)

            # Apply status filter at the database level
            if status == "pending":
                statement = statement.where(Task.completed == False)
            elif status == "completed":
                statement = statement.where(Task.completed == True)

            # Apply priority filter
            if priority:
                statement = statement.where(Task.priority == priority)

            # Apply tag filter (partial match)
            if tag:
                statement = statement.where(Task.tags.contains(tag))

            # Apply search
            if search:
                statement = statement.where(
                    or_(
                        Task.title.ilike(f"%{search}%"),
                        Task.description.ilike(f"%{search}%"),
                    )
                )

            # Apply sorting
            if sort_by == "due_date":
                statement = statement.order_by(Task.due_date.asc().nulls_last())
            elif sort_by == "priority":
                statement = statement.order_by(Task.priority.desc())
            else:
                statement = statement.order_by(Task.created_at.desc())

            filtered_tasks = db.exec(statement).all()

            # Format tasks for MCP response - serialize WITHIN the session context
            tasks_list = [
                {
                    "id": task.id,
                    "title": task.title,
                    "description": task.description,
                    "completed": task.completed,
                    "due_date": task.due_date.isoformat() if task.due_date else None,
                    "priority": task.priority,
                    "tags": task.tags,
                    "recurring": task.recurring,
                    "created_at": (
                        task.created_at.isoformat()
                        if hasattr(task, "created_at") and task.created_at
                        else None
                    ),
                }
                for task in filtered_tasks
            ]

            return {"tasks": tasks_list, "count": len(tasks_list), "status": "success"}

    except Exception as e:
        from sqlalchemy.exc import SQLAlchemyError

        if isinstance(e, SQLAlchemyError):
            return {"error": f"Database error: {str(e)}", "status": "error"}
        return {"error": f"Unexpected error: {str(e)}", "status": "error"}
