---
layout: guide.njk
title: Loops
description: Master iteration and repetitive tasks with Droe's for-each loops.
breadcrumbs:
  - title: Guide
    url: /guide/
  - title: Loops
prev:
  title: Conditionals
  url: /guide/conditionals/
next:
  title: Modules
  url: /guide/modules/
---

Loops allow you to repeat operations over collections or perform repetitive tasks efficiently. Droe provides intuitive `for each` loops that work naturally with collections.

## For-Each Loop Syntax

### Basic Structure

```droe
for each item in collection
  // Process each item
end for
```

### Simple Examples

```droe
set numbers which are list of int to [1, 2, 3, 4, 5]

display "Counting:"
for each number in numbers
  display "Number: [number]"
end for
```

## Working with Different Collection Types

### Lists of Different Types

```droe
// Text lists
set fruits which are list of text to ["apple", "banana", "cherry"]
for each fruit in fruits
  display "I like [fruit]s! 🍎"
end for

// Numeric lists
set prices which are list of decimal to [19.99, 29.50, 45.00]
for each price in prices
  display "Item costs $[price]"
end for

// Boolean lists
set settings which are list of flag to [true, false, true]
for each setting in settings
  display "Setting enabled: [setting]"
end for
```

### Groups (Unique Collections)

```droe
set unique_categories which are group of text to ["work", "personal", "work", "health"]

display "Available categories:"
for each category in unique_categories
  display "- [category]"
end for
// Note: "work" appears only once since groups contain unique values
```

## Processing and Calculations

### Accumulation Pattern

```droe
set daily_sales which are list of decimal to [150.25, 200.50, 175.75, 300.00, 225.25]
set total_sales which is decimal to 0.0
set day_count which is int to 0

for each sale in daily_sales
  set day_count to day_count + 1
  set total_sales to total_sales + sale
  display "Day [day_count]: $[sale]"
end for

set average_daily_sales to total_sales / day_count
display ""
display "Total Sales: $[total_sales]"
display "Average Daily Sales: $[average_daily_sales]"
```

### Finding Maximum and Minimum

```droe
set test_scores which are list of int to [85, 92, 78, 95, 88, 76, 94]
set highest_score which is int to 0
set lowest_score which is int to 100
set total_score which is int to 0
set student_count which is int to 0

for each score in test_scores
  set student_count to student_count + 1
  set total_score to total_score + score
  
  // Track highest score
  when score is greater than highest_score then
    set highest_score to score
  end when
  
  // Track lowest score
  when score is less than lowest_score then
    set lowest_score to score
  end when
  
  display "Student [student_count]: [score]%"
end for

set class_average which is decimal to total_score / student_count

display ""
display "Class Statistics:"
display "Highest Score: [highest_score]%"
display "Lowest Score: [lowest_score]%"
display "Class Average: [class_average]%"
```

## Conditional Processing in Loops

### Filtering Data

```droe
set all_temperatures which are list of decimal to [15.5, 25.2, 32.1, 18.7, 28.9, 35.4, 22.3]
set hot_days which is int to 0
set cold_days which is int to 0
set pleasant_days which is int to 0

display "Temperature Analysis:"
for each temp in all_temperatures
  when temp is greater than 30 then
    set hot_days to hot_days + 1
    display "[temp]°C - 🔥 Hot day!"
  end when
  
  when temp is less than 20 then
    set cold_days to cold_days + 1
    display "[temp]°C - 🧊 Cold day!"
  end when
  
  when temp is greater than or equal to 20 and temp is less than or equal to 30 then
    set pleasant_days to pleasant_days + 1
    display "[temp]°C - 🌤️ Pleasant day!"
  end when
end for

display ""
display "Summary: [hot_days] hot, [pleasant_days] pleasant, [cold_days] cold days"
```

### Validation and Error Handling

```droe
set user_emails which are list of text to ["alice@example.com", "bob@invalid", "carol@test.org", "", "dave@company.com"]
set valid_emails which is int to 0
set invalid_emails which is int to 0

display "Validating email addresses:"
for each email in user_emails
  when email is equal to "" then
    set invalid_emails to invalid_emails + 1
    display "❌ Empty email address"
  otherwise
    // Simplified validation - check for @ symbol
    when email is equal to "bob@invalid" then
      set invalid_emails to invalid_emails + 1
      display "❌ Invalid email: [email]"
    otherwise
      set valid_emails to valid_emails + 1
      display "✅ Valid email: [email]"
    end when
  end when
end for

display ""
display "Email validation complete:"
display "Valid: [valid_emails], Invalid: [invalid_emails]"
```

