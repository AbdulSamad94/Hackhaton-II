# Todo Web Application

A full-stack Todo web application with user authentication, task management interface, responsive design, data persistence, and security.

## Features

- User registration and authentication with JWT tokens
- Task management (create, read, update, delete, mark complete)
- Responsive design for desktop, tablet, and mobile
- Secure session management with 7-day token expiration
- Data isolation between users

## Tech Stack

- **Frontend**: Next.js 16+, React 19+, TypeScript, Tailwind CSS
- **Backend**: Python FastAPI, SQLModel ORM
- **Database**: PostgreSQL
- **Authentication**: Custom JWT-based authentication

## Setup Instructions

### Prerequisites

- Node.js 18+ and pnpm
- Python 3.12+
- PostgreSQL database

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. Install dependencies using uv:
   ```bash
   uv pip install -r requirements.txt
   # Or if using pyproject.toml:
   uv pip install -e .
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your database URL and other settings
   ```

5. Run the application:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies using pnpm:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API URL and other settings
   ```

4. Run the development server:
   ```bash
   pnpm dev
   ```

## API Endpoints

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/users/{user_id}/tasks` - Get user's tasks
- `POST /api/users/{user_id}/tasks` - Create a new task
- `GET /api/users/{user_id}/tasks/{task_id}` - Get a specific task
- `PUT /api/users/{user_id}/tasks/{task_id}` - Update a task
- `DELETE /api/users/{user_id}/tasks/{task_id}` - Delete a task
- `PATCH /api/users/{user_id}/tasks/{task_id}/complete` - Toggle task completion

## Environment Variables

### Backend (.env)
- `DATABASE_URL` - PostgreSQL database connection string
- `SECRET_KEY` - Secret key for JWT token signing
- `JWT_EXPIRATION_DAYS` - Number of days for JWT token expiration (default: 7)

### Frontend (.env.local)
- `NEXT_PUBLIC_API_URL` - Base URL for backend API
- `NEXT_PUBLIC_JWT_SECRET` - JWT secret for frontend validation (optional)

## Development

### Running Tests
Backend tests:
```bash
cd backend
pytest
```

Frontend tests:
```bash
cd frontend
pnpm test
```

### Database Migrations
When you make changes to models, create and run migrations:
```bash
# Create migration
alembic revision --autogenerate -m "Migration message"

# Apply migration
alembic upgrade head
```

## Security Features

- JWT tokens with 7-day expiration
- Password hashing with bcrypt
- SQL injection prevention via ORM
- CORS configured for specific origins
- Timing attack prevention on login
- Security headers on API responses

## Architecture

- Monorepo structure with clear frontend/backend separation
- RESTful API design with consistent endpoint patterns
- Stateless backend architecture for horizontal scalability
- Type safety with TypeScript and Python type hints
- Responsive design with mobile-first approach

## Deployment

The application can be deployed by:
1. Building the frontend: `pnpm build`
2. Deploying the backend with a WSGI/ASGI server
3. Setting up a PostgreSQL database
4. Configuring environment variables for production