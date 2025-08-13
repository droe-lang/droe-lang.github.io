---
layout: guide.njk
title: Basic Syntax
description: Learn the fundamental syntax and structure of the Droe programming language.
breadcrumbs:
  - title: Guide
    url: /guide/
  - title: Basic Syntax
prev:
  title: Project Structure
  url: /guide/project-structure/
next:
  title: Type System
  url: /guide/types/
---

Droe's syntax is designed to be readable and expressive, using natural language constructs that make code easy to understand and maintain.

## Comments

Droe supports both single-line and multi-line comments:

```droe
// This is a single-line comment

/* This is a
   multi-line comment
   that spans several lines */

display "Hello, World!"  // Inline comment
```

Comments are ignored by the compiler and are used to document your code.

## Display Statements

The most basic operation in Droe is displaying output:

```droe
display "Hello, World!"
display ""                    // Empty line
display "Welcome to Droe"
```

You can display variables and expressions:

```droe
set name which is text to "Alice"
display name
display "Hello, " + name      // String concatenation
display "Name: [name]"        // String interpolation
```

## Keywords and Identifiers

### Reserved Keywords

Droe uses natural language keywords:

```droe
// Variable declaration
set name which is text to "value"

// Conditionals  
when condition then
  // code
end when

// Loops
for each item in collection
  // code
end for

// Modules and actions
module name
  action name with params gives type
    give result
  end action
end module
```

### Identifiers

Variable and module names follow these rules:

- Must start with a letter (a-z, A-Z)
- Can contain letters, numbers, and underscores
- Case-sensitive
- Cannot be reserved keywords

```droe
// Valid identifiers
set user_name which is text to "Alice"
set firstName which is text to "Bob"
set counter1 which is int to 0
set isActive which is flag to true

// Invalid identifiers
set 123name which is text to "Error"    // Cannot start with number
set for which is text to "Error"        // 'for' is reserved
set user-name which is text to "Error"  // Hyphens not allowed
```

## Statements and Expressions

### Statements

Statements perform actions and don't return values:

```droe
// Display statement
display "Hello"

// Variable assignment
set count which is int to 5

// Control flow
when count is greater than 0 then
  display "Positive"
end when
```

### Expressions

Expressions evaluate to values:

```droe
// Arithmetic expressions
set sum to 10 + 5
set product to width * height
set average to total / count

// String expressions
set greeting to "Hello, " + name
set message to "Welcome [name] to our system!"

// Boolean expressions
set is_adult to age >= 18
set can_vote to age >= 18 and is_citizen
```

## Operators

### Arithmetic Operators

```droe
set a which is int to 10
set b which is int to 3

set sum to a + b          // Addition: 13
set difference to a - b   // Subtraction: 7
set product to a * b      // Multiplication: 30
set quotient to a / b     // Division: 3.33...
set remainder to a % b    // Modulo: 1
```

### Comparison Operators

Droe uses natural language for comparisons:

```droe
set x which is int to 10
set y which is int to 5

// Equality
when x is equal to y then display "Equal" end when
when x is not equal to y then display "Not equal" end when

// Magnitude comparisons
when x is greater than y then display "x > y" end when
when x is less than y then display "x < y" end when
when x is greater than or equal to y then display "x >= y" end when
when x is less than or equal to y then display "x <= y" end when
```

### Logical Operators

```droe
set is_adult which is flag to age >= 18
set has_license which is flag to true

// AND
when is_adult and has_license then
  display "Can drive"
end when

// OR
when is_adult or has_permission then
  display "Can enter"
end when

// NOT
when not is_busy then
  display "Available"
end when
```

### String Operators

```droe
set first_name which is text to "John"
set last_name which is text to "Doe"

// Concatenation
set full_name to first_name + " " + last_name

// Interpolation
set greeting to "Hello, [first_name]!"
set info to "Name: [full_name], Age: [age]"
```

## Block Structure

Droe uses explicit `end` keywords to terminate blocks:

```droe
// Conditional blocks
when condition then
  // statements
end when

// Loop blocks
for each item in collection
  // statements
end for

// Module blocks
module utilities
  // module content
end module

// Action blocks
action calculate with param which is int gives int
  // statements
  give result
end action
```

## Whitespace and Formatting

Droe is flexible with whitespace:

