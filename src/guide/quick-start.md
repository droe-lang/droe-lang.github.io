---
layout: guide.njk
title: Quick Start
description: Create your first Roe project and learn the basics in minutes.
breadcrumbs:
  - title: Guide
    url: /guide/
  - title: Quick Start
prev:
  title: Installation
  url: /guide/installation/
next:
  title: Project Structure
  url: /guide/project-structure/
---

Let's build your first Roe program! This guide will walk you through creating a simple project that demonstrates the key features of the language.

## Create Your First Project

Start by creating a new Roe project:

```bash
# Create and enter project directory
mkdir hello-roelang
cd hello-roelang

# Initialize the project
roe init
```

This creates the basic project structure:

```
hello-roelang/
├── roeconfig.json
├── src/
│   └── main.roe
└── build/
```

## Your First Program

Open `src/main.roe` and replace the contents with:

```roe
// Welcome to Roe! 🦌
display "=== Hello Roe Demo ==="
display ""

// Variables with strong typing
set programmer_name which is text to "Alice"
set years_experience which is int to 3
set loves_coding which is flag to true
set hourly_rate which is decimal to 75.50

// String interpolation
display "Programmer: [programmer_name]"
display "Experience: [years_experience] years"
display "Loves coding: [loves_coding]"
display "Rate: $[hourly_rate] per hour"
display ""

// String concatenation
set greeting to "Hello, " + programmer_name + "!"
display greeting
display "Welcome to the world of Roe development! 🚀"
```

## Run Your Program

Execute your program with:

```bash
roe run src/main.roe
```

You should see output like:

```
=== Hello Roe Demo ===

Programmer: Alice
Experience: 3 years
Loves coding: true
Rate: $75.50 per hour

Hello, Alice!
Welcome to the world of Roe development! 🚀
```

## Understanding the Code

Let's break down what happened:

### 1. Comments
```roe
// Single-line comments start with //
/* Multi-line comments
   work like this */
```

### 2. Display Statements
```roe
display "Hello, World!"
```
The `display` command outputs text to the console.

### 3. Typed Variables
```roe
set programmer_name which is text to "Alice"
set years_experience which is int to 3
set loves_coding which is flag to true
set hourly_rate which is decimal to 75.50
```

Roe uses strong typing with clear, readable syntax:
- `text` - strings
- `int` - integers
- `flag` - booleans
- `decimal` - floating-point numbers

### 4. String Interpolation
```roe
display "Programmer: [programmer_name]"
```
Use square brackets `[variable]` to embed variables in strings.

### 5. String Concatenation
```roe
set greeting to "Hello, " + programmer_name + "!"
```
Join strings with the `+` operator.

## Working with Collections

Let's expand our program to work with collections. Add this to your `main.roe`:

```roe
display ""
display "=== Collections Demo ==="

// Arrays (lists)
set programming_languages which are list of text to ["Python", "JavaScript", "Roe"]
set project_scores which are list of int to [85, 92, 78, 95]

display "Languages I know:"
for each language in programming_languages
  display "- " + language
end for

display ""
display "Project scores:"
for each score in project_scores
  display "Score: [score]"
  
  when score is greater than or equal to 90 then
    display "  Excellent work! ⭐"
  end when
  
  when score is less than 80 then
    display "  Needs improvement 📚"
  end when
end for
```

Run it again:

```bash
roe run src/main.roe
```

## Adding Logic with Conditionals

Roe supports conditional logic with natural language syntax:

```roe
display ""
display "=== Conditional Logic ==="

set current_hour which is int to 14

when current_hour is less than 12 then
  display "Good morning! ☀️"
end when

when current_hour is greater than or equal to 12 and current_hour is less than 18 then
  display "Good afternoon! 🌤️"
end when

when current_hour is greater than or equal to 18 then
  display "Good evening! 🌙"
end when

// Calculate project status
set completed_projects which is int to 8
set total_projects which is int to 10
set completion_rate which is decimal to completed_projects * 100 / total_projects

display "Project completion: [completion_rate]%"

when completion_rate is greater than or equal to 80 then
  display "Great progress! Keep it up! 💪"
otherwise
  display "Let's pick up the pace! 🏃‍♀️"
end when
```

## Using Modules and Actions

Create reusable code with modules and actions. Add this to your file:

