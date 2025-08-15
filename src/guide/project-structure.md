---
layout: guide.njk
title: Project Structure
description: Understanding how Droe projects are organized and configured.
breadcrumbs:
  - title: Guide
    url: /guide/
  - title: Project Structure
prev:
  title: Quick Start
  url: /guide/quick-start/
next:
  title: Basic Syntax
  url: /guide/basics/
---

Droe projects follow a simple, predictable structure that promotes organization and maintainability. Understanding this structure is key to working effectively with Droe.

## Standard Project Layout

Every Droe project has this basic structure:

```
my-project/
├── droeconfig.json     # Project configuration
├── src/              # Source files (.droe)
│   ├── main.droe      # Entry point
│   ├── utils.droe     # Utility modules
│   └── ...           # Other source files
├── build/            # Compiled output (auto-generated)
│   ├── main.wat      # WebAssembly text format
│   ├── main.wasm     # WebAssembly binary
│   └── ...           # Other compiled files
└── README.md         # Project documentation (optional)
```

## Project Configuration

### `droeconfig.json`

The `droeconfig.json` file is the heart of every Droe project:

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "A sample Droe project",
  "srcDir": "src",
  "buildDir": "build",
  "main": "main.droe",
  "author": "Your Name",
  "license": "MIT"
}
```

#### Configuration Options

| Field         | Type   | Required | Description                               |
| ------------- | ------ | -------- | ----------------------------------------- |
| `name`        | string | ✅       | Project name (used for output files)      |
| `version`     | string | ✅       | Semantic version (e.g., "1.0.0")          |
| `description` | string | ❌       | Brief project description                 |
| `srcDir`      | string | ❌       | Source directory (default: "src")         |
| `buildDir`    | string | ❌       | Build output directory (default: "build") |
| `main`        | string | ❌       | Entry point file (default: "main.droe")   |
| `author`      | string | ❌       | Project author                            |
| `license`     | string | ❌       | License type                              |

## Source Directory (`src/`)

The source directory contains all your `.droe` files:

### Entry Point

Every project has a main entry point, typically `src/main.droe`:

```droe
// src/main.droe
display "Hello from my Droe project!"

// Import functionality from other modules
// (Module system coming in future versions)
```

### Module Organization

Organize related functionality into separate files:

```
src/
├── main.droe          # Entry point
├── calculator.droe    # Math operations
├── strings.droe       # String utilities
└── validation.droe    # Input validation
```

Example module structure:

::: code-group

```droe [src/calculator.droe]
module calculator
  action add with a which is int, b which is int gives int
    give a + b
  end action

  action multiply with a which is int, b which is int gives int
    give a * b
  end action
end module
```

```droe [src/main.droe]
// Use calculator module
set result from run calculator.add with 10, 5
display "10 + 5 = [result]"
```

:::

## Build Directory (`build/`)

The build directory is automatically created when you compile your project:

```
build/
├── main.wat          # WebAssembly text format
├── main.wasm         # WebAssembly binary
├── calculator.wat    # Module compilation
├── calculator.wasm   # Module binary
└── metadata.json     # Build information
```

### Generated Files

- **`.wat` files**: Human-readable WebAssembly text format
- **`.wasm` files**: Binary WebAssembly modules for execution
- **`metadata.json`**: Build timestamp and configuration info

::: warning
Never edit files in the `build/` directory manually. They are automatically generated and will be overwritten on the next compilation.
:::

## Project Initialization

### Create New Project

Use the CLI to create a new project:

```bash
# Create project directory
mkdir my-droelang-project
cd my-droelang-project

# Initialize project structure
droe init
```

This creates:

- `droeconfig.json` with default configuration
- `src/` directory with sample `main.droe`
- Empty `build/` directory

### Custom Initialization

Initialize with custom options:

```bash
droe init --name "awesome-project" --author "Your Name"
```

Or initialize in an existing directory:

```bash
droe init .
```

## Working with Projects

### Building Projects

Compile the entire project:

```bash
# Build all files
droe build

# Build specific file
droe compile src/calculator.droe

