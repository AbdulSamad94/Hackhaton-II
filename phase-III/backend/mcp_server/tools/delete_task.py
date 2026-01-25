"""
MCP Tool: delete_task
Purpose: Delete a task by ID or title
"""

from pydantic import Field
from typing import Dict, Any, Optional
import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), "../.."))

from database import get_session_context


async def delete_task(
    user_id: str = Field(description="User's ID from JWT context"),
    task_id: Optional[int] = Field(description="Task ID to delete", default=None),
    task_title: Optional[str] = Field(
        description="Task title to search for (if task_id not provided)", default=None
    ),
) -> Dict[str, Any]:
    """
    Delete a task by ID or title.

    Args:
        user_id: User's ID from JWT context
        task_id: Task ID to delete (optional if task_title provided)
        task_title: Task title to search for (optional if task_id provided)

    Returns:
        dict: {task_id, title, status} or {error, status} or {disambiguation, matches, status}
    """
    try:
        # Validate that at least one identifier is provided
        if task_id is None and not task_title:
            return {
                "error": "Please provide either a task ID or task title to delete",
                "status": "error",
            }

        with get_session_context() as db:
            from services.task_service import TaskService
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

                title = task.title
                task_service.delete_task(user_id, task_id, db)
                return {"task_id": task_id, "title": title, "status": "deleted"}

            # If task_title provided, search for matching tasks
            matching_tasks = task_service.get_tasks_by_title(user_id, task_title, db)

            if not matching_tasks:
                return {
                    "error": f"No task found matching '{task_title}'",
                    "status": "error",
                }

            # If exactly one match, delete it
            if len(matching_tasks) == 1:
                task = matching_tasks[0]
                task_service.delete_task(user_id, task.id, db)
                return {"task_id": task.id, "title": task.title, "status": "deleted"}

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
