---
layout: guide.njk
title: CLI Reference
description: Complete reference for the Droe command-line interface and development tools.
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

The Droe CLI (`droe`) is the primary tool for developing, compiling, and running Droe programs. This reference covers all available commands and options.

## Installation and Setup

### Verify Installation

```bash
droe --version
```

### Get Help

```bash
droe --help
droe -h
```

## Core Commands

### `droe init` - Initialize Project

Create a new Droe project with the standard directory structure.

```bash
# Initialize in current directory
droe init

# Initialize with custom name
droe init --name "my-project"

# Initialize with author
droe init --author "Your Name"

# Initialize in specific directory
droe init my-project-directory
```

**Options:**

- `--name <name>` - Set project name
- `--author <author>` - Set project author
- `--description <desc>` - Set project description

**Output:**
Creates the following structure:

```
project/
├── droeconfig.json
├── src/
│   └── main.droe
└── build/
```

### `droe compile` - Compile Source Files

Compile `.droe` files to WebAssembly format.

```bash
# Compile specific file
droe compile src/main.droe

# Compile to specific output
droe compile src/main.droe --output build/main.wat

# Compile multiple files
droe compile src/*.droe

# Compile with verbose output
droe compile src/main.droe --verbose
```

**Options:**

- `--output <file>` - Specify output file location
- `--format <format>` - Output format (`wat`, `wasm`) [default: `wat`]
- `--verbose` - Show detailed compilation information
- `--watch` - Watch for file changes and recompile automatically

**Examples:**

```bash
# Basic compilation
droe compile examples/src/01_display.droe

# Compile to WebAssembly binary
droe compile src/main.droe --format wasm --output build/main.wasm

# Watch mode for development
droe compile src/main.droe --watch
```

### `droe run` - Compile and Execute

Compile and immediately execute a Droe program.

```bash
# Run specific file
droe run src/main.droe

# Run with arguments (future feature)
droe run src/main.droe --args "arg1 arg2"

# Run project main file
droe run
```

**Options:**

- `--debug` - Enable debug output
- `--trace` - Show execution trace
- `--timeout <seconds>` - Set execution timeout

**Examples:**

```bash
# Run a simple program
droe run examples/src/01_display.droe

# Run with debug information
droe run src/main.droe --debug

# Run main project file
droe run
```

### `droe build` - Build Entire Project

Build all source files in a project according to `droeconfig.json`.

```bash
# Build entire project
droe build

# Build with clean first
droe build --clean

# Build for production
droe build --release
```

**Options:**

- `--clean` - Clean build directory before building
- `--release` - Build optimized release version
- `--target <target>` - Specify build target platform
- `--verbose` - Show detailed build information

**Examples:**

```bash
# Standard build
droe build

# Clean build
droe build --clean

# Production build
droe build --release --clean
```

## Project Management Commands

### `droe clean` - Clean Build Artifacts

Remove generated build files and artifacts.

```bash
# Clean build directory
droe clean

# Clean with confirmation
droe clean --confirm

# Clean specific patterns
droe clean --pattern "*.wat"
```

**Options:**

- `--confirm` - Ask for confirmation before cleaning
- `--pattern <pattern>` - Clean files matching pattern
- `--dry-run` - Show what would be deleted without deleting

### `droe info` - Project Information

Display information about the current project.

```bash
# Show project info
droe info

# Show detailed info
droe info --detailed

# Show configuration
droe info --config
```

**Example output:**

```
Project: hello-droelang
Version: 1.0.0
Source Directory: src/
Build Directory: build/
Main File: main.droe
Files: 3 source files, 2 build artifacts
```

### `droe validate` - Validate Project

Check project structure and configuration for issues.

```bash
# Validate current project
droe validate

# Validate specific directory
droe validate /path/to/project

# Validate with fixes
droe validate --fix
```

**Options:**

- `--fix` - Automatically fix common issues
- `--strict` - Use strict validation rules
- `--report` - Generate validation report

## Development Commands

### `droe doctor` - System Diagnostics

Check system setup and dependencies.

```bash
# Run system diagnostics
droe doctor

# Check specific component
droe doctor --component compiler

# Verbose diagnostics
droe doctor --verbose
```

**Checks:**

- Droe installation
- Node.js availability
- WebAssembly tools (wat2wasm)
- Project configuration
- File permissions

### `droe test` - Run Tests

Execute test files and validate programs.

```bash
# Run all tests
droe test

# Run specific test file
droe test tests/test_variables.droe

# Run tests with coverage
droe test --coverage
```

**Options:**

- `--coverage` - Generate coverage report
- `--verbose` - Show detailed test output
- `--watch` - Watch for changes and re-run tests
- `--pattern <pattern>` - Run tests matching pattern

### `droe format` - Format Source Code

Format Droe source files according to style guidelines.

```bash
# Format all files
droe format

# Format specific file
droe format src/main.droe

# Check formatting without changes
droe format --check
```

**Options:**

- `--check` - Check formatting without making changes
- `--diff` - Show formatting differences
- `--write` - Write changes to files (default)

## Configuration Commands

### `droe config` - Manage Configuration

View and modify Droe configuration.

```bash
# Show all configuration
droe config list

# Get specific value
droe config get editor.tabSize

# Set configuration value
droe config set editor.tabSize 2

# Reset to defaults
droe config reset
```

