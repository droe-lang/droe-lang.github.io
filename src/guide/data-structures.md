---
layout: guide.njk
title: Data Structures
description: Create custom data types and structures to organize complex data in Droe.
breadcrumbs:
  - title: Guide
    url: /guide/
  - title: Data Structures
prev:
  title: Actions
  url: /guide/actions/
next:
  title: Task Actions
  url: /guide/task-actions/
---

Data structures allow you to create custom types that group related data together, making your programs more organized and easier to understand. Droe provides a simple yet powerful `data` construct for defining custom data types.

## Basic Data Structure Syntax

### Simple Data Declaration

```droe
data Person
  name is text
  age is int
  active is flag
end data
```

### Using Data Structures

```droe
data User
  username is text
  email is text
  age is int
  is_admin is flag
end data

// Note: In current Droe implementation, data structures are primarily 
// used for documentation and future language features
// For now, use individual variables to represent structured data

set user_username which is text to "alice"
set user_email which is text to "alice@example.com"
set user_age which is int to 28
set user_is_admin which is flag to false

display "User: [user_username] ([user_email])"
display "Age: [user_age], Admin: [user_is_admin]"
```

## Common Data Structure Patterns

### User Management

```droe
data UserProfile
  first_name is text
  last_name is text
  email is text
  phone is text
  birth_year is int
  account_type is text
  is_verified is flag
end data

// Working with user data using individual variables
set profile_first_name which is text to "Alice"
set profile_last_name which is text to "Johnson"
set profile_email which is text to "alice.johnson@example.com"
set profile_phone which is text to "555-0123"
set profile_birth_year which is int to 1995
set profile_account_type which is text to "premium"
set profile_is_verified which is flag to true

module user_operations
  action format_full_name with first which is text, last which is text gives text
    give first + " " + last
  end action
  
  action calculate_age with birth_year which is int, current_year which is int gives int
    give current_year - birth_year
  end action
  
  action format_user_summary with first which is text, last which is text, email which is text, age which is int gives text
    set full_name from run user_operations.format_full_name with first, last
    give "User: [full_name] ([email]) - Age: [age]"
  end action
end module

set current_year which is int to 2024
set user_age from run user_operations.calculate_age with profile_birth_year, current_year
set user_summary from run user_operations.format_user_summary with profile_first_name, profile_last_name, profile_email, user_age

display user_summary
```

### Product Catalog

```droe
data Product
  id is int
  name is text
  description is text
  price is decimal
  category is text
  in_stock is flag
  stock_quantity is int
end data

// Product data using individual variables
set product_id which is int to 12345
set product_name which is text to "Wireless Headphones"
set product_description which is text to "High-quality wireless headphones with noise cancellation"
set product_price which is decimal to 199.99
set product_category which is text to "Electronics"
set product_in_stock which is flag to true
set product_stock_quantity which is int to 25

module product_operations
  action format_product_listing with name which is text, price which is decimal, category which is text gives text
    give "[name] - $[price] ([category])"
  end action
  
  action check_availability with in_stock which is flag, quantity which is int gives text
    when in_stock and quantity is greater than 0 then
      give "Available ([quantity] in stock)"
    otherwise
      give "Out of stock"
    end when
  end action
  
  action calculate_total_value with price which is decimal, quantity which is int gives decimal
    give price * quantity
  end action
end module

set product_listing from run product_operations.format_product_listing with product_name, product_price, product_category
set availability_status from run product_operations.check_availability with product_in_stock, product_stock_quantity
set inventory_value from run product_operations.calculate_total_value with product_price, product_stock_quantity

display "Product: [product_listing]"
display "Status: [availability_status]"
display "Inventory Value: $[inventory_value]"
```

### Order Processing

```droe
data Order
  order_id is int
  customer_email is text
  order_date is text
  status is text
  subtotal is decimal
  tax_amount is decimal
  shipping_cost is decimal
  total_amount is decimal
end data

data OrderItem
  product_id is int
  product_name is text
  quantity is int
  unit_price is decimal
  line_total is decimal
end data

// Order processing using individual variables
set order_id which is int to 67890
set customer_email which is text to "customer@example.com"
set order_date which is text to "2024-01-15"
set order_status which is text to "processing"
set order_subtotal which is decimal to 299.99
set tax_rate which is decimal to 0.08
set shipping_cost which is decimal to 15.00

module order_operations
  action calculate_tax with subtotal which is decimal, rate which is decimal gives decimal
    give subtotal * rate
  end action
  
  action calculate_order_total with subtotal which is decimal, tax which is decimal, shipping which is decimal gives decimal
    give subtotal + tax + shipping
  end action
  
  action format_order_summary with order_id which is int, email which is text, total which is decimal gives text
    give "Order #[order_id] for [email] - Total: $[total]"
  end action
  
  action get_status_message with status which is text gives text
    when status is equal to "pending" then
      give "⏳ Order received and pending processing"
    end when
    
    when status is equal to "processing" then
      give "📦 Order is being processed"
    end when
    
    when status is equal to "shipped" then
      give "🚚 Order has been shipped"
    end when
    
    when status is equal to "delivered" then
      give "✅ Order delivered successfully"
    end when
    
    give "❓ Unknown status: [status]"
  end action
end module

set tax_amount from run order_operations.calculate_tax with order_subtotal, tax_rate
set total_amount from run order_operations.calculate_order_total with order_subtotal, tax_amount, shipping_cost
set order_summary from run order_operations.format_order_summary with order_id, customer_email, total_amount
set status_message from run order_operations.get_status_message with order_status

display "Order Processing:"
display order_summary
display status_message
display "Subtotal: $[order_subtotal]"
display "Tax: $[tax_amount]"
display "Shipping: $[shipping_cost]"
display "Total: $[total_amount]"
```

