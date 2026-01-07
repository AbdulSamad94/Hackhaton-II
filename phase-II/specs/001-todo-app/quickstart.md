# Quickstart Guide: Todo Web Application

## Prerequisites

- Node.js 18+ for frontend development
- Python 3.13+ for backend development
- PostgreSQL database (or Neon Serverless PostgreSQL account)
- Better Auth account or self-hosted instance

## Setup Instructions

### 1. Clone and Initialize Repository

```bash
git clone <repository-url>
cd <repository-name>
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
uv pip install fastapi sqlmodel python-jose bcrypt python-multipart python-dotenv

# Set up environment variables
cp .env.example .env
# Edit .env with your database URL and secrets
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
# or
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API URL and auth configuration
```

### 4. Environment Variables

#### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/todo_app
BETTER_AUTH_SECRET=your-32-char-secret-here
ALLOWED_ORIGINS=http://localhost:3000,https://your-app.vercel.app
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your-32-char-secret-here
```

### 5. Database Setup

```bash
# With backend virtual environment activated
cd backend

# Run database migrations (if using alembic)
alembic upgrade head

# Or manually create tables using SQLModel
python -c "from models.task import create_db_and_tables; create_db_and_tables()"
```

### 6. Running the Applications

#### Backend (separate terminal)
```bash
cd backend
uvicorn main:app --reload --port 8000
```

#### Frontend (separate terminal)
```bash
cd frontend
npm run dev
# App will be available at http://localhost:3000
```

## API Endpoints

### Authentication (Better Auth)
- POST `/api/auth/signup` - Create new user
- POST `/api/auth/signin` - Authenticate user
- POST `/api/auth/signout` - End session
- GET `/api/auth/session` - Get current session

### Tasks API
- GET `/api/{user_id}/tasks` - Get all user's tasks
- POST `/api/{user_id}/tasks` - Create new task
- GET `/api/{user_id}/tasks/{id}` - Get specific task
- PUT `/api/{user_id}/tasks/{id}` - Update task
- DELETE `/api/{user_id}/tasks/{id}` - Delete task
- PATCH `/api/{user_id}/tasks/{id}/complete` - Toggle completion status

## Development Workflow

1. **Start backend**: `uvicorn main:app --reload`
2. **Start frontend**: `npm run dev`
3. **Access app**: Navigate to `http://localhost:3000`
4. **API testing**: Backend API available at `http://localhost:8000`

## Deployment

### Frontend (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Backend
Deploy to any Python-compatible hosting service (Heroku, Railway, etc.)

## Troubleshooting

### Common Issues
- **CORS errors**: Ensure ALLOWED_ORIGINS includes your frontend URL
- **Database connection**: Verify DATABASE_URL is correct
- **JWT validation**: Confirm BETTER_AUTH_SECRET matches between frontend and backend
- **Port conflicts**: Check if ports 3000 (frontend) and 8000 (backend) are available