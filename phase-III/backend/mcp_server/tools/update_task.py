"""
MCP Tool: update_task
Purpose: Update an existing task by ID or title
"""

from pydantic import Field
from typing import Dict, Any, Optional
import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), "../.."))

from database import get_session_context


async def update_task(
    user_id: str = Field(description="User's ID from JWT context"),
    task_id: Optional[int] = Field(description="Task ID to update", default=None),
    task_title: Optional[str] = Field(
        description="Task title to search for (if task_id not provided)", default=None
    ),
    title: Optional[str] = Field(
        description="New task title (max 200 chars)", max_length=200, default=None
    ),
    description: Optional[str] = Field(
        description="New task description (max 1000 chars)",
        max_length=1000,
        default=None,
    ),
) -> Dict[str, Any]:
    """
    Update an existing task by ID or title.

    Args:
        user_id: User's ID from JWT context
        task_id: Task ID to update (optional if task_title provided)
        task_title: Task title to search for (optional if task_id provided)
        title: New task title (optional, max 200 chars)
        description: New task description (optional, max 1000 chars)

    Returns:
        dict: {task_id, title, description, status} or {error, status} or {disambiguation, matches, status}
    """
    try:
        # Validate that at least one identifier is provided
        if task_id is None and not task_title:
            return {
                "error": "Please provide either a task ID or task title to update",
                "status": "error",
            }

        # Validate update fields
        if title is not None and len(title) > 200:
            return {"error": "Title must be 200 characters or less", "status": "error"}

        if description is not None and len(description) > 1000:
            return {
                "error": "Description must be 1000 characters or less",
                "status": "error",
            }

        # Build updates dict
        updates = {}
        if title is not None:
            updates["title"] = title.strip()
        if description is not None:
            updates["description"] = description.strip()

        if not updates:
            return {
                "error": "No updates provided. Please specify a new title or description.",
                "status": "error",
            }

        with get_session_context() as db:
            from services.task_service import TaskService
            from schemas.task_schemas import TaskUpdate
            from models.task import Task

            task_service = TaskService()

            # If task_id provided, use it directly
            if task_id is not None:
                task = db.get(Task, task_id)
                if not task or task.user_id != user_id:
                    return {
                        "error": f"Task with ID {task_id} not found",
                        "status": "error",
                    }

                task_update = TaskUpdate(**updates)
                updated_task = task_service.update_task(
                    user_id, task_id, task_update, db
                )
                return {
                    "task_id": updated_task.id,
                    "title": updated_task.title,
                    "description": updated_task.description,
                    "status": "updated",
                }

            # If task_title provided, search for matching tasks
            matching_tasks = task_service.get_tasks_by_title(user_id, task_title, db)

            if not matching_tasks:
                return {
                    "error": f"No task found matching '{task_title}'",
                    "status": "error",
                }

            # If exactly one match, update it
            if len(matching_tasks) == 1:
                task = matching_tasks[0]
                task_update = TaskUpdate(**updates)
                updated_task = task_service.update_task(
                    user_id, task.id, task_update, db
                )
                return {
                    "task_id": updated_task.id,
                    "title": updated_task.title,
                    "description": updated_task.description,
                    "status": "updated",
                }

            # Multiple matches - ask for disambiguation
            matches = [
                {"id": t.id, "title": t.title, "completed": t.completed}
                for t in matching_tasks
            ]
            return {
                "disambiguation": f"Found {len(matching_tasks)} tasks matching '{task_title}'. Please specify which one by ID:",
                "matches": matches,
                "status": "needs_clarification",
            }

    except Exception as e:
        return {"error": str(e), "status": "error"}
