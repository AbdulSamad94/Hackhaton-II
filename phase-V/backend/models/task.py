from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime
import uuid

# Import schemas to maintain backward compatibility for routes importing from models
from schemas.task_schemas import TaskCreate, TaskUpdate, TaskRead


class TaskBase(SQLModel):
    title: str = Field(min_length=1, max_length=200)
    description: Optional[str] = Field(default=None, max_length=1000)
    completed: bool = Field(default=False)
    user_id: str = Field(foreign_key="user.id")
    
    # Phase V: Advanced Features
    due_date: Optional[datetime] = Field(default=None, description="Task due date with time")
    priority: Optional[str] = Field(default="medium", description="Priority: low, medium, high")
    tags: Optional[str] = Field(default=None, description="Comma-separated tags")
    recurring: Optional[str] = Field(default=None, description="Recurrence: daily, weekly, monthly")


class Task(TaskBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    updated_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
