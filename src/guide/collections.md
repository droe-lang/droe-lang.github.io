---
layout: guide.njk
title: Collections
description: Work with lists and groups to manage multiple values efficiently in Roelang.
breadcrumbs:
  - title: Guide
    url: /guide/
  - title: Collections
prev:
  title: Strings & Interpolation
  url: /guide/strings/
next:
  title: Conditionals
  url: /guide/conditionals/
---

Collections are essential for working with multiple values of the same type. Roelang provides two main collection types: **lists** (ordered collections) and **groups** (unordered collections with unique values).

## List Collections

### Declaration and Initialization

Lists store ordered collections of the same type:

```roe
// Lists of different types
set numbers which are list of int to [1, 2, 3, 4, 5]
set names which are list of text to ["Alice", "Bob", "Carol", "David"]
set prices which are list of decimal to [19.99, 29.50, 45.00]
set flags which are list of flag to [true, false, true, false]

// Empty lists
set empty_numbers which are list of int to []
set empty_names which are list of text to []
```

### List Operations

#### Iteration with For-Each

The most common operation is iterating over list elements:

```roe
set student_names which are list of text to ["Alice", "Bob", "Carol"]

display "Student List:"
for each name in student_names
  display "- [name]"
end for
```

#### Processing List Elements

```roe
set test_scores which are list of int to [85, 92, 78, 95, 88]
set total which is int to 0
set count which is int to 0

display "Individual Scores:"
for each score in test_scores
  display "Score: [score]"
  set total to total + score
  set count to count + 1
end for

set average which is decimal to total / count
display "Average: [average]"
```

#### Conditional Processing

```roe
set temperatures which are list of decimal to [23.5, 18.2, 31.7, 15.9, 28.3]

display "Temperature Analysis:"
for each temp in temperatures
  display "Temperature: [temp]°C"
  
  when temp is greater than 30 then
    display "  🔥 Hot day!"
  end when
  
  when temp is less than 20 then
    display "  🧊 Cold day!"
  end when
  
  when temp is greater than or equal to 20 and temp is less than or equal to 30 then
    display "  🌤️ Pleasant day!"
  end when
end for
```

### Practical List Examples

#### Shopping Cart

```roe
set item_names which are list of text to ["Laptop", "Mouse", "Keyboard", "Monitor"]
set item_prices which are list of decimal to [999.99, 25.50, 75.00, 299.99]
set cart_total which is decimal to 0.0

display "Shopping Cart:"
display "=============="

set index which is int to 0
for each price in item_prices
  // Get corresponding item name (simplified - in real implementation would need indexed access)
  set cart_total to cart_total + price
  set index to index + 1
  display "[index]. Item: $[price]"
end for

display "=============="
display "Total: $[cart_total]"
```

#### Grade Analysis

```roe
set student_grades which are list of int to [85, 92, 78, 95, 88, 76, 94, 82]
set passing_grade which is int to 80

set total_students which is int to 0
set passing_students which is int to 0
set failing_students which is int to 0
set grade_sum which is int to 0

for each grade in student_grades
  set total_students to total_students + 1
  set grade_sum to grade_sum + grade
  
  when grade is greater than or equal to passing_grade then
    set passing_students to passing_students + 1
    display "Grade [grade]: PASS ✅"
  otherwise
    set failing_students to failing_students + 1
    display "Grade [grade]: FAIL ❌"
  end when
end for

set class_average which is decimal to grade_sum / total_students

display ""
display "Class Summary:"
display "Total Students: [total_students]"
display "Passing: [passing_students]"
display "Failing: [failing_students]"
display "Class Average: [class_average]%"
```

## Group Collections

### Declaration and Initialization

Groups store unique values (no duplicates):

```roe
// Groups automatically remove duplicates
set unique_numbers which are group of int to [1, 2, 3, 2, 1, 4]  // Results in {1, 2, 3, 4}
set programming_languages which are group of text to ["Python", "Java", "Python", "JavaScript"]  // Results in {"Python", "Java", "JavaScript"}
set status_flags which are group of flag to [true, false, true, false]  // Results in {true, false}

// Empty groups
set empty_group which are group of int to []
```

### Group Operations

Groups work similarly to lists but maintain uniqueness:

```roe
set categories which are group of text to ["work", "personal", "work", "health", "personal", "finance"]

display "Unique Categories:"
for each category in categories
  display "- [category]"
end for
// Output will show each category only once
```

### Practical Group Examples

