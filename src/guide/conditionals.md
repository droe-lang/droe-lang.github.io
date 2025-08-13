---
layout: guide.njk
title: Conditionals
description: Control program flow with Droe's natural language conditional statements.
breadcrumbs:
  - title: Guide
    url: /guide/
  - title: Conditionals
prev:
  title: Collections
  url: /guide/collections/
next:
  title: Loops
  url: /guide/loops/
---

Conditionals allow your programs to make decisions and execute different code paths based on conditions. Droe uses natural language syntax that makes conditional logic clear and readable.

## Basic Conditional Syntax

### Simple When-Then

```droe
set age which is int to 25

when age is greater than or equal to 18 then
  display "You are an adult"
end when
```

### When-Then-Otherwise

```droe
set temperature which is decimal to 28.5

when temperature is greater than 30 then
  display "It's hot outside! 🔥"
otherwise
  display "Pleasant temperature today 🌤️"
end when
```

## Comparison Operators

Droe uses natural language for comparisons:

### Equality Comparisons

```droe
set username which is text to "alice"
set expected_user which is text to "alice"

when username is equal to expected_user then
  display "Welcome back, Alice!"
end when

when username is not equal to expected_user then
  display "User not recognized"
end when
```

### Numeric Comparisons

```droe
set score which is int to 85
set passing_grade which is int to 80

when score is greater than passing_grade then
  display "Congratulations! You passed! 🎉"
end when

when score is less than passing_grade then
  display "Keep studying, you'll get there! 📚"
end when

when score is greater than or equal to 90 then
  display "Excellent work! A+ grade! ⭐"
end when

when score is less than or equal to 60 then
  display "Additional help may be needed"
end when
```

## Logical Operators

### AND Operations

```droe
set age which is int to 25
set has_license which is flag to true
set has_insurance which is flag to true

when age is greater than or equal to 18 and has_license and has_insurance then
  display "You can drive! 🚗"
end when

when age is greater than or equal to 21 and has_license then
  display "You can rent a car"
end when
```

### OR Operations

```droe
set day which is text to "Saturday"
set is_holiday which is flag to false

when day is equal to "Saturday" or day is equal to "Sunday" or is_holiday then
  display "It's a day off! 🎉"
otherwise
  display "Time to work 💼"
end when
```

### NOT Operations

```droe
set is_logged_in which is flag to false
set account_locked which is flag to true

when not is_logged_in then
  display "Please log in to continue"
end when

when not account_locked then
  display "Account is active"
otherwise
  display "Account is locked - contact support"
end when
```

## Complex Conditional Logic

### Multiple Conditions

```droe
set user_role which is text to "admin"
set session_valid which is flag to true
set feature_enabled which is flag to true

when user_role is equal to "admin" and session_valid and feature_enabled then
  display "Access granted to admin features"
  display "Welcome, Administrator!"
otherwise
  display "Access denied - insufficient privileges"
end when
```

### Nested Conditionals

```droe
set weather which is text to "sunny"
set temperature which is decimal to 25.0
set has_umbrella which is flag to false

when weather is equal to "sunny" then
  when temperature is greater than 20 then
    display "Perfect day for outdoor activities! ☀️"
  otherwise
    display "Sunny but a bit cool, bring a jacket"
  end when
otherwise
  when weather is equal to "rainy" then
    when has_umbrella then
      display "Don't forget your umbrella! ☔"
    otherwise
      display "Stay inside, it's raining and you have no umbrella"
    end when
  end when
end when
```

## Practical Examples

### User Authentication

```droe
set username which is text to "alice"
set password which is text to "secret123"
set account_active which is flag to true
set login_attempts which is int to 2
set max_attempts which is int to 3

when username is equal to "" or password is equal to "" then
  display "❌ Username and password are required"
otherwise
  when login_attempts is greater than or equal to max_attempts then
    display "❌ Account locked due to too many failed attempts"
  otherwise
    when username is equal to "alice" and password is equal to "secret123" then
      when account_active then
        display "✅ Login successful! Welcome, Alice!"
      otherwise
        display "❌ Account is deactivated - contact support"
      end when
    otherwise
      display "❌ Invalid username or password"
    end when
  end when
end when
```

