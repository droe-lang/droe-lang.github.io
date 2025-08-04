---
layout: guide.njk
title: Debugging
description: Learn techniques and tools for debugging and troubleshooting Roelang programs.
breadcrumbs:
  - title: Guide
    url: /guide/
  - title: Debugging
prev:
  title: WebAssembly
  url: /guide/webassembly/
---

Debugging is an essential skill for developing robust Roelang applications. This guide covers debugging techniques, common issues, and troubleshooting strategies for Roelang programs.

## Basic Debugging Techniques

### Using Display Statements

The simplest debugging technique is adding display statements to trace program execution:

```roe
set user_age which is int to 25
display "Debug: user_age = [user_age]"

when user_age is greater than or equal to 18 then
  display "Debug: User is adult, proceeding..."
  display "Access granted"
otherwise
  display "Debug: User is minor, access denied"
  display "Access denied"
end when
```

### Variable State Tracking

Track variable changes throughout program execution:

```roe
set counter which is int to 0
display "Debug: Initial counter = [counter]"

set numbers which are list of int to [1, 2, 3, 4, 5]

for each number in numbers
  set counter to counter + number
  display "Debug: Added [number], counter now = [counter]"
end for

display "Debug: Final counter = [counter]"
```

### Conditional Debug Output

Use flags to control debug output:

```roe
set debug_mode which is flag to true

module debug_utils
  action log_debug with message which is text
    when debug_mode then
      display "[DEBUG] [message]"
    end when
  end action
  
  action log_error with message which is text
    display "[ERROR] [message]"
  end action
  
  action log_info with message which is text
    display "[INFO] [message]"
  end action
end module

run debug_utils.log_info with "Starting application"
run debug_utils.log_debug with "Debug mode is enabled"

set user_input which is text to "alice"
run debug_utils.log_debug with "User input: [user_input]"

when user_input is equal to "" then
  run debug_utils.log_error with "Empty user input"
otherwise
  run debug_utils.log_info with "Processing user: [user_input]"
end when
```

## CLI Debugging Tools

### Verbose Compilation

Use verbose mode to see detailed compilation information:

```bash
# Compile with verbose output
roe compile src/main.roe --verbose

# This shows:
# - Parsing steps
# - Type checking results
# - Code generation phases
# - Output file information
```

### Debug Mode Execution

Run programs with debug information:

```bash
# Run with debug output
roe run src/main.roe --debug

# Run with execution trace
roe run src/main.roe --trace

# Combine debug and trace
roe run src/main.roe --debug --trace
```

### System Diagnostics

Check system setup and dependencies:

```bash
# Run system diagnostics
roe doctor

# Check specific components
roe doctor --component compiler
roe doctor --component runtime
roe doctor --component webassembly

# Verbose diagnostics
roe doctor --verbose
```

## Common Issues and Solutions

### Compilation Errors

#### Type Mismatch Errors

**Problem:**
```roe
set age which is int to "twenty-five"  // Error: type mismatch
```

**Error Message:**
```
Error: Type mismatch at line 1:25
Expected: int
Got: text
```

**Solution:**
```roe
set age which is int to 25  // Correct: use integer literal
```

#### Variable Not Declared

**Problem:**
```roe
display username  // Error: username not declared
```

**Error Message:**
```
Error: Undefined variable 'username' at line 1:9
```

**Solution:**
```roe
set username which is text to "alice"
display username  // Correct: declare before use
```

#### Missing Type Declaration

**Problem:**
```roe
set count to 5  // Error: missing type declaration
```

**Error Message:**
```
Error: Missing type declaration at line 1:5
Expected: 'which is <type>'
```

**Solution:**
```roe
set count which is int to 5  // Correct: explicit type
```

### Runtime Errors

#### Division by Zero

**Problem:**
```roe
set numerator which is int to 10
set denominator which is int to 0
set result to numerator / denominator  // Runtime error
```

