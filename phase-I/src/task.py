"""
Todo App - Phase I
Task data model class
"""
from datetime import datetime
from dataclasses import dataclass


@dataclass
class Task:
    """
    Represents a single todo task
    """
    id: int
    title: str
    description: str = ""
    completed: bool = False
    created_at: datetime = None

    def __post_init__(self):
        """Initialize created_at if not provided"""
        if self.created_at is None:
            self.created_at = datetime.now()

    def toggle_complete(self) -> None:
        """
        Toggles the completed status between True and False
        """
        self.completed = not self.completed

    def to_dict(self) -> dict:
        """
        Returns a dictionary representation of the task
        """
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "completed": self.completed,
            "created_at": self.created_at.isoformat()
        }

    def __str__(self) -> str:
        """
        Returns a string representation suitable for display
        """
        status = "✓" if self.completed else "☐"
        title_str = f"[{self.id}] {status} {self.title}"
        desc_str = f"\n    Description: {self.description}" if self.description else ""
        date_str = f"\n    Created: {self.created_at.strftime('%Y-%m-%d %H:%M')}"
        return f"{title_str}{desc_str}{date_str}"