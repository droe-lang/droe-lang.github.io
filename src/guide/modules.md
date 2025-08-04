---
layout: guide.njk
title: Modules
description: Organize and structure your Roe code with modules for better maintainability.
breadcrumbs:
  - title: Guide
    url: /guide/
  - title: Modules
prev:
  title: Loops
  url: /guide/loops/
next:
  title: Actions
  url: /guide/actions/
---

Modules in Roe provide a way to organize related functionality into logical groups, making your code more maintainable, reusable, and easier to understand. Roe also supports an include system that allows you to split your code across multiple files and organize modules in subdirectories.

## Basic Module Syntax

### Simple Module Declaration

```roe
module utilities
  // Module content goes here
end module
```

### Module with Actions

```roe
module math_helpers
  action add with a which is int, b which is int gives int
    give a + b
  end action
  
  action multiply with x which is decimal, y which is decimal gives decimal
    give x * y
  end action
end module

// Using module actions
set sum from run math_helpers.add with 10, 5
set product from run math_helpers.multiply with 3.14, 2.0

display "Sum: [sum]"
display "Product: [product]"
```

## Module Organization Patterns

### Utility Modules

```roe
module string_utils
  action capitalize with text which is text gives text
    // Simplified capitalization - first letter uppercase
    give text  // In real implementation would capitalize first letter
  end action
  
  action format_phone with area which is text, number which is text gives text
    give "([area]) [number]"
  end action
  
  action validate_email with email which is text gives flag
    // Simplified email validation
    when email is equal to "" then
      give false
    otherwise
      give true
    end when
  end action
end module

// Usage
set user_name which is text to "alice"
set formatted_name from run string_utils.capitalize with user_name

set phone from run string_utils.format_phone with "555", "123-4567"
set email_valid from run string_utils.validate_email with "user@example.com"

display "Name: [formatted_name]"
display "Phone: [phone]"
display "Email valid: [email_valid]"
```

### Business Logic Modules

```roe
module order_processing
  action calculate_tax with amount which is decimal, rate which is decimal gives decimal
    give amount * rate
  end action
  
  action apply_discount with amount which is decimal, discount_percent which is decimal gives decimal
    set discount_amount to amount * (discount_percent / 100)
    give amount - discount_amount
  end action
  
  action calculate_shipping with weight which is decimal, distance which is decimal gives decimal
    set base_rate which is decimal to 5.00
    set weight_rate to weight * 0.50
    set distance_rate to distance * 0.10
    give base_rate + weight_rate + distance_rate
  end action
end module

// Process an order
set order_subtotal which is decimal to 100.00
set tax_rate which is decimal to 0.08
set discount_percentage which is decimal to 10.0
set package_weight which is decimal to 2.5
set delivery_distance which is decimal to 15.0

set discounted_amount from run order_processing.apply_discount with order_subtotal, discount_percentage
set tax_amount from run order_processing.calculate_tax with discounted_amount, tax_rate
set shipping_cost from run order_processing.calculate_shipping with package_weight, delivery_distance
set final_total to discounted_amount + tax_amount + shipping_cost

display "Order Calculation:"
display "Subtotal: $[order_subtotal]"
display "After discount: $[discounted_amount]"
display "Tax: $[tax_amount]"
display "Shipping: $[shipping_cost]"
display "Total: $[final_total]"
```

## Data Processing Modules

### Collection Processing

```roe
module data_analysis
  action sum_list with numbers which are list of int gives int
    set total which is int to 0
    for each number in numbers
      set total to total + number
    end for
    give total
  end action
  
  action average_list with numbers which are list of int gives decimal
    set total which is int to 0
    set count which is int to 0
    
    for each number in numbers
      set total to total + number
      set count to count + 1
    end for
    
    when count is equal to 0 then
      give 0.0
    otherwise
      give total / count
    end when
  end action
  
  action find_maximum with numbers which are list of int gives int
    set max_value which is int to -999999
    
    for each number in numbers
      when number is greater than max_value then
        set max_value to number
      end when
    end for
    
    give max_value
  end action
end module

// Analyze test scores
set test_scores which are list of int to [85, 92, 78, 95, 88, 76, 94]

set total_points from run data_analysis.sum_list with test_scores
set class_average from run data_analysis.average_list with test_scores
set highest_score from run data_analysis.find_maximum with test_scores

display "Class Performance Analysis:"
display "Total Points: [total_points]"
display "Class Average: [class_average]%"
display "Highest Score: [highest_score]%"
```

### Validation Module

