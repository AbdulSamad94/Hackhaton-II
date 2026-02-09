from typing import List, Optional
from sqlmodel import Session, select, or_
from models.task import Task
from schemas.task_schemas import TaskCreate, TaskUpdate, TaskToggleComplete
from utils.errors import TaskNotFoundException, UnauthorizedTaskAccessException
from services.event_publisher import event_publisher


class TaskService:
    @staticmethod
    def get_tasks_for_user(
        user_id: str,
        db: Session,
        status: Optional[str] = "all",
        priority: Optional[str] = None,
        tag: Optional[str] = None,
        search: Optional[str] = None,
        sort_by: Optional[str] = "created_at",
    ) -> List[Task]:
        """
        Get tasks for a user with optional filtering, searching, and sorting.

        Args:
            user_id: The user's ID
            db: Database session
            status: Filter by status - "all", "pending", or "completed"
            priority: Filter by priority - "low", "medium", or "high"
            tag: Filter by tag (partial match)
            search: Search in title and description
            sort_by: Sort by - "created_at", "due_date", "priority"
        """
        statement = select(Task).where(Task.user_id == user_id)

        # Filter by status
        if status == "pending":
            statement = statement.where(Task.completed == False)
        elif status == "completed":
            statement = statement.where(Task.completed == True)

        # Filter by priority
        if priority:
            statement = statement.where(Task.priority == priority)

        # Filter by tag (partial match)
        if tag:
            statement = statement.where(Task.tags.contains(tag))

        # Search in title and description
        if search:
            statement = statement.where(
                or_(
                    Task.title.ilike(f"%{search}%"),
                    Task.description.ilike(f"%{search}%"),
                )
            )

        # Sort
        if sort_by == "due_date":
            statement = statement.order_by(Task.due_date.asc().nulls_last())
        elif sort_by == "priority":
            # Custom priority ordering: high -> medium -> low
            statement = statement.order_by(Task.priority.desc())
        else:
            statement = statement.order_by(Task.created_at.desc())

        return list(db.exec(statement).all())

    @staticmethod
    def create_task(user_id: str, task: TaskCreate, db: Session) -> Task:
        db_task = Task(**task.model_dump(), user_id=user_id)
        db.add(db_task)
        db.commit()
        db.refresh(db_task)

        # Publish event
        event_publisher.publish_event(
            topic="task-updates",
            data={"task": db_task.model_dump(mode="json")},
            event_type="task_created",
        )

        return db_task

    @staticmethod
    def get_task_by_id(user_id: str, task_id: int, db: Session) -> Task:
        task = db.get(Task, task_id)
        if not task:
            raise TaskNotFoundException(task_id)

        if task.user_id != user_id:
            raise UnauthorizedTaskAccessException()

        return task

    @staticmethod
    def get_tasks_by_title(user_id: str, title: str, db: Session) -> List[Task]:
        """
        Find tasks by title (case-insensitive partial match).
        Returns all matching tasks for disambiguation.
        """
        statement = select(Task).where(
            Task.user_id == user_id, Task.title.ilike(f"%{title}%")
        )
        return list(db.exec(statement).all())

    @staticmethod
    def update_task(
        user_id: str, task_id: int, task_update: TaskUpdate, db: Session
    ) -> Task:
        db_task = TaskService.get_task_by_id(user_id, task_id, db)

        # Update task fields
        update_data = task_update.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_task, field, value)

        db.add(db_task)
        db.commit()
        db.refresh(db_task)

        # Publish event
        event_publisher.publish_event(
            topic="task-updates",
            data={"task": db_task.model_dump(mode="json")},
            event_type="task_updated",
        )

        return db_task

    @staticmethod
    def delete_task(user_id: str, task_id: int, db: Session) -> None:
        db_task = TaskService.get_task_by_id(user_id, task_id, db)
        task_data = db_task.model_dump(mode="json")
        db.delete(db_task)
        db.commit()

        # Publish event
        event_publisher.publish_event(
            topic="task-updates",
            data={"task_id": task_id, "task": task_data},
            event_type="task_deleted",
        )

    @staticmethod
    def toggle_task_complete(
        user_id: str, task_id: int, task_toggle: TaskToggleComplete, db: Session
    ) -> Task:
        db_task = TaskService.get_task_by_id(user_id, task_id, db)
        db_task.completed = task_toggle.completed
        db.add(db_task)
        db.commit()
        db.refresh(db_task)

        # Publish event
        event_type = "task_completed" if task_toggle.completed else "task_uncompleted"
        event_publisher.publish_event(
            topic="task-updates",
            data={"task": db_task.model_dump(mode="json"), "type": event_type},
            event_type=event_type,
        )

        return db_task