```roe
display ""
display "=== Modules and Actions ==="

module calculator
  action add with num1 which is int, num2 which is int gives int
    give num1 + num2
  end action
  
  action multiply with num1 which is int, num2 which is int gives int
    give num1 * num2
  end action
  
  action calculate_percentage with part which is int, total which is int gives decimal
    give (part * 100) / total
  end action
end module

// Use the module actions
set sum from run calculator.add with 15, 25
set product from run calculator.multiply with 6, 7
set percentage from run calculator.calculate_percentage with 75, 100

display "15 + 25 = [sum]"
display "6 × 7 = [product]"
display "75 out of 100 = [percentage]%"
```

## Building and Running

You can also compile your program without running it:

```bash
# Compile to WebAssembly
roe compile src/main.roe

# Check the build directory
ls build/
# main.wat  main.wasm

# Run the compiled WebAssembly
node ~/.roelang/run.js build/main.wasm
```

## Project Configuration

Your `roeconfig.json` controls project settings:

```json
{
  "name": "hello-roelang",
  "version": "1.0.0",
  "srcDir": "src",
  "buildDir": "build",
  "main": "main.roe",
  "description": "My first Roe project"
}
```

## Complete Example

Here's the complete `main.roe` file with all examples:

::: details View complete example
```roe
// Welcome to Roe! 🦌
display "=== Hello Roe Demo ==="
display ""

// Variables with strong typing
set programmer_name which is text to "Alice"
set years_experience which is int to 3
set loves_coding which is flag to true
set hourly_rate which is decimal to 75.50

// String interpolation
display "Programmer: [programmer_name]"
display "Experience: [years_experience] years"
display "Loves coding: [loves_coding]"
display "Rate: $[hourly_rate] per hour"
display ""

// String concatenation
set greeting to "Hello, " + programmer_name + "!"
display greeting
display "Welcome to the world of Roe development! 🚀"

display ""
display "=== Collections Demo ==="

// Arrays (lists)
set programming_languages which are list of text to ["Python", "JavaScript", "Roe"]
set project_scores which are list of int to [85, 92, 78, 95]

display "Languages I know:"
for each language in programming_languages
  display "- " + language
end for

display ""
display "Project scores:"
for each score in project_scores
  display "Score: [score]"
  
  when score is greater than or equal to 90 then
    display "  Excellent work! ⭐"
  end when
  
  when score is less than 80 then
    display "  Needs improvement 📚"
  end when
end for

display ""
display "=== Conditional Logic ==="

set current_hour which is int to 14

when current_hour is less than 12 then
  display "Good morning! ☀️"
end when

when current_hour is greater than or equal to 12 and current_hour is less than 18 then
  display "Good afternoon! 🌤️"
end when

when current_hour is greater than or equal to 18 then
  display "Good evening! 🌙"
end when

// Calculate project status
set completed_projects which is int to 8
set total_projects which is int to 10
set completion_rate which is decimal to completed_projects * 100 / total_projects

display "Project completion: [completion_rate]%"

when completion_rate is greater than or equal to 80 then
  display "Great progress! Keep it up! 💪"
otherwise
  display "Let's pick up the pace! 🏃‍♀️"
end when

display ""
display "=== Modules and Actions ==="

module calculator
  action add with num1 which is int, num2 which is int gives int
    give num1 + num2
  end action
  
  action multiply with num1 which is int, num2 which is int gives int
    give num1 * num2
  end action
  
  action calculate_percentage with part which is int, total which is int gives decimal
    give (part * 100) / total
  end action
end module

// Use the module actions
set sum from run calculator.add with 15, 25
set product from run calculator.multiply with 6, 7
set percentage from run calculator.calculate_percentage with 75, 100

display "15 + 25 = [sum]"
display "6 × 7 = [product]"
display "75 out of 100 = [percentage]%"

display ""
display "🎉 Demo complete! Welcome to Roe!"
```
:::

## What You've Learned

In this quick start, you've learned:

- ✅ **Project setup** with `roe init`
- ✅ **Variable declaration** with strong typing
- ✅ **String interpolation** and concatenation
- ✅ **Collections** (lists and arrays)
- ✅ **Conditional logic** with natural syntax
- ✅ **Loops** with `for each`
- ✅ **Modules and actions** for reusable code
- ✅ **Compilation** to WebAssembly

## Next Steps

Ready to dive deeper? Continue with:

- **[Basic Syntax](/guide/basics/)** - Complete syntax reference
- **[Type System](/guide/types/)** - Understanding Roe's types
- **[Variables](/guide/variables/)** - Variable declaration and scope
- **[Collections](/guide/collections/)** - Working with arrays and lists
- **[Modules](/guide/modules/)** - Organizing code with modules

Or explore practical examples:
- **[Examples](/examples/)** - Real-world Roe programs
- **[CLI Reference](/guide/cli/)** - Complete command reference

Happy coding with Roe! 🦌✨