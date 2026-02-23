import { glob } from 'glob';
import { Config } from '../core/config';

export interface TestFile {
  path: string;
  type: 'compact' | 'typescript';
}

export async function discoverTests(): Promise<TestFile[]> {
  const configData = Config.find();
  if (!configData) {
    throw new Error('No forge.toml found. Run "midnight-forge init" first.');
  }

  const { root, config } = configData;
  process.chdir(root);

  const tests: TestFile[] = [];

  for (const pattern of config.test.include) {
    const files = await glob(pattern);
    
    for (const file of files) {
      const isExcluded = config.test.exclude.some(ex => {
        const excludePattern = new RegExp(ex.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'));
        return excludePattern.test(file);
      });

      if (!isExcluded) {
        tests.push({
          path: file,
          type: file.endsWith('.compact') ? 'compact' : 'typescript'
        });
      }
    }
  }

  return tests;
}
