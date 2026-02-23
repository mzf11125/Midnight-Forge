import { Config } from '../core/config';
import { CompactCompiler } from '../core/compiler';
import { discoverTests } from '../test-runner/discovery';
import { runTests } from '../test-runner/runner';
import { printTestResults } from '../test-runner/reporter';

export async function testCommand(filter?: string, options?: { json?: boolean }): Promise<void> {
  const configData = Config.find();
  if (!configData) {
    console.error('Error: No forge.toml found. Run "midnight-forge init" first.');
    process.exit(1);
  }

  const { config } = configData;
  const compiler = new CompactCompiler(config.compiler.path);

  const isAvailable = await compiler.isAvailable();
  if (!isAvailable) {
    console.error(`Error: Compact compiler not found at '${config.compiler.path}'`);
    console.error('Please install the Midnight toolchain.');
    process.exit(1);
  }

  const tests = await discoverTests();

  if (tests.length === 0) {
    console.log('No tests found.');
    return;
  }

  const summary = await runTests(tests, compiler, filter);

  if (options?.json) {
    console.log(JSON.stringify(summary, null, 2));
  } else {
    printTestResults(summary);
  }

  if (summary.failed > 0) {
    process.exit(1);
  }
}
