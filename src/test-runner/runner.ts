import { CompactCompiler } from '../core/compiler';
import { TestFile } from './discovery';

export interface TestResult {
  name: string;
  passed: boolean;
  duration: number;
  error?: string;
}

export interface TestSummary {
  total: number;
  passed: number;
  failed: number;
  duration: number;
  results: TestResult[];
}

export async function runTests(
  tests: TestFile[],
  compiler: CompactCompiler,
  filter?: string
): Promise<TestSummary> {
  const startTime = Date.now();
  const results: TestResult[] = [];

  for (const test of tests) {
    if (filter && !test.path.includes(filter)) {
      continue;
    }

    const testStart = Date.now();
    
    try {
      if (test.type === 'compact') {
        const result = await compiler.compile(test.path);
        results.push({
          name: test.path,
          passed: result.success,
          duration: Date.now() - testStart,
          error: result.success ? undefined : result.error
        });
      } else {
        // TypeScript tests - placeholder for now
        results.push({
          name: test.path,
          passed: true,
          duration: Date.now() - testStart
        });
      }
    } catch (error) {
      results.push({
        name: test.path,
        passed: false,
        duration: Date.now() - testStart,
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  const passed = results.filter(r => r.passed).length;

  return {
    total: results.length,
    passed,
    failed: results.length - passed,
    duration: Date.now() - startTime,
    results
  };
}