**Common Configuration Options:**

- `editor.tabSize` - Tab size for formatting
- `compiler.target` - Default compilation target
- `runtime.timeout` - Default execution timeout
- `build.outputDir` - Default build directory

## Advanced Commands

### `droe analyze` - Code Analysis

Analyze code for potential issues and improvements.

```bash
# Analyze current project
droe analyze

# Analyze specific file
droe analyze src/main.droe

# Generate analysis report
droe analyze --report analysis_report.json
```

**Analysis Types:**

- Unused variables
- Type inconsistencies
- Performance suggestions
- Best practice violations

### `droe profile` - Performance Profiling

Profile program execution for performance analysis.

```bash
# Profile program execution
droe profile src/main.droe

# Profile with detailed output
droe profile src/main.droe --detailed

# Generate profiling report
droe profile src/main.droe --report profile.json
```

### `droe debug` - Debug Programs

Launch programs in debug mode with debugging support.

```bash
# Debug program
droe debug src/main.droe

# Debug with breakpoint
droe debug src/main.droe --break line:10

# Debug with step-through
droe debug src/main.droe --step
```

## Environment Commands

### `droe env` - Environment Information

Display environment and system information.

```bash
# Show environment info
droe env

# Show PATH information
droe env --path

# Show all environment variables
droe env --all
```

### `droe install` - Install Dependencies

Install and manage Droe dependencies.

```bash
# Install project dependencies
droe install

# Install specific package
droe install package-name

# Install development dependencies
droe install --dev
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
droe info --format json

# YAML output
droe info --format yaml

# Table output (default)
droe info --format table
```

## Configuration File

### `droeconfig.json`

Project configuration file format:

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "My Droe project",
  "author": "Your Name",
  "license": "MIT",
  "srcDir": "src",
  "buildDir": "build",
  "main": "main.droe",
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
    "droelang-std": "^1.0.0"
  },
  "scripts": {
    "start": "droe run",
    "build": "droe build --release",
    "test": "droe test",
    "clean": "droe clean"
  }
}
```

### Configuration Fields

| Field          | Type   | Description              |
| -------------- | ------ | ------------------------ |
| `name`         | string | Project name             |
| `version`      | string | Project version (semver) |
| `description`  | string | Project description      |
| `author`       | string | Project author           |
| `license`      | string | License type             |
| `srcDir`       | string | Source directory path    |
| `buildDir`     | string | Build output directory   |
| `main`         | string | Main entry file          |
| `compiler`     | object | Compiler configuration   |
| `runtime`      | object | Runtime configuration    |
| `dependencies` | object | Project dependencies     |
| `scripts`      | object | Custom scripts           |

## Exit Codes

The `droe` command uses standard exit codes:

| Code | Meaning             |
| ---- | ------------------- |
| 0    | Success             |
| 1    | General error       |
| 2    | Compilation error   |
| 3    | Runtime error       |
| 4    | Configuration error |
| 5    | File not found      |
| 6    | Permission denied   |

## Examples

### Complete Development Workflow

```bash
# Create new project
mkdir my-droelang-app
cd my-droelang-app
droe init --name "my-droelang-app" --author "Your Name"

# Create source file
cat > src/main.droe << 'EOF'
display "Hello, Droe!"
set name which is text to "World"
display "Welcome to [name]!"
EOF

# Run the program
droe run src/main.droe

# Build the project
droe build

# Run tests (if any)
droe test

# Clean up
droe clean
```

### Compilation Pipeline

```bash
# Compile to WebAssembly text format
droe compile src/main.droe --output build/main.wat

# Compile to WebAssembly binary
droe compile src/main.droe --format wasm --output build/main.wasm

# Run compiled WebAssembly
node ~/.droelang/run.js build/main.wasm
```

### Development with Watch Mode

```bash
# Terminal 1: Watch and compile
droe compile src/main.droe --watch

# Terminal 2: Run tests continuously
droe test --watch

# Terminal 3: Format on save
droe format --watch
```

## Troubleshooting

### Common Issues

#### Command Not Found

```bash
# Check if droe is in PATH
which droe
echo $PATH

# Reinstall or add to PATH
export PATH="$HOME/.droelang:$PATH"
```

#### Compilation Errors

```bash
# Check syntax with verbose output
droe compile src/main.droe --verbose

# Validate project structure
droe validate

# Run system diagnostics
droe doctor
```

#### Runtime Errors

```bash
# Run with debug information
droe run src/main.droe --debug --trace

# Check for system requirements
droe doctor --component runtime
```

### Getting Help

```bash
# General help
droe --help

# Command-specific help
droe compile --help
droe run --help
droe build --help

# Show examples
droe --examples

# Show troubleshooting guide
droe doctor --help
```

## Next Steps

Now that you understand the Droe CLI:

- **[WebAssembly](/guide/webassembly/)** - Understanding compilation targets
- **[Debugging](/guide/debugging/)** - Troubleshooting and debugging techniques
- **[Project Structure](/guide/project-structure/)** - Organizing Droe projects
- **[Installation](/guide/installation/)** - Setting up your development environment

The Droe CLI provides powerful tools for developing, building, and managing Droe applications. Use these commands to streamline your development workflow and build robust applications.