## Working with Collections of Structured Data

### Managing Multiple Records

```droe
data Employee
  employee_id is int
  name is text
  department is text
  salary is decimal
  start_date is text
  is_active is flag
end data

// Employee data using collections
set employee_ids which are list of int to [1001, 1002, 1003]
set employee_names which are list of text to ["Alice Johnson", "Bob Smith", "Carol Davis"]
set employee_departments which are list of text to ["Engineering", "Sales", "Marketing"]
set employee_salaries which are list of decimal to [85000.00, 65000.00, 70000.00]

module employee_operations
  action calculate_total_payroll with salaries which are list of decimal gives decimal
    set total which is decimal to 0.0
    for each salary in salaries
      set total to total + salary
    end for
    give total
  end action
  
  action count_by_department with departments which are list of text, target_dept which is text gives int
    set count which is int to 0
    for each dept in departments
      when dept is equal to target_dept then
        set count to count + 1
      end when
    end for
    give count
  end action
  
  action format_employee_list with names which are list of text, departments which are list of text
    set index which is int to 0
    display "Employee Directory:"
    display "=================="
    for each name in names
      set index to index + 1
      // In real implementation, would access corresponding department by index
      display "[index]. [name]"
    end for
  end action
end module

set total_payroll from run employee_operations.calculate_total_payroll with employee_salaries
set engineering_count from run employee_operations.count_by_department with employee_departments, "Engineering"

run employee_operations.format_employee_list with employee_names, employee_departments

display ""
display "Payroll Summary:"
display "Total Payroll: $[total_payroll]"
display "Engineering Employees: [engineering_count]"
```

### Inventory Management

```droe
data InventoryItem
  sku is text
  name is text
  category is text
  current_stock is int
  reorder_point is int
  unit_cost is decimal
  last_updated is text
end data

// Inventory data
set item_skus which are list of text to ["SKU001", "SKU002", "SKU003", "SKU004"]
set item_names which are list of text to ["Laptop", "Mouse", "Keyboard", "Monitor"]
set item_categories which are list of text to ["Computers", "Accessories", "Accessories", "Displays"]
set current_stocks which are list of int to [15, 45, 28, 8]
set reorder_points which are list of int to [10, 20, 15, 5]
set unit_costs which are list of decimal to [899.99, 29.99, 79.99, 299.99]

module inventory_operations
  action check_reorder_needed with current which is int, reorder_point which is int gives flag
    give current <= reorder_point
  end action
  
  action calculate_inventory_value with stocks which are list of int, costs which are list of decimal gives decimal
    set total_value which is decimal to 0.0
    set index which is int to 0
    
    for each stock in stocks
      set index to index + 1
      // In real implementation, would access corresponding cost by index
      // For now, we'll use a simplified calculation
      set total_value to total_value + 100.0  // Placeholder
    end for
    
    give total_value
  end action
  
  action generate_reorder_report with skus which are list of text, stocks which are list of int, reorder_points which are list of int
    display "Reorder Report:"
    display "==============="
    set index which is int to 0
    set items_needing_reorder which is int to 0
    
    for each stock in stocks
      set index to index + 1
      set corresponding_reorder_point which is int to 10  // Simplified - would access by index
      
      set needs_reorder from run inventory_operations.check_reorder_needed with stock, corresponding_reorder_point
      
      when needs_reorder then
        set items_needing_reorder to items_needing_reorder + 1
        display "⚠️  Item [index]: Stock [stock] <= Reorder point [corresponding_reorder_point]"
      otherwise
        display "✅ Item [index]: Stock [stock] (OK)"
      end when
    end for
    
    display ""
    display "Items needing reorder: [items_needing_reorder]"
  end action
end module

set inventory_value from run inventory_operations.calculate_inventory_value with current_stocks, unit_costs

display "Inventory Management System"
display "=========================="
display "Total Inventory Value: $[inventory_value]"
display ""

run inventory_operations.generate_reorder_report with item_skus, current_stocks, reorder_points
```

## Data Validation Patterns

### Input Validation with Structured Data

