# Phase III: Specs-Driven AI Chatbot Integration

Phase III of the TodoFlow project focuses on integrating a production-grade AI assistant using the **Model Context Protocol (MCP)** and modern UI/UX principles.

## 🚀 Key Features

### 1. Intelligent AI Assistant

- **Natural Language Task Management**: Users can add, list, update, complete, and delete tasks using conversational English.
- **Context-Aware**: The assistant maintains short-term conversational history for follow-up questions.
- **Disambiguation Flow**: If multiple tasks match a title, the assistant intelligently asks the user for clarification.

### 2. MCP (Model Context Protocol) Server

- **Standardized Tools**: Exposes the backend's `TaskService` as MCP tools, making them compatible with any MCP-enabled AI client.
- **Shared Resolution Logic**: Centralized task identification logic (ID vs. Title) ensures consistent behavior across all tools.
- **Optimized Queries**: Task filtering and status updates are performed at the database level for maximum performance.

### 3. Premium Chat UI

- **Modern Aesthetic**: A clean, "SaaS-style" interface using Lucide icons and an Indigo/Slate theme.
- **Dynamic Resizing**: Responsive chat window with four distinct size modes (Small, Medium, Large, Full-screen).
- **Stateless Architecture**: Frontend-managed history ensures the backend remains lightweight and scalable.

## 🏗️ Technical Architecture

### Backend (`/backend`)

- **FastAPI**: Serves the main application API.
- **SQLModel**: ORM for PostgreSQL (Neon) interaction.
- **Package Structure**: Standardized Python package structure with proper `__init__.py` files and absolute imports.
- **Agent SDK**: Leverages OpenAI/Gemini compatibility layer for agent execution.

### MCP Layer (`/backend/mcp_server`)

- **FastMCP**: Official Python SDK for building MCP servers.
- **Tools**: Modular tool definitions in `tools/` using a shared `tool_utils.py` for task resolution.
- **Start Script**: `start_server.py` for independent MCP process execution.

### Frontend (`/frontend`)

- **Next.js & React**: Core application framework.
- **Framer Motion**: Smooth animations for transitions and resizing.
- **ChatWidget/Window**: Encapsulated chatbot components for easy integration.

## 🛠️ Getting Started

### Backend Setup

1. Install dependencies:
   ```bash
   pip install -e .
   ```
2. Set up environment variables in `.env`:
   - `GEMINI_API_KEY`
   - `DATABASE_URL`

### Running the MCP Server

```bash
python mcp_server/start_server.py
```

### Running the Web App

```bash
npm run dev
```

## 📝 Recent Optimizations (PR Fixes)

- Removed `sys.path.append` anti-patterns in favor of a proper package structure.
- Moved Python-side filtering to the Database (`select().where()`).
- Unified task resolution logic into a single helper function.
- Standardized error handling to provide specific database feedback.
