---
layout: guide.njk
title: Strings & Interpolation
description: Master string manipulation, interpolation, and text processing in Droe.
breadcrumbs:
  - title: Guide
    url: /guide/
  - title: Strings & Interpolation
prev:
  title: Variables
  url: /guide/variables/
next:
  title: Collections
  url: /guide/collections/
---

Strings are one of the most commonly used data types in programming. Droe provides powerful and intuitive features for working with text, including string interpolation, concatenation, and various text manipulation capabilities.

## String Basics

### String Declaration

Strings are declared using the `text` type:

```droe
set greeting which is text to "Hello, World!"
set name which is text to "Alice"
set empty_string which is text to ""
```

### String Literals

Strings are enclosed in double quotes:

```droe
set simple_text which is text to "This is a simple string"
set with_numbers which is text to "Version 2.1.0"
set with_special which is text to "Price: $19.99"
```

### Multi-line Strings

Droe supports multi-line strings:

```droe
set long_message which is text to "This is a very long message
that spans multiple lines
for better readability"

set formatted_text which is text to "Line 1
Line 2
Line 3"
```

## Escape Sequences

Use backslash escapes for special characters:

```droe
set with_quotes which is text to "She said \"Hello there!\""
set with_newline which is text to "First line\nSecond line"
set with_tab which is text to "Name:\tAlice\tAge:\t25"
set with_backslash which is text to "Path: C:\\Users\\Alice"
set with_return which is text to "Line 1\r\nLine 2"
```

### Common Escape Sequences

| Sequence | Character | Description |
|----------|-----------|-------------|
| `\"` | `"` | Double quote |
| `\\` | `\` | Backslash |
| `\n` | newline | Line feed |
| `\r` | return | Carriage return |
| `\t` | tab | Horizontal tab |

## String Interpolation

### Basic Interpolation

Embed variables directly in strings using square brackets:

```droe
set name which is text to "Alice"
set age which is int to 28

set greeting to "Hello, [name]!"
set info to "Name: [name], Age: [age]"

display greeting    // Displays: Hello, Alice!
display info        // Displays: Name: Alice, Age: 28
```

### Multiple Variables

Include multiple variables in a single string:

```droe
set first_name which is text to "Alice"
set last_name which is text to "Johnson"
set title which is text to "Dr."
set department which is text to "Engineering"

set introduction to "Meet [title] [first_name] [last_name] from [department]"
display introduction
// Displays: Meet Dr. Alice Johnson from Engineering
```

### Different Data Types

Interpolation works with all data types:

```droe
set product_name which is text to "Laptop"
set price which is decimal to 1299.99
set in_stock which is flag to true
set quantity which is int to 15

set product_info to "Product: [product_name]
Price: $[price]
In Stock: [in_stock]
Available: [quantity] units"

display product_info
// Displays:
// Product: Laptop
// Price: $1299.99
// In Stock: true
// Available: 15 units
```

### Collections in Interpolation

You can interpolate entire collections:

```droe
set favorite_colors which are list of text to ["blue", "green", "purple"]
set lucky_numbers which are list of int to [7, 13, 42]

set preferences to "Colors: [favorite_colors], Numbers: [lucky_numbers]"
display preferences
// Displays: Colors: [blue, green, purple], Numbers: [7, 13, 42]
```

## String Concatenation

### Basic Concatenation

Join strings using the `+` operator:

```droe
set first_name which is text to "Alice"
set last_name which is text to "Johnson"

set full_name to first_name + " " + last_name
display full_name    // Displays: Alice Johnson
```

### Multi-part Concatenation

Combine multiple strings and values:

```droe
set title which is text to "Ms."
set first_name which is text to "Alice"
set last_name which is text to "Johnson"
set age which is int to 28

set formal_intro to title + " " + first_name + " " + last_name + " (age " + age + ")"
display formal_intro    // Displays: Ms. Alice Johnson (age 28)
```

### Building Strings Progressively

```droe
set message which is text to "Dear"
set message to message + " " + "Alice"
set message to message + ","
set message to message + "\n\n"
set message to message + "Thank you for your order."

display message
// Displays:
// Dear Alice,
//
// Thank you for your order.
```

## Combining Interpolation and Concatenation

Use both techniques together for complex string building:

```droe
set customer_name which is text to "Alice"
set order_id which is int to 12345
set total which is decimal to 299.99
set status which is text to "confirmed"