```roe
module input_validation
  action validate_age with age which is int gives flag
    when age is less than 0 or age is greater than 150 then
      give false
    otherwise
      give true
    end when
  end action
  
  action validate_password with password which is text gives flag
    when password is equal to "" then
      give false
    otherwise
      // Simplified password validation - check minimum length
      give true
    end when
  end action
  
  action validate_required_field with value which is text gives flag
    when value is equal to "" then
      give false
    otherwise
      give true
    end when
  end action
  
  action generate_error_message with field which is text, value which is text gives text
    when value is equal to "" then
      give "Error: [field] is required"
    otherwise
      give "Error: Invalid [field] value: [value]"
    end when
  end action
end module

// Validate user registration
set user_name which is text to "alice"
set user_age which is int to 25
set user_password which is text to "secret123"

set name_valid from run input_validation.validate_required_field with user_name
set age_valid from run input_validation.validate_age with user_age
set password_valid from run input_validation.validate_password with user_password

set all_valid to name_valid and age_valid and password_valid

when all_valid then
  display "✅ User registration data is valid"
otherwise
  display "❌ Registration validation failed:"
  
  when not name_valid then
    set error_msg from run input_validation.generate_error_message with "username", user_name
    display error_msg
  end when
  
  when not age_valid then
    set error_msg from run input_validation.generate_error_message with "age", user_age
    display error_msg
  end when
  
  when not password_valid then
    set error_msg from run input_validation.generate_error_message with "password", user_password
    display error_msg
  end when
end when
```

## Specialized Modules

### Date and Time Module

```roe
module date_utils
  action format_date with year which is int, month which is int, day which is int gives text
    give "[year]-[month]-[day]"
  end action
  
  action is_weekend with day_name which is text gives flag
    when day_name is equal to "Saturday" or day_name is equal to "Sunday" then
      give true
    otherwise
      give false
    end when
  end action
  
  action days_in_month with month which is int, year which is int gives int
    when month is equal to 2 then
      // Simplified leap year check
      when year % 4 is equal to 0 then
        give 29
      otherwise
        give 28
      end when
    end when
    
    when month is equal to 4 or month is equal to 6 or month is equal to 9 or month is equal to 11 then
      give 30
    otherwise
      give 31
    end when
  end action
end module

// Date operations
set current_date from run date_utils.format_date with 2024, 1, 15
set today which is text to "Monday"
set is_weekend_day from run date_utils.is_weekend with today
set feb_days from run date_utils.days_in_month with 2, 2024

display "Current date: [current_date]"
display "Is weekend: [is_weekend_day]"
display "Days in February 2024: [feb_days]"
```

### File Processing Module

```roe
module file_utils
  action get_file_extension with filename which is text gives text
    // Simplified - in real implementation would parse file extension
    when filename is equal to "document.pdf" then
      give "pdf"
    end when
    
    when filename is equal to "image.jpg" then
      give "jpg"
    end when
    
    give "unknown"
  end action
  
  action is_image_file with filename which is text gives flag
    set extension from run file_utils.get_file_extension with filename
    
    when extension is equal to "jpg" or extension is equal to "png" or extension is equal to "gif" then
      give true
    otherwise
      give false
    end when
  end action
  
  action format_file_size with size_bytes which is int gives text
    when size_bytes is less than 1024 then
      give "[size_bytes] bytes"
    end when
    
    when size_bytes is less than 1048576 then
      set kb to size_bytes / 1024
      give "[kb] KB"
    otherwise
      set mb to size_bytes / 1048576
      give "[mb] MB"
    end when
  end action
end module

// Process file information
set files which are list of text to ["document.pdf", "image.jpg", "data.txt"]
set file_sizes which are list of int to [1024000, 2048000, 512]

set file_index which is int to 0
for each filename in files
  set file_index to file_index + 1
  
  set is_image from run file_utils.is_image_file with filename
  set extension from run file_utils.get_file_extension with filename
  
  display "File [file_index]: [filename]"
  display "  Extension: [extension]"
  display "  Is image: [is_image]"
  display ""
end for
```

## Module Best Practices

### 1. Single Responsibility

```roe
// Good: Focused module
module email_service
  action send_welcome_email with user_email which is text gives flag
    display "Sending welcome email to [user_email]"
    give true
  end action
  
  action send_password_reset with user_email which is text gives flag
    display "Sending password reset to [user_email]"
    give true
  end action
end module

// Avoid: Mixed responsibilities
module mixed_service
  action send_email with email which is text gives flag
    // Email logic
    give true
  end action
  
  action calculate_tax with amount which is decimal gives decimal
    // Tax calculation doesn't belong here
    give amount * 0.08
  end action
end module
```

