import * as fs from 'fs';
import * as path from 'path';

const FORGE_TOML = `[project]
name = "{{name}}"
version = "0.1.0"

[compiler]
path = "compact"

[test]
include = ["**/*.compact", "**/*.test.ts"]
exclude = ["node_modules/**"]

[scan]
severity = "warning"
rules = ["all"]
`;

const PACKAGE_JSON = `{
  "name": "{{name}}",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "compile": "compact compile contracts/Counter.compact",
    "test": "midnight-forge test",
    "scan": "midnight-forge scan contracts/"
  },
  "devDependencies": {
    "typescript": "^5.3.3",
    "@types/node": "^20.10.6"
  }
}
`;

const TSCONFIG_JSON = `{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
`;

const COUNTER_COMPACT = `contract Counter {
  state count: Field;

  pub fn increment() {
    this.count = this.count + 1;
  }

  pub fn get() -> Field {
    return this.count;
  }

  circuit privateIncrement(private x: Field) {
    this.count = this.count + x;
  }
}
`;

const COUNTER_TEST = `import { describe, it, expect } from './test-framework';

describe('Counter', () => {
  it('should increment', async () => {
    // Test implementation
    expect(true).toBe(true);
  });
});
`;

export async function initCommand(name?: string): Promise<void> {
  const projectName = name || 'my-contract';
  const projectPath = path.join(process.cwd(), projectName);

  if (fs.existsSync(projectPath)) {
    console.error(`Error: Directory '${projectName}' already exists`);
    process.exit(1);
  }

  fs.mkdirSync(projectPath);
  fs.mkdirSync(path.join(projectPath, 'contracts'));

  fs.writeFileSync(
    path.join(projectPath, 'forge.toml'),
    FORGE_TOML.replace(/{{name}}/g, projectName)
  );

  fs.writeFileSync(
    path.join(projectPath, 'package.json'),
    PACKAGE_JSON.replace(/{{name}}/g, projectName)
  );

  fs.writeFileSync(
    path.join(projectPath, 'tsconfig.json'),
    TSCONFIG_JSON
  );

  fs.writeFileSync(
    path.join(projectPath, 'contracts', 'Counter.compact'),
    COUNTER_COMPACT
  );

  fs.writeFileSync(
    path.join(projectPath, 'contracts', 'Counter.test.ts'),
    COUNTER_TEST
  );

  console.log(`✓ Created project '${projectName}'`);
  console.log('\nNext steps:');
  console.log(`  cd ${projectName}`);
  console.log('  npm install');
  console.log('  midnight-forge test');
  console.log('  midnight-forge scan contracts/');
}
