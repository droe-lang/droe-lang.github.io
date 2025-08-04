---
layout: guide.njk
title: Introduction to Roelang
description: Learn the fundamentals of Roelang, a minimal declarative language that compiles to WebAssembly.
breadcrumbs:
  - title: Guide
next:
  title: Installation
  url: /guide/installation/
---

Roelang is a **minimal declarative language** designed for writing executable processes as `.roe` files that compile to WebAssembly. It combines the simplicity of configuration languages with the power of modern programming constructs.

## What is Roelang?

Roelang fills the gap between simple configuration files and full programming languages. It's designed for:

- **Automation scripts** that need to be readable and maintainable
- **Process definitions** that can be version-controlled and reviewed
- **Cross-platform execution** with WebAssembly's portability
- **Git-friendly workflows** with clean, mergeable source files

## Key Features

### 🚀 WebAssembly Performance
Roelang compiles to WebAssembly for near-native performance across all platforms. No runtime overhead, just pure speed.

### 🔒 Strong Type System
Static typing with `int`, `text`, `flag`, `decimal`, and collections. Catch errors at compile time, not runtime.

### 🧩 Modular Design
Organize code with modules and parameterized actions. Build reusable components with clean interfaces.

### ✨ Modern Syntax
String interpolation, concatenation, and expressive syntax that reads like natural language.

### 📝 Git Friendly
Clean, readable `.roe` files work beautifully with version control. Merge conflicts are rare and easy to resolve.

### ⚡ Minimal Runtime
Tiny WebAssembly runtime with no dependencies. Perfect for automation, scripting, and embedded systems.

## Your First Roelang Program

Here's a simple "Hello World" program that demonstrates basic Roelang syntax:

::: code-group
```roe [hello.roe]
// Welcome to Roelang! 🦌
display "Hello, World!"

// Variables with strong typing
set name which is text to "Alice"
set age which is int to 25

// String interpolation
display "Welcome [name], you are [age] years old!"

// String concatenation
set greeting to "Hello, " + name + "!"
display greeting
```

```bash [Output]
$ roe run hello.roe

Hello, World!
Welcome Alice, you are 25 years old!
Hello, Alice!
```
:::

## Language Philosophy

Roelang follows several key principles:

### Declarative First
Code should describe *what* you want to happen, not *how* to make it happen. This makes programs easier to read, understand, and maintain.

### Type Safety
Strong static typing catches errors early and makes code more reliable. Types are explicit and readable.

### Natural Language Syntax
Code should read like structured English. Instead of cryptic symbols, use clear keywords like `which is`, `from run`, and `for each`.

### Module System
Organize functionality into modules with clear interfaces. Actions can be parameterized and return typed values.

## What's Next?

Ready to get started? The next sections will guide you through:

1. **[Installation](/guide/installation/)** - Set up Roelang on your system
2. **[Quick Start](/guide/quick-start/)** - Create your first project
3. **[Basic Syntax](/guide/basics/)** - Learn the fundamentals
4. **[Type System](/guide/types/)** - Understanding Roelang's types

Or jump directly to specific topics:
- [Variables and Assignment](/guide/variables/)
- [String Interpolation](/guide/strings/)
- [Collections and Arrays](/guide/collections/)
- [Modules and Actions](/guide/modules/)

## Getting Help

- 📖 **Documentation**: You're reading it! Browse the guide sections in the sidebar
- 🐛 **Issues**: Report bugs on [GitHub Issues](https://github.com/roe-lang/roe/issues)
- 💬 **Discussions**: Ask questions on [GitHub Discussions](https://github.com/roe-lang/roe/discussions)
- 📧 **Contact**: Reach out to the maintainers for support

Let's build something amazing with Roelang! 🦌