// Using interpolation for readable templates
set base_message to "Order [order_id] for [customer_name] is [status]."

// Using concatenation to add dynamic parts
set full_message to base_message + " Total: $" + total + ". Thank you!"

display full_message
// Displays: Order 12345 for Alice is confirmed. Total: $299.99. Thank you!
```

## Advanced String Patterns

### Template Strings

Create reusable string templates:

```droe
module email_templates
  action welcome_email with name which is text, company which is text gives text
    give "Dear [name],\n\nWelcome to [company]! We're excited to have you join our team.\n\nBest regards,\nThe [company] Team"
  end action
  
  action order_confirmation with customer which is text, order_id which is int, amount which is decimal gives text
    give "Hi [customer],\n\nYour order #[order_id] has been confirmed.\nTotal: $[amount]\n\nWe'll send you updates as your order ships.\n\nThanks for your business!"
  end action
end module

set welcome_msg from run email_templates.welcome_email with "Alice", "Tech Corp"
set order_msg from run email_templates.order_confirmation with "Bob", 67890, 199.99

display welcome_msg
display ""
display order_msg
```

### Dynamic String Building

Build strings based on conditions:

```droe
set user_name which is text to "Alice"
set user_type which is text to "premium"
set points which is int to 1250

set greeting to "Hello, [user_name]!"

when user_type is equal to "premium" then
  set greeting to greeting + " Thanks for being a premium member."
  set greeting to greeting + " You have [points] reward points."
end when

when user_type is equal to "standard" then
  set greeting to greeting + " Upgrade to premium for exclusive benefits!"
end when

display greeting
```

### Multi-line Formatted Strings

Create nicely formatted output:

```droe
set customer which is text to "Alice Johnson"
set order_date which is text to "2024-01-15"
set items which are list of text to ["Laptop", "Mouse", "Keyboard"]
set total which is decimal to 1299.99

set receipt to "╔════════════════════════════════════╗
║           ORDER RECEIPT            ║
╠════════════════════════════════════╣
║ Customer: [customer]" + "               ║
║ Date: [order_date]" + "                    ║
║                                    ║
║ Items: [items]" + "                        ║
║                                    ║
║ Total: $[total]" + "                       ║
╚════════════════════════════════════╝"

display receipt
```

## String Processing Patterns

### Input Validation Messages

```droe
module validation_messages
  action email_error with email which is text gives text
    give "Invalid email address: '[email]'. Please use format: name@domain.com"
  end action
  
  action password_error with min_length which is int gives text
    give "Password must be at least [min_length] characters long."
  end action
  
  action range_error with value which is int, min which is int, max which is int gives text
    give "Value [value] is out of range. Must be between [min] and [max]."
  end action
end module

set user_email which is text to "invalid-email"
set min_pwd_length which is int to 8
set user_age which is int to 200

set email_msg from run validation_messages.email_error with user_email
set pwd_msg from run validation_messages.password_error with min_pwd_length
set age_msg from run validation_messages.range_error with user_age, 0, 150

display email_msg
display pwd_msg
display age_msg
```

### Report Generation

```droe
set report_title which is text to "Monthly Sales Report"
set month which is text to "January 2024"
set total_sales which is decimal to 125750.50
set num_orders which is int to 1247
set top_product which is text to "Wireless Headphones"

set report_header to "=" * 50
set title_line to "    [report_title] - [month]"
set separator to "-" * 50

set sales_line to "Total Sales: $[total_sales]"
set orders_line to "Number of Orders: [num_orders]"
set product_line to "Top Product: [top_product]"

set full_report to report_header + "\n" +
                  title_line + "\n" +
                  report_header + "\n\n" +
                  sales_line + "\n" +
                  orders_line + "\n" +
                  product_line + "\n\n" +
                  separator

display full_report
```

### Configuration Messages

```droe
set app_name which is text to "TaskManager Pro"
set version which is text to "2.1.0"
set build_date which is text to "2024-01-15"
set config_file which is text to "config.json"

set startup_message to "[app_name] v[version]
Built: [build_date]
Loading configuration from: [config_file]
Starting application..."

set shutdown_message to "[app_name] shutting down gracefully.
Session saved. Thank you for using [app_name]!"

display startup_message
display ""
display shutdown_message
```

## Working with User Input

### Prompts and Responses

```droe
set user_name which is text to "Alice"
set action which is text to "login"

