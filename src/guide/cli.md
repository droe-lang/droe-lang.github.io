---
layout: guide.njk
title: CLI Reference
description: Complete reference for the Roe command-line interface and development tools.
breadcrumbs:
  - title: Guide
    url: /guide/
  - title: CLI Reference
prev:
  title: Task Actions
  url: /guide/task-actions/
next:
  title: WebAssembly
  url: /guide/webassembly/
---

The Roe CLI (`roe`) is the primary tool for developing, compiling, and running Roe programs. This reference covers all available commands and options.

## Installation and Setup

### Verify Installation

```bash
roe --version
```

### Get Help

```bash
roe --help
roe -h
```

## Core Commands

### `roe init` - Initialize Project

Create a new Roe project with the standard directory structure.

```bash
# Initialize in current directory
roe init

# Initialize with custom name
roe init --name "my-project"

# Initialize with author
roe init --author "Your Name"

# Initialize in specific directory
roe init my-project-directory
```

**Options:**
- `--name <name>` - Set project name
- `--author <author>` - Set project author
- `--description <desc>` - Set project description

**Output:**
Creates the following structure:
```
project/
├── roeconfig.json
├── src/
│   └── main.roe
└── build/
```

### `roe compile` - Compile Source Files

Compile `.roe` files to WebAssembly format.

```bash
# Compile specific file
roe compile src/main.roe

# Compile to specific output
roe compile src/main.roe --output build/main.wat

# Compile multiple files
roe compile src/*.roe

# Compile with verbose output
roe compile src/main.roe --verbose
```

**Options:**
- `--output <file>` - Specify output file location
- `--format <format>` - Output format (`wat`, `wasm`) [default: `wat`]
- `--verbose` - Show detailed compilation information
- `--watch` - Watch for file changes and recompile automatically

**Examples:**
```bash
# Basic compilation
roe compile examples/src/01_display.roe

# Compile to WebAssembly binary
roe compile src/main.roe --format wasm --output build/main.wasm

# Watch mode for development
roe compile src/main.roe --watch
```

### `roe run` - Compile and Execute

Compile and immediately execute a Roe program.

```bash
# Run specific file
roe run src/main.roe

# Run with arguments (future feature)
roe run src/main.roe --args "arg1 arg2"

# Run project main file
roe run
```

**Options:**
- `--debug` - Enable debug output
- `--trace` - Show execution trace
- `--timeout <seconds>` - Set execution timeout

**Examples:**
```bash
# Run a simple program
roe run examples/src/01_display.roe

# Run with debug information
roe run src/main.roe --debug

# Run main project file
roe run
```

### `roe build` - Build Entire Project

Build all source files in a project according to `roeconfig.json`.

```bash
# Build entire project
roe build

# Build with clean first
roe build --clean

# Build for production
roe build --release
```

**Options:**
- `--clean` - Clean build directory before building
- `--release` - Build optimized release version
- `--target <target>` - Specify build target platform
- `--verbose` - Show detailed build information

**Examples:**
```bash
# Standard build
roe build

# Clean build
roe build --clean

# Production build
roe build --release --clean
```

## Project Management Commands

### `roe clean` - Clean Build Artifacts

Remove generated build files and artifacts.

```bash
# Clean build directory
roe clean

# Clean with confirmation
roe clean --confirm

# Clean specific patterns
roe clean --pattern "*.wat"
```

**Options:**
- `--confirm` - Ask for confirmation before cleaning
- `--pattern <pattern>` - Clean files matching pattern
- `--dry-run` - Show what would be deleted without deleting

### `roe info` - Project Information

Display information about the current project.

```bash
# Show project info
roe info

# Show detailed info
roe info --detailed

# Show configuration
roe info --config
```

**Example output:**
```
Project: hello-roelang
Version: 1.0.0
Source Directory: src/
Build Directory: build/
Main File: main.roe
Files: 3 source files, 2 build artifacts
```

### `roe validate` - Validate Project

Check project structure and configuration for issues.

```bash
# Validate current project
roe validate

# Validate specific directory
roe validate /path/to/project

# Validate with fixes
roe validate --fix
```

**Options:**
- `--fix` - Automatically fix common issues
- `--strict` - Use strict validation rules
- `--report` - Generate validation report

## Development Commands

### `roe doctor` - System Diagnostics

Check system setup and dependencies.

```bash
# Run system diagnostics
roe doctor

# Check specific component
roe doctor --component compiler

# Verbose diagnostics
roe doctor --verbose
```

**Checks:**
- Roe installation
- Node.js availability
- WebAssembly tools (wat2wasm)
- Project configuration
- File permissions

### `roe test` - Run Tests

Execute test files and validate programs.

```bash
# Run all tests
roe test

# Run specific test file
roe test tests/test_variables.roe

# Run tests with coverage
roe test --coverage
```

**Options:**
- `--coverage` - Generate coverage report
- `--verbose` - Show detailed test output
- `--watch` - Watch for changes and re-run tests
- `--pattern <pattern>` - Run tests matching pattern

### `roe format` - Format Source Code

Format Roe source files according to style guidelines.

```bash
# Format all files
roe format

# Format specific file
roe format src/main.roe

# Check formatting without changes
roe format --check
```

**Options:**
- `--check` - Check formatting without making changes
- `--diff` - Show formatting differences
- `--write` - Write changes to files (default)

## Configuration Commands

### `roe config` - Manage Configuration

View and modify Roe configuration.

```bash
# Show all configuration
roe config list

# Get specific value
roe config get editor.tabSize

# Set configuration value
roe config set editor.tabSize 2

# Reset to defaults
roe config reset
```