```droe
// Compact style
set name which is text to "Alice"
when age is greater than 18 then display "Adult" end when

// Expanded style
set name which is text to "Alice"

when age is greater than 18 then
  display "Adult"
end when

// Mixed style (recommended)
set name which is text to "Alice"
set age which is int to 25

when age is greater than 18 then display "Adult" end when
```

## Line Breaks and Semicolons

- Statements are typically one per line
- No semicolons required
- Long statements can be broken across lines

```droe
// Single line (preferred)
set total to price * quantity + tax

// Multi-line for readability
set total to price * quantity 
  + tax 
  + shipping_cost

// Natural line breaks in conditionals
when user_age is greater than or equal to 18 
  and has_valid_id 
  and account_is_active then
  display "Access granted"
end when
```

## Case Sensitivity

Droe is case-sensitive:

```droe
set userName which is text to "Alice"
set username which is text to "Bob"    // Different variable
set UserName which is text to "Carol"  // Also different

// Keywords must be lowercase
set count which is int to 5    // Correct
SET count WHICH IS int to 5    // Error
```

## String Literals

### Basic Strings

```droe
set message which is text to "Hello, World!"
set empty which is text to ""
set with_quotes which is text to "She said \"Hello\""
```

### Escape Sequences

```droe
set with_newline which is text to "Line 1\nLine 2"
set with_tab which is text to "Name:\tValue"
set with_backslash which is text to "Path: C:\\Users\\Name"
```

### Multi-line Strings

```droe
set long_text which is text to "This is a very long string 
that spans multiple lines 
for better readability"
```

## Numeric Literals

```droe
// Integers
set count which is int to 42
set negative which is int to -10
set zero which is int to 0

// Decimals
set price which is decimal to 19.99
set negative_decimal which is decimal to -5.5
set scientific which is decimal to 1.23e10
```

## Boolean Literals

```droe
set is_active which is flag to true
set is_hidden which is flag to false
```

## Collections

```droe
// Lists (arrays)
set numbers which are list of int to [1, 2, 3, 4, 5]
set names which are list of text to ["Alice", "Bob", "Carol"]
set flags which are list of flag to [true, false, true]

// Empty collections
set empty_list which are list of text to []
```

## Best Practices

### 1. Use Descriptive Names

```droe
// Good
set user_age which is int to 25
set total_price which is decimal to 199.99
set is_authenticated which is flag to true

// Avoid
set x which is int to 25
set temp which is decimal to 199.99
set flag1 which is flag to true
```

### 2. Consistent Formatting

```droe
// Consistent spacing around operators
set total to price + tax
set is_valid to age >= 18 and has_license

// Consistent indentation in blocks
when is_authenticated then
  display "Welcome back!"
  set last_login to current_time
end when
```

### 3. Group Related Code

```droe
// User information
set user_name which is text to "Alice"
set user_age which is int to 28
set user_email which is text to "alice@example.com"

// Calculations
set subtotal to price * quantity
set tax_amount to subtotal * tax_rate
set total to subtotal + tax_amount
```

### 4. Use Comments Wisely

```droe
// Calculate monthly payment for loan
set monthly_rate to annual_rate / 12
set num_payments to years * 12
set payment to principal * monthly_rate / (1 - (1 + monthly_rate)^(-num_payments))

display "Monthly payment: $[payment]"
```

## Common Patterns

### Input Validation

```droe
when age is less than 0 or age is greater than 150 then
  display "Invalid age"
otherwise
  display "Age is valid: [age]"
end when
```

### Calculations with Formatting

```droe
set price which is decimal to 29.99
set quantity which is int to 3
set total to price * quantity

display "Price: $[price]"
display "Quantity: [quantity]"
display "Total: $[total]"
```

### Error Handling Patterns

```droe
when file_exists then
  display "Processing file..."
  // Process file
otherwise
  display "Error: File not found"
end when
```

## Next Steps

Now that you understand Droe's basic syntax, explore these topics:

- **[Type System](/guide/types/)** - Learn about Droe's strong typing
- **[Variables](/guide/variables/)** - Variable declaration and scope
- **[Strings](/guide/strings/)** - String interpolation and manipulation
- **[Collections](/guide/collections/)** - Working with lists and arrays
- **[Conditionals](/guide/conditionals/)** - Control flow with when/then
- **[Loops](/guide/loops/)** - Iteration with for-each loops