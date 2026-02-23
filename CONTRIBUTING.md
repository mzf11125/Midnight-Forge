# Contributing to Midnight Forge

Thank you for your interest in contributing to Midnight Forge!

## Development Setup

1. Clone the repository
2. Install Node.js 18+ and npm
3. Install dependencies:

```bash
npm install
```

4. Build the project:

```bash
npm run build
```

5. Test locally:

```bash
node dist/cli.js --version
```

## Project Structure

```
midnight-forge/
├── src/
│   ├── cli.ts          # Main entry point
│   ├── commands/       # Command handlers
│   ├── core/          # Core utilities
│   ├── analyzer/      # Security analysis
│   └── test-runner/   # Test execution
├── dist/              # Compiled output
├── examples/          # Example contracts
└── docs/             # Documentation
```

## Running Tests

```bash
# Build
npm run build

# Test init command
node dist/cli.js init test-project
cd test-project

# Test scan command
node ../dist/cli.js scan contracts/

# Test with JSON output
node ../dist/cli.js scan contracts/ --json
```

## Code Style

- Follow TypeScript best practices
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused

## Adding Security Rules

1. Create a new rule class in `src/analyzer/rules/`
2. Extend the `Rule` base class
3. Implement the `check()` method
4. Register in `src/analyzer/index.ts`
5. Add tests
6. Update documentation

Example:

```typescript
import { Rule, Finding, Severity } from './validation';

export class MyNewRule extends Rule {
  check(source: string, lines: string[]): Finding[] {
    const findings: Finding[] = [];
    
    // Your detection logic here
    
    return findings;
  }
}
```

## Adding Commands

1. Create a new file in `src/commands/`
2. Export an async function
3. Register in `src/cli.ts`
4. Update help text
5. Add documentation

## Submitting Changes

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Update documentation
6. Submit a pull request

## Pull Request Guidelines

- Clear description of changes
- Include tests if applicable
- Update relevant documentation
- Follow existing code style
- One feature per PR

## Testing Your Changes

Before submitting:

```bash
# Build
npm run build

# Test all commands
node dist/cli.js init test-pr
cd test-pr
node ../dist/cli.js scan contracts/
node ../dist/cli.js test
```

## Documentation

When adding features:
- Update README.md
- Update docs/user-guide.md
- Add examples if needed
- Update QUICKREF.md

## License

By contributing, you agree that your contributions will be licensed under Apache 2.0.

## Questions?

Open an issue for:
- Bug reports
- Feature requests
- Questions about contributing
- General discussion

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Follow project guidelines
