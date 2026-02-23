# Midnight Forge Architecture

## Overview

Midnight Forge is a TypeScript/Node.js testing and security framework for Compact smart contracts on the Midnight Network.

## Technology Stack

- **Language**: TypeScript 5.3+
- **Runtime**: Node.js 18+
- **CLI Framework**: Commander.js 11.0+
- **Terminal Colors**: Chalk 4.1+
- **File Discovery**: Glob 10.3+
- **Config Parsing**: @iarna/toml 2.2+

## Components

### CLI (`src/cli.ts`)
- Entry point for all commands
- Command routing with Commander.js
- Version and help management
- User-facing interface

### Commands (`src/commands/`)
- **init.ts**: Project initialization with templates
- **test.ts**: Test discovery and execution
- **scan.ts**: Security analysis orchestration

### Core (`src/core/`)
- **config.ts**: Configuration management (forge.toml)
- **compiler.ts**: Compact compiler interface via child_process

### Analyzer (`src/analyzer/`)
- **lexer.ts**: Tokenization of Compact source
- **rules/**: Security pattern detection
  - validation.ts: Input validation checks
  - privacy.ts: Privacy leak detection
  - common.ts: Access control, loops, hardcoded values
- **index.ts**: Analyzer orchestration
- **reporter.ts**: Colored console output

### Test Runner (`src/test-runner/`)
- **discovery.ts**: Find test files via glob patterns
- **runner.ts**: Execute tests via Compact compiler
- **reporter.ts**: Format test results

## Data Flow

```
User Command
    ↓
CLI Parser (Commander.js)
    ↓
Command Handler (init/test/scan)
    ↓
Core Services (Config, Compiler)
    ↓
Test Runner / Analyzer
    ↓
Reporter (Console/JSON)
    ↓
Terminal Output
```

## Security Analysis Flow

```
scan command
    ↓
Find .compact files (glob)
    ↓
For each file:
    ↓
Read source → Tokenize (lexer)
    ↓
Apply rules:
  - ValidationRule
  - PrivacyRule
  - AccessControlRule
  - UnboundedLoopRule
  - HardcodedValueRule
    ↓
Collect findings
    ↓
Reporter (colored or JSON)
    ↓
Exit with code (0 or 1)
```

## Test Execution Flow

```
test command
    ↓
Load config (forge.toml)
    ↓
Discover tests (glob patterns)
    ↓
For each test:
  - .compact → compile with compact CLI
  - .test.ts → execute with ts-node
    ↓
Collect results
    ↓
Reporter (colored or JSON)
    ↓
Exit with code (0 or 1)
```

## Configuration System

```
Config.find()
    ↓
Walk up directory tree
    ↓
Find forge.toml
    ↓
Parse with @iarna/toml
    ↓
Return { root, config }
```

## Extension Points

### Phase 2 Enhancements
- **AST Parser**: Replace regex with proper parsing
- **More Rules**: Expand from 5 to 20+ security rules
- **HTML Reports**: Generate visual reports
- **Runtime Integration**: Use @midnight-ntwrk packages directly

### Phase 3 Profiler
- Constraint counting
- Performance analysis
- Optimization suggestions

### Phase 4 Plugins
- Plugin architecture
- Dynamic rule loading
- Custom reporters

## Build Process

```
TypeScript Source (src/)
    ↓
tsc (TypeScript Compiler)
    ↓
JavaScript Output (dist/)
    ↓
Executable CLI (dist/cli.js)
```

## Distribution

```
npm package
    ↓
bin: { "midnight-forge": "./dist/cli.js" }
    ↓
npm install -g midnight-forge
    ↓
Global command: midnight-forge
```

## Design Principles

1. **Modular**: Clear separation of concerns
2. **Extensible**: Easy to add new rules and features
3. **TypeScript Native**: Aligns with Midnight ecosystem
4. **Developer Friendly**: Colored output, helpful messages
5. **CI/CD Ready**: JSON output, proper exit codes

## File Structure

```
midnight-forge/
├── src/
│   ├── cli.ts              # Entry point
│   ├── commands/
│   │   ├── init.ts         # Project creation
│   │   ├── test.ts         # Test execution
│   │   └── scan.ts         # Security scanning
│   ├── core/
│   │   ├── config.ts       # Configuration
│   │   └── compiler.ts     # Compiler interface
│   ├── analyzer/
│   │   ├── lexer.ts        # Tokenization
│   │   ├── rules/          # Security rules
│   │   ├── index.ts        # Orchestration
│   │   └── reporter.ts     # Output
│   └── test-runner/
│       ├── discovery.ts    # Find tests
│       ├── runner.ts       # Execute tests
│       └── reporter.ts     # Format results
├── dist/                   # Compiled output
├── package.json
├── tsconfig.json
└── README.md
```

## Dependencies

### Production
- commander: CLI framework
- chalk: Terminal colors
- glob: File pattern matching
- @iarna/toml: TOML parsing

### Development
- typescript: TypeScript compiler
- @types/node: Node.js type definitions
- ts-node: TypeScript execution

## Integration with Midnight

- Uses `compact` CLI via child_process
- Compatible with Compact source files
- Ready for @midnight-ntwrk package integration
- Follows Midnight project conventions
