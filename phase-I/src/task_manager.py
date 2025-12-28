"""
Todo App - Phase I
Business logic for task operations
"""
from typing import List, Optional
from task import Task


class TaskManager:
    """
    Manages all tasks in memory
    """
    def __init__(self):
        self.tasks: List[Task] = []
        self.next_task_id = 1

    def add_task(self, title: str, description: str = "") -> Task:
        """
        Create and add new task
        - Generate unique ID
        - Create Task instance
        - Add to tasks list
        """
        # Validate title
        if not title or not title.strip():
            raise ValueError("Title cannot be empty")
        if len(title) > 200:
            raise ValueError("Title must be 200 characters or less")
        if len(description) > 1000:
            raise ValueError("Description must be 1000 characters or less")

        task = Task(
            id=self.next_task_id,
            title=title.strip(),
            description=description.strip()
        )
        self.tasks.append(task)
        self.next_task_id += 1
        return task

    def get_all_tasks(self) -> List[Task]:
        """
        Returns all tasks
        """
        return self.tasks.copy()

    def get_task_by_id(self, task_id: int) -> Optional[Task]:
        """
        Get a task by its ID
        """
        for task in self.tasks:
            if task.id == task_id:
                return task
        return None

    def update_task(self, task_id: int, title: str = None, description: str = None) -> Optional[Task]:
        """
        Update task details (title, description) by ID
        """
        task = self.get_task_by_id(task_id)
        if not task:
            return None

        # Validate new values if provided
        if title is not None:
            if not title.strip():
                raise ValueError("Title cannot be empty")
            if len(title) > 200:
                raise ValueError("Title must be 200 characters or less")
            task.title = title.strip()

        if description is not None:
            if len(description) > 1000:
                raise ValueError("Description must be 1000 characters or less")
            task.description = description.strip()

        return task

    def delete_task(self, task_id: int) -> bool:
        """
        Delete task by ID
        """
        task = self.get_task_by_id(task_id)
        if task:
            self.tasks.remove(task)
            return True
        return False

    def toggle_task_complete(self, task_id: int) -> Optional[Task]:
        """
        Toggle task completion status by ID
        """
        task = self.get_task_by_id(task_id)
        if task:
            task.toggle_complete()
            return task
        return None