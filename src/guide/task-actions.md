---
layout: guide.njk
title: Task Actions
description: Learn about task-based automation and workflow management in Roe.
breadcrumbs:
  - title: Guide
    url: /guide/
  - title: Task Actions
prev:
  title: Data Structures
  url: /guide/data-structures/
next:
  title: CLI Reference
  url: /guide/cli/
---

Task actions in Roe provide a specialized way to define and execute discrete units of work or automation tasks. They're designed for workflow automation, process management, and building executable task sequences.

## Basic Task Syntax

### Simple Task Declaration

```roe
task task_name
  // Task implementation
end
```

### Task with Implementation

```roe
task send_notification
  display "Sending notification..."
  display "Notification sent successfully!"
end

// Execute the task
run send_notification
```

## Task Examples from Roe

Based on the Roe examples, here are working task patterns:

### Basic Task Actions

```roe
task send_reminder
  display "Don't forget to log in"
end

task greet_user
  display "Hello! Welcome to Roe"
  display "Hope you enjoy using task actions!"
end

task process_data
  set count to 5
  display "Processing data..."
  display count
  display "Processing complete!"
end

display "Running send_reminder task:"
run send_reminder

display ""
display "Running greet_user task:"
run greet_user

display ""
display "Running process_data task:"
run process_data

display ""
display "Task actions demonstration complete!"
```

## Practical Task Applications

### System Maintenance Tasks

```roe
task cleanup_temp_files
  display "🧹 Starting cleanup of temporary files..."
  display "Scanning temp directory..."
  display "Found 15 temporary files"
  display "Removing old files..."
  display "Cleanup completed successfully!"
end

task backup_database
  display "💾 Starting database backup..."
  set timestamp which is text to "2024-01-15-10-30"
  display "Creating backup: backup_[timestamp].sql"
  display "Backup completed successfully!"
end

task check_system_health
  display "🔍 Checking system health..."
  display "✅ CPU usage: Normal"
  display "✅ Memory usage: Normal"
  display "✅ Disk space: Available"
  display "✅ Network: Connected"
  display "System health check completed!"
end

display "=== System Maintenance Tasks ==="
run cleanup_temp_files
display ""
run backup_database
display ""
run check_system_health
```

### Data Processing Workflows

```roe
task validate_input_data
  display "📋 Validating input data..."
  set validation_errors which is int to 0
  display "Checking data format..."
  display "Checking required fields..."
  display "Validation completed: [validation_errors] errors found"
end

task transform_data
  display "🔄 Transforming data..."
  display "Converting formats..."
  display "Applying business rules..."
  display "Data transformation completed!"
end

task generate_report
  display "📊 Generating report..."
  set report_name which is text to "monthly_summary_2024_01.pdf"
  display "Processing data..."
  display "Creating visualizations..."
  display "Report generated: [report_name]"
end

task send_report_notification
  display "📧 Sending report notification..."
  display "Notifying stakeholders..."
  display "Email notifications sent!"
end

// Execute data processing workflow
display "=== Data Processing Workflow ==="
run validate_input_data
display ""
run transform_data
display ""
run generate_report
display ""
run send_report_notification
```

### User Management Tasks

```roe
task create_user_account
  display "👤 Creating new user account..."
  set new_user_id which is int to 12345
  display "Generating user ID: [new_user_id]"
  display "Setting up user profile..."
  display "Sending welcome email..."
  display "User account created successfully!"
end

task deactivate_inactive_users
  display "🔒 Deactivating inactive users..."
  set inactive_users which are list of int to [1001, 1002, 1003]
  set deactivated_count which is int to 0
  
  for each user_id in inactive_users
    set deactivated_count to deactivated_count + 1
    display "Deactivating user ID: [user_id]"
  end for
  
  display "Deactivated [deactivated_count] inactive users"
end

task generate_user_report
  display "📈 Generating user activity report..."
  display "Analyzing user data..."
  display "Creating summary statistics..."
  display "User report generated successfully!"
end

display "=== User Management Tasks ==="
run create_user_account
display ""
run deactivate_inactive_users
display ""
run generate_user_report
```

## Task Coordination and Sequencing

### Sequential Task Execution

```roe
task initialize_system
  display "🚀 Initializing system..."
  display "Loading configuration..."
  display "Connecting to database..."
  display "System initialized!"
end

task load_data
  display "📥 Loading data..."
  display "Reading from data sources..."
  display "Data loaded successfully!"
end

task start_services
  display "⚙️  Starting services..."
  display "Starting web server..."
  display "Starting background workers..."
  display "All services started!"
end

task verify_deployment
  display "✅ Verifying deployment..."
  display "Running health checks..."
  display "Testing endpoints..."
  display "Deployment verified!"
end

// Deployment sequence
display "=== Application Deployment Sequence ==="
run initialize_system
display ""
run load_data
display ""
run start_services
display ""
run verify_deployment
display ""
display "🎉 Deployment completed successfully!"
```

