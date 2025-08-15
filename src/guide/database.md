---
layout: guide.njk
title: Database DSL
description: Define data models and perform database operations with Droelang's built-in database DSL.
breadcrumbs:
  - title: Guide
    url: /guide/
  - title: Database DSL
prev:
  title: Data Structures
  url: /guide/data-structures/
next:
  title: API Endpoints
  url: /guide/api-endpoints/
---

Droelang provides a native Database DSL for defining data models and performing database operations with automatic ORM generation for target frameworks.

## Data Definitions with Annotations

Define data structures with field annotations for database schema generation:

```droe
data User
    id is text key auto                    // Primary key with auto-generation
    name is text required                   // Required field
    email is text required unique           // Unique constraint
    age is int optional                     // Nullable field
    active is flag default true             // Default value
    created_at is date auto                 // Auto-timestamp
end data

data Post
    id is text key auto
    title is text required
    content is text required
    author_id is text required              // Foreign key reference
    published is flag default false
    created_at is date auto
end data
```

## Field Annotations

| Annotation        | Description          | Example                       |
| ----------------- | -------------------- | ----------------------------- |
| `key`             | Primary key field    | `id is text key`              |
| `auto`            | Auto-generated value | `id is text key auto`         |
| `required`        | Non-nullable field   | `name is text required`       |
| `optional`        | Nullable field       | `age is int optional`         |
| `unique`          | Unique constraint    | `email is text unique`        |
| `default <value>` | Default value        | `active is flag default true` |

## Database Operations

### Create (INSERT)

```droe
// Create new record
db create User with name is "Alice", email is "alice@example.com", age is 25

// Create with variable
set new_user which is User
set new_user.name to "Bob"
set new_user.email to "bob@example.com"
db create User from new_user
```

### Read (SELECT)

```droe
// Find single record
set user from db find User where id equals "user123"

// Find with multiple conditions
set active_user from db find User where email equals "alice@example.com" and active equals true

// Find all records
set all_users from db find all User

// Find with conditions
set adult_users from db find all User where age is greater than 18
```

### Update

```droe
// Update single record
db update User where id equals "user123" set name is "Alice Smith", age is 26

// Update with variables
set user_id which is text to "user123"
set new_name which is text to "Alice Johnson"
db update User where id equals user_id set name is new_name
```

### Delete

```droe
// Delete single record
db delete User where id equals "user123"

// Delete with conditions
db delete User where active equals false and age is less than 18
```

## Complete Database Example

**droeconfig.json:**

```json
{
  "target": "droe",
  "framework": "axum",
  "database": { "type": "postgres" }
}
```

**src/user_management.droe:**

```droe
module user_management

    // Define User entity
    data User
        id is text key auto
        username is text required unique
        email is text required unique
        password is text required
        active is flag default true
        created_at is date auto
    end data

    // User registration
    action register_user with username which is text, email which is text, password which is text
        // Check if user exists
        set existing from db find User where email equals email
        when existing is not empty then
            display "User already exists"
            give false
        end when

        // Create new user
        db create User with username is username, email is email, password is password
        display "User registered successfully"
        give true
    end action

    // User authentication
    action authenticate with email which is text, password which is text gives User
        set user from db find User where email equals email and password equals password
        when user is empty then
            display "Invalid credentials"
            give empty
        end when
        give user
    end action

    // Update user profile
    action update_profile with user_id which is text, new_email which is text
        db update User where id equals user_id set email is new_email
        display "Profile updated"
    end action

end module
```

## Database Configuration

Configure database connection in `droeconfig.json`:

```json
{
  "target": "droe",
  "framework": "axum",
  "database": {
    "type": "postgres",
    "url": "postgresql://localhost/mydb"
  }
}
```

**Supported Database Types:**

- `postgres` - PostgreSQL
- `mysql` - MySQL
- `sqlite` - SQLite
- `oracle` - Oracle Database
- `mssql` - Microsoft SQL Server
- `mongodb` - MongoDB

## Database Type Mapping

| Droelang Type | PostgreSQL  | MySQL      | SQLite    | Notes                  |
| ------------- | ----------- | ---------- | --------- | ---------------------- |
| `text`        | `TEXT`      | `TEXT`     | `TEXT`    | Variable length string |
| `int`         | `INTEGER`   | `INT`      | `INTEGER` | 32-bit signed integer  |
| `decimal`     | `DECIMAL`   | `DECIMAL`  | `REAL`    | Floating point number  |
| `flag`        | `BOOLEAN`   | `BOOLEAN`  | `INTEGER` | True/false value       |
| `date`        | `TIMESTAMP` | `DATETIME` | `TEXT`    | ISO date format        |

## Framework Integration

When using framework targets, database operations generate appropriate ORM code:

**Rust + Axum:**

```rust
// Generated model
#[derive(Serialize, Deserialize, sqlx::FromRow)]
pub struct User {
    pub id: String,
    pub name: String,
    pub email: String,
    pub age: Option<i32>,
    pub active: bool,
    pub created_at: chrono::DateTime<chrono::Utc>,
}

// Generated handler
pub async fn create_user(
    State(pool): State<PgPool>,
    Json(user): Json<CreateUserRequest>
) -> Result<Json<User>, StatusCode> {
    let result = sqlx::query_as!(
        User,
        "INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *",
        user.name, user.email, user.age
    )
    .fetch_one(&pool)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(result))
}
```

## Advanced Database Features

### Relationships

```droe
data User
    id is text key auto
    name is text required
end data

data Post
    id is text key auto
    title is text required
    author_id is text required foreign_key User.id
    created_at is date auto
end data

// Query with joins
set posts_with_authors from db find all Post join User on Post.author_id equals User.id
```

### Indexes

```droe
data User
    id is text key auto
    email is text required unique index
    name is text required index
    created_at is date auto index
end data
```

### Transactions

```droe
action transfer_funds with from_user which is text, to_user which is text, amount which is decimal
    db begin transaction

    db update Account where user_id equals from_user set balance is balance - amount
    db update Account where user_id equals to_user set balance is balance + amount

    db commit transaction
end action
```

## Best Practices

### 1. Use Appropriate Field Annotations

```droe
// Good: Clear field constraints
data User
    id is text key auto
    email is text required unique
    name is text required
    age is int optional
    created_at is date auto
end data

// Avoid: Missing constraints
data User
    id is text
    email is text
    name is text
end data
```

### 2. Handle Empty Results

```droe
// Good: Check for empty results
set user from db find User where id equals user_id
when user is empty then
    display "User not found"
    give null
end when

// Good: Use appropriate queries
set users from db find all User where active equals true
when users is empty then
    display "No active users found"
end when
```

### 3. Use Parameterized Queries

```droe
// Good: Use variables for conditions
action find_user_by_email with email which is text gives User
    set user from db find User where email equals email
    give user
end action

// Good: Multiple parameters
action find_users_by_criteria with min_age which is int, active which is flag gives list of User
    set users from db find all User where age is greater than min_age and active equals active
    give users
end action
```

## Database Migrations

Database schema changes are handled automatically when using framework targets:

```droe
// Adding new field
data User
    id is text key auto
    name is text required
    email is text required unique
    phone is text optional        // New field - migration generated
    created_at is date auto
end data
```

The framework adapter generates appropriate migration files for schema updates.

## Next Steps

- **[API Endpoints](/guide/api-endpoints/)** - Create HTTP endpoints that use database operations
- **[Framework Support](/guide/frameworks/)** - Understanding framework-specific database generation
- **[Deployment](/guide/deployment/)** - Production database configuration

Database operations in Droelang provide a clean, type-safe way to work with data while generating efficient framework-specific code.