### 2. Clear Action Names

```roe
module user_management
  // Good: Clear, descriptive names
  action create_new_user with name which is text, email which is text gives flag
    display "Creating user: [name] ([email])"
    give true
  end action
  
  action validate_user_credentials with username which is text, password which is text gives flag
    display "Validating credentials for: [username]"
    give true
  end action
  
  action deactivate_user_account with user_id which is int gives flag
    display "Deactivating user account: [user_id]"
    give true
  end action
end module
```

### 3. Consistent Return Types

```roe
module status_checker
  // Consistent: All actions return flags for status
  action is_server_online with server_name which is text gives flag
    display "Checking server: [server_name]"
    give true
  end action
  
  action is_database_accessible with db_name which is text gives flag
    display "Checking database: [db_name]"
    give true
  end action
  
  action is_service_healthy with service_name which is text gives flag
    display "Checking service: [service_name]"
    give true
  end action
end module
```

### 4. Error Handling

```roe
module safe_operations
  action divide_safely with numerator which is decimal, denominator which is decimal gives decimal
    when denominator is equal to 0.0 then
      display "Error: Division by zero"
      give 0.0
    otherwise
      give numerator / denominator
    end when
  end action
  
  action parse_number_safely with text_value which is text gives int
    when text_value is equal to "" then
      display "Error: Empty string cannot be parsed"
      give 0
    otherwise
      // Simplified parsing - would have proper number parsing
      give 42
    end when
  end action
end module
```

## Module Usage Patterns

### Configuration Module

```roe
module app_config
  action get_database_url gives text
    give "postgresql://localhost:5432/myapp"
  end action
  
  action get_max_connections gives int
    give 100
  end action
  
  action get_session_timeout gives int
    give 3600  // 1 hour in seconds
  end action
  
  action is_debug_mode gives flag
    give false
  end action
end module

// Use configuration throughout the application
set db_url from run app_config.get_database_url
set max_conn from run app_config.get_max_connections
set debug_enabled from run app_config.is_debug_mode

display "Database URL: [db_url]"
display "Max connections: [max_conn]"
display "Debug mode: [debug_enabled]"
```

### Logging Module

```roe
module logger
  action log_info with message which is text
    display "[INFO] [message]"
  end action
  
  action log_warning with message which is text
    display "[WARNING] [message]"
  end action
  
  action log_error with message which is text
    display "[ERROR] [message]"
  end action
  
  action log_with_timestamp with level which is text, message which is text
    set timestamp which is text to "2024-01-15 10:30:00"
    display "[timestamp] [[level]] [message]"
  end action
end module

// Use logging throughout the application
run logger.log_info with "Application starting"
run logger.log_warning with "Configuration file not found, using defaults"
run logger.log_error with "Database connection failed"
run logger.log_with_timestamp with "DEBUG", "Processing user request"
```

## Include System

### Basic Include Syntax

Roe supports including modules from other files using the `include` statement:

```roe
// Include a module from the same directory
include MathUtils.roe

// Include modules from subdirectories using quoted paths
include "utils/StringUtils.roe"
include "common/Helpers.roe"
include "includes/UserManager.roe"
```

### Module Naming Convention

When including modules from subdirectories, Roe automatically derives the module name by:
1. Removing the `.roe` extension
2. Replacing forward slashes (`/`) with underscores (`_`)

For example:
- `utils/MathUtils.roe` → module name: `utils_MathUtils`
- `common/StringHelpers.roe` → module name: `common_StringHelpers`
- `includes/UserManager.roe` → module name: `includes_UserManager`

The module declaration in the file must match this derived name:

```roe
// File: utils/MathUtils.roe
module utils_MathUtils
  action add with a which is int, b which is int gives int
    give a + b
  end action
end module
```

### Cross-Module Action Calls

Once a module is included, you can call its actions using the module name:

```roe
// main.roe
include "utils/MathUtils.roe"
include "utils/StringUtils.roe"

// Call actions from included modules
set sum which is int from run utils_MathUtils.add with 10, 20
set greeting which is text from run utils_StringUtils.greet with "Alice"

display "Sum: [sum]"
display greeting
```

### Complete Include Example

Here's a complete example showing how to organize a project with includes:

**Project Structure:**
```
src/
├── main.roe
├── utils/
│   ├── MathUtils.roe
│   └── StringUtils.roe
├── common/
│   └── StringHelpers.roe
└── includes/
    └── UserManager.roe
```

