---
layout: guide.njk
title: Framework Support
description: Understand how Ddroelang generates code for different target frameworks and platforms.
breadcrumbs:
  - title: Guide
    url: /guide/
  - title: Framework Support
prev:
  title: UI Components
  url: /guide/ui-components/
next:
  title: Implementation Status
  url: /guide/implementation-status/
---

Ddroelang provides framework adapters that automatically generate idiomatic code for popular web, mobile, and backend frameworks from your Ddroelang source code.

## Compilation Targets Overview

| Target | Framework | Generated Output | Status |
|--------|-----------|------------------|---------|
| `droe` | DroeVM Bytecode | `.droebc` files for native runtime | ✅ **Default & Recommended** |
| `rust` | Axum | Complete Rust web server project | 🧪 **Implemented** - Testing Pending |
| `wasm` | WebAssembly | `.wasm` binary for cross-platform execution | ✅ **Stable** |
| `java` | Spring Boot | Full Java web application | 🧪 **Implemented** - Testing Pending |
| `python` | FastAPI | Python async web API | 🧪 **Implemented** - Testing Pending |
| `go` | Fiber | Go web server | 🧪 **Implemented** - Testing Pending |
| `javascript` | Node.js/Fastify | JavaScript web server | 🧪 **Implemented** - Testing Pending |
| `html` | Static Web | HTML/CSS/JavaScript | 🧪 **Implemented** - Testing Pending |
| `android` | Native Android | Kotlin Android project | 🧪 **Implemented** - Testing Pending |
| `ios` | Native iOS | Swift iOS project | 🧪 **Implemented** - Testing Pending |

## Primary Target: DroeVM Bytecode

### Configuration

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

### Generated Output

Ddroelang code compiles to JSON bytecode that runs on the DroeVM runtime:

**Input (`api.droe`):**
```droe
@target droe

module UserAPI

data User
    id is text key auto
    name is text required
    email is text required unique
    created_at is datetime auto
end data

serve get /users
    db find all User
end serve

serve post /users
    db create User from request.body
end serve

end module
```

**Output (`api.droebc`):**
```json
{
    "version": 1,
    "instructions": [
        {
            "DefineData": {
                "name": "User",
                "fields": [
                    {"name": "id", "type": "text", "annotations": ["key", "auto"]},
                    {"name": "name", "type": "text", "annotations": ["required"]},
                    {"name": "email", "type": "text", "annotations": ["required", "unique"]},
                    {"name": "created_at", "type": "datetime", "annotations": ["auto"]}
                ]
            }
        },
        {
            "DefineEndpoint": {
                "method": "GET",
                "path": "/users",
                "handler_start": 2
            }
        },
        {
            "DatabaseOp": {
                "op": "find_all",
                "entity": "User",
                "conditions": [],
                "fields": []
            }
        },
        "EndHandler",
        {
            "DefineEndpoint": {
                "method": "POST", 
                "path": "/users",
                "handler_start": 5
            }
        },
        {
            "DatabaseOp": {
                "op": "create",
                "entity": "User",
                "source": "request.body"
            }
        },
        "EndHandler"
    ]
}
```

### Runtime Execution

The DroeVM runtime interprets bytecode and provides:
- Embedded HTTP server (Axum-based)
- Database connectivity (PostgreSQL, MySQL, SQLite, Oracle, MongoDB)
- Request/response handling
- Single binary deployment

## Secondary Target: Rust + Axum

### Configuration

```json
{
    "target": "rust", 
    "framework": "axum",
    "package": "my-api",
    "database": {
        "type": "postgres",
        "url": "postgresql://localhost/mydb"
    }
}
```

### Generated Rust Project

**Project Structure:**
```
my-api/
├── Cargo.toml
├── src/
│   ├── main.rs
│   ├── models.rs
│   ├── handlers.rs
│   ├── db.rs
│   └── lib.rs
```

**Generated `Cargo.toml`:**
```toml
[package]
name = "my-api"
version = "0.1.0"
edition = "2021"

[dependencies]
axum = { version = "0.7", features = ["macros"] }
tokio = { version = "1.0", features = ["full"] }
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
sqlx = { version = "0.7", features = ["runtime-tokio-rustls", "postgres", "chrono", "uuid"] }
chrono = { version = "0.4", features = ["serde"] }
uuid = { version = "1.0", features = ["v4", "serde"] }
```

**Generated `main.rs`:**
```rust
use axum::{
    routing::{get, post},
    Router,
    Extension,
};
use sqlx::{PgPool, postgres::PgPoolOptions};
use std::env;

mod models;
mod handlers;
mod db;

use handlers::*;

#[tokio::main]
async fn main() {
    let database_url = env::var("DATABASE_URL")
        .unwrap_or_else(|_| "postgresql://localhost/mydb".to_string());
    
    let pool = PgPoolOptions::new()
        .max_connections(10)
        .connect(&database_url)
        .await
        .expect("Failed to connect to database");
    
    // Run migrations
    sqlx::migrate!("./migrations")
        .run(&pool)
        .await
        .expect("Failed to run migrations");
    
    let app = Router::new()
        .route("/users", get(get_users).post(create_user))
        .layer(Extension(pool));
    
    let listener = tokio::net::TcpListener::bind("0.0.0.0:8000")
        .await
        .unwrap();
        
    println!("Server running on http://0.0.0.0:8000");
    axum::serve(listener, app).await.unwrap();
}
```

