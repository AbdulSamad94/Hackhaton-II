# Research Notes: Todo Web Application

## Technology Research

### Frontend Technologies
- **Next.js 16+**: Latest version with App Router provides excellent server-side rendering and client-side interactivity. TypeScript integration is seamless.
- **Tailwind CSS**: Utility-first CSS framework that enables rapid responsive design with consistent styling across all devices.
- **Better Auth**: Provides comprehensive authentication solution with JWT support, social logins, and secure session management.

### Backend Technologies
- **Python 3.13+**: Latest Python version with improved performance and new features. Compatible with all required libraries.
- **FastAPI**: Modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints.
- **SQLModel**: Combines SQLAlchemy and Pydantic, providing both database modeling and validation in one library.

### Database Technology
- **Neon Serverless PostgreSQL**: Serverless PostgreSQL offering with auto-scaling, instant spin-ups, and integrated branching capabilities.

## Architecture Decisions

### Monorepo Structure
- **Rationale**: Keeping frontend and backend in the same repository simplifies deployment, versioning, and coordination between teams.
- **Separation**: Clear separation between frontend and backend with dedicated directories and package management.

### API Design
- **RESTful principles**: Using standard HTTP methods (GET, POST, PUT, DELETE, PATCH) for CRUD operations.
- **JWT Authentication**: Token-based authentication that scales well and works across different frontend technologies.
- **User Isolation**: Each API endpoint validates that the user can only access their own data by comparing JWT payload with URL parameters.

## Security Considerations

### Authentication Flow
1. User registers via signup form
2. Better Auth handles password hashing and user creation
3. JWT token is issued with 7-day expiration
4. Frontend stores token securely and includes in API requests
5. Backend validates token and user permissions on each request

### Data Protection
- Passwords hashed using bcrypt with appropriate salt
- JWT tokens validated using python-jose library
- SQL injection prevention through ORM parameterization
- CORS configured to allow only specific origins

## Performance Optimization

### Frontend
- Server Components for initial page loads to improve performance
- Client Components only for interactive elements
- Optimistic UI updates for better user experience
- Responsive design with mobile-first approach

### Backend
- FastAPI's async capabilities for handling multiple requests
- Connection pooling for database efficiency
- Proper indexing on database tables for query optimization
- Caching strategies for frequently accessed data

## Integration Patterns

### Frontend-Backend Communication
- REST API endpoints following consistent patterns
- JSON request/response format
- Standard HTTP status codes
- Error handling with clear messages

### Database Schema
- Users table managed by Better Auth
- Tasks table with foreign key relationship to users
- Proper indexing on user_id for efficient queries
- Timestamps for audit trails