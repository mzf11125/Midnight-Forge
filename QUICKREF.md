# Midnight Forge - Quick Reference

## Installation

```bash
npm install -g midnight-forge
# or
npm install && npm run build && npm link
```

## Commands

| Command | Description | Example |
|---------|-------------|---------|
| `init [name]` | Create new project | `midnight-forge init my-contract` |
| `test [filter]` | Run tests | `midnight-forge test` |
| `test --json` | JSON output | `midnight-forge test --json > results.json` |
| `scan <path>` | Security scan | `midnight-forge scan contracts/` |
| `scan --json` | JSON output | `midnight-forge scan contracts/ --json` |
| `--version` | Show version | `midnight-forge --version` |
| `--help` | Show help | `midnight-forge --help` |

## Security Rules

| Rule | Severity | Description |
|------|----------|-------------|
| Missing Input Validation | Warning | Circuit params without validation |
| Private in Public Output | Critical | Private values in public functions |
| Unbounded Loop | Warning | Loops without bounds |
| Missing Access Control | Warning | Public functions without checks |
| Hardcoded Values | Info | Sensitive literals in code |

## Configuration (forge.toml)

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
rules = ["all"]
```

## Exit Codes

- `0` - Success
- `1` - Tests failed or security issues found

## Typical Workflow

```bash
# 1. Create project
midnight-forge init my-contract
cd my-contract
npm install

# 2. Edit contracts/Contract.compact
# ... write your contract ...

# 3. Scan for issues
midnight-forge scan contracts/

# 4. Write tests in contracts/Contract.test.ts
# ... write tests ...

# 5. Run tests
midnight-forge test

# 6. CI/CD
midnight-forge test --json > results.json
midnight-forge scan contracts/ --json > scan.json
```

## Project Structure

```
my-contract/
├── forge.toml              # Configuration
├── package.json            # npm project
├── tsconfig.json           # TypeScript config
└── contracts/
    ├── Contract.compact    # Your contract
    └── Contract.test.ts    # Your tests
```

## Test Format (.test.ts)

```typescript
import { describe, it, expect } from './test-framework';

describe('Contract', () => {
  it('should work', async () => {
    expect(true).toBe(true);
  });
});
```

## Common Issues

### Compact compiler not found
```toml
[compiler]
path = "/path/to/compact"  # Set full path
```

### No tests found
Check `include` patterns in `forge.toml`

### Scan finds too many issues
```toml
[scan]
severity = "critical"  # Only show critical
rules = ["privacy"]    # Only specific rules
```

## Output Examples

### Console Output
```
Scanning contracts/Counter.compact...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[WARNING] Line 12: Circuit parameter 'x' not validated
  Suggestion: Add: require(x > 0 && x < MAX_AMOUNT);

[CRITICAL] Line 4: Public function may return private values
  Suggestion: Ensure private values are not exposed

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Scan Complete: 1 critical, 1 warning, 0 info
```

### JSON Output
```json
{
  "files": [
    {
      "file": "contracts/Counter.compact",
      "findings": [
        {
          "rule": "missing-input-validation",
          "severity": "warning",
          "line": 12,
          "message": "Circuit parameter 'x' not validated"
        }
      ]
    }
  ]
}
```

## Documentation

- [README.md](README.md) - Overview
- [docs/user-guide.md](docs/user-guide.md) - Full guide
- [docs/architecture.md](docs/architecture.md) - Architecture
- [PHASE1_STATUS.md](PHASE1_STATUS.md) - Status
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contributing

## Technology Stack

- TypeScript 5.3+
- Commander.js 11.0+
- Chalk 4.1+
- Glob 10.3+
- @iarna/toml 2.2+

## Support

Open an issue on GitHub for bugs or questions.
