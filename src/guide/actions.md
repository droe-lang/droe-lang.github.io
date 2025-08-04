---
layout: guide.njk
title: Actions
description: Create reusable functions with parameters and return values in Roelang modules.
breadcrumbs:
  - title: Guide
    url: /guide/
  - title: Actions
prev:
  title: Modules
  url: /guide/modules/
next:
  title: Data Structures
  url: /guide/data-structures/
---

Actions are functions within modules that accept parameters and return values. They enable code reuse, encapsulation, and clean separation of concerns in Roelang programs.

## Action Syntax

### Basic Action Structure

```roe
module module_name
  action action_name with parameter1 which is type1, parameter2 which is type2 gives return_type
    // Action body
    give return_value
  end action
end module
```

### Simple Example

```roe
module calculator
  action add with a which is int, b which is int gives int
    give a + b
  end action
end module

// Using the action
set result from run calculator.add with 10, 5
display "Result: [result]"  // Displays: Result: 15
```

## Parameter Types

### Single Parameter Actions

```roe
module formatter
  action capitalize with text which is text gives text
    // Simplified capitalization
    give text  // In real implementation, would capitalize first letter
  end action
  
  action double_value with number which is int gives int
    give number * 2
  end action
  
  action is_positive with value which is decimal gives flag
    give value > 0
  end action
end module

set name which is text to "alice"
set count which is int to 7
set price which is decimal to -5.50

set formatted_name from run formatter.capitalize with name
set doubled_count from run formatter.double_value with count
set is_positive_price from run formatter.is_positive with price

display "Formatted: [formatted_name]"
display "Doubled: [doubled_count]"
display "Is positive: [is_positive_price]"
```

### Multiple Parameter Actions

```roe
module geometry
  action rectangle_area with width which is decimal, height which is decimal gives decimal
    give width * height
  end action
  
  action circle_area with radius which is decimal gives decimal
    set pi which is decimal to 3.14159
    give pi * radius * radius
  end action
  
  action distance with x1 which is decimal, y1 which is decimal, x2 which is decimal, y2 which is decimal gives decimal
    set dx to x2 - x1
    set dy to y2 - y1
    // Simplified - would use proper square root
    give dx + dy  // Placeholder for actual distance calculation
  end action
end module

set room_area from run geometry.rectangle_area with 12.5, 8.0
set garden_area from run geometry.circle_area with 3.0
set point_distance from run geometry.distance with 0.0, 0.0, 3.0, 4.0

display "Room area: [room_area] sq ft"
display "Garden area: [garden_area] sq ft"
display "Distance: [point_distance] units"
```

## Return Types

### Returning Different Data Types

```roe
module converters
  // Returns text
  action number_to_text with number which is int gives text
    // Simplified conversion
    when number is equal to 1 then give "one" end when
    when number is equal to 2 then give "two" end when
    give "other"
  end action
  
  // Returns decimal
  action fahrenheit_to_celsius with fahrenheit which is decimal gives decimal
    give (fahrenheit - 32) * 5 / 9
  end action
  
  // Returns flag
  action is_even with number which is int gives flag
    give number % 2 is equal to 0
  end action
  
  // Returns list
  action create_range with start which is int, end which is int gives list of int
    // Simplified - would create actual range
    give [1, 2, 3, 4, 5]
  end action
end module

set text_number from run converters.number_to_text with 2
set celsius_temp from run converters.fahrenheit_to_celsius with 32.0
set is_even_number from run converters.is_even with 7
set number_range from run converters.create_range with 1, 5

display "Number as text: [text_number]"
display "Temperature: [celsius_temp]°C"
display "Is even: [is_even_number]"
display "Range: [number_range]"
```

## Working with Collections

### Actions that Process Lists

```roe
module list_operations
  action sum_integers with numbers which are list of int gives int
    set total which is int to 0
    for each number in numbers
      set total to total + number
    end for
    give total
  end action
  
  action count_items with items which are list of text gives int
    set count which is int to 0
    for each item in items
      set count to count + 1
    end for
    give count
  end action
  
  action find_maximum with values which are list of decimal gives decimal
    set max_value which is decimal to -999999.0
    for each value in values
      when value is greater than max_value then
        set max_value to value
      end when
    end for
    give max_value
  end action
  
  action contains_item with items which are list of text, search_item which is text gives flag
    for each item in items
      when item is equal to search_item then
        give true
      end when
    end for
    give false
  end action
end module

set scores which are list of int to [85, 92, 78, 95, 88]
set names which are list of text to ["Alice", "Bob", "Carol"]
set prices which are list of decimal to [19.99, 29.50, 15.75, 45.00]

set total_score from run list_operations.sum_integers with scores
set name_count from run list_operations.count_items with names
set highest_price from run list_operations.find_maximum with prices
set has_alice from run list_operations.contains_item with names, "Alice"

display "Total score: [total_score]"
display "Number of names: [name_count]"
display "Highest price: $[highest_price]"
display "Contains Alice: [has_alice]"
```

