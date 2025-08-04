---
layout: guide.njk
title: WebAssembly
description: Understanding how Roe compiles to WebAssembly and leveraging WASM capabilities.
breadcrumbs:
  - title: Guide
    url: /guide/
  - title: WebAssembly
prev:
  title: CLI Reference
  url: /guide/cli/
next:
  title: Debugging
  url: /guide/debugging/
---

WebAssembly (WASM) is Roe's primary compilation target, providing near-native performance and cross-platform compatibility. This guide explains how Roe leverages WebAssembly and how to work with the compiled output.

## What is WebAssembly?

WebAssembly is a binary instruction format for a stack-based virtual machine. It's designed as a portable compilation target for programming languages, enabling deployment on the web, server, and embedded environments.

### Key Benefits for Roe

- **Performance**: Near-native execution speed
- **Portability**: Runs on any platform with a WASM runtime
- **Security**: Sandboxed execution environment
- **Interoperability**: Can interface with other languages
- **Compact**: Small binary size for efficient distribution

## Roe to WebAssembly Compilation

### Compilation Pipeline

```
.roe → Roe Compiler → .wat → wat2wasm → .wasm
```

1. **Roe Source** (`.roe`) - Your source code
2. **WebAssembly Text** (`.wat`) - Human-readable WASM format
3. **WebAssembly Binary** (`.wasm`) - Binary executable format

### Example Compilation

```bash
# Compile Roe to WebAssembly text format
roe compile src/main.roe

# This generates: build/main.wat

# Convert to binary format (done automatically)
wat2wasm build/main.wat -o build/main.wasm

# Run the WebAssembly module
node ~/.roelang/run.js build/main.wasm
```

## WebAssembly Text Format (.wat)

When you compile Roe code, you first get a `.wat` file. Here's what a simple Roe program looks like in WebAssembly text format:

### Simple Display Example

**Roe source:**
```roe
display "Hello, WebAssembly!"
```

**Generated WebAssembly text (.wat):**
```wat
(module
  (import "env" "display" (func $display (param i32 i32)))
  (memory (export "memory") 1)
  (data (i32.const 0) "Hello, WebAssembly!")
  
  (func $main (export "main")
    i32.const 0    ; string offset
    i32.const 19   ; string length
    call $display
  )
)
```

### Variables and Operations

**Roe source:**
```roe
set count which is int to 42
set name which is text to "Alice"
display "Count: [count], Name: [name]"
```

**Generated WebAssembly concepts:**
- Variables become local variables or global variables
- String interpolation becomes string concatenation operations
- Type checking is enforced at compile time

## WebAssembly Module Structure

### Memory Management

Roe uses WebAssembly's linear memory model:

```wat
(module
  (memory (export "memory") 2)  ; 2 pages = 128KB
  
  ;; String data stored in memory
  (data (i32.const 0) "Hello")
  (data (i32.const 5) "World")
  
  ;; Functions access memory using offsets
  (func $getString (param $offset i32) (param $length i32)
    ;; Memory access operations
  )
)
```

### Function Exports

Roe programs export a `main` function and any module actions:

```wat
(module
  ;; Main program entry point
  (func $main (export "main")
    ;; Program logic
  )
  
  ;; Exported module actions
  (func $calculate_add (export "calculate_add") (param i32 i32) (result i32)
    local.get 0
    local.get 1
    i32.add
  )
)
```

### Type System Mapping

Roe types map to WebAssembly as follows:

| Roe Type | WebAssembly Type | Storage |
|--------------|------------------|---------|
| `int` | `i32` | 32-bit integer |
| `decimal` | `f64` | 64-bit float |
| `flag` | `i32` | 0 = false, 1 = true |
| `text` | `i32, i32` | offset + length |
| `list of T` | `i32` | memory offset to array |

## Runtime Environment

### Node.js Runtime

Roe includes a Node.js runtime (`run.js`) that provides the execution environment:

```javascript
// Simplified version of run.js
const fs = require('fs');

async function runWasm(wasmFile) {
  const wasmBuffer = fs.readFileSync(wasmFile);
  
  const imports = {
    env: {
      display: (offset, length) => {
        const memory = wasmInstance.exports.memory;
        const buffer = new Uint8Array(memory.buffer, offset, length);
        const text = new TextDecoder().decode(buffer);
        console.log(text);
      }
    }
  };
  
  const wasmModule = await WebAssembly.instantiate(wasmBuffer, imports);
  const wasmInstance = wasmModule.instance;
  
  // Call main function
  wasmInstance.exports.main();
}
```

