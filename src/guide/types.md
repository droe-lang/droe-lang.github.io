---
layout: guide.njk
title: Type System
description: Understanding Roe's strong static type system and built-in data types.
breadcrumbs:
  - title: Guide
    url: /guide/
  - title: Type System
prev:
  title: Basic Syntax
  url: /guide/basics/
next:
  title: Variables
  url: /guide/variables/
---

Roe features a **strong static type system** that catches errors at compile time, making your programs more reliable and easier to debug. Every value in Roe has a specific type that determines what operations can be performed on it.

## Core Principles

### Static Typing
Types are checked at compile time, not runtime:

```roe
set name which is text to "Alice"      // ✅ Valid: text assigned to text
set age which is int to 25             // ✅ Valid: int assigned to int
set age which is int to "twenty-five"  // ❌ Error: text cannot be assigned to int
```

### Type Safety
Operations are only allowed between compatible types:

```roe
set count which is int to 10
set message which is text to "items"

display count + 5        // ✅ Valid: int + int
display message + "!"    // ✅ Valid: text + text
display count + message  // ❌ Error: cannot add int and text
```

### Explicit Typing
Types must be declared explicitly:

```roe
set value which is int to 42       // ✅ Explicit type declaration
set value to 42                    // ❌ Error: type must be specified
```

## Built-in Types

### Primitive Types

#### `int` - Integers

Whole numbers without decimal points:

```roe
set count which is int to 42
set negative which is int to -10
set zero which is int to 0
set large which is int to 1000000
```

**Range**: -2³¹ to 2³¹-1 (32-bit signed integers)

**Operations**:
```roe
set a which is int to 10
set b which is int to 3

set sum to a + b           // Addition: 13
set difference to a - b    // Subtraction: 7
set product to a * b       // Multiplication: 30
set quotient to a / b      // Division: 3 (integer division)
set remainder to a % b     // Modulo: 1
```

#### `decimal` - Floating Point Numbers

Numbers with decimal places:

```roe
set price which is decimal to 19.99
set pi which is decimal to 3.14159
set negative which is decimal to -5.5
set scientific which is decimal to 1.23e10
```

**Precision**: 64-bit floating point (IEEE 754)

**Operations**:
```roe
set x which is decimal to 10.5
set y which is decimal to 2.5

set sum to x + y           // 13.0
set difference to x - y    // 8.0
set product to x * y       // 26.25
set quotient to x / y      // 4.2
```

#### `text` - Strings

Sequences of characters:

```roe
set name which is text to "Alice"
set empty which is text to ""
set multiline which is text to "Hello
World"
set with_quotes which is text to "She said \"Hello\""
```

**Operations**:
```roe
set first which is text to "Hello"
set second which is text to "World"

set greeting to first + " " + second    // Concatenation
set length from run text.length with greeting
```

**Escape Sequences**:
```roe
set newline which is text to "Line 1\nLine 2"
set tab which is text to "Name:\tValue"
set backslash which is text to "Path: C:\\Users"
set quote which is text to "He said \"Hi\""
```

#### `flag` - Booleans

True or false values:

```roe
set is_active which is flag to true
set is_hidden which is flag to false
set is_ready which is flag to false
```

**Operations**:
```roe
set a which is flag to true
set b which is flag to false

set and_result to a and b        // false
set or_result to a or b          // true
set not_result to not a          // false
```

### Collection Types

#### `list of T` - Arrays

Ordered collections of the same type:

```roe
// Lists of different types
set numbers which are list of int to [1, 2, 3, 4, 5]
set names which are list of text to ["Alice", "Bob", "Carol"]
set flags which are list of flag to [true, false, true]
set prices which are list of decimal to [19.99, 25.50, 12.00]

// Empty lists
set empty_numbers which are list of int to []
set empty_names which are list of text to []
```

**Operations**:
```roe
set scores which are list of int to [85, 92, 78, 95]

// Iteration
for each score in scores
  display "Score: [score]"
end for

// Access (future feature)
set first_score from run list.get with scores, 0
```

#### `group of T` - Sets

Unordered collections with unique values:

```roe
set unique_numbers which are group of int to [1, 2, 3, 2, 1]  // {1, 2, 3}
set languages which are group of text to ["Python", "Java", "Python"]  // {"Python", "Java"}
```

## Type Conversion

### Implicit Conversion

Some conversions happen automatically:

```roe
set whole which is int to 42
set fractional which is decimal to whole    // int → decimal (safe)
```

### Explicit Conversion

Use built-in conversion functions:

```roe
set number which is int to 42
set text_number from run int.to_text with number          // "42"
set decimal_number from run int.to_decimal with number    // 42.0

set price which is decimal to 19.99
set price_text from run decimal.to_text with price       // "19.99"
set rounded from run decimal.to_int with price           // 19 (truncated)

set flag_value which is flag to true
set flag_text from run flag.to_text with flag_value      // "true"
```

## Type Checking and Validation

### Compile-Time Checks

Types are validated when you compile:

```roe
set age which is int to 25
set name which is text to "Alice"

when age is greater than 18 then     // ✅ Valid: int comparison
  display "Adult"
end when

when name is greater than 18 then    // ❌ Error: cannot compare text to int
  display "Invalid"
end when
```