**Generated `models.rs`:**
```rust
use serde::{Deserialize, Serialize};
use chrono::{DateTime, Utc};

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct User {
    pub id: String,
    pub name: String, 
    pub email: String,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize)]
pub struct CreateUserRequest {
    pub name: String,
    pub email: String,
}
```

**Generated `handlers.rs`:**
```rust
use axum::{
    extract::{Extension, Json},
    http::StatusCode,
    response::Json as ResponseJson,
};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::{User, CreateUserRequest};

pub async fn get_users(
    Extension(pool): Extension<PgPool>,
) -> Result<ResponseJson<Vec<User>>, StatusCode> {
    let users = sqlx::query_as!(
        User,
        "SELECT id, name, email, created_at FROM users ORDER BY created_at DESC"
    )
    .fetch_all(&pool)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
    
    Ok(ResponseJson(users))
}

pub async fn create_user(
    Extension(pool): Extension<PgPool>,
    Json(request): Json<CreateUserRequest>,
) -> Result<ResponseJson<User>, StatusCode> {
    let user_id = Uuid::new_v4().to_string();
    
    let user = sqlx::query_as!(
        User,
        "INSERT INTO users (id, name, email) VALUES ($1, $2, $3) RETURNING *",
        user_id,
        request.name,
        request.email
    )
    .fetch_one(&pool)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
    
    Ok(ResponseJson(user))
}
```

### Database Support Architecture

The framework adapter generates modular database support:

**PostgreSQL Configuration:**
```toml
[dependencies]
sqlx = { version = "0.7", features = ["postgres", "chrono", "uuid"] }
```

**MySQL Configuration:**  
```toml
[dependencies]
sqlx = { version = "0.7", features = ["mysql", "chrono", "uuid"] }
```

**SQLite Configuration:**
```toml
[dependencies] 
sqlx = { version = "0.7", features = ["sqlite", "chrono", "uuid"] }
```

## WebAssembly Target

### Configuration

```json
{
    "target": "wasm",
    "runtime": "browser"
}
```

### Generated Output

**Compilation Pipeline:**
```
.droe → compiler → .wat → wat2wasm → .wasm
```

**Example `.wat` output:**
```wat
(module
  (import "env" "display" (func $display (param i32 i32)))
  (memory (export "memory") 1)
  (data (i32.const 0) "Hello from Ddroelang!")
  
  (func $main (export "main")
    i32.const 0    ; string offset
    i32.const 19   ; string length
    call $display
  )
)
```

**Runtime Integration:**
```javascript
// Node.js runtime
const fs = require('fs');

async function runDdroelang(wasmFile) {
    const wasmBuffer = fs.readFileSync(wasmFile);
    
    const imports = {
        env: {
            display: (offset, length) => {
                const memory = wasmInstance.exports.memory;
                const buffer = new Uint8Array(memory.buffer, offset, length);
                const text = new TextDecoder().decode(buffer);
                console.log(text);
            }
        }
    };
    
    const wasmModule = await WebAssembly.instantiate(wasmBuffer, imports);
    const wasmInstance = wasmModule.instance;
    
    wasmInstance.exports.main();
}
```

## Additional Framework Support

### Spring Boot (Java) - Implemented, Testing Pending

**Configuration:**
```json
{
    "target": "java",
    "framework": "spring",
    "package": "com.example.api",
    "database": {
        "type": "postgres"
    }
}
```

**Generated Output:**
```java
// Generated Application.java
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

// Generated User.java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue
    private String id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    // getters, setters...
}

// Generated UserController.java
@RestController
@RequestMapping("/users")
public class UserController {
    
    @Autowired
    private UserRepository userRepository;
    
    @GetMapping
    public List<User> getUsers() {
        return userRepository.findAll();
    }
    
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }
}
```

### FastAPI (Python) - Implemented, Testing Pending

**Configuration:**
```json
{
    "target": "python",
    "framework": "fastapi", 
    "package": "my_api",
    "database": {
        "type": "postgres"
    }
}
```

**Generated Output:**
```python
# Generated main.py
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from . import models, database

app = FastAPI(title="My API")

@app.get("/users")
async def get_users(db: Session = Depends(database.get_db)):
    return db.query(models.User).all()

@app.post("/users")
async def create_user(user: models.UserCreate, db: Session = Depends(database.get_db)):
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Generated models.py
from sqlalchemy import Column, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel
import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
```

### Mobile Targets - Implemented, Testing Pending

#### Android (Kotlin)

**Configuration:**
```json
{
    "targets": ["android"],
    "package": "com.example.myapp",
    "mobile": {
        "android": {
            "min_sdk": 21,
            "target_sdk": 34
        }
    }
}
```