### Host Functions

The runtime provides host functions that Roe programs can import:

```wat
(module
  ;; Import host functions
  (import "env" "display" (func $display (param i32 i32)))
  (import "env" "input" (func $input (result i32)))
  (import "env" "file_read" (func $file_read (param i32 i32) (result i32)))
  
  ;; Your program uses these imports
)
```

## Performance Characteristics

### Optimization Benefits

WebAssembly provides several performance advantages:

```roe
// This Roe code...
set numbers which are list of int to [1, 2, 3, 4, 5]
set total which is int to 0

for each number in numbers
  set total to total + number
end for

display "Total: [total]"
```

Compiles to efficient WebAssembly that:
- Uses native integer arithmetic
- Minimizes memory allocations
- Leverages WASM's stack-based execution model
- Benefits from JIT compilation in modern runtimes

### Memory Efficiency

```wat
(module
  (memory (export "memory") 1)  ; Start with 64KB
  
  ;; Efficient memory layout
  (global $heap_pointer (mut i32) (i32.const 1024))
  
  (func $allocate (param $size i32) (result i32)
    ;; Simple bump allocator
    global.get $heap_pointer
    global.get $heap_pointer
    local.get $size
    i32.add
    global.set $heap_pointer
  )
)
```

## Cross-Platform Deployment

### Web Browsers

Deploy Roe programs in web browsers:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Roe in Browser</title>
</head>
<body>
    <script>
        async function loadRoe() {
            const response = await fetch('program.wasm');
            const bytes = await response.arrayBuffer();
            
            const imports = {
                env: {
                    display: (offset, length) => {
                        // Display in DOM instead of console
                        const memory = wasmModule.instance.exports.memory;
                        const buffer = new Uint8Array(memory.buffer, offset, length);
                        const text = new TextDecoder().decode(buffer);
                        document.body.innerHTML += '<p>' + text + '</p>';
                    }
                }
            };
            
            const wasmModule = await WebAssembly.instantiate(bytes, imports);
            wasmModule.instance.exports.main();
        }
        
        loadRoe();
    </script>
</body>
</html>
```

### Server Environments

Run Roe programs on servers:

```javascript
// server.js
const express = require('express');
const fs = require('fs');

const app = express();

app.get('/run-roelang', async (req, res) => {
    const wasmBuffer = fs.readFileSync('program.wasm');
    
    let output = '';
    const imports = {
        env: {
            display: (offset, length) => {
                const memory = wasmInstance.exports.memory;
                const buffer = new Uint8Array(memory.buffer, offset, length);
                const text = new TextDecoder().decode(buffer);
                output += text + '\n';
            }
        }
    };
    
    const wasmModule = await WebAssembly.instantiate(wasmBuffer, imports);
    const wasmInstance = wasmModule.instance;
    
    wasmInstance.exports.main();
    
    res.send(output);
});

app.listen(3000, () => {
    console.log('Roe server running on port 3000');
});
```

### Edge Computing

Deploy on edge platforms like Cloudflare Workers:

```javascript
// worker.js
export default {
    async fetch(request, env, ctx) {
        const wasmModule = await WebAssembly.instantiate(
            env.ROELANG_PROGRAM, // WASM binary stored as env variable
            {
                env: {
                    display: (offset, length) => {
                        // Handle display in edge environment
                    }
                }
            }
        );
        
        wasmModule.instance.exports.main();
        
        return new Response('Roe program executed');
    },
};
```

## Advanced WebAssembly Features

### Memory Management

```wat
(module
  (memory (export "memory") 1 10)  ; Min 1 page, max 10 pages
  
  ;; Custom memory allocator
  (global $free_pointer (mut i32) (i32.const 1024))
  
  (func $malloc (param $size i32) (result i32)
    ;; Allocation logic
    global.get $free_pointer
    global.get $free_pointer
    local.get $size
    i32.add
    global.set $free_pointer
  )
)
```

### Table and Function References

```wat
(module
  ;; Function table for dynamic dispatch
  (table (export "table") 10 funcref)
  
  ;; Function types
  (type $binary_op (func (param i32 i32) (result i32)))
  
  ;; Functions
  (func $add (type $binary_op) ...)
  (func $multiply (type $binary_op) ...)
  
  ;; Initialize table
  (elem (i32.const 0) $add $multiply)
)
```

### SIMD Operations (Future)

Future Roe versions may leverage WASM SIMD:

```wat
(module
  ;; SIMD operations for array processing
  (func $process_array (param $arr i32) (param $len i32)
    ;; Vector operations on arrays
    (v128.load (local.get $arr))
    (i32x4.add ...)
  )
)
```

## Debugging WebAssembly

### Source Maps

Future Roe versions will generate source maps:

```json
{
  "version": 3,
  "sources": ["main.roe"],
  "names": ["main", "display", "count"],
  "mappings": "AAAA,aAAA,OAAO,CAAC,..."
}
```

### Debugging Tools

Use WebAssembly debugging tools:

```bash
# Disassemble WASM binary
wasm-objdump -d program.wasm