### Conditional Task Execution

```roe
task check_prerequisites
  display "🔍 Checking prerequisites..."
  set dependencies_met which is flag to true
  set config_valid which is flag to true
  
  when dependencies_met and config_valid then
    display "✅ All prerequisites met"
  otherwise
    display "❌ Prerequisites not satisfied"
  end when
end

task execute_main_process
  display "🏃 Executing main process..."
  display "Processing started..."
  display "Main process completed!"
end

task cleanup_resources
  display "🧹 Cleaning up resources..."
  display "Releasing locks..."
  display "Closing connections..."
  display "Cleanup completed!"
end

// Conditional execution workflow
display "=== Conditional Task Workflow ==="
run check_prerequisites

// In a real implementation, you'd check the result of prerequisites
set can_proceed which is flag to true

when can_proceed then
  display ""
  run execute_main_process
otherwise
  display "❌ Cannot proceed - prerequisites not met"
end when

display ""
run cleanup_resources
```

## Monitoring and Logging Tasks

### System Monitoring

```roe
task monitor_cpu_usage
  display "📊 Monitoring CPU usage..."
  set cpu_usage which is decimal to 45.5
  
  when cpu_usage is greater than 80 then
    display "⚠️  High CPU usage detected: [cpu_usage]%"
  otherwise
    display "✅ CPU usage normal: [cpu_usage]%"
  end when
end

task monitor_memory_usage
  display "💾 Monitoring memory usage..."
  set memory_usage which is decimal to 62.3
  
  when memory_usage is greater than 85 then
    display "⚠️  High memory usage detected: [memory_usage]%"
  otherwise
    display "✅ Memory usage normal: [memory_usage]%"
  end when
end

task check_disk_space
  display "💿 Checking disk space..."
  set disk_usage which is decimal to 78.9
  
  when disk_usage is greater than 90 then
    display "🚨 Critical: Disk space low: [disk_usage]%"
  end when
  
  when disk_usage is greater than 80 and disk_usage is less than or equal to 90 then
    display "⚠️  Warning: Disk space getting low: [disk_usage]%"
  otherwise
    display "✅ Disk space sufficient: [disk_usage]%"
  end when
end

task generate_monitoring_report
  display "📋 Generating monitoring report..."
  set timestamp which is text to "2024-01-15 10:30:00"
  display "Report timestamp: [timestamp]"
  display "Monitoring report generated!"
end

// System monitoring sequence
display "=== System Monitoring Tasks ==="
run monitor_cpu_usage
display ""
run monitor_memory_usage
display ""
run check_disk_space
display ""
run generate_monitoring_report
```

### Log Processing Tasks

```roe
task rotate_log_files
  display "🔄 Rotating log files..."
  set current_log_size which is decimal to 1024.5
  
  when current_log_size is greater than 1000 then
    display "Log file size: [current_log_size]MB - rotation needed"
    display "Creating archive: app.log.2024-01-15"
    display "Starting new log file"
  otherwise
    display "Log file size: [current_log_size]MB - no rotation needed"
  end when
end

task analyze_error_logs
  display "🔍 Analyzing error logs..."
  set error_count which is int to 15
  set warning_count which is int to 32
  
  display "Errors found: [error_count]"
  display "Warnings found: [warning_count]"
  
  when error_count is greater than 10 then
    display "⚠️  High error count detected - investigation needed"
  end when
end

task archive_old_logs
  display "📦 Archiving old log files..."
  set files_archived which is int to 8
  display "Archived [files_archived] old log files"
  display "Archive completed!"
end

display "=== Log Processing Tasks ==="
run rotate_log_files
display ""
run analyze_error_logs
display ""
run archive_old_logs
```

## Batch Processing Tasks

### Data Import/Export

