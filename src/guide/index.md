---
layout: guide.njk
title: Introduction to Droe
description: Learn the fundamentals of Droe, a minimal declarative language that compiles to WebAssembly.
breadcrumbs:
  - title: Guide
next:
  title: Installation
  url: /guide/installation/
---

Droe is a **minimal declarative language** designed for writing executable processes as `.droe` files. By default, Droe compiles to **DroeVM bytecode** for high-performance native execution, while also supporting compilation to multiple target languages and platforms including WebAssembly, Rust, Java, Python, Go, Node.js and mobile frameworks.

## What is Droe?

Droe fills the gap between simple configuration files and full programming languages. It's designed for:

- **High-performance execution** with DroeVM's native bytecode runtime as the default choice
- **Multi-language compilation** to native code for Rust, Java, Python, Go, Node.js and JavaScript ecosystems
- **Cross-platform deployment** supporting web, mobile (Android/iOS), and backend frameworks
- **Automation scripts** that need to be readable and maintainable
- **Process definitions** that can be version-controlled and reviewed
- **Git-friendly workflows** with clean, mergeable source files

## Key Features

### 🚀 High-Performance DroeVM Runtime
Droe compiles to native bytecode by default, running on the high-performance DroeVM runtime. Also supports WebAssembly compilation for maximum portability across all platforms.

### 🔒 Strong Type System
Static typing with `int`, `text`, `flag`, `decimal`, and collections. Catch errors at compile time, not runtime.

### 🧩 Modular Design
Organize code with modules and parameterized actions. Build reusable components with clean interfaces.

### ✨ Modern Syntax
String interpolation, concatenation, and expressive syntax that reads like natural language.

### 📝 Git Friendly
Clean, readable `.droe` files work beautifully with version control. Merge conflicts are rare and easy to resolve.

### ⚡ Multiple Compilation Targets
Compile to DroeVM bytecode for optimal performance, WebAssembly for portability, or generate native code for Rust, Java, Python, Go, Node.js and mobile frameworks. Single source code, multiple deployment options.

## Your First Droe Program

Here's a simple "Hello World" program that demonstrates basic Droe syntax:

::: code-group
```droe [hello.droe]
// Welcome to Droe! 🦌
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
$ droe run hello.droe

Hello, World!
Welcome Alice, you are 25 years old!
Hello, Alice!
```
:::

## Language Philosophy

Droe follows several key principles:

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

1. **[Installation](/guide/installation/)** - Set up Droe on your system
2. **[Quick Start](/guide/quick-start/)** - Create your first project
3. **[Basic Syntax](/guide/basics/)** - Learn the fundamentals
4. **[Type System](/guide/types/)** - Understanding Droe's types

Or jump directly to specific topics:
- [Variables and Assignment](/guide/variables/)
- [String Interpolation](/guide/strings/)
- [Collections and Arrays](/guide/collections/)
- [Modules and Actions](/guide/modules/)

## Getting Help

- 📖 **Documentation**: You're reading it! Browse the guide sections in the sidebar
- 🐛 **Issues**: Report bugs on [GitHub Issues](https://github.com/droe-lang/droe/issues)
- 💬 **Discussions**: Ask questions on [GitHub Discussions](https://github.com/droe-lang/droe/discussions)
- 📧 **Contact**: Reach out to the maintainers for support

Let's build something amazing with Droe! 🦌