# Validate WASM module
wasm-validate program.wasm

# Analyze WASM size
wasm-objdump -h program.wasm
```

### Browser DevTools

Modern browsers provide WASM debugging:

1. Open DevTools
2. Navigate to Sources tab
3. Find your WASM module
4. Set breakpoints in the disassembled code
5. Step through execution

## Performance Optimization

### Compilation Flags

```bash
# Optimize for size
roe compile src/main.roe --optimize-size

# Optimize for speed
roe compile src/main.roe --optimize-speed

# Debug build with symbols
roe compile src/main.roe --debug
```

### Profile-Guided Optimization

```bash
# Generate profile data
roe run src/main.roe --profile

# Use profile for optimization
roe compile src/main.roe --use-profile profile.data
```

### Manual Optimization Tips

1. **Minimize Memory Allocations**: Reuse variables where possible
2. **Use Appropriate Types**: Choose `int` over `decimal` when possible
3. **Batch Operations**: Process collections efficiently
4. **Avoid String Concatenation**: Use string interpolation instead

## WebAssembly Ecosystem Integration

### Interfacing with JavaScript

```javascript
// Load and interact with Roe WASM module
async function createRoeModule() {
    const wasmModule = await loadRoeWasm();
    
    return {
        // Call exported Roe functions
        calculateTotal: wasmModule.instance.exports.calculate_total,
        processData: wasmModule.instance.exports.process_data,
        
        // Access memory
        getMemory: () => wasmModule.instance.exports.memory,
        
        // Utility functions
        readString: (offset, length) => {
            const memory = wasmModule.instance.exports.memory;
            const buffer = new Uint8Array(memory.buffer, offset, length);
            return new TextDecoder().decode(buffer);
        }
    };
}
```

### Language Interoperability

WebAssembly enables Roe to work with other WASM-compiled languages:

```javascript
// Combine Roe with Rust, C++, etc.
const roelangModule = await loadRoeWasm();
const rustModule = await loadRustWasm();

// Share memory between modules
const sharedMemory = new WebAssembly.Memory({ initial: 10 });

// Use results from one in another
const roelangResult = roelangModule.calculate(data);
const finalResult = rustModule.process(roelangResult);
```

## Best Practices

### 1. Memory Management

```roe
// Good: Reuse variables
set temp which is int to 0
for each value in large_dataset
  set temp to process_value(value)
  // Use temp...
end for

// Avoid: Creating many temporary variables
for each value in large_dataset
  set temp1 which is int to process_value(value)
  set temp2 which is int to temp1 * 2
  // Creates many allocations
end for
```

### 2. Efficient Data Structures

```roe
// Good: Use appropriate collection types
set lookup which are group of text to unique_values  // O(1) lookup
set ordered which are list of text to sorted_values  // Maintain order

// Good: Process in batches
set batch_size which is int to 100
// Process data in batches to manage memory
```

### 3. Type Optimization

```roe
// Good: Use appropriate numeric types
set counter which is int to 0           // Integer for counting
set percentage which is decimal to 0.0  // Decimal for precision

// Good: Boolean flags for state
set is_ready which is flag to false     // Clear boolean logic
```

## Future WebAssembly Features

Roe will evolve to support new WebAssembly features:

- **Garbage Collection**: Automatic memory management
- **Exception Handling**: Structured exception support
- **Threads**: Multi-threaded execution
- **SIMD**: Vector operations for performance
- **Component Model**: Module composition and linking

## Next Steps

Now that you understand WebAssembly in Roe:

- **[Debugging](/guide/debugging/)** - Debug WebAssembly modules
- **[CLI Reference](/guide/cli/)** - Compilation and build commands
- **[Performance Tips](/guide/performance/)** - Optimize WASM output
- **[Deployment](/guide/deployment/)** - Deploy WASM applications

WebAssembly provides Roe with powerful capabilities for building high-performance, portable applications. Leverage these features to create efficient, cross-platform solutions.