#### Unique Visitor Tracking

```roe
set visitor_countries which are group of text to ["USA", "Canada", "UK", "USA", "Germany", "Canada", "France", "UK"]

display "Unique Visitor Countries:"
set country_count which is int to 0

for each country in visitor_countries
  set country_count to country_count + 1
  display "[country_count]. [country]"
end for

display "Total unique countries: [country_count]"
```

#### Tag System

```roe
set article_tags which are group of text to ["programming", "tutorial", "beginner", "programming", "web", "tutorial"]

display "Article Tags:"
for each tag in article_tags
  display "#{tag}"
end for
```

## Advanced Collection Patterns

### Data Processing Pipeline

```roe
set raw_data which are list of decimal to [10.5, 8.2, 15.7, 12.3, 9.8, 14.1, 11.6]
set processed_count which is int to 0
set sum which is decimal to 0.0
set max_value which is decimal to 0.0
set min_value which is decimal to 999.0

display "Processing data pipeline..."

for each value in raw_data
  set processed_count to processed_count + 1
  set sum to sum + value
  
  // Track maximum
  when value is greater than max_value then
    set max_value to value
  end when
  
  // Track minimum
  when value is less than min_value then
    set min_value to value
  end when
  
  display "Processed: [value] (Running total: [sum])"
end for

set average to sum / processed_count

display ""
display "Pipeline Results:"
display "Items processed: [processed_count]"
display "Sum: [sum]"
display "Average: [average]"
display "Max: [max_value]"
display "Min: [min_value]"
```

### Multi-Collection Processing

```roe
set product_names which are list of text to ["Laptop", "Mouse", "Keyboard"]
set product_prices which are list of decimal to [999.99, 25.50, 75.00]
set product_quantities which are list of int to [2, 5, 3]

display "Inventory Report:"
display "================"

set total_value which is decimal to 0.0
set item_index which is int to 0

for each quantity in product_quantities
  set item_index to item_index + 1
  // In a real implementation, we'd access corresponding elements by index
  // For this example, we'll use the current quantity with simplified logic
  
  when quantity is greater than 0 then
    display "Item [item_index]: In stock ([quantity] units)"
  otherwise
    display "Item [item_index]: Out of stock"
  end when
end for
```

### Filtering and Categorization

```roe
set all_scores which are list of int to [95, 78, 85, 92, 65, 88, 76, 94, 82, 71]
set high_scores which are list of int to []
set medium_scores which are list of int to []
set low_scores which are list of int to []

set high_count which is int to 0
set medium_count which is int to 0
set low_count which is int to 0

display "Categorizing scores..."

for each score in all_scores
  when score is greater than or equal to 90 then
    display "Score [score]: HIGH 🌟"
    set high_count to high_count + 1
  end when
  
  when score is greater than or equal to 80 and score is less than 90 then
    display "Score [score]: MEDIUM 📊"
    set medium_count to medium_count + 1
  end when
  
  when score is less than 80 then
    display "Score [score]: LOW 📉"
    set low_count to low_count + 1
  end when
end for

display ""
display "Score Distribution:"
display "High (90+): [high_count] scores"
display "Medium (80-89): [medium_count] scores"
display "Low (<80): [low_count] scores"
```

## Collection Utility Patterns

### Counter Collections

```roe
module collection_utils
  action count_elements with items which are list of text gives int
    set count which is int to 0
    for each item in items
      set count to count + 1
    end for
    give count
  end action
  
  action sum_numbers with numbers which are list of int gives int
    set total which is int to 0
    for each number in numbers
      set total to total + number
    end for
    give total
  end action
  
  action find_max with numbers which are list of decimal gives decimal
    set max_val which is decimal to -999999.0
    for each number in numbers
      when number is greater than max_val then
        set max_val to number
      end when
    end for
    give max_val
  end action
end module

set test_items which are list of text to ["apple", "banana", "cherry"]
set test_numbers which are list of int to [10, 25, 15, 30]
set test_decimals which are list of decimal to [3.14, 2.71, 1.41, 4.47]

set item_count from run collection_utils.count_elements with test_items
set number_sum from run collection_utils.sum_numbers with test_numbers
set max_decimal from run collection_utils.find_max with test_decimals

display "Collection Statistics:"
display "Items: [item_count]"
display "Sum: [number_sum]"
display "Max: [max_decimal]"
```

### Validation Collections

