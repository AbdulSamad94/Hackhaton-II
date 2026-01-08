# Data Model: Todo Web Application

## Database Schema

### Users Table (Managed by Better Auth)
- **id**: string (UUID, primary key)
- **email**: string (unique, not null)
- **name**: string (nullable)
- **password_hash**: string (not null)
- **created_at**: timestamp (auto-generated)

### Tasks Table
- **id**: integer (auto-increment, primary key)
- **user_id**: string (foreign key to users.id, not null)
- **title**: string (max 200 chars, not null)
- **description**: text (max 1000 chars, nullable)
- **completed**: boolean (default false)
- **created_at**: timestamp (auto-generated)
- **updated_at**: timestamp (auto-updated)

## Entity Relationships

### User → Task
- One-to-many relationship
- A user can have multiple tasks
- Each task belongs to exactly one user
- Foreign key constraint on tasks.user_id references users.id

## Validation Rules

### Task Entity
- Title must be between 1-200 characters
- Description must be between 0-1000 characters
- Title is required for creation
- Completed defaults to false
- user_id must reference an existing user

### User Entity
- Email must be unique
- Email must be valid email format
- Password must be properly hashed (handled by Better Auth)

## Indexes

### Required Indexes
- **tasks.user_id**: Index on user_id for efficient queries filtering by user
- **users.email**: Unique index on email for fast lookups and uniqueness enforcement

## State Transitions

### Task States
- **Active**: completed = false
- **Completed**: completed = true
- **Transition**: Can toggle between active and completed states via PATCH endpoint

## API Contract Implications

### For Task Creation
- Requires: user_id (from JWT), title
- Optional: description
- Automatically sets: id, created_at, updated_at, completed=false

### For Task Updates
- Updates: title, description, completed, updated_at
- Preserves: user_id, id, created_at

### For Task Deletion
- Removes: entire record
- Cascading: no related records to delete