### Actions that Return Collections

```roe
module collection_builders
  action create_number_sequence with start which is int, count which is int gives list of int
    // Simplified - would create actual sequence
    give [1, 2, 3, 4, 5]
  end action
  
  action filter_positive with numbers which are list of int gives list of int
    // Simplified - would filter actual positive numbers
    give [1, 2, 3]
  end action
  
  action split_text with text which is text, delimiter which is text gives list of text
    // Simplified text splitting
    when delimiter is equal to "," then
      give ["part1", "part2", "part3"]
    otherwise
      give [text]
    end when
  end action
end module

set sequence from run collection_builders.create_number_sequence with 1, 5
set positive_nums from run collection_builders.filter_positive with [-2, -1, 0, 1, 2]
set text_parts from run collection_builders.split_text with "a,b,c", ","

display "Sequence: [sequence]"
display "Positive numbers: [positive_nums]"
display "Text parts: [text_parts]"
```

## Business Logic Actions

### Validation Actions

```roe
module validation_service
  action validate_email with email which is text gives flag
    when email is equal to "" then
      give false
    end when
    
    // Simplified email validation
    when email is equal to "user@example.com" then
      give true
    otherwise
      give false
    end when
  end action
  
  action validate_password with password which is text gives flag
    when password is equal to "" then
      give false
    end when
    
    // Check minimum length (simplified)
    give true
  end action
  
  action validate_age with age which is int gives flag
    when age is less than 0 or age is greater than 150 then
      give false
    otherwise
      give true
    end when
  end action
  
  action create_validation_report with email which is text, password which is text, age which is int gives text
    set email_valid from run validation_service.validate_email with email
    set password_valid from run validation_service.validate_password with password
    set age_valid from run validation_service.validate_age with age
    
    when email_valid and password_valid and age_valid then
      give "All fields are valid"
    otherwise
      give "Validation failed - please check your inputs"
    end when
  end action
end module

set user_email which is text to "user@example.com"
set user_password which is text to "secret123"
set user_age which is int to 25

set validation_report from run validation_service.create_validation_report with user_email, user_password, user_age
display validation_report
```

### Calculation Actions

```roe
module financial_calculator
  action calculate_simple_interest with principal which is decimal, rate which is decimal, time which is decimal gives decimal
    give principal * rate * time / 100
  end action
  
  action calculate_compound_interest with principal which is decimal, rate which is decimal, time which is decimal, compounds_per_year which is int gives decimal
    // Simplified compound interest calculation
    set compound_factor to 1 + (rate / 100)
    give principal * compound_factor
  end action
  
  action calculate_loan_payment with loan_amount which is decimal, annual_rate which is decimal, years which is int gives decimal
    set monthly_rate to annual_rate / 12 / 100
    set num_payments to years * 12
    
    // Simplified payment calculation
    give loan_amount / num_payments
  end action
  
  action apply_tax with amount which is decimal, tax_rate which is decimal gives decimal
    give amount * (1 + tax_rate / 100)
  end action
end module

set investment_principal which is decimal to 10000.00
set interest_rate which is decimal to 5.0
set investment_years which is decimal to 3.0

set simple_interest from run financial_calculator.calculate_simple_interest with investment_principal, interest_rate, investment_years
set compound_interest from run financial_calculator.calculate_compound_interest with investment_principal, interest_rate, investment_years, 12

set loan_amount which is decimal to 250000.00
set loan_rate which is decimal to 4.5
set loan_years which is int to 30
set monthly_payment from run financial_calculator.calculate_loan_payment with loan_amount, loan_rate, loan_years

display "Simple Interest: $[simple_interest]"
display "Compound Interest: $[compound_interest]"
display "Monthly Payment: $[monthly_payment]"
```

## Utility Actions

### String Processing Actions

```roe
module text_processor
  action format_name with first_name which is text, last_name which is text gives text
    give last_name + ", " + first_name
  end action
  
  action create_username with first_name which is text, last_name which is text gives text
    give first_name + "." + last_name
  end action
  
  action format_currency with amount which is decimal, currency which is text gives text
    give "[currency][amount]"
  end action
  
  action truncate_text with text which is text, max_length which is int gives text
    // Simplified truncation
    when max_length is less than 10 then
      give text + "..."
    otherwise
      give text
    end when
  end action
end module


set person_first which is text to "Alice"
set person_last which is text to "Johnson"
set salary which is decimal to 75000.00

set formatted_name from run text_processor.format_name with person_first, person_last
set username from run text_processor.create_username with person_first, person_last
set formatted_salary from run text_processor.format_currency with salary, "$"

display "Name: [formatted_name]"
display "Username: [username]"
display "Salary: [formatted_salary]"
```

