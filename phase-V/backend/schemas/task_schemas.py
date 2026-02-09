from sqlmodel import SQLModel
from typing import Optional
from datetime import datetime
from pydantic import BaseModel
from enum import Enum


class PriorityEnum(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"


class RecurringEnum(str, Enum):
    daily = "daily"
    weekly = "weekly"
    monthly = "monthly"


class TaskBase(SQLModel):
    title: str
    description: Optional[str] = None
    completed: bool = False


class TaskCreate(TaskBase):
    title: str
    # Phase V: Advanced Features
    due_date: Optional[datetime] = None
    priority: Optional[str] = "medium"
    tags: Optional[str] = None
    recurring: Optional[str] = None


class TaskUpdate(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None
    # Phase V: Advanced Features
    due_date: Optional[datetime] = None
    priority: Optional[str] = None
    tags: Optional[str] = None
    recurring: Optional[str] = None


class TaskRead(TaskBase):
    id: int
    user_id: str
    created_at: datetime
    updated_at: datetime
    # Phase V: Advanced Features
    due_date: Optional[datetime] = None
    priority: Optional[str] = "medium"
    tags: Optional[str] = None
    recurring: Optional[str] = None


class TaskToggleComplete(BaseModel):
    completed: bool