set prompt_message to "Hello [user_name]! What would you like to do today?"
set action_message to "You selected: [action]"
set confirmation to "Processing [action] for user [user_name]..."

display prompt_message
display action_message
display confirmation
```

### Error Messages

```droe
module error_handler
  action file_not_found with filename which is text gives text
    give "Error: File '[filename]' not found. Please check the path and try again."
  end action
  
  action access_denied with resource which is text, user which is text gives text
    give "Access denied: User '[user]' does not have permission to access '[resource]'."
  end action
  
  action invalid_input with input which is text, expected which is text gives text
    give "Invalid input: '[input]'. Expected: [expected]."
  end action
end module

set missing_file which is text to "data.csv"
set protected_resource which is text to "admin_panel"
set current_user which is text to "guest"
set bad_input which is text to "abc123"
set expected_format which is text to "numeric value"

set file_error from run error_handler.file_not_found with missing_file
set access_error from run error_handler.access_denied with protected_resource, current_user
set input_error from run error_handler.invalid_input with bad_input, expected_format

display file_error
display access_error
display input_error
```

## Best Practices

### 1. Use Interpolation for Readability

```droe
// Good: Clear and readable
set welcome_message to "Welcome [user_name]! You have [message_count] new messages."

// Harder to read: Multiple concatenations
set welcome_message to "Welcome " + user_name + "! You have " + message_count + " new messages."
```

### 2. Use Concatenation for Building Strings

```droe
// Good: Building strings step by step
set sql_query which is text to "SELECT * FROM users"
set sql_query to sql_query + " WHERE active = true"
set sql_query to sql_query + " ORDER BY name"

// Less maintainable: Everything in interpolation
set sql_query to "SELECT * FROM users WHERE active = true ORDER BY name"
```

### 3. Create Template Functions

```droe
module string_templates
  action format_currency with amount which is decimal, currency which is text gives text
    give "[currency][amount]"
  end action
  
  action format_date with year which is int, month which is int, day which is int gives text
    give "[year]-[month]-[day]"
  end action
  
  action format_phone with area which is text, number which is text gives text
    give "([area]) [number]"
  end action
end module
```

### 4. Handle Empty Strings

```droe
set user_input which is text to ""

when user_input is equal to "" then
  set message to "Please enter a valid input."
otherwise
  set message to "You entered: [user_input]"
end when

display message
```

### 5. Use Consistent String Formatting

```droe
// Consistent error message format
module error_formats
  action standard_error with operation which is text, details which is text gives text
    give "ERROR: [operation] failed - [details]"
  end action
  
  action warning_message with component which is text, issue which is text gives text
    give "WARNING: [component] - [issue]"
  end action
  
  action info_message with action which is text, result which is text gives text
    give "INFO: [action] completed - [result]"
  end action
end module
```

## Common String Patterns

### Email Generation

```droe
set recipient which is text to "alice@example.com"
set subject which is text to "Welcome to our service"
set sender which is text to "support@company.com"

set email_header to "To: [recipient]
From: [sender]
Subject: [subject]"

set email_body to "Dear Customer,

Thank you for signing up for our service.
We're excited to have you on board!

Best regards,
The Support Team"

set full_email to email_header + "\n\n" + email_body
display full_email
```

### Log Messages

```droe
set timestamp which is text to "2024-01-15 14:30:25"
set level which is text to "INFO"
set component which is text to "UserService"
set message which is text to "User login successful"
set user_id which is int to 12345

set log_entry to "[timestamp] [level] [component]: [message] (User ID: [user_id])"
display log_entry
```

### Configuration Strings

```droe
set database_host which is text to "localhost"
set database_port which is int to 5432
set database_name which is text to "myapp"
set ssl_enabled which is flag to true

set connection_string to "host=[database_host] port=[database_port] dbname=[database_name] ssl=[ssl_enabled]"
display "Connecting to database: [connection_string]"
```

## Next Steps

Now that you've mastered strings and interpolation in Droe:

- **[Collections](/guide/collections/)** - Working with lists and groups of data
- **[Conditionals](/guide/conditionals/)** - Using string comparisons in logic
- **[Loops](/guide/loops/)** - Processing collections of strings
- **[Modules](/guide/modules/)** - Creating string utility modules

String manipulation is a fundamental skill in Droe. Use interpolation for readable templates, concatenation for dynamic building, and consistent patterns for maintainable code.