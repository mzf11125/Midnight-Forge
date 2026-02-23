# Midnight Forge User Guide

## Installation

### Global Installation
```bash
npm install -g midnight-forge
```

### Local Development
```bash
git clone <repo>
cd midnight-forge
npm install
npm run build
npm link
```

## Quick Start

### 1. Create a New Project

```bash
midnight-forge init my-contract
cd my-contract
npm install
```

This creates:
- `forge.toml` - Configuration file
- `package.json` - npm project
- `tsconfig.json` - TypeScript configuration
- `contracts/Counter.compact` - Example contract
- `contracts/Counter.test.ts` - Example tests

### 2. Run Tests

```bash
midnight-forge test
```

Filter tests:
```bash
midnight-forge test Counter
```

JSON output for CI:
```bash
midnight-forge test --json > results.json
```

### 3. Security Scan

Scan a file:
```bash
midnight-forge scan contracts/Counter.compact
```

Scan a directory:
```bash
midnight-forge scan contracts/
```

JSON output:
```bash
midnight-forge scan contracts/ --json > scan.json
```

## Configuration

Edit `forge.toml`:

```toml
[project]
name = "MyContract"
version = "0.1.0"

[compiler]
path = "compact"  # Path to compact CLI

[test]
include = ["**/*.compact", "**/*.test.ts"]
exclude = ["node_modules/**"]

[scan]
severity = "warning"  # info|warning|critical
rules = ["all"]       # or specific: ["validation", "privacy"]
```

## Test Format

### Compact Tests

Midnight Forge works with existing Compact test files by compiling them with the `compact` compiler.

### TypeScript Tests

Create `.test.ts` files in your contracts directory:

```typescript
import { describe, it, expect } from './test-framework';

describe('Counter', () => {
  it('should increment', async () => {
    // Test implementation
    expect(true).toBe(true);
  });
});
```

## Security Rules

Phase 1 includes 5 rules:

1. **Missing Input Validation** - Circuit parameters without validation
2. **Private in Public Output** - Private values exposed in public functions
3. **Unbounded Loop** - Loops without explicit bounds
4. **Missing Access Control** - Public functions without ownership checks
5. **Hardcoded Values** - Sensitive literals in code

## CI/CD Integration

### GitHub Actions

```yaml
- name: Install Midnight Forge
  run: npm install -g midnight-forge

- name: Run Tests
  run: midnight-forge test --json > results.json

- name: Security Scan
  run: midnight-forge scan contracts/
```

Exit codes:
- `0` - Success
- `1` - Tests failed or security issues found

## Troubleshooting

### Compact compiler not found

Ensure the Midnight toolchain is installed and `compact` is in your PATH, or set the path in `forge.toml`:

```toml
[compiler]
path = "/path/to/compact"
```

### No tests found

Check your `forge.toml` include patterns and ensure test files match.

### Module not found errors

Run `npm install` in your project directory to install dependencies.

## Examples

### Example 1: Basic Contract Scan

```bash
$ midnight-forge scan contracts/

Scanning contracts/Counter.compact...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[WARNING] Line 12: Circuit parameter 'x' not validated
  Suggestion: Add: require(x > 0 && x < MAX_AMOUNT);

[CRITICAL] Line 4: Public function may return private values
  Suggestion: Ensure private values are not exposed

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Scan Complete: 1 critical, 1 warning, 0 info
```

### Example 2: JSON Output

```bash
$ midnight-forge scan contracts/ --json
{
  "files": [
    {
      "file": "contracts/Counter.compact",
      "findings": [
        {
          "rule": "missing-input-validation",
          "severity": "warning",
          "line": 12,
          "column": 0,
          "message": "Circuit parameter 'x' not validated",
          "suggestion": "Add: require(x > 0 && x < MAX_AMOUNT);"
        }
      ]
    }
  ]
}
```

## Advanced Usage

### Custom Compiler Path

```toml
[compiler]
path = "/usr/local/bin/compact"
```

### Exclude Patterns

```toml
[test]
exclude = ["node_modules/**", "dist/**", "build/**"]
```

### Severity Filtering

```toml
[scan]
severity = "critical"  # Only show critical issues
```

## API Reference

### Commands

| Command | Description | Options |
|---------|-------------|---------|
| `init [name]` | Create new project | - |
| `test [filter]` | Run tests | `--json` |
| `scan <path>` | Security scan | `--json` |
| `--version` | Show version | - |
| `--help` | Show help | - |

### Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | Tests failed or security issues found |

## Support

For issues or questions:
- Open an issue on GitHub
- Check the documentation
- Review examples in the `examples/` directory