### Grade Calculation

```droe
set student_score which is int to 87
set attendance_rate which is decimal to 0.92
set min_attendance which is decimal to 0.80

when attendance_rate is less than min_attendance then
  display "❌ Insufficient attendance ([attendance_rate])"
  display "Grade: F (Attendance requirement not met)"
otherwise
  when student_score is greater than or equal to 90 then
    display "🌟 Grade: A (Excellent!)"
  end when
  
  when student_score is greater than or equal to 80 and student_score is less than 90 then
    display "⭐ Grade: B (Good work!)"
  end when
  
  when student_score is greater than or equal to 70 and student_score is less than 80 then
    display "📊 Grade: C (Satisfactory)"
  end when
  
  when student_score is greater than or equal to 60 and student_score is less than 70 then
    display "📉 Grade: D (Needs improvement)"
  end when
  
  when student_score is less than 60 then
    display "❌ Grade: F (Failed)"
  end when
end when
```

### Order Processing

```droe
set order_total which is decimal to 150.00
set customer_tier which is text to "premium"
set in_stock which is flag to true
set payment_valid which is flag to true
set shipping_address which is text to "123 Main St"

when not payment_valid then
  display "❌ Payment failed - order cannot be processed"
otherwise
  when shipping_address is equal to "" then
    display "❌ Shipping address required"
  otherwise
    when not in_stock then
      display "⏳ Item backordered - will ship when available"
    otherwise
      when customer_tier is equal to "premium" then
        when order_total is greater than or equal to 100 then
          display "✅ Premium customer - Free shipping!"
          display "✅ Order confirmed - expedited processing"
        otherwise
          display "✅ Premium customer - Standard processing"
        end when
      otherwise
        when order_total is greater than or equal to 50 then
          display "✅ Order confirmed - Standard shipping"
        otherwise
          display "✅ Order confirmed - Shipping charges apply"
        end when
      end when
    end when
  end when
end when
```

### Data Validation

```droe
module validation
  action validate_email with email which is text gives flag
    when email is equal to "" then
      give false
    end when
    
    // Simplified email validation - check for @ symbol
    // In real implementation, would have comprehensive regex
    when email is equal to "user@example.com" then
      give true
    otherwise
      give false
    end when
  end action
  
  action validate_age with age which is int gives flag
    when age is less than 0 or age is greater than 150 then
      give false
    otherwise
      give true
    end when
  end action
end module

set user_email which is text to "user@example.com"
set user_age which is int to 25

set email_valid from run validation.validate_email with user_email
set age_valid from run validation.validate_age with user_age

when email_valid and age_valid then
  display "✅ All user data is valid"
otherwise
  when not email_valid then
    display "❌ Invalid email address"
  end when
  
  when not age_valid then
    display "❌ Invalid age"
  end when
end when
```

## Working with Collections in Conditionals

### Processing Lists

```droe
set scores which are list of int to [85, 92, 78, 95, 88]
set passing_grade which is int to 80
set passing_count which is int to 0
set failing_count which is int to 0

for each score in scores
  when score is greater than or equal to passing_grade then
    set passing_count to passing_count + 1
    display "Score [score]: PASS ✅"
  otherwise
    set failing_count to failing_count + 1
    display "Score [score]: FAIL ❌"
  end when
end for

when passing_count is greater than failing_count then
  display "Overall: More students passed than failed 🎉"
otherwise
  display "Overall: More attention needed for class performance 📚"
end when
```

### Status Checking

```droe
set server_statuses which are list of text to ["online", "offline", "maintenance", "online"]
set critical_servers which are list of text to ["database", "api", "cache", "web"]
set offline_count which is int to 0
set maintenance_count which is int to 0

set index which is int to 0
for each status in server_statuses
  set index to index + 1
  
  when status is equal to "online" then
    display "✅ Server [index]: Online"
  end when
  
  when status is equal to "offline" then
    set offline_count to offline_count + 1
    display "❌ Server [index]: OFFLINE - Critical issue!"
  end when
  
  when status is equal to "maintenance" then
    set maintenance_count to maintenance_count + 1
    display "🔧 Server [index]: Under maintenance"
  end when
end for

when offline_count is greater than 0 then
  display "🚨 ALERT: [offline_count] servers are offline!"
end when

when maintenance_count is greater than 0 then
  display "ℹ️ INFO: [maintenance_count] servers in maintenance"
end when
```

