---
layout: guide.njk
title: Installation
description: Install Droe on your system and set up your development environment.
breadcrumbs:
  - title: Guide
    url: /guide/
  - title: Installation
prev:
  title: Introduction
  url: /guide/
next:
  title: Quick Start
  url: /guide/quick-start/
---

## macOS Installation

### GUI Installer (Recommended)

The easiest way to install Droe on macOS is using our graphical installer:

1. **Download** the latest DMG from [GitHub Releases](https://github.com/droe-lang/droe/releases)
2. **Mount** the DMG file by double-clicking it
3. **Drag** the Droe Installer to your Applications folder
4. **Run** the installer and follow the prompts

The installer will:
- Install Droe tools to `~/.ddroelang/`
- Add Droe to your PATH
- Configure your shell (bash, zsh, fish)

### Command Line Installation

Alternatively, install via the command line:

```bash
curl -sSL https://droe.dev/install | sh
```

This script will download and install the latest version of Droe.

## Manual Installation

For more control over the installation process:

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v16 or later) - for running WebAssembly modules
- **wat2wasm** - for compiling WebAssembly text format
  ```bash
  # Install via wabt (WebAssembly Binary Toolkit)
  brew install wabt
  ```

### Install Droe

1. **Download** the latest release
2. **Extract** to your preferred location
3. **Add to PATH** by adding this to your shell profile:
   ```bash
   export PATH="$HOME/.ddroelang:$PATH"
   ```
4. **Reload** your shell or run `source ~/.bashrc` (or `~/.zshrc`)

## Verify Installation

Test your installation:

```bash
# Check Droe version
droe --version

# Create a test file
echo 'display "Hello, Droe!"' > test.droe

# Run the test
droe run test.droe
```

You should see:
```
Hello, Droe!
```

## Development Environment Setup

### IDE Support

While Droe works with any text editor, here are some recommendations:

#### Visual Studio Code
- **Syntax highlighting**: Install the Droe extension (coming soon)
- **File associations**: Add `.droe` files to your settings

#### Vim/Neovim
- **Syntax highlighting**: Available in our [GitHub repository](https://github.com/droe-lang/droe/tree/main/editor-support/vim)

#### Emacs
- **Major mode**: Available in our [GitHub repository](https://github.com/droe-lang/droe/tree/main/editor-support/emacs)

### Shell Completion

Enable tab completion for the `droe` command:

::: code-group
```bash [Bash]
# Add to ~/.bashrc
eval "$(droe completion bash)"
```

```zsh [Zsh]
# Add to ~/.zshrc
eval "$(droe completion zsh)"
```

```fish [Fish]
# Add to ~/.config/fish/config.fish
droe completion fish | source
```
:::

## Project Structure

Droe projects follow a simple structure:

```
my-project/
├── droeconfig.json     # Project configuration
├── src/              # Source files (.droe)
│   ├── main.droe
│   └── utils.droe
└── build/            # Compiled output
    ├── main.wat      # WebAssembly text
    ├── main.wasm     # WebAssembly binary
    └── ...
```

Initialize a new project:

```bash
mkdir my-project
cd my-project
droe init
```

This creates the basic structure and `droeconfig.json`:

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "srcDir": "src",
  "buildDir": "build",
  "main": "main.droe"
}
```

## Troubleshooting

### Common Issues

#### `droe: command not found`
- **Solution**: Ensure `~/.ddroelang` is in your PATH
- **Check**: Run `echo $PATH` and verify the directory is listed
- **Fix**: Add `export PATH="$HOME/.ddroelang:$PATH"` to your shell profile

#### `wat2wasm: command not found`
- **Solution**: Install the WebAssembly Binary Toolkit
- **macOS**: `brew install wabt`
- **Linux**: Check your package manager for `wabt` or `webassembly-binary-toolkit`

#### `node: command not found`
- **Solution**: Install Node.js from [nodejs.org](https://nodejs.org/)
- **Version**: Droe requires Node.js v16 or later

#### Permission denied errors
- **Solution**: The installer might need to modify shell configuration files
- **Fix**: Run `chmod +x ~/.ddroelang/droe` to ensure the executable has correct permissions

### Getting Help

Still having issues? Here's how to get help:

1. **Check logs**: Installation logs are saved to `~/.ddroelang/install.log`
2. **GitHub Issues**: Search existing issues or create a new one
3. **Discussions**: Ask questions in our GitHub Discussions
4. **Debug info**: Run `droe doctor` for system diagnostic information

## Next Steps

Now that Droe is installed, let's create your first project:

👉 **[Quick Start Guide](/guide/quick-start/)** - Build your first Droe program

Or explore other topics:
- [Project Structure](/guide/project-structure/) - Understanding Droe projects
- [Basic Syntax](/guide/basics/) - Learn the language fundamentals
- [CLI Reference](/guide/cli/) - Complete command-line reference