```roe
set email_list which are list of text to ["alice@example.com", "bob@invalid", "carol@test.org", "dave@"]
set valid_emails which are list of text to []
set invalid_emails which are list of text to []

set valid_count which is int to 0
set invalid_count which is int to 0

display "Validating email addresses..."

for each email in email_list
  // Simplified email validation - check for @ symbol
  when email is equal to "" then
    display "❌ Empty email"
    set invalid_count to invalid_count + 1
  otherwise
    // In real implementation, would have proper email validation
    display "✅ Email: [email]"
    set valid_count to valid_count + 1
  end when
end for

display ""
display "Validation Results:"
display "Valid emails: [valid_count]"
display "Invalid emails: [invalid_count]"
```

## Best Practices

### 1. Choose the Right Collection Type

```roe
// Use lists for ordered data where duplicates matter
set daily_temperatures which are list of decimal to [23.5, 24.1, 23.8, 25.2]
set task_priorities which are list of text to ["high", "medium", "high", "low"]

// Use groups for unique collections
set user_roles which are group of text to ["admin", "user", "moderator", "admin"]  // No duplicate admins
set error_codes which are group of int to [404, 500, 404, 401, 500]  // Unique error types
```

### 2. Use Descriptive Variable Names

```roe
// Good: Descriptive collection names
set monthly_sales_figures which are list of decimal to [12000.50, 15500.75, 13200.25]
set active_user_sessions which are group of text to ["session1", "session2", "session3"]

// Avoid: Generic names
set data which are list of decimal to [12000.50, 15500.75, 13200.25]
set stuff which are group of text to ["session1", "session2", "session3"]
```

### 3. Initialize Collections Properly

```roe
// Good: Initialize with expected data or empty
set product_categories which are list of text to ["Electronics", "Books", "Clothing"]
set error_messages which are list of text to []  // Start empty, add as needed

// Good: Use meaningful initial values
set default_settings which are list of flag to [true, false, true]
```

### 4. Handle Empty Collections

```roe
set user_inputs which are list of text to []
set input_count which is int to 0

for each input in user_inputs
  set input_count to input_count + 1
  display "Processing: [input]"
end for

when input_count is equal to 0 then
  display "No inputs to process"
otherwise
  display "Processed [input_count] inputs"
end when
```

### 5. Use Collections in Modules

```roe
module inventory_manager
  action process_orders with order_ids which are list of int
    display "Processing orders..."
    for each order_id in order_ids
      display "Processing order #[order_id]"
    end for
    display "All orders processed"
  end action
  
  action unique_customers with customer_names which are list of text gives group of text
    // Convert list to group to get unique customers
    set unique_names which are group of text to []
    // In real implementation, would properly convert list to group
    give unique_names
  end action
end module
```

## Common Collection Patterns

### Accumulator Pattern

```roe
set expenses which are list of decimal to [125.50, 75.25, 200.00, 45.75]
set total_expenses which is decimal to 0.0

for each expense in expenses
  set total_expenses to total_expenses + expense
end for

display "Total expenses: $[total_expenses]"
```

### Search Pattern

```roe
set product_names which are list of text to ["Laptop", "Mouse", "Keyboard", "Monitor"]
set search_term which is text to "Mouse"
set found which is flag to false

for each product in product_names
  when product is equal to search_term then
    set found to true
    display "Found product: [product]"
  end when
end for

when not found then
  display "Product '[search_term]' not found"
end when
```

### Counting Pattern

```roe
set status_list which are list of text to ["active", "inactive", "active", "pending", "active"]
set active_count which is int to 0
set inactive_count which is int to 0
set pending_count which is int to 0

for each status in status_list
  when status is equal to "active" then
    set active_count to active_count + 1
  end when
  
  when status is equal to "inactive" then
    set inactive_count to inactive_count + 1
  end when
  
  when status is equal to "pending" then
    set pending_count to pending_count + 1
  end when
end for

display "Status Summary:"
display "Active: [active_count]"
display "Inactive: [inactive_count]"
display "Pending: [pending_count]"
```

## Next Steps

Now that you understand collections in Roelang:

- **[Conditionals](/guide/conditionals/)** - Using collection data in conditional logic
- **[Loops](/guide/loops/)** - Advanced iteration patterns with collections
- **[Modules](/guide/modules/)** - Creating collection utility modules
- **[Actions](/guide/actions/)** - Functions that work with collections

Collections are powerful tools for managing multiple values efficiently. Use them to process data, track state, and build robust applications with clean, readable code.