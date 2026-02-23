# Midnight Forge

A testing, security, and profiling framework for Compact smart contracts on the Midnight Network.

## 🎯 Status: Phase 1 MVP Complete (TypeScript)

Built with TypeScript/Node.js for native integration with the Midnight ecosystem.

## Features

- **Test Runner**: Execute Compact tests with enhanced reporting
- **Security Scanner**: Static analysis for common vulnerabilities (5 rules)
- **TypeScript Native**: Integrates with `@midnight-ntwrk` packages
- **CI/CD Ready**: JSON output and proper exit codes
- **Colored Output**: Beautiful terminal output with severity indicators

## Quick Start

### Installation

```bash
npm install -g midnight-forge
```

Or use locally:

```bash
git clone <repo>
cd midnight-forge
npm install
npm run build
npm link
```

### Create a New Project

```bash
midnight-forge init my-contract
cd my-contract
npm install
```

This creates:
- `forge.toml` - Configuration file
- `package.json` - Node.js project
- `contracts/Counter.compact` - Example contract
- `contracts/Counter.test.ts` - Example tests

### Run Security Scan

```bash
midnight-forge scan contracts/
```

Example output:
```
Scanning contracts/Counter.compact...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[WARNING] Line 12: Circuit parameter 'x' not validated
  Suggestion: Add: require(x > 0 && x < MAX_AMOUNT);

[CRITICAL] Line 4: Public function may return private values
  Suggestion: Ensure private values are not exposed in public function returns

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Scan Complete: 1 critical, 1 warning, 0 info
```

### Run Tests

```bash
midnight-forge test
```

Note: Requires the Compact compiler (`compact`) to be installed.

### JSON Output for CI

```bash
midnight-forge test --json > results.json
midnight-forge scan contracts/ --json > scan.json
```

## Commands

- `midnight-forge init [name]` - Create new project with template
- `midnight-forge test [filter]` - Run tests with optional filter
- `midnight-forge test --json` - JSON output for CI/CD
- `midnight-forge scan <path>` - Run static security analysis
- `midnight-forge scan --json` - JSON output for CI/CD

## Configuration

Create a `forge.toml` in your project root:

```toml
[project]
name = "MyContract"
version = "0.1.0"

[compiler]
path = "compact"

[test]
include = ["**/*.compact", "**/*.test.ts"]
exclude = ["node_modules/**"]

[scan]
severity = "warning"  # info|warning|critical
rules = ["all"]       # or ["validation", "privacy", "access"]
```

## Security Rules (Phase 1)

1. **Missing Input Validation** - Circuit parameters without validation
2. **Private in Public Output** - Private values exposed in public functions
3. **Unbounded Loop** - Loops without explicit bounds
4. **Missing Access Control** - Public functions without ownership checks
5. **Hardcoded Values** - Sensitive literals in code

## Project Structure

```
midnight-forge/
├── src/
│   ├── cli.ts              # Entry point
│   ├── commands/           # Command handlers
│   ├── core/              # Config & compiler
│   ├── analyzer/          # Security scanner
│   └── test-runner/       # Test execution
├── examples/              # Example contracts
└── docs/                 # Documentation
```

## Technology Stack

- **TypeScript** - Native language for Midnight
- **Commander.js** - CLI framework
- **Chalk** - Colored terminal output
- **Glob** - File discovery
- **@iarna/toml** - TOML parsing

## Documentation

- [User Guide](docs/user-guide.md) - Comprehensive usage guide
- [Architecture](docs/architecture.md) - Technical architecture
- [Contributing](CONTRIBUTING.md) - Contribution guidelines

## Verification

```bash
# Build
npm run build

# Create project
midnight-forge init test-project
cd test-project

# Scan
midnight-forge scan contracts/

# Test (requires compact compiler)
midnight-forge test

# JSON output
midnight-forge test --json > results.json
```

## Roadmap

### Phase 1: MVP ✅ (Complete)
- CLI with init, test, scan commands
- Basic static analysis (5 rules)
- Console and JSON output
- TypeScript implementation

### Phase 2: Enhanced Analyzer (Planned)
- Full AST parser for Compact
- 20+ security rules
- HTML report generation
- Data flow analysis

### Phase 3: Profiler (Planned)
- Constraint count estimation
- Per-function breakdown
- Optimization hints

### Phase 4: Plugins (Planned)
- Plugin architecture
- Dynamic library loading
- Example plugins (coverage, gas estimator)

## Requirements

- Node.js 18+
- TypeScript 5.3+
- Compact compiler (for test execution)
- Midnight Network access (for integration tests)

## License

Apache 2.0

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Support

For issues, questions, or contributions, please open an issue on GitHub.