## Best Practices

### 1. Use Clear, Readable Conditions

```droe
// Good: Descriptive variable names and clear logic
set user_is_authenticated which is flag to true
set user_has_permission which is flag to true
set feature_is_enabled which is flag to true

when user_is_authenticated and user_has_permission and feature_is_enabled then
  display "Access granted"
end when

// Avoid: Cryptic conditions
set auth which is flag to true
set perm which is flag to true
set feat which is flag to true

when auth and perm and feat then
  display "Access granted"
end when
```

### 2. Handle Edge Cases

```droe
set user_input which is text to ""
set min_length which is int to 3

when user_input is equal to "" then
  display "Input cannot be empty"
otherwise
  // Process non-empty input
  display "Processing: [user_input]"
end when
```

### 3. Use Consistent Comparison Patterns

```droe
// Good: Consistent ordering (variable first, then constant)
when age is greater than or equal to 18 then
  display "Adult"
end when

when score is less than 60 then
  display "Failed"
end when

// Good: Consistent comparison style
when status is equal to "active" then
  display "Status is active"
end when
```

### 4. Avoid Deep Nesting

```droe
// Better: Early returns/exits with clear conditions
when user_input is equal to "" then
  display "Error: Empty input"
  // Would exit here in real implementation
end when

when user_input is equal to "quit" then
  display "Goodbye!"
  // Would exit here
end when

// Continue with main logic
display "Processing: [user_input]"

// Avoid: Deep nesting
when user_input is not equal to "" then
  when user_input is not equal to "quit" then
    // Main logic buried deep
    display "Processing: [user_input]"
  end when
end when
```

### 5. Use Modules for Complex Logic

```droe
module business_rules
  action can_make_purchase with age which is int, balance which is decimal, item_cost which is decimal gives flag
    when age is less than 18 then
      give false
    end when
    
    when balance is less than item_cost then
      give false
    end when
    
    give true
  end action
  
  action get_discount_rate with customer_tier which is text, order_amount which is decimal gives decimal
    when customer_tier is equal to "premium" and order_amount is greater than 100 then
      give 0.20  // 20% discount
    end when
    
    when customer_tier is equal to "gold" then
      give 0.15  // 15% discount
    end when
    
    when order_amount is greater than 50 then
      give 0.10  // 10% discount
    end when
    
    give 0.0  // No discount
  end action
end module
```

## Common Conditional Patterns

### Guard Pattern

```droe
set user_role which is text to "guest"

// Guard against invalid roles
when user_role is equal to "" then
  display "Error: No role specified"
  // Would exit here
end when

// Continue with main logic
display "User role: [user_role]"
```

### State Machine Pattern

```droe
set current_state which is text to "idle"
set next_state which is text to ""

when current_state is equal to "idle" then
  set next_state to "processing"
  display "Starting process..."
end when

when current_state is equal to "processing" then
  set next_state to "complete"
  display "Processing finished"
end when

when current_state is equal to "complete" then
  set next_state to "idle"
  display "Ready for next task"
end when

set current_state to next_state
```

### Validation Chain Pattern

```droe
set is_valid which is flag to true
set error_message which is text to ""

when user_name is equal to "" then
  set is_valid to false
  set error_message to "Username required"
end when

when is_valid and password is equal to "" then
  set is_valid to false
  set error_message to "Password required"
end when

when is_valid and age is less than 13 then
  set is_valid to false
  set error_message to "Must be 13 or older"
end when

when is_valid then
  display "✅ Validation passed"
otherwise
  display "❌ Validation failed: [error_message]"
end when
```

## Next Steps

Now that you understand conditional logic in Droe:

- **[Loops](/guide/loops/)** - Combine conditionals with iteration
- **[Modules](/guide/modules/)** - Organize conditional logic in modules
- **[Actions](/guide/actions/)** - Create reusable conditional functions
- **[Data Structures](/guide/data-structures/)** - Use conditionals with custom types

Conditionals are the foundation of program logic. Use them to create robust, readable programs that handle different scenarios gracefully.