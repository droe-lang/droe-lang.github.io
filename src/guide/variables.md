---
layout: guide.njk
title: Variables
description: Learn how to declare, assign, and work with variables in Droe.
breadcrumbs:
  - title: Guide
    url: /guide/
  - title: Variables
prev:
  title: Type System
  url: /guide/types/
next:
  title: Strings & Interpolation
  url: /guide/strings/
---

Variables are fundamental building blocks in Droe that store values for later use. Droe uses explicit, descriptive syntax for variable declarations that makes code self-documenting and easy to understand.

## Variable Declaration

### Basic Syntax

Variables are declared using the `set` keyword with explicit type declaration:

```droe
set variable_name which is type to value
```

### Examples

```droe
// Basic declarations
set user_name which is text to "Alice"
set user_age which is int to 28
set is_active which is flag to true
set account_balance which is decimal to 1250.75

// Collections
set favorite_numbers which are list of int to [7, 13, 42]
set programming_languages which are group of text to ["Python", "JavaScript", "Droe"]
```

## Type Declarations

### Primitive Types

```droe
// Integer
set count which is int to 100
set negative_value which is int to -42

// Decimal
set price which is decimal to 19.99
set temperature which is decimal to -5.5

// Text
set greeting which is text to "Hello, World!"
set empty_string which is text to ""

// Flag (Boolean)
set is_ready which is flag to true
set is_hidden which is flag to false
```

### Collection Types

```droe
// Lists (ordered collections)
set scores which are list of int to [85, 92, 78, 95]
set names which are list of text to ["Alice", "Bob", "Carol"]
set settings which are list of flag to [true, false, true]

// Groups (unique collections)
set unique_ids which are group of int to [1, 2, 3, 2, 1]  // Results in {1, 2, 3}
set categories which are group of text to ["work", "personal", "work"]  // Results in {"work", "personal"}

// Empty collections
set empty_list which are list of text to []
set empty_group which are group of int to []
```

## Variable Assignment

### Initial Assignment

Variables must be initialized when declared:

```droe
set username which is text to "alice_smith"    // ✅ Valid: initialized with value
set age which is int                           // ❌ Error: no initial value
```

### Reassignment

Variables can be reassigned to new values of the same type:

```droe
set counter which is int to 0
display counter           // Displays: 0

set counter to 10         // Reassignment
display counter           // Displays: 10

set counter to counter + 5
display counter           // Displays: 15
```

### Type Consistency

Variables cannot change type after declaration:

```droe
set value which is int to 42
display value             // Displays: 42

set value to 100          // ✅ Valid: int to int
display value             // Displays: 100

set value to "hello"      // ❌ Error: cannot assign text to int variable
```

## Variable Naming

### Naming Rules

1. **Start with letter**: Must begin with a-z or A-Z
2. **Continue with letters, numbers, underscores**: Can contain a-z, A-Z, 0-9, _
3. **Case sensitive**: `userName` and `username` are different variables
4. **No reserved words**: Cannot use keywords like `set`, `when`, `for`, etc.

### Valid Names

```droe
set user_name which is text to "Alice"         // ✅ snake_case
set firstName which is text to "Bob"           // ✅ camelCase
set MAX_RETRIES which is int to 3              // ✅ UPPER_CASE constants
set item1 which is text to "First Item"       // ✅ with numbers
set isValid which is flag to true             // ✅ boolean prefix
```

### Invalid Names

```droe
set 123invalid which is int to 0               // ❌ starts with number
set user-name which is text to "Alice"        // ❌ contains hyphen
set for which is int to 10                    // ❌ reserved keyword
set user name which is text to "Alice"        // ❌ contains space
```

### Naming Conventions

#### Descriptive Names

```droe
// Good: Clear, descriptive names
set customer_email which is text to "customer@example.com"
set total_order_amount which is decimal to 299.99
set is_payment_successful which is flag to true
set monthly_sales_figures which are list of decimal to [1250.00, 1380.75, 1195.50]

// Avoid: Cryptic names
set x which is text to "customer@example.com"     // What is x?
set temp which is decimal to 299.99               // Temporary what?
set flag1 which is flag to true                   // What does this flag represent?
```

#### Consistent Style

Choose a naming style and stick with it:

```droe
// Option 1: snake_case (recommended)
set user_name which is text to "Alice"
set order_total which is decimal to 150.00
set is_order_complete which is flag to false

// Option 2: camelCase
set userName which is text to "Alice"
set orderTotal which is decimal to 150.00
set isOrderComplete which is flag to false
```

#### Boolean Variables

Use descriptive prefixes for boolean variables:

```droe
// Good boolean names
set is_authenticated which is flag to false
set has_permission which is flag to true
set can_edit which is flag to false
set should_update which is flag to true
set was_successful which is flag to false
```

## Variable Scope

### File Scope

Variables declared at the file level are available throughout that file:

```droe
// File: user_management.droe
set current_user which is text to "alice"
set session_timeout which is int to 3600

display "User: [current_user]"
display "Timeout: [session_timeout] seconds"

when session_timeout is greater than 0 then
  display "Session is active"  // Can access session_timeout here
end when
```

### Block Scope

Variables declared inside blocks (like conditionals and loops) have limited scope:

```droe
set global_counter which is int to 0

when global_counter is equal to 0 then
  set local_message which is text to "Starting fresh"
  display local_message         // ✅ Valid: inside the block
end when

display local_message           // ❌ Error: local_message not accessible here
```

### Module Scope

Variables inside modules are local to that module:

```droe
module user_service
  set default_role which is text to "user"     // Module-scoped variable
  
  action get_default_role gives text
    give default_role           // ✅ Can access module variable
  end action
end module

display default_role            // ❌ Error: cannot access module variable directly
```

## Working with Variables

### Calculations

```droe
set base_salary which is decimal to 50000.00
set bonus_percentage which is decimal to 0.15
set years_experience which is int to 5

// Calculate bonus
set bonus_amount to base_salary * bonus_percentage
set experience_multiplier to 1.0 + (years_experience * 0.02)
set total_compensation to (base_salary + bonus_amount) * experience_multiplier

display "Base Salary: $[base_salary]"
display "Bonus: $[bonus_amount]"
display "Total Compensation: $[total_compensation]"
```

### String Operations

```droe
set first_name which is text to "Alice"
set last_name which is text to "Johnson"
set middle_initial which is text to "M"

// String concatenation
set full_name to first_name + " " + middle_initial + ". " + last_name
set display_name to last_name + ", " + first_name

// String interpolation
set greeting to "Hello, [first_name]!"
set formal_address to "Dear [full_name],"
```

### Collection Operations

```droe
set product_prices which are list of decimal to [19.99, 29.50, 45.00, 12.75]
set total_value which is decimal to 0.0
set item_count which is int to 0

for each price in product_prices
  set total_value to total_value + price
  set item_count to item_count + 1
end for

set average_price to total_value / item_count
display "Average price: $[average_price]"
```

## Advanced Variable Patterns

### Configuration Variables

Group related configuration at the top of files:

```droe
// Configuration section
set max_retries which is int to 3
set timeout_seconds which is int to 30
set debug_mode which is flag to false
set api_base_url which is text to "https://api.example.com"
set supported_formats which are list of text to ["json", "xml", "csv"]

// Application logic using configuration
when debug_mode then
  display "Debug mode is enabled"
end when
```

### Counter Variables

```droe
set processed_items which is int to 0
set error_count which is int to 0
set success_count which is int to 0

set items_to_process which are list of text to ["item1", "item2", "item3", "item4"]

for each item in items_to_process
  set processed_items to processed_items + 1
  
  // Simulate processing...
  when processed_items % 2 is equal to 0 then
    set success_count to success_count + 1
    display "Successfully processed: [item]"
  otherwise
    set error_count to error_count + 1
    display "Error processing: [item]"
  end when
end for

display "Summary: [processed_items] processed, [success_count] successful, [error_count] errors"
```

### State Variables

```droe
set current_state which is text to "idle"
set previous_state which is text to "unknown"
set state_change_count which is int to 0

action change_state with new_state which is text
  set previous_state to current_state
  set current_state to new_state
  set state_change_count to state_change_count + 1
  
  display "State changed from [previous_state] to [current_state]"
  display "Total state changes: [state_change_count]"
end action
```

## Variable Best Practices

### 1. Initialize at Declaration

```droe
// Good: Always initialize
set counter which is int to 0
set message which is text to ""
set is_ready which is flag to false

// Bad: Would cause error
// set counter which is int
```

### 2. Use Meaningful Names

```droe
// Good: Self-documenting
set customer_birth_date which is text to "1990-05-15"
set order_processing_status which is text to "pending"
set maximum_allowed_attempts which is int to 5

// Poor: Requires comments to understand
set bd which is text to "1990-05-15"        // birth date
set status which is text to "pending"       // order status
set max which is int to 5                   // max attempts
```

### 3. Group Related Variables

```droe
// User information
set user_id which is int to 12345
set user_name which is text to "alice_smith"
set user_email which is text to "alice@example.com"
set user_role which is text to "admin"

// Order details
set order_id which is int to 67890
set order_total which is decimal to 299.99
set order_date which is text to "2024-01-15"
set order_status which is text to "confirmed"
```

### 4. Use Constants for Fixed Values

```droe
// Application constants
set MAX_LOGIN_ATTEMPTS which is int to 3
set SESSION_TIMEOUT_MINUTES which is int to 30
set DEFAULT_CURRENCY which is text to "USD"
set SUPPORTED_FILE_TYPES which are list of text to ["jpg", "png", "gif", "pdf"]

// Use constants in logic
set login_attempts which is int to 0

when login_attempts is greater than or equal to MAX_LOGIN_ATTEMPTS then
  display "Account locked due to too many failed login attempts"
end when
```

## Common Patterns

### Accumulator Pattern

```droe
set numbers which are list of int to [1, 2, 3, 4, 5]
set sum which is int to 0

for each number in numbers
  set sum to sum + number
end for

display "Sum: [sum]"
```

### Counter Pattern

```droe
set items which are list of text to ["apple", "banana", "cherry", "date"]
set index which is int to 0

for each item in items
  set index to index + 1
  display "[index]: [item]"
end for
```

### Flag Pattern

```droe
set numbers which are list of int to [2, 4, 7, 8, 10]
set found_odd which is flag to false

for each number in numbers
  when number % 2 is not equal to 0 then
    set found_odd to true
    display "Found odd number: [number]"
  end when
end for

when found_odd then
  display "List contains odd numbers"
otherwise
  display "List contains only even numbers"
end when
```

## Next Steps

Now that you understand variables in Droe:

- **[Strings & Interpolation](/guide/strings/)** - Working with text and string interpolation
- **[Collections](/guide/collections/)** - Deep dive into lists and groups
- **[Conditionals](/guide/conditionals/)** - Using variables in conditional logic
- **[Loops](/guide/loops/)** - Iterating over variables and collections

Variables are the foundation of data manipulation in Droe. Use them effectively with clear names, appropriate types, and consistent patterns to build maintainable programs.