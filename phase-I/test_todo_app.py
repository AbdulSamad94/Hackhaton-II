"""
Test script to verify the Todo App functionality
"""
import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

from task_manager import TaskManager
from task import Task


def test_task_creation():
    """Test basic task creation and properties"""
    print("Testing task creation...")

    task_manager = TaskManager()

    # Test adding a task
    task = task_manager.add_task("Test Task", "This is a test description")

    assert task.id == 1, f"Expected ID 1, got {task.id}"
    assert task.title == "Test Task", f"Expected 'Test Task', got {task.title}"
    assert task.description == "This is a test description", f"Expected 'This is a test description', got {task.description}"
    assert task.completed == False, f"Expected completed=False, got {task.completed}"
    assert task.created_at is not None, "Expected created_at to be set"

    print("PASS: Task creation test passed")


def test_task_completion():
    """Test toggling task completion"""
    print("Testing task completion toggle...")

    task_manager = TaskManager()

    # Add a task
    task = task_manager.add_task("Test Task")

    # Toggle completion
    updated_task = task_manager.toggle_task_complete(task.id)

    assert updated_task.completed == True, f"Expected completed=True after toggle, got {updated_task.completed}"

    # Toggle again
    updated_task = task_manager.toggle_task_complete(task.id)

    assert updated_task.completed == False, f"Expected completed=False after second toggle, got {updated_task.completed}"

    print("PASS: Task completion toggle test passed")


def test_task_update():
    """Test updating task details"""
    print("Testing task update...")

    task_manager = TaskManager()

    # Add a task
    task = task_manager.add_task("Old Title", "Old Description")

    # Update the task
    updated_task = task_manager.update_task(task.id, "New Title", "New Description")

    assert updated_task.title == "New Title", f"Expected 'New Title', got {updated_task.title}"
    assert updated_task.description == "New Description", f"Expected 'New Description', got {updated_task.description}"

    print("PASS: Task update test passed")


def test_task_deletion():
    """Test deleting tasks"""
    print("Testing task deletion...")

    task_manager = TaskManager()

    # Add a task
    task = task_manager.add_task("Test Task")

    # Verify it exists
    retrieved_task = task_manager.get_task_by_id(task.id)
    assert retrieved_task is not None, "Task should exist before deletion"

    # Delete the task
    result = task_manager.delete_task(task.id)
    assert result == True, "Delete operation should return True"

    # Verify it's gone
    retrieved_task = task_manager.get_task_by_id(task.id)
    assert retrieved_task is None, "Task should not exist after deletion"

    print("PASS: Task deletion test passed")


def test_validation():
    """Test input validation"""
    print("Testing input validation...")

    task_manager = TaskManager()

    # Test empty title validation
    try:
        task_manager.add_task("")
        assert False, "Should have raised ValueError for empty title"
    except ValueError:
        pass  # Expected

    # Test title length validation
    try:
        long_title = "x" * 201
        task_manager.add_task(long_title)
        assert False, "Should have raised ValueError for long title"
    except ValueError:
        pass  # Expected

    # Test description length validation
    try:
        task_manager.add_task("Valid Title", "x" * 1001)
        assert False, "Should have raised ValueError for long description"
    except ValueError:
        pass  # Expected

    print("PASS: Input validation test passed")


def test_multiple_tasks():
    """Test managing multiple tasks"""
    print("Testing multiple tasks...")

    task_manager = TaskManager()

    # Add multiple tasks
    task1 = task_manager.add_task("Task 1")
    task2 = task_manager.add_task("Task 2", "Description for task 2")
    task3 = task_manager.add_task("Task 3")

    # Get all tasks
    all_tasks = task_manager.get_all_tasks()
    assert len(all_tasks) == 3, f"Expected 3 tasks, got {len(all_tasks)}"

    # Verify we can get each task by ID
    retrieved_task1 = task_manager.get_task_by_id(1)
    retrieved_task2 = task_manager.get_task_by_id(2)
    retrieved_task3 = task_manager.get_task_by_id(3)

    assert retrieved_task1 is not None, "Task 1 should exist"
    assert retrieved_task2 is not None, "Task 2 should exist"
    assert retrieved_task3 is not None, "Task 3 should exist"

    print("PASS: Multiple tasks test passed")


if __name__ == "__main__":
    print("Running Todo App tests...\n")

    test_task_creation()
    test_task_completion()
    test_task_update()
    test_task_deletion()
    test_validation()
    test_multiple_tasks()

    print("\nAll tests passed! Todo App is working correctly.")