**Generated Output:**
```kotlin
// Generated MainActivity.kt
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        setContent {
            MyAppTheme {
                MainScreen()
            }
        }
    }
}

// Generated UI components
@Composable
fun MainScreen() {
    Column(
        modifier = Modifier.fillMaxSize().padding(16.dp)
    ) {
        Text(
            text = "Welcome to My App",
            style = MaterialTheme.typography.h4
        )
        
        Button(
            onClick = { /* handle click */ }
        ) {
            Text("Get Started")
        }
    }
}
```

#### iOS (Swift)

**Configuration:**
```json
{
    "targets": ["ios"],
    "package": "com.example.myapp",
    "mobile": {
        "ios": {
            "min_version": "13.0"
        }
    }
}
```

**Generated Output:**
```swift
// Generated ContentView.swift
struct ContentView: View {
    var body: some View {
        VStack(spacing: 20) {
            Text("Welcome to My App")
                .font(.largeTitle)
                .padding()
            
            Button("Get Started") {
                // Handle button action
            }
            .buttonStyle(.borderedProminent)
        }
        .padding()
    }
}

// Generated App.swift
@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

## Framework Selection

### Target Configuration

Choose compilation target in `droeconfig.json`:

```json
{
    "target": "droe",           // Primary: DroeVM bytecode  
    "framework": "axum",       // HTTP framework
    "database": {
        "type": "postgres"     // Database driver
    }
}
```

### Multi-Target Builds

**Note:** Multi-target builds are implemented but require thorough testing. Choose one target per project for production use:

```json
{
    "target": "droe",
    "framework": "axum"
}
```

For mobile development:
```json
{
    "target": "mobile",
    "mobile": {
        "platforms": ["android", "ios"]
    }
}
```

### Command Line Targeting

```bash
# Compile to primary target
droe compile src/api.droe

# Override target
droe compile src/api.droe --target rust

# Specify framework
droe compile src/api.droe --target rust --framework axum

# Multi-target build (not implemented)
# droe build --all-targets
```

## Database Framework Integration

### Supported Database Types

| Database | DroeVM | Rust | Java | Python | Status |
|----------|-------|------|------|---------|---------|
| PostgreSQL | ✅ | ✅ | 🧪 | 🧪 | Primary |
| MySQL | ✅ | ✅ | 🧪 | 🧪 | Supported |
| SQLite | ✅ | ✅ | 🧪 | 🧪 | Supported |
| Oracle | ✅ | ✅ | 🧪 | ❌ | Enterprise |
| MongoDB | ✅ | ✅ | 🧪 | 🧪 | NoSQL |

### Framework-Specific Database Code

**Rust + SQLx:**
```rust
// Generated for PostgreSQL
use sqlx::{PgPool, postgres::PgPoolOptions};

let pool = PgPoolOptions::new()
    .connect("postgresql://localhost/mydb")
    .await?;

// Generated queries
let users = sqlx::query_as!(User, "SELECT * FROM users")
    .fetch_all(&pool)
    .await?;
```

**Spring Boot + JPA (Planned):**
```java
// Generated repository
@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmail(String email);
}

// Generated service
@Service
public class UserService {
    @Autowired 
    private UserRepository userRepository;
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
```

## Build System Integration

### Development Commands

```bash
# Initialize project with target
droe init my-project --target rust --framework axum

# Compile to target
droe compile src/main.droe --target rust

# Run development server
droe dev                    # Hot reload for development

# Build production
droe build --release        # Optimized production build
```

### Framework-Specific Commands

```bash
# Rust target commands
droe compile --target rust  # Generate Rust project
cd build/rust && cargo run # Run Rust server

# DroeVM target commands  
droe compile --target droe   # Generate bytecode
droe run build/main.droebc   # Run with DroeVM

# WebAssembly target commands
droe compile --target wasm  # Generate WASM
node ~/.ddroelang/run.js build/main.wasm  # Run WASM
```

## Best Practices

### 1. Choose Appropriate Targets

```json
// For APIs and web servers
{
    "target": "droe",           // Fast deployment
    "framework": "axum"
}

// For existing Rust ecosystems
{
    "target": "rust",          // Full Rust project
    "framework": "axum"  
}

// For cross-platform execution
{
    "target": "wasm"           // Maximum portability
}
```

### 2. Database Configuration

```json
// Production configuration
{
    "database": {
        "type": "postgres",
        "url": "${DATABASE_URL}",    // Environment variable
        "pool_size": 10,
        "timeout": 30
    }
}

// Development configuration
{
    "database": {
        "type": "sqlite",
        "url": "sqlite:///dev.db"   // Local development
    }
}
```

### 3. Framework Features

```droe
// Use framework-appropriate patterns
serve get /users/:id
    // Framework generates appropriate routing
    set user from db find User where id equals id
    
    when user is empty then
        respond 404 with "User not found"
    end when
    
    respond 200 with user
end serve
```

## Next Steps

- **[Implementation Status](/guide/implementation-status/)** - Current feature availability
- **[Deployment](/guide/deployment/)** - Deploy framework applications
- **[Database DSL](/guide/database/)** - Database integration details

Framework support in Ddroelang provides flexible compilation options while maintaining consistent source code across different target platforms and frameworks.