# Build and run main entry point
droe run
```

### Project Commands

```bash
# Show project information
droe info

# Clean build directory
droe clean

# Validate project structure
droe validate
```

## File Naming Conventions

### Source Files

- Use descriptive names: `user_management.droe`, `data_processing.droe`
- Use snake_case for multi-word names
- Group related functionality in single files
- Keep files focused and cohesive

### Examples

```
src/
├── main.droe              # Entry point
├── user_authentication.droe   # Auth logic
├── data_validation.droe       # Validation rules
├── report_generation.droe     # Report creation
└── email_notifications.droe   # Email handling
```

## Best Practices

### 1. Logical Organization

Group related functionality:

```
src/
├── main.droe
├── models/
│   ├── user.droe
│   └── product.droe
├── services/
│   ├── email.droe
│   └── payment.droe
└── utils/
    ├── validation.droe
    └── formatting.droe
```

### 2. Clear Entry Points

Make your `main.droe` file a clear starting point:

```droe
// src/main.droe
display "=== My Application ==="
display "Starting application..."

// Initialize core systems
// Process main logic
// Handle cleanup

display "Application completed successfully"
```

### 3. Module Boundaries

Keep modules focused on single responsibilities:

```droe
// Good: Focused module
module string_utils
  action capitalize with text which is text gives text
    // Implementation
  end action

  action trim with text which is text gives text
    // Implementation
  end action
end module

// Avoid: Mixed responsibilities
module mixed_utils
  action calculate_tax with amount which is decimal gives decimal
    // Tax calculation doesn't belong in string utils
  end action
end module
```

### 4. Configuration Management

Use `droeconfig.json` effectively:

```json
{
  "name": "inventory-system",
  "version": "2.1.0",
  "description": "Warehouse inventory management system",
  "srcDir": "src",
  "buildDir": "dist",
  "main": "inventory.droe",
  "author": "Development Team",
  "license": "MIT"
}
```

## Advanced Project Patterns

### Library Projects

For reusable modules:

```
droelang-math-lib/
├── droeconfig.json
├── src/
│   ├── trigonometry.droe
│   ├── statistics.droe
│   └── geometry.droe
└── examples/
    ├── basic_math.droe
    └── advanced_calculations.droe
```

### Application Projects

For standalone applications:

```
inventory-app/
├── droeconfig.json
├── src/
│   ├── main.droe
│   ├── inventory.droe
│   ├── reports.droe
│   └── config.droe
├── data/
│   └── sample_inventory.json
└── docs/
    └── user_guide.md
```

## Version Control

### `.gitignore` Template

```gitignore
# Droe build output
build/
dist/

# IDE files
.vscode/
.idea/

# OS files
.DS_Store
Thumbs.db

# Logs
*.log
```

### Repository Structure

```
my-droelang-project/
├── .gitignore
├── README.md
├── LICENSE
├── droeconfig.json
├── src/
└── docs/
```

## Troubleshooting

### Common Issues

#### Project Won't Build

Check these common issues:

1. **Missing `droeconfig.json`**:

   ```bash
   droe init  # Create configuration
   ```

2. **Invalid configuration**:

   ```bash
   droe validate  # Check project structure
   ```

3. **Source file errors**:
   ```bash
   droe compile src/main.droe  # Test individual files
   ```

#### Build Directory Issues

```bash
# Clean and rebuild
droe clean
droe build
```

#### Configuration Problems

Validate your `droeconfig.json`:

```bash
# Check configuration syntax
cat droeconfig.json | jq .

# Validate project
droe info
```

## Next Steps

Now that you understand project structure, explore these topics:

- **[Basic Syntax](/guide/basics/)** - Learn Droe's syntax fundamentals
- **[Type System](/guide/types/)** - Understanding data types
- **[Modules](/guide/modules/)** - Creating reusable modules
- **[CLI Reference](/guide/cli/)** - Complete command-line reference

Understanding project structure is the foundation for building maintainable Droe applications. Keep your projects organized, use meaningful names, and follow the conventions outlined here for the best development experience.