**Debug with Protection:**
```roe
set numerator which is int to 10
set denominator which is int to 0

display "Debug: numerator = [numerator], denominator = [denominator]"

when denominator is equal to 0 then
  display "Error: Division by zero detected"
  set result which is decimal to 0.0
otherwise
  set result to numerator / denominator
  display "Result: [result]"
end when
```

#### Array Index Errors (Future Feature)

**Problem:**
```roe
set numbers which are list of int to [1, 2, 3]
// Accessing invalid index would cause error
```

**Debug Approach:**
```roe
set numbers which are list of int to [1, 2, 3]
set count which is int to 0

for each number in numbers
  set count to count + 1
  display "Processing item [count]: [number]"
end for

display "Total items processed: [count]"
```

### Logic Errors

#### Incorrect Conditional Logic

**Problem:**
```roe
set score which is int to 85
set passing_grade which is int to 80

// Logic error: using 'or' instead of 'and'
when score is greater than passing_grade or score is equal to passing_grade then
  display "Passed"
end when
```

**Debug with Explicit Checks:**
```roe
set score which is int to 85
set passing_grade which is int to 80

display "Debug: score = [score], passing_grade = [passing_grade]"
display "Debug: score > passing_grade = " // Would show comparison result

when score is greater than or equal to passing_grade then
  display "Debug: Condition met, student passed"
  display "Passed"
otherwise
  display "Debug: Condition not met, student failed"
  display "Failed"
end when
```

#### Loop Logic Issues

**Problem:**
```roe
set total which is int to 0
set numbers which are list of int to [1, 2, 3, 4, 5]

for each number in numbers
  set total to number  // Bug: should be total + number
end for

display "Total: [total]"  // Will only show last number
```

**Debug Version:**
```roe
set total which is int to 0
set numbers which are list of int to [1, 2, 3, 4, 5]
set iteration which is int to 0

display "Debug: Starting loop with total = [total]"

for each number in numbers
  set iteration to iteration + 1
  set previous_total to total
  set total to total + number  // Fixed: addition instead of assignment
  
  display "Debug: Iteration [iteration]: [previous_total] + [number] = [total]"
end for

display "Final total: [total]"
```

## Debugging Complex Programs

### Module Debugging

**Debug Module Actions:**
```roe
module calculator
  action add with a which is int, b which is int gives int
    display "Debug: calculator.add called with a=[a], b=[b]"
    set result to a + b
    display "Debug: calculator.add returning [result]"
    give result
  end action
  
  action multiply with x which is decimal, y which is decimal gives decimal
    display "Debug: calculator.multiply called with x=[x], y=[y]"
    set result to x * y
    display "Debug: calculator.multiply returning [result]"
    give result
  end action
end module

set sum from run calculator.add with 10, 5
display "Sum result: [sum]"

set product from run calculator.multiply with 3.14, 2.0
display "Product result: [product]"
```

### Data Flow Debugging

Track data flow through complex operations:

```roe
module data_processor
  action validate_input with input which is text gives flag
    display "Debug: Validating input: '[input]'"
    
    when input is equal to "" then
      display "Debug: Input is empty - invalid"
      give false
    otherwise
      display "Debug: Input is not empty - valid"
      give true
    end when
  end action
  
  action process_data with data which is text gives text
    display "Debug: Processing data: '[data]'"
    
    set is_valid from run data_processor.validate_input with data
    display "Debug: Validation result: [is_valid]"
    
    when is_valid then
      set result to "Processed: " + data
      display "Debug: Generated result: '[result]'"
      give result
    otherwise
      display "Debug: Invalid data, returning error message"
      give "Error: Invalid input"
    end when
  end action
end module

set user_input which is text to "test data"
display "Debug: Starting processing with input: '[user_input]'"

set final_result from run data_processor.process_data with user_input
display "Final result: [final_result]"
```

## Performance Debugging

### Timing and Performance

Add timing information to identify bottlenecks:

```roe
module performance_monitor
  action log_start with operation which is text
    display "[PERF] Starting: [operation]"
  end action
  
  action log_end with operation which is text
    display "[PERF] Completed: [operation]"
  end action
  
  action log_progress with operation which is text, current which is int, total which is int
    set percent which is decimal to (current * 100) / total
    display "[PERF] [operation]: [current]/[total] ([percent]%)"
  end action
end module

run performance_monitor.log_start with "Data processing"

set large_dataset which are list of int to [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
set processed_count which is int to 0
set total_count which is int to 10

for each item in large_dataset
  set processed_count to processed_count + 1
  
  // Simulate work
  set temp_result to item * 2
  
  when processed_count % 3 is equal to 0 then
    run performance_monitor.log_progress with "Processing", processed_count, total_count
  end when
end for

run performance_monitor.log_end with "Data processing"
```

### Memory Usage Debugging

Track memory-intensive operations:

```roe
module memory_monitor
  action log_allocation with operation which is text, size which is int
    display "[MEM] Allocating for [operation]: ~[size] items"
  end action
  
  action log_deallocation with operation which is text
    display "[MEM] Deallocating: [operation]"
  end action
end module

run memory_monitor.log_allocation with "Large number list", 1000

set large_numbers which are list of int to []
// In real implementation, would add 1000 items

run memory_monitor.log_deallocation with "Large number list"
```

## WebAssembly Debugging

### Inspecting Generated WebAssembly

```bash
# Compile to WebAssembly text format
roe compile src/main.roe --format wat

# View the generated .wat file
cat build/main.wat

# Validate WebAssembly module
wasm-validate build/main.wasm

# Disassemble binary WebAssembly
wasm-objdump -d build/main.wasm
```

### Runtime Debugging

Add debug output to the WebAssembly runtime:

```javascript
// Custom debug runtime (debug-run.js)
const fs = require('fs');

async function runWasmWithDebug(wasmFile) {
  console.log(`[DEBUG] Loading WASM file: ${wasmFile}`);
  const wasmBuffer = fs.readFileSync(wasmFile);
  
  const imports = {
    env: {
      display: (offset, length) => {
        console.log(`[DEBUG] Display called with offset=${offset}, length=${length}`);
        const memory = wasmInstance.exports.memory;
        const buffer = new Uint8Array(memory.buffer, offset, length);
        const text = new TextDecoder().decode(buffer);
        console.log(`[OUTPUT] ${text}`);
      }
    }
  };
  
  console.log('[DEBUG] Instantiating WASM module...');
  const wasmModule = await WebAssembly.instantiate(wasmBuffer, imports);
  const wasmInstance = wasmModule.instance;
  
  console.log('[DEBUG] Calling main function...');
  wasmInstance.exports.main();
  console.log('[DEBUG] Execution completed');
}

// Usage: node debug-run.js build/main.wasm
runWasmWithDebug(process.argv[2]);
```

## Debugging Best Practices

### 1. Use Descriptive Debug Messages

```roe
// Good: Descriptive debug messages
display "Debug: User authentication - checking credentials for [username]"
display "Debug: Database query returned [result_count] records"
display "Debug: Validation failed at step 3: email format check"

// Avoid: Vague messages
display "Debug: here"
display "Debug: value is [value]"
display "Debug: error"
```

### 2. Create Debug Utilities

```roe
module debug_helpers
  action dump_variables with name which is text, age which is int, active which is flag
    display "=== Variable Dump ==="
    display "Name: [name]"
    display "Age: [age]"
    display "Active: [active]"
    display "==================="
  end action
  
  action trace_function_entry with function_name which is text, param1 which is text, param2 which is text
    display ">>> Entering [function_name]([param1], [param2])"
  end action
  
  action trace_function_exit with function_name which is text, result which is text
    display "<<< Exiting [function_name] with result: [result]"
  end action
end module
```

### 3. Progressive Debugging

Build complexity gradually:

```roe
// Step 1: Test basic functionality
display "Step 1: Basic display working"

// Step 2: Test variables
set test_var which is int to 42
display "Step 2: Variable test_var = [test_var]"

// Step 3: Test conditionals
when test_var is greater than 0 then
  display "Step 3: Conditional logic working"
end when

// Step 4: Test loops
set test_numbers which are list of int to [1, 2, 3]
display "Step 4: Testing loop..."
for each num in test_numbers
  display "  Number: [num]"
end for

// Step 5: Test modules
module test_module
  action test_action with input which is int gives int
    display "Step 5: Module action called with [input]"
    give input * 2
  end action
end module

set result from run test_module.test_action with 5
display "Step 5: Module result = [result]"
```

### 4. Error Boundaries

Implement error boundaries in your code:

```roe
module safe_operations
  action safe_divide with numerator which is decimal, denominator which is decimal gives decimal
    when denominator is equal to 0.0 then
      display "Warning: Division by zero, returning 0"
      give 0.0
    otherwise
      give numerator / denominator
    end when
  end action
  
  action safe_process_user with username which is text gives text
    when username is equal to "" then
      display "Error: Empty username provided"
      give "Invalid user"
    otherwise
      give "Processed: " + username
    end when
  end action
end module
```

## Troubleshooting Checklist

When encountering issues, follow this systematic approach:

### 1. Compilation Issues
- [ ] Check syntax for typos and missing keywords
- [ ] Verify all variables are declared with types
- [ ] Ensure all blocks have proper `end` statements
- [ ] Check for reserved keyword usage

### 2. Runtime Issues
- [ ] Add debug output to trace execution flow
- [ ] Check variable values at key points
- [ ] Verify conditional logic with explicit tests
- [ ] Test edge cases (empty strings, zero values, etc.)

### 3. Logic Issues
- [ ] Break down complex operations into smaller steps
- [ ] Test each component independently
- [ ] Verify loop logic with simple examples
- [ ] Check module action parameters and return values

### 4. Performance Issues
- [ ] Add timing information to identify bottlenecks
- [ ] Monitor memory usage patterns
- [ ] Check for unnecessary operations in loops
- [ ] Profile WebAssembly execution

## Advanced Debugging Techniques

### State Machine Debugging

For complex state-based programs:

```roe
set current_state which is text to "idle"
set debug_enabled which is flag to true

module state_machine
  action change_state with from_state which is text, to_state which is text, reason which is text
    when debug_enabled then
      display "[STATE] Changing from '[from_state]' to '[to_state]' - Reason: [reason]"
    end when
    
    set current_state to to_state
  end action
  
  action validate_transition with from_state which is text, to_state which is text gives flag
    when debug_enabled then
      display "[STATE] Validating transition: '[from_state]' -> '[to_state]'"
    end when
    
    // Add validation logic here
    give true
  end action
end module

run state_machine.change_state with current_state, "processing", "User initiated action"
```

### Integration Testing

Test interactions between modules:

```roe
module integration_tests
  action test_user_workflow
    display "[TEST] Starting user workflow integration test"
    
    // Test user creation
    set user_created from run user_service.create_user with "testuser", "test@example.com"
    display "[TEST] User creation result: [user_created]"
    
    // Test authentication
    set auth_result from run auth_service.authenticate with "testuser", "password"
    display "[TEST] Authentication result: [auth_result]"
    
    // Test data processing
    set process_result from run data_service.process with "test data"
    display "[TEST] Data processing result: [process_result]"
    
    display "[TEST] Integration test completed"
  end action
end module

run integration_tests.test_user_workflow
```

## Next Steps

Now that you understand debugging in Roelang:

- **[CLI Reference](/guide/cli/)** - Learn debugging command-line options
- **[WebAssembly](/guide/webassembly/)** - Debug WebAssembly output
- **[Performance](/guide/performance/)** - Optimize program performance
- **[Best Practices](/guide/best-practices/)** - Write maintainable code

Effective debugging is crucial for developing reliable Roelang applications. Use these techniques to identify and resolve issues quickly, and build robust, maintainable programs.