## Advanced Loop Patterns

### Multi-Collection Processing

```droe
set product_names which are list of text to ["Laptop", "Mouse", "Keyboard", "Monitor"]
set product_prices which are list of decimal to [999.99, 25.50, 75.00, 299.99]
set product_stock which are list of int to [5, 15, 8, 3]

set item_index which is int to 0
set total_inventory_value which is decimal to 0.0
set low_stock_items which is int to 0

display "Inventory Report:"
display "=================="

// Process stock quantities (we'll use index to correlate with other lists)
for each stock in product_stock
  set item_index to item_index + 1
  
  // In a real implementation, we'd access corresponding elements by index
  // For demo purposes, we'll work with the current stock value
  
  when stock is less than 5 then
    set low_stock_items to low_stock_items + 1
    display "⚠️  Item [item_index]: Low stock ([stock] units)"
  otherwise
    display "✅ Item [item_index]: Good stock ([stock] units)"
  end when
end for

display ""
display "Low stock items: [low_stock_items]"
```

### Nested Processing

```droe
set departments which are list of text to ["Sales", "Engineering", "Marketing"]
set department_scores which are list of int to [85, 92, 78]

set dept_index which is int to 0
set company_total which is int to 0

display "Department Performance Review:"
display "=============================="

for each score in department_scores
  set dept_index to dept_index + 1
  set company_total to company_total + score
  
  display "Department [dept_index] Score: [score]%"
  
  when score is greater than or equal to 90 then
    display "  🌟 Excellent performance!"
  end when
  
  when score is greater than or equal to 80 and score is less than 90 then
    display "  ⭐ Good performance!"
  end when
  
  when score is less than 80 then
    display "  📈 Room for improvement"
  end when
  
  display ""
end for

set company_average which is decimal to company_total / dept_index
display "Company Average: [company_average]%"
```

## Practical Applications

### Order Processing System

```droe
set order_ids which are list of int to [1001, 1002, 1003, 1004, 1005]
set order_amounts which are list of decimal to [150.00, 75.50, 300.25, 45.00, 200.75]

set processed_orders which is int to 0
set total_revenue which is decimal to 0.0
set large_orders which is int to 0
set small_orders which is int to 0

display "Processing Daily Orders:"
display "======================="

set order_index which is int to 0
for each order_id in order_ids
  set order_index to order_index + 1
  set processed_orders to processed_orders + 1
  
  // In real implementation, would access corresponding amount by index
  // For demo, we'll simulate processing
  
  display "Processing Order #[order_id]..."
  display "✅ Order #[order_id] processed successfully"
  display ""
end for

display "Order Processing Complete:"
display "Processed: [processed_orders] orders"
```

### Inventory Management

```droe
set item_codes which are list of text to ["SKU001", "SKU002", "SKU003", "SKU004"]
set stock_levels which are list of int to [25, 3, 15, 0]
set reorder_points which are list of int to [10, 5, 12, 8]

set reorder_needed which is int to 0
set out_of_stock which is int to 0
set adequate_stock which is int to 0

display "Inventory Status Check:"
display "======================"

set item_index which is int to 0
for each stock in stock_levels
  set item_index to item_index + 1
  
  when stock is equal to 0 then
    set out_of_stock to out_of_stock + 1
    display "🚨 Item [item_index]: OUT OF STOCK - Urgent reorder needed!"
  end when
  
  when stock is greater than 0 and stock is less than 10 then
    set reorder_needed to reorder_needed + 1
    display "⚠️  Item [item_index]: Low stock ([stock] units) - Reorder soon"
  end when
  
  when stock is greater than or equal to 10 then
    set adequate_stock to adequate_stock + 1
    display "✅ Item [item_index]: Adequate stock ([stock] units)"
  end when
end for

display ""
display "Inventory Summary:"
display "Out of stock: [out_of_stock] items"
display "Need reorder: [reorder_needed] items"
display "Adequate stock: [adequate_stock] items"
```

### Grade Processing

