from .task import Task, TaskCreate, TaskUpdate, TaskRead
from .user import User, UserCreate, UserUpdate, UserRead
from sqlmodel import SQLModel

# Import all models here to ensure they're registered with SQLModel
__all__ = ["Task", "TaskCreate", "TaskUpdate", "TaskRead", "User", "UserCreate", "UserUpdate", "UserRead", "SQLModel"]