### Type Compatibility

Operations require compatible types:

```roe
// Arithmetic - requires numeric types
set a which is int to 10
set b which is int to 5
set sum to a + b                     // ✅ Valid: int + int

set x which is decimal to 10.5
set y which is decimal to 2.5
set result to x * y                  // ✅ Valid: decimal * decimal

set mixed to a + x                   // ❌ Error: int + decimal not allowed

// String operations - requires text
set first which is text to "Hello"
set second which is text to "World"
set greeting to first + " " + second // ✅ Valid: text concatenation

// Boolean operations - requires flag
set is_ready which is flag to true
set is_active which is flag to false
set both to is_ready and is_active   // ✅ Valid: flag and flag
```

## Advanced Type Features

### Custom Data Types

Define your own structured types:

```roe
data Person
  name is text
  age is int
  active is flag
end data

data Address
  street is text
  city is text
  zip_code is text
end data
```

### Type Parameters in Actions

Actions can specify parameter and return types:

```roe
module math_utils
  action add with a which is int, b which is int gives int
    give a + b
  end action
  
  action calculate_percentage with part which is decimal, total which is decimal gives decimal
    give (part / total) * 100
  end action
  
  action format_currency with amount which is decimal gives text
    give "$" + amount
  end action
end module
```

### Collection Type Safety

Collections are strongly typed:

```roe
set numbers which are list of int to [1, 2, 3]
set texts which are list of text to ["a", "b", "c"]

// This would be an error:
// set mixed which are list of int to [1, "two", 3]  // ❌ Mixed types not allowed
```

## Type Inference Context

While types must be explicitly declared for variables, Roe can infer types in expressions:

```roe
set base_price which is decimal to 100.0
set tax_rate which is decimal to 0.08

// Type inferred from expression
set total_price to base_price + (base_price * tax_rate)  // decimal inferred
```

## Common Type Patterns

### Input Validation

```roe
module validation
  action is_valid_email with email which is text gives flag
    // Email validation logic
    give true  // Simplified
  end action
  
  action is_positive with number which is int gives flag
    give number > 0
  end action
end module

set user_email which is text to "user@example.com"
set is_email_valid from run validation.is_valid_email with user_email

when is_email_valid then
  display "Email is valid"
otherwise
  display "Invalid email format"
end when
```

### Type-Safe Calculations

```roe
module finance
  action calculate_tax with amount which is decimal, rate which is decimal gives decimal
    give amount * rate
  end action
  
  action format_money with amount which is decimal gives text
    give "$" + amount
  end action
end module

set price which is decimal to 100.00
set tax_rate which is decimal to 0.08
set tax_amount from run finance.calculate_tax with price, tax_rate
set total which is decimal to price + tax_amount

display "Price: " + finance.format_money with price
display "Tax: " + finance.format_money with tax_amount
display "Total: " + finance.format_money with total
```

### Collection Processing

```roe
set scores which are list of int to [85, 92, 78, 95, 88]
set total which is int to 0
set count which is int to 0

for each score in scores
  set total to total + score
  set count to count + 1
end for

set average which is decimal to total / count
display "Average score: [average]"
```

## Best Practices

### 1. Choose Appropriate Types

```roe
// Good: Use specific types
set user_id which is int to 12345
set username which is text to "alice_smith"
set is_admin which is flag to false
set account_balance which is decimal to 1250.75

// Avoid: Using text for everything
set user_id which is text to "12345"          // Loses numeric operations
set account_balance which is text to "1250.75" // Loses arithmetic operations
```

### 2. Use Collections Appropriately

```roe
// Good: Homogeneous collections
set student_grades which are list of int to [85, 92, 78, 95]
set employee_names which are list of text to ["Alice", "Bob", "Carol"]

// Good: Use groups for uniqueness
set programming_languages which are group of text to ["Python", "Java", "JavaScript"]
```

### 3. Validate Input Types

```roe
module input_validation
  action validate_age with age which is int gives flag
    give age >= 0 and age <= 150
  end action
  
  action validate_email with email which is text gives flag
    // Simple validation - contains @ symbol
    give true  // Simplified for example
  end action
end module
```

### 4. Use Type-Safe APIs

```roe
module user_service
  action create_user with name which is text, age which is int, email which is text gives flag
    when age is less than 0 or age is greater than 150 then
      give false
    end when
    
    // Create user logic here
    give true
  end action
end module
```

## Error Messages

Roe provides clear error messages for type mismatches:

```roe
set count which is int to "five"
// Error: Type mismatch: expected 'int', got 'text'

set result to count + "items"
// Error: Cannot perform addition between 'int' and 'text'

action calculate with value which is decimal gives int
  give value + "units"
// Error: Cannot return 'text' from action that gives 'int'
end action
```

## Next Steps

Now that you understand Roe's type system:

- **[Variables](/guide/variables/)** - Learn about variable declaration and scope
- **[Strings](/guide/strings/)** - Deep dive into string operations and interpolation
- **[Collections](/guide/collections/)** - Working with lists and groups
- **[Data Structures](/guide/data-structures/)** - Creating custom data types

Roe's strong type system helps you write more reliable code by catching errors early and making your intentions clear. Use types effectively to build robust, maintainable programs.