**utils/MathUtils.roe:**
```roe
module utils_MathUtils
  action add with a which is int, b which is int gives int
    give a + b
  end action
  
  action multiply with x which is decimal, y which is decimal gives decimal
    give x * y
  end action
  
  action calculate_area with width which is decimal, height which is decimal gives decimal
    set area which is decimal from run utils_MathUtils.multiply with width, height
    give area
  end action
end module
```

**utils/StringUtils.roe:**
```roe
module utils_StringUtils
  action greet with name which is text gives text
    give "Hello, " + name + "!"
  end action
  
  action format_title with title which is text gives text
    give "=== " + title + " ==="
  end action
  
  action create_email with first_name which is text, last_name which is text, domain which is text gives text
    set username which is text to first_name + "." + last_name
    give username + "@" + domain
  end action
end module
```

**common/StringHelpers.roe:**
```roe
module common_StringHelpers
  action format_name with first which is text, last which is text gives text
    give first + " " + last
  end action
  
  action create_greeting with name which is text gives text
    give "Hello, " + name + "!"
  end action
end module
```

**includes/UserManager.roe:**
```roe
// UserManager can include other modules
include "utils/StringUtils.roe"

module includes_UserManager
  action create_user_email with name which is text, domain which is text gives text
    // Use actions from included modules
    set email which is text from run utils_StringUtils.create_email with name, "user", domain
    give email
  end action
  
  action format_user_info with name which is text, age which is int gives text
    set greeting which is text from run utils_StringUtils.greet with name
    give greeting + " (Age: " + age + ")"
  end action
end module
```

**main.roe:**
```roe
// Include all necessary modules
include "utils/MathUtils.roe"
include "utils/StringUtils.roe"
include "common/StringHelpers.roe"
include "includes/UserManager.roe"

// Use Math utilities
display "=== Math Operations ==="
set a which is int to 10
set b which is int to 5
set sum which is int from run utils_MathUtils.add with a, b
display "10 + 5 = [sum]"

set width which is decimal to 12.5
set height which is decimal to 8.0
set area which is decimal from run utils_MathUtils.calculate_area with width, height
display "Rectangle area: [area]"

// Use String utilities
display ""
display "=== String Operations ==="
set user_name which is text to "Alice"
set greeting which is text from run utils_StringUtils.greet with user_name
display greeting

set page_title which is text to "Welcome to Roe"
set formatted_title which is text from run utils_StringUtils.format_title with page_title
display formatted_title

// Use StringHelpers from common
set full_name which is text from run common_StringHelpers.format_name with "John", "Doe"
display "Full name: [full_name]"

// Use UserManager which internally uses StringUtils
set user_email which is text from run includes_UserManager.create_user_email with "alice", "example.com"
display "User email: [user_email]"

set user_info which is text from run includes_UserManager.format_user_info with "Bob", 25
display user_info
```

### Include System Benefits

1. **Code Organization**: Split large programs into manageable files
2. **Reusability**: Share modules across multiple programs
3. **Maintainability**: Update modules in one place
4. **Namespace Management**: Subdirectory prefixes prevent naming conflicts
5. **Dependency Management**: Modules can include other modules

### Best Practices for Includes

1. **Organize by Functionality**: Group related modules in subdirectories
   - `utils/` for utility functions
   - `common/` for shared helpers
   - `includes/` for composite modules
   - `data/` for data structures
   - `services/` for business logic

2. **Use Descriptive Names**: Module names should clearly indicate their purpose

3. **Avoid Circular Dependencies**: Module A should not include Module B if Module B includes Module A

4. **Keep Module Names Consistent**: The module declaration must match the derived name from the file path

5. **Document Dependencies**: Comment which external modules are required

```roe
// This module requires:
// - utils/StringUtils.roe for string operations
// - common/Validators.roe for input validation
include "utils/StringUtils.roe"
include "common/Validators.roe"

module my_module
  // Module implementation
end module
```

## Next Steps

Now that you understand modules in Roe:

- **[Actions](/guide/actions/)** - Deep dive into creating module actions
- **[Data Structures](/guide/data-structures/)** - Use modules with custom data types
- **[Task Actions](/guide/task-actions/)** - Combine modules with task automation
- **[CLI Reference](/guide/cli/)** - Learn about module compilation and organization

Modules are essential for organizing complex Roe applications. Use them to create clean, maintainable code with clear separation of concerns and reusable functionality.