# 📝 TODO APP - Phase I

A beautifully designed command-line todo application with in-memory storage, built with Python.

## ✨ Features

- Add tasks with title and optional description
- View all tasks with their status
- Update existing tasks
- Delete tasks
- Mark tasks as complete/incomplete
- **🎨 Beautiful ASCII-based UI with colors**
- **🌟 Welcome screen with elegant borders**
- **🌈 Color-coded menu options and feedback**
- Menu-driven interface
- Input validation and error handling

## 📋 Requirements

- Python 3.13+
- No external dependencies (uses Python standard library only)

## 🚀 Usage

Run the application:

```bash
python src/main.py
```

### 🎨 Beautiful UI Experience
The application features a stunning ASCII-based interface with:

- **Welcome screen** with elegant borders and centered title
- **Color-coded menu** with intuitive options:
  - 🟢 Green for adding tasks
  - 🟦 Blue/Cyan for viewing tasks
  - 🟨 Yellow for updating tasks
  - 🔴 Red for deleting tasks
  - 🟢 Green for completion marking
  - ⚪ White for exit option
- **Structured task display** with borders and clear formatting
- **Visual indicators** for task completion status
- **Colored feedback** for all operations (success, errors)

Follow the on-screen menu prompts:
1. **[+]** Add Task
2. **[V]** View Tasks
3. **[U]** Update Task
4. **[D]** Delete Task
5. **[C]** Mark Complete/Incomplete
6. **[X]** Exit

## 📁 Project Structure

```
src/
├── __init__.py
├── main.py              # Application entry point, main menu loop
├── task.py              # Task data model class
├── task_manager.py      # Business logic for task operations
├── ui.py                # User interface utilities (display, input, colors)
└── utils.py             # Helper functions (validation, formatting)
```

## 🏗️ Architecture

- **Clean Architecture**: Separation of concerns between UI, business logic, and data models
- **In-Memory Storage**: Tasks stored in memory during session (lost on exit)
- **CLI Interface**: Menu-driven command-line interface
- **🎨 Beautiful UI**: ASCII borders, colors, and elegant formatting
- **Input Validation**: Comprehensive validation for all user inputs

## 🛠️ Development

This project follows a Spec-Driven Development approach with AI-generated implementation via Claude Code.

## 🧪 Testing

The application has been tested with a comprehensive test suite covering all core functionality.