```droe
set student_names which are list of text to ["Alice", "Bob", "Carol", "David", "Eve"]
set assignment_scores which are list of int to [85, 92, 78, 95, 88]

set total_points which is int to 0
set passing_students which is int to 0
set failing_students which is int to 0
set honor_roll_students which is int to 0

display "Grade Report:"
display "============="

set student_index which is int to 0
for each score in assignment_scores
  set student_index to student_index + 1
  set total_points to total_points + score
  
  display "Student [student_index]: [score]%"
  
  when score is greater than or equal to 95 then
    set honor_roll_students to honor_roll_students + 1
    display "  🏆 Honor Roll - Outstanding!"
  end when
  
  when score is greater than or equal to 80 and score is less than 95 then
    set passing_students to passing_students + 1
    display "  ✅ Passing - Good work!"
  end when
  
  when score is greater than or equal to 70 and score is less than 80 then
    set passing_students to passing_students + 1
    display "  📊 Passing - Room for improvement"
  end when
  
  when score is less than 70 then
    set failing_students to failing_students + 1
    display "  ❌ Failing - Additional support needed"
  end when
  
  display ""
end for

set class_average which is decimal to total_points / student_index

display "Class Summary:"
display "Honor Roll: [honor_roll_students] students"
display "Passing: [passing_students] students"
display "Failing: [failing_students] students"
display "Class Average: [class_average]%"
```

## Loop Best Practices

### 1. Use Descriptive Variable Names

```droe
// Good: Clear iteration variable names
set customer_emails which are list of text to ["user1@example.com", "user2@example.com"]

for each email in customer_emails
  display "Sending newsletter to: [email]"
end for

// Avoid: Generic names
for each item in customer_emails
  display "Sending newsletter to: [item]"
end for
```

### 2. Initialize Accumulator Variables

```droe
// Good: Initialize accumulators before loop
set total_amount which is decimal to 0.0
set item_count which is int to 0

set prices which are list of decimal to [10.99, 25.50, 15.75]

for each price in prices
  set total_amount to total_amount + price
  set item_count to item_count + 1
end for
```

### 3. Use Conditionals for Complex Logic

```droe
set order_amounts which are list of decimal to [25.00, 150.00, 75.50, 300.00]
set small_orders which is int to 0
set medium_orders which is int to 0
set large_orders which is int to 0

for each amount in order_amounts
  when amount is less than 50 then
    set small_orders to small_orders + 1
  end when
  
  when amount is greater than or equal to 50 and amount is less than 200 then
    set medium_orders to medium_orders + 1
  end when
  
  when amount is greater than or equal to 200 then
    set large_orders to large_orders + 1
  end when
end for
```

### 4. Provide Progress Feedback

```droe
set large_dataset which are list of int to [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
set processed_count which is int to 0
set total_items which is int to 10

display "Processing large dataset..."

for each item in large_dataset
  set processed_count to processed_count + 1
  
  // Simulate processing work
  display "Processing item [item]... ([processed_count]/[total_items])"
  
  when processed_count % 5 is equal to 0 then
    display "Progress: [processed_count] items completed"
  end when
end for

display "✅ All items processed successfully!"
```

## Common Loop Patterns

### Counter Pattern

```droe
set items which are list of text to ["item1", "item2", "item3"]
set counter which is int to 0

for each item in items
  set counter to counter + 1
  display "[counter]. [item]"
end for
```

### Accumulator Pattern

```droe
set values which are list of int to [10, 20, 30, 40]
set sum which is int to 0

for each value in values
  set sum to sum + value
end for

display "Total: [sum]"
```

### Search Pattern

```droe
set names which are list of text to ["Alice", "Bob", "Carol", "David"]
set target_name which is text to "Carol"
set found which is flag to false

for each name in names
  when name is equal to target_name then
    set found to true
    display "Found: [name]"
  end when
end for

when not found then
  display "Name not found: [target_name]"
end when
```

### Validation Pattern

```droe
set inputs which are list of text to ["valid", "", "also_valid", "test"]
set valid_count which is int to 0
set invalid_count which is int to 0

for each input in inputs
  when input is equal to "" then
    set invalid_count to invalid_count + 1
  otherwise
    set valid_count to valid_count + 1
  end when
end for

display "Valid: [valid_count], Invalid: [invalid_count]"
```

## Next Steps

Now that you understand loops in Droe:

- **[Modules](/guide/modules/)** - Organize loop logic in reusable modules
- **[Actions](/guide/actions/)** - Create functions that process collections
- **[Data Structures](/guide/data-structures/)** - Loop through custom data types
- **[Task Actions](/guide/task-actions/)** - Combine loops with task automation

Loops are essential for processing collections and performing repetitive operations. Use them to build efficient, readable programs that handle data systematically.