### Date and Time Actions

```roe
module date_helper
  action format_date with year which is int, month which is int, day which is int gives text
    give "[year]-[month]-[day]"
  end action
  
  action calculate_age with birth_year which is int, current_year which is int gives int
    give current_year - birth_year
  end action
  
  action is_leap_year with year which is int gives flag
    when year % 4 is equal to 0 then
      give true
    otherwise
      give false
    end when
  end action
  
  action days_until_birthday with current_day which is int, birthday_day which is int gives int
    when birthday_day is greater than current_day then
      give birthday_day - current_day
    otherwise
      give (365 - current_day) + birthday_day
    end when
  end action
end module

set birth_year which is int to 1995
set current_year which is int to 2024
set today_day which is int to 100
set birthday_day which is int to 150

set formatted_date from run date_helper.format_date with 2024, 1, 15
set person_age from run date_helper.calculate_age with birth_year, current_year
set is_leap from run date_helper.is_leap_year with 2024
set days_to_birthday from run date_helper.days_until_birthday with today_day, birthday_day

display "Date: [formatted_date]"
display "Age: [person_age] years"
display "Is leap year: [is_leap]"
display "Days until birthday: [days_to_birthday]"
```

## Action Best Practices

### 1. Single Responsibility

```roe
// Good: Each action has one clear purpose
module user_service
  action create_user with name which is text, email which is text gives flag
    display "Creating user: [name]"
    give true
  end action
  
  action validate_user_email with email which is text gives flag
    // Email validation logic only
    give true
  end action
  
  action send_welcome_email with email which is text gives flag
    display "Sending welcome email to [email]"
    give true
  end action
end module

// Avoid: Action doing too many things
module bad_user_service
  action create_and_welcome_user with name which is text, email which is text gives flag
    // Creates user, validates email, sends email, logs activity...
    // Too many responsibilities in one action
    give true
  end action
end module
```

### 2. Clear Parameter Names

```roe
module order_calculator
  // Good: Descriptive parameter names
  action calculate_total_with_tax with subtotal which is decimal, tax_rate which is decimal gives decimal
    give subtotal * (1 + tax_rate)
  end action
  
  action apply_discount_percentage with original_price which is decimal, discount_percent which is decimal gives decimal
    give original_price * (1 - discount_percent / 100)
  end action
end module
```

### 3. Consistent Return Types

```roe
module status_service
  // Good: All status checks return flags
  action is_user_active with user_id which is int gives flag
    give true
  end action
  
  action is_payment_valid with payment_id which is int gives flag
    give true
  end action
  
  action is_order_complete with order_id which is int gives flag
    give true
  end action
end module
```

### 4. Error Handling

```roe
module safe_calculator
  action divide_safely with numerator which is decimal, denominator which is decimal gives decimal
    when denominator is equal to 0.0 then
      display "Warning: Division by zero, returning 0"
      give 0.0
    otherwise
      give numerator / denominator
    end when
  end action
  
  action get_percentage with part which is decimal, total which is decimal gives decimal
    when total is equal to 0.0 then
      display "Warning: Cannot calculate percentage of zero total"
      give 0.0
    otherwise
      give (part / total) * 100
    end when
  end action
end module
```

## Advanced Action Patterns

### Factory Actions

```roe
module object_factory
  action create_user_profile with name which is text, age which is int, email which is text gives text
    give "User: [name], Age: [age], Email: [email]"
  end action
  
  action create_product_listing with name which is text, price which is decimal, category which is text gives text
    give "Product: [name] - $[price] in [category]"
  end action
end module
```

### Transformer Actions

```roe
module data_transformer
  action normalize_score with raw_score which is int, max_possible which is int gives decimal
    give (raw_score * 100) / max_possible
  end action
  
  action convert_temperature with celsius which is decimal gives decimal
    give (celsius * 9 / 5) + 32
  end action
end module
```

### Aggregator Actions

```roe
module report_generator
  action summarize_sales with sales_data which are list of decimal gives text
    set total which is decimal to 0.0
    set count which is int to 0
    
    for each sale in sales_data
      set total to total + sale
      set count to count + 1
    end for
    
    set average to total / count
    give "Total: $[total], Average: $[average], Count: [count]"
  end action
end module
```

## Next Steps

Now that you understand actions in Roelang:

- **[Data Structures](/guide/data-structures/)** - Use actions with custom data types
- **[Task Actions](/guide/task-actions/)** - Learn about task-specific actions
- **[CLI Reference](/guide/cli/)** - Compile and test modules with actions
- **[WebAssembly](/guide/webassembly/)** - Understand how actions compile to WASM

Actions are the building blocks of reusable functionality in Roelang. Use them to create clean, testable, and maintainable code that can be easily shared across your applications.