```roe
task import_customer_data
  display "📥 Importing customer data..."
  set import_file which is text to "customers_2024_01.csv"
  set records_processed which is int to 0
  
  display "Reading file: [import_file]"
  
  // Simulate processing records
  set customer_records which are list of int to [1, 2, 3, 4, 5]
  for each record in customer_records
    set records_processed to records_processed + 1
    display "Processing customer record [record]: [records_processed]/5"
  end for
  
  display "Import completed: [records_processed] records processed"
end

task export_sales_data
  display "📤 Exporting sales data..."
  set export_file which is text to "sales_export_2024_01.xlsx"
  set sales_records which is int to 1247
  
  display "Generating export file: [export_file]"
  display "Exporting [sales_records] sales records..."
  display "Export completed successfully!"
end

task validate_data_integrity
  display "🔍 Validating data integrity..."
  set validation_checks which are list of text to ["duplicates", "nulls", "formats", "constraints"]
  set checks_passed which is int to 0
  
  for each check in validation_checks
    set checks_passed to checks_passed + 1
    display "✅ [check] validation passed"
  end for
  
  display "Data integrity validation completed: [checks_passed]/4 checks passed"
end

display "=== Data Import/Export Tasks ==="
run import_customer_data
display ""
run export_sales_data
display ""
run validate_data_integrity
```

## Task Best Practices

### 1. Clear Task Names

```roe
// Good: Descriptive task names
task backup_user_database
  display "Backing up user database..."
end

task send_password_reset_email
  display "Sending password reset email..."
end

task cleanup_temporary_files
  display "Cleaning up temporary files..."
end

// Avoid: Generic names
task task1
  display "Doing something..."
end
```

### 2. Informative Output

```roe
task process_orders
  display "📦 Processing orders..."
  set start_time which is text to "10:30:00"
  display "Started at: [start_time]"
  
  set orders_to_process which are list of int to [1001, 1002, 1003]
  set processed_count which is int to 0
  
  for each order_id in orders_to_process
    set processed_count to processed_count + 1
    display "Processing order #[order_id] ([processed_count]/3)"
  end for
  
  set end_time which is text to "10:35:00"
  display "Completed at: [end_time]"
  display "✅ Successfully processed [processed_count] orders"
end
```

### 3. Error Handling

```roe
task safe_file_operation
  display "📁 Performing file operation..."
  set file_exists which is flag to true
  set file_readable which is flag to true
  
  when not file_exists then
    display "❌ Error: File not found"
    display "Task aborted"
  otherwise
    when not file_readable then
      display "❌ Error: File not readable"
      display "Task aborted"
    otherwise
      display "✅ File operation completed successfully"
    end when
  end when
end
```

### 4. Progress Reporting

```roe
task bulk_data_processing
  display "🔄 Starting bulk data processing..."
  set total_items which is int to 100
  set processed_items which is int to 0
  set batch_size which is int to 10
  
  // Simulate processing in batches
  set batches which are list of int to [1, 2, 3, 4, 5]
  
  for each batch in batches
    set processed_items to processed_items + batch_size
    set progress_percent which is decimal to (processed_items * 100) / total_items
    display "Batch [batch] completed - Progress: [progress_percent]% ([processed_items]/[total_items])"
  end for
  
  display "✅ Bulk processing completed!"
end
```

## Task Coordination Patterns

### Master Task with Subtasks

```roe
task prepare_environment
  display "🛠️  Preparing environment..."
  display "Environment ready!"
end

task execute_tests
  display "🧪 Executing tests..."
  display "All tests passed!"
end

task generate_results
  display "📊 Generating results..."
  display "Results generated!"
end

task master_test_workflow
  display "🚀 Starting master test workflow..."
  
  run prepare_environment
  display ""
  
  run execute_tests
  display ""
  
  run generate_results
  display ""
  
  display "✅ Master workflow completed successfully!"
end

// Execute the master workflow
run master_test_workflow
```

### Parallel Task Simulation

```roe
task concurrent_task_a
  display "🔄 Task A: Starting..."
  display "🔄 Task A: Processing..."
  display "✅ Task A: Completed!"
end

task concurrent_task_b
  display "🔄 Task B: Starting..."
  display "🔄 Task B: Processing..."
  display "✅ Task B: Completed!"
end

task coordinate_parallel_tasks
  display "🚀 Coordinating parallel tasks..."
  display "Starting concurrent execution..."
  
  // In actual parallel execution, these would run simultaneously
  run concurrent_task_a
  run concurrent_task_b
  
  display "✅ All parallel tasks completed!"
end

run coordinate_parallel_tasks
```

## Next Steps

Now that you understand task actions in Roe:

- **[CLI Reference](/guide/cli/)** - Command-line tools for running tasks
- **[WebAssembly](/guide/webassembly/)** - How tasks compile to WASM
- **[Debugging](/guide/debugging/)** - Troubleshooting task execution
- **[Modules](/guide/modules/)** - Organizing tasks in modules

Task actions provide a powerful way to automate workflows and manage complex processes in Roe. Use them to build reliable, maintainable automation solutions.