**Common Configuration Options:**
- `editor.tabSize` - Tab size for formatting
- `compiler.target` - Default compilation target
- `runtime.timeout` - Default execution timeout
- `build.outputDir` - Default build directory

## Advanced Commands

### `roe analyze` - Code Analysis

Analyze code for potential issues and improvements.

```bash
# Analyze current project
roe analyze

# Analyze specific file
roe analyze src/main.roe

# Generate analysis report
roe analyze --report analysis_report.json
```

**Analysis Types:**
- Unused variables
- Type inconsistencies
- Performance suggestions
- Best practice violations

### `roe profile` - Performance Profiling

Profile program execution for performance analysis.

```bash
# Profile program execution
roe profile src/main.roe

# Profile with detailed output
roe profile src/main.roe --detailed

# Generate profiling report
roe profile src/main.roe --report profile.json
```

### `roe debug` - Debug Programs

Launch programs in debug mode with debugging support.

```bash
# Debug program
roe debug src/main.roe

# Debug with breakpoint
roe debug src/main.roe --break line:10

# Debug with step-through
roe debug src/main.roe --step
```

## Environment Commands

### `roe env` - Environment Information

Display environment and system information.

```bash
# Show environment info
roe env

# Show PATH information
roe env --path

# Show all environment variables
roe env --all
```

### `roe install` - Install Dependencies

Install and manage Roe dependencies.

```bash
# Install project dependencies
roe install

# Install specific package
roe install package-name

# Install development dependencies
roe install --dev
```

## Command-Line Options

### Global Options

Available for all commands:

- `--help, -h` - Show help information
- `--version, -v` - Show version information
- `--verbose` - Enable verbose output
- `--quiet, -q` - Suppress non-essential output
- `--no-color` - Disable colored output
- `--config <file>` - Use specific configuration file

### Output Formats

Many commands support different output formats:

```bash
# JSON output
roe info --format json

# YAML output
roe info --format yaml

# Table output (default)
roe info --format table
```

## Configuration File

### `roeconfig.json`

Project configuration file format:

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "My Roe project",
  "author": "Your Name",
  "license": "MIT",
  "srcDir": "src",
  "buildDir": "build",
  "main": "main.roe",
  "compiler": {
    "target": "wasm",
    "optimize": true,
    "debug": false
  },
  "runtime": {
    "timeout": 30,
    "maxMemory": "128MB"
  },
  "dependencies": {
    "roelang-std": "^1.0.0"
  },
  "scripts": {
    "start": "roe run",
    "build": "roe build --release",
    "test": "roe test",
    "clean": "roe clean"
  }
}
```

### Configuration Fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Project name |
| `version` | string | Project version (semver) |
| `description` | string | Project description |
| `author` | string | Project author |
| `license` | string | License type |
| `srcDir` | string | Source directory path |
| `buildDir` | string | Build output directory |
| `main` | string | Main entry file |
| `compiler` | object | Compiler configuration |
| `runtime` | object | Runtime configuration |
| `dependencies` | object | Project dependencies |
| `scripts` | object | Custom scripts |

## Exit Codes

The `roe` command uses standard exit codes:

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | General error |
| 2 | Compilation error |
| 3 | Runtime error |
| 4 | Configuration error |
| 5 | File not found |
| 6 | Permission denied |

## Examples

### Complete Development Workflow

```bash
# Create new project
mkdir my-roelang-app
cd my-roelang-app
roe init --name "my-roelang-app" --author "Your Name"

# Create source file
cat > src/main.roe << 'EOF'
display "Hello, Roe!"
set name which is text to "World"
display "Welcome to [name]!"
EOF

# Run the program
roe run src/main.roe

# Build the project
roe build

# Run tests (if any)
roe test

# Clean up
roe clean
```

### Compilation Pipeline

```bash
# Compile to WebAssembly text format
roe compile src/main.roe --output build/main.wat

# Compile to WebAssembly binary
roe compile src/main.roe --format wasm --output build/main.wasm

# Run compiled WebAssembly
node ~/.roelang/run.js build/main.wasm
```

### Development with Watch Mode

```bash
# Terminal 1: Watch and compile
roe compile src/main.roe --watch

# Terminal 2: Run tests continuously
roe test --watch

# Terminal 3: Format on save
roe format --watch
```

## Troubleshooting

### Common Issues

#### Command Not Found
```bash
# Check if roe is in PATH
which roe
echo $PATH

# Reinstall or add to PATH
export PATH="$HOME/.roelang:$PATH"
```

#### Compilation Errors
```bash
# Check syntax with verbose output
roe compile src/main.roe --verbose

# Validate project structure
roe validate

# Run system diagnostics
roe doctor
```

#### Runtime Errors
```bash
# Run with debug information
roe run src/main.roe --debug --trace

# Check for system requirements
roe doctor --component runtime
```

### Getting Help

```bash
# General help
roe --help

# Command-specific help
roe compile --help
roe run --help
roe build --help

# Show examples
roe --examples

# Show troubleshooting guide
roe doctor --help
```

## Next Steps

Now that you understand the Roe CLI:

- **[WebAssembly](/guide/webassembly/)** - Understanding compilation targets
- **[Debugging](/guide/debugging/)** - Troubleshooting and debugging techniques
- **[Project Structure](/guide/project-structure/)** - Organizing Roe projects
- **[Installation](/guide/installation/)** - Setting up your development environment

The Roe CLI provides powerful tools for developing, building, and managing Roe applications. Use these commands to streamline your development workflow and build robust applications.