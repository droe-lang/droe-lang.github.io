---
layout: guide.njk
title: Project Structure
description: Understanding how Roelang projects are organized and configured.
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

Roelang projects follow a simple, predictable structure that promotes organization and maintainability. Understanding this structure is key to working effectively with Roelang.

## Standard Project Layout

Every Roelang project has this basic structure:

```
my-project/
├── roeconfig.json     # Project configuration
├── src/              # Source files (.roe)
│   ├── main.roe      # Entry point
│   ├── utils.roe     # Utility modules
│   └── ...           # Other source files
├── build/            # Compiled output (auto-generated)
│   ├── main.wat      # WebAssembly text format
│   ├── main.wasm     # WebAssembly binary
│   └── ...           # Other compiled files
└── README.md         # Project documentation (optional)
```

## Project Configuration

### `roeconfig.json`

The `roeconfig.json` file is the heart of every Roelang project:

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "A sample Roelang project",
  "srcDir": "src",
  "buildDir": "build",
  "main": "main.roe",
  "author": "Your Name",
  "license": "MIT"
}
```

#### Configuration Options

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | ✅ | Project name (used for output files) |
| `version` | string | ✅ | Semantic version (e.g., "1.0.0") |
| `description` | string | ❌ | Brief project description |
| `srcDir` | string | ❌ | Source directory (default: "src") |
| `buildDir` | string | ❌ | Build output directory (default: "build") |
| `main` | string | ❌ | Entry point file (default: "main.roe") |
| `author` | string | ❌ | Project author |
| `license` | string | ❌ | License type |

## Source Directory (`src/`)

The source directory contains all your `.roe` files:

### Entry Point

Every project has a main entry point, typically `src/main.roe`:

```roe
// src/main.roe
display "Hello from my Roelang project!"

// Import functionality from other modules
// (Module system coming in future versions)
```

### Module Organization

Organize related functionality into separate files:

```
src/
├── main.roe          # Entry point
├── calculator.roe    # Math operations
├── strings.roe       # String utilities
└── validation.roe    # Input validation
```

Example module structure:

::: code-group
```roe [src/calculator.roe]
module calculator
  action add with a which is int, b which is int gives int
    give a + b
  end action
  
  action multiply with a which is int, b which is int gives int
    give a * b
  end action
end module
```

```roe [src/main.roe]
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
mkdir my-roelang-project
cd my-roelang-project

# Initialize project structure
roe init
```

This creates:
- `roeconfig.json` with default configuration
- `src/` directory with sample `main.roe`
- Empty `build/` directory

### Custom Initialization

Initialize with custom options:

```bash
roe init --name "awesome-project" --author "Your Name"
```

Or initialize in an existing directory:

```bash
roe init .
```

## Working with Projects

### Building Projects

Compile the entire project:

```bash
# Build all files
roe build

# Build specific file
roe compile src/calculator.roe

# Build and run main entry point
roe run
```

### Project Commands

```bash
# Show project information
roe info

# Clean build directory
roe clean

# Validate project structure
roe validate
```

## File Naming Conventions

### Source Files

- Use descriptive names: `user_management.roe`, `data_processing.roe`
- Use snake_case for multi-word names
- Group related functionality in single files
- Keep files focused and cohesive

### Examples

```
src/
├── main.roe              # Entry point
├── user_authentication.roe   # Auth logic
├── data_validation.roe       # Validation rules
├── report_generation.roe     # Report creation
└── email_notifications.roe   # Email handling
```

## Best Practices

### 1. Logical Organization

Group related functionality:

```
src/
├── main.roe
├── models/
│   ├── user.roe
│   └── product.roe
├── services/
│   ├── email.roe
│   └── payment.roe
└── utils/
    ├── validation.roe
    └── formatting.roe
```

### 2. Clear Entry Points

Make your `main.roe` file a clear starting point:

```roe
// src/main.roe
display "=== My Application ==="
display "Starting application..."

// Initialize core systems
// Process main logic
// Handle cleanup

display "Application completed successfully"
```

### 3. Module Boundaries

Keep modules focused on single responsibilities:

```roe
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

Use `roeconfig.json` effectively:

```json
{
  "name": "inventory-system",
  "version": "2.1.0",
  "description": "Warehouse inventory management system",
  "srcDir": "src",
  "buildDir": "dist",
  "main": "inventory.roe",
  "author": "Development Team",
  "license": "MIT"
}
```

## Advanced Project Patterns

### Library Projects

For reusable modules:

```
roelang-math-lib/
├── roeconfig.json
├── src/
│   ├── trigonometry.roe
│   ├── statistics.roe
│   └── geometry.roe
└── examples/
    ├── basic_math.roe
    └── advanced_calculations.roe
```

### Application Projects

For standalone applications:

```
inventory-app/
├── roeconfig.json
├── src/
│   ├── main.roe
│   ├── inventory.roe
│   ├── reports.roe
│   └── config.roe
├── data/
│   └── sample_inventory.json
└── docs/
    └── user_guide.md
```

## Version Control

### `.gitignore` Template

```gitignore
# Roelang build output
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
my-roelang-project/
├── .gitignore
├── README.md
├── LICENSE
├── roeconfig.json
├── src/
└── docs/
```

## Troubleshooting

### Common Issues

#### Project Won't Build

Check these common issues:

1. **Missing `roeconfig.json`**:
   ```bash
   roe init  # Create configuration
   ```

2. **Invalid configuration**:
   ```bash
   roe validate  # Check project structure
   ```

3. **Source file errors**:
   ```bash
   roe compile src/main.roe  # Test individual files
   ```

#### Build Directory Issues

```bash
# Clean and rebuild
roe clean
roe build
```

#### Configuration Problems

Validate your `roeconfig.json`:

```bash
# Check configuration syntax
cat roeconfig.json | jq .

# Validate project
roe info
```

## Next Steps

Now that you understand project structure, explore these topics:

- **[Basic Syntax](/guide/basics/)** - Learn Roelang's syntax fundamentals
- **[Type System](/guide/types/)** - Understanding data types
- **[Modules](/guide/modules/)** - Creating reusable modules
- **[CLI Reference](/guide/cli/)** - Complete command-line reference

Understanding project structure is the foundation for building maintainable Roelang applications. Keep your projects organized, use meaningful names, and follow the conventions outlined here for the best development experience.