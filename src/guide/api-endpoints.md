---
layout: guide.njk
title: API Endpoints
description: Create HTTP REST APIs and make API calls with Roelang's built-in HTTP DSL.
breadcrumbs:
  - title: Guide
    url: /guide/
  - title: API Endpoints
prev:
  title: Database DSL
  url: /guide/database/
next:
  title: Mobile Development
  url: /guide/mobile/
---

Roelang provides native support for creating HTTP REST APIs and making API calls with a clean, declarative syntax.

## Defining HTTP Endpoints

Use the `serve` statement to define REST HTTP endpoints:

```roe
// GET endpoint
serve get /users/:id
    set user from db find User where id equals id
    when user is empty then
        respond 404 with "User not found"
    end when
    respond 200 with user
end serve

// POST endpoint  
serve post /users
    db create User from request.body
    respond 201 with created_user
end serve

// PUT endpoint
serve put /users/:id
    db update User where id equals id set name is request.name
    respond 200 with updated_user
end serve

// DELETE endpoint
serve delete /users/:id
    db delete User where id equals id
    respond 204
end serve
```

## HTTP Methods

Roelang supports all standard HTTP methods:

| Method | Purpose | Example |
|--------|---------|---------|
| `GET` | Retrieve data | `serve get /users` |
| `POST` | Create new resource | `serve post /users` |
| `PUT` | Update existing resource | `serve put /users/:id` |
| `DELETE` | Delete resource | `serve delete /users/:id` |
| `PATCH` | Partial update | `serve patch /users/:id` |

## URL Parameters

Extract parameters from URLs using the `:parameter` syntax:

```roe
serve get /users/:user_id/posts/:post_id
    set user from db find User where id equals user_id
    set post from db find Post where id equals post_id and author_id equals user_id
    
    when user is empty then
        respond 404 with "User not found"
    end when
    
    when post is empty then
        respond 404 with "Post not found"
    end when
    
    respond 200 with post
end serve
```

## Request Data

Access request data through the `request` object:

```roe
serve post /users
    // Access request body
    set user_data from request.body
    set name from request.body.name
    set email from request.body.email
    
    // Validate required fields
    when name is empty or email is empty then
        respond 400 with "Name and email are required"
    end when
    
    // Create user
    db create User with name is name, email is email
    respond 201 with created_user
end serve
```

## Response Handling

### Status Codes and Data

```roe
serve get /users/:id
    set user from db find User where id equals id
    
    when user is empty then
        respond 404 with '{"error": "User not found"}'
    end when
    
    respond 200 with user
end serve

serve post /users
    // Validation
    when request.body.email is invalid then
        respond 422 with '{"error": "Invalid email format"}'
    end when
    
    // Create user
    db create User from request.body
    respond 201 with created_user
end serve
```

### Common HTTP Status Codes

| Code | Meaning | Usage |
|------|---------|-------|
| `200` | OK | Successful GET, PUT |
| `201` | Created | Successful POST |
| `204` | No Content | Successful DELETE |
| `400` | Bad Request | Invalid request data |
| `404` | Not Found | Resource doesn't exist |
| `422` | Unprocessable Entity | Validation errors |
| `500` | Internal Server Error | Server errors |

## Making API Calls

### Basic API Call Syntax

```roe
call <endpoint> method <HTTP_METHOD> [with <data>] [using headers <headers>] into <response_variable>
```

### GET Request

```roe
// Simple GET request
call "https://api.example.com/users" method GET into response
display response

// GET with headers
call "https://api.example.com/profile" method GET using headers
    Authorization: "Bearer token123"
    Accept: "application/json"
end headers into profile_data
```

### POST Request

```roe
// POST with JSON data
set user_data which is text to '{"name": "Alice", "email": "alice@example.com"}'
call "https://api.example.com/users" method POST with user_data using headers
    Content-Type: "application/json"
    Authorization: "Bearer token123"
end headers into create_response

// POST with form data
set form_data which is text to "username=alice&password=secret"
call "https://api.example.com/login" method POST with form_data using headers
    Content-Type: "application/x-www-form-urlencoded"
end headers into login_response
```

### PUT and DELETE Requests

```roe
// PUT request
set update_data which is text to '{"name": "Alice Smith"}'
call "https://api.example.com/users/123" method PUT with update_data using headers
    Content-Type: "application/json"
    Authorization: "Bearer token123"
end headers into update_response

// DELETE request
call "https://api.example.com/users/123" method DELETE using headers
    Authorization: "Bearer token123"
end headers into delete_response
```

## API Response Handling

```roe
// Make API call
call "https://api.example.com/data" method GET into response

// Check response status
when response.status equals 200 then
    display "Success: " + response.body
otherwise when response.status equals 404 then
    display "Not found"
otherwise
    display "Error: " + response.status
end when

// Parse JSON response (automatic in supported targets)
set data from response.body
display "User name: " + data.name
```

## Complete API Example

Here's a complete blog API example:

```roe
@target roe

module blog_api

    data Article
        id is text key auto
        title is text required
        content is text required
        author is text required
        published is flag default false
        created_at is date auto
    end data
    
    // List all articles
    serve get /articles
        set articles from db find all Article where published equals true
        respond 200 with articles
    end serve
    
    // Get single article
    serve get /articles/:id
        set article from db find Article where id equals id
        when article is empty then
            respond 404 with '{"error": "Article not found"}'
        end when
        respond 200 with article
    end serve
    
    // Create article
    serve post /articles
        set new_article from request.body
        
        // Validation
        when new_article.title is empty then
            respond 400 with '{"error": "Title is required"}'
        end when
        
        when new_article.content is empty then
            respond 400 with '{"error": "Content is required"}'
        end when
        
        db create Article from new_article
        respond 201 with new_article
    end serve
    
    // Update article
    serve put /articles/:id
        set article from db find Article where id equals id
        when article is empty then
            respond 404 with '{"error": "Article not found"}'
        end when
        
        db update Article where id equals id set 
            title is request.title,
            content is request.content
        respond 200 with updated_article
    end serve
    
    // Delete article
    serve delete /articles/:id
        set article from db find Article where id equals id
        when article is empty then
            respond 404 with '{"error": "Article not found"}'
        end when
        
        db delete Article where id equals id
        respond 204
    end serve
    
    // Publish article
    serve post /articles/:id/publish
        set article from db find Article where id equals id
        when article is empty then
            respond 404 with '{"error": "Article not found"}'
        end when
        
        db update Article where id equals id set published is true
        respond 200 with '{"message": "Article published"}'
    end serve

end module
```

## Advanced Features

### Middleware and Authentication

```roe
serve get /admin/users
    // Check authorization
    when request.headers.Authorization is empty then
        respond 401 with '{"error": "Authorization required"}'
    end when
    
    set token from request.headers.Authorization
    when token is not valid then
        respond 403 with '{"error": "Invalid token"}'
    end when
    
    // Proceed with authorized request
    set users from db find all User
    respond 200 with users
end serve
```

### Query Parameters

```roe
serve get /users
    // Handle pagination
    set page from request.query.page or 1
    set limit from request.query.limit or 10
    set offset to (page - 1) * limit
    
    // Handle search
    set search from request.query.search
    when search is not empty then
        set users from db find all User where name contains search limit limit offset offset
    otherwise
        set users from db find all User limit limit offset offset
    end when
    
    respond 200 with users
end serve
```

### Request Validation

```roe
serve post /users
    set email from request.body.email
    set name from request.body.name
    
    // Validate email format
    when email does not match email_pattern then
        respond 422 with '{"error": "Invalid email format"}'
    end when
    
    // Check if user exists
    set existing from db find User where email equals email
    when existing is not empty then
        respond 409 with '{"error": "User already exists"}'
    end when
    
    // Create user
    db create User with name is name, email is email
    respond 201 with created_user
end serve
```

## Framework Integration

When compiling with framework targets, API endpoints generate appropriate framework code:

### Rust + Axum

```rust
// Generated route handler
pub async fn get_user(
    State(pool): State<PgPool>,
    Path(id): Path<String>
) -> Result<Json<User>, StatusCode> {
    let user = sqlx::query_as!(User, "SELECT * FROM users WHERE id = $1", id)
        .fetch_optional(&pool)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
        
    match user {
        Some(user) => Ok(Json(user)),
        None => Err(StatusCode::NOT_FOUND),
    }
}

// Route registration
let app = Router::new()
    .route("/users/:id", get(get_user))
    .with_state(pool);
```

## Best Practices

### 1. Use Proper HTTP Status Codes

```roe
// Good: Appropriate status codes
serve post /users
    when validation_failed then
        respond 422 with validation_errors  // Unprocessable Entity
    end when
    
    when user_exists then
        respond 409 with conflict_message   // Conflict
    end when
    
    db create User from request.body
    respond 201 with created_user           // Created
end serve
```

### 2. Validate Input Data

```roe
// Good: Comprehensive validation
serve put /users/:id
    when request.body is empty then
        respond 400 with '{"error": "Request body required"}'
    end when
    
    when request.body.name is empty then
        respond 422 with '{"error": "Name is required"}'
    end when
    
    when request.body.email is invalid then
        respond 422 with '{"error": "Invalid email format"}'
    end when
    
    // Proceed with update
end serve
```

### 3. Handle Errors Gracefully

```roe
// Good: Consistent error handling
serve get /users/:id
    set user from db find User where id equals id
    
    when user is empty then
        respond 404 with '{"error": "User not found", "id": "[id]"}'
    end when
    
    when database_error then
        respond 500 with '{"error": "Internal server error"}'
    end when
    
    respond 200 with user
end serve
```

## Testing APIs

```roe
// Test API endpoints
action test_user_api
    display "Testing User API..."
    
    // Test create user
    call "http://localhost:8000/users" method POST 
    with '{"name": "Test User", "email": "test@example.com"}'
    using headers
        Content-Type: "application/json"
    end headers
    into create_response
    
    when create_response.status equals 201 then
        display "✅ User creation successful"
        set user_id from create_response.body.id
    otherwise
        display "❌ User creation failed"
    end when
    
    // Test get user
    call "http://localhost:8000/users/[user_id]" method GET into get_response
    when get_response.status equals 200 then
        display "✅ User retrieval successful"
    otherwise
        display "❌ User retrieval failed"
    end when
end action
```

## Next Steps

- **[Mobile Development](/guide/mobile/)** - Create mobile apps with API integration
- **[Framework Support](/guide/frameworks/)** - Framework-specific API generation
- **[Database DSL](/guide/database/)** - Database operations for APIs

API endpoints in Roelang provide a clean, declarative way to build REST APIs while generating efficient framework-specific server code.