```droe
data UserRegistration
  username is text
  email is text
  password is text
  age is int
  terms_accepted is flag
end data

module registration_validation
  action validate_username with username which is text gives flag
    when username is equal to "" then
      give false
    otherwise
      // Username length check (simplified)
      give true
    end when
  end action
  
  action validate_email with email which is text gives flag
    when email is equal to "" then
      give false
    otherwise
      // Email format check (simplified)
      give true
    end when
  end action
  
  action validate_password with password which is text gives flag
    when password is equal to "" then
      give false
    otherwise
      // Password strength check (simplified)
      give true
    end when
  end action
  
  action validate_age with age which is int gives flag
    when age is less than 13 or age is greater than 120 then
      give false
    otherwise
      give true
    end when
  end action
  
  action validate_registration with username which is text, email which is text, password which is text, age which is int, terms which is flag gives text
    set username_valid from run registration_validation.validate_username with username
    set email_valid from run registration_validation.validate_email with email
    set password_valid from run registration_validation.validate_password with password
    set age_valid from run registration_validation.validate_age with age
    
    when not username_valid then
      give "Invalid username: must not be empty"
    end when
    
    when not email_valid then
      give "Invalid email format"
    end when
    
    when not password_valid then
      give "Invalid password: must not be empty"
    end when
    
    when not age_valid then
      give "Invalid age: must be between 13 and 120"
    end when
    
    when not terms then
      give "Terms and conditions must be accepted"
    end when
    
    when username_valid and email_valid and password_valid and age_valid and terms then
      give "Registration data is valid"
    otherwise
      give "Registration validation failed"
    end when
  end action
end module

// Test registration data
set reg_username which is text to "alice_smith"
set reg_email which is text to "alice@example.com"
set reg_password which is text to "securePass123"
set reg_age which is int to 28
set reg_terms which is flag to true

set validation_result from run registration_validation.validate_registration with reg_username, reg_email, reg_password, reg_age, reg_terms

display "Registration Validation:"
display validation_result
```

## Best Practices for Data Structures

### 1. Clear Naming Conventions

```droe
// Good: Descriptive data structure names
data CustomerOrder
  customer_id is int
  order_date is text
  delivery_address is text
  payment_method is text
  order_status is text
end data

data ProductReview
  product_id is int
  reviewer_name is text
  rating is int
  review_text is text
  review_date is text
end data
```

### 2. Logical Grouping

```droe
// Good: Related fields grouped together
data ShippingAddress
  street_address is text
  city is text
  state is text
  postal_code is text
  country is text
end data

data BillingInfo
  cardholder_name is text
  card_number is text
  expiry_date is text
  billing_address is text
end data
```

### 3. Consistent Field Types

```droe
// Good: Consistent use of appropriate types
data EventLog
  event_id is int
  event_type is text
  event_timestamp is text
  user_id is int
  event_data is text
  severity_level is int
end data
```

### 4. Documentation with Comments

```droe
data Configuration
  // Database settings
  database_host is text
  database_port is int
  database_name is text
  
  // Security settings
  session_timeout is int      // Timeout in seconds
  max_login_attempts is int   // Maximum failed login attempts
  
  // Feature flags
  debug_mode is flag          // Enable debug logging
  maintenance_mode is flag    // Enable maintenance mode
end data
```

## Future Data Structure Features

While current Droe primarily uses data structures for documentation and planning, future versions may include:

- **Object instantiation**: Creating instances of data structures
- **Property access**: Accessing fields with dot notation
- **Method binding**: Attaching actions to data structures
- **Inheritance**: Extending data structures
- **Serialization**: Converting data structures to/from storage formats

## Working Around Current Limitations

Until full data structure support is implemented, use these patterns:

### Prefixed Variables

```droe
// User data with consistent prefixes
set user_id which is int to 12345
set user_name which is text to "Alice Johnson"
set user_email which is text to "alice@example.com"
set user_active which is flag to true

// Order data with consistent prefixes
set order_id which is int to 67890
set order_customer_id which is int to 12345
set order_date which is text to "2024-01-15"
set order_total which is decimal to 299.99
```

### Module-based Operations

```droe
module user_data
  action create_user_summary with id which is int, name which is text, email which is text gives text
    give "User #[id]: [name] ([email])"
  end action
  
  action validate_user_data with name which is text, email which is text gives flag
    when name is equal to "" or email is equal to "" then
      give false
    otherwise
      give true
    end when
  end action
end module
```

## Next Steps

Now that you understand data structures in Droe:

- **[Task Actions](/guide/task-actions/)** - Learn about specialized task automation
- **[CLI Reference](/guide/cli/)** - Command-line tools for development
- **[WebAssembly](/guide/webassembly/)** - Understanding compilation to WASM
- **[Modules](/guide/modules/)** - Review module organization patterns

Data structures provide a foundation for organizing complex data in your Droe applications. Use them to plan your data architecture and create maintainable, well-structured code.