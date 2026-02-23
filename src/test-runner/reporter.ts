import chalk from 'chalk';
import { TestSummary } from './runner';

export function printTestResults(summary: TestSummary): void {
  console.log('\n' + chalk.gray('━'.repeat(50)));
  console.log(chalk.bold('\nTest Results\n'));

  for (const result of summary.results) {
    const status = result.passed 
      ? chalk.green.bold('✓')
      : chalk.red.bold('✗');

    console.log(`  ${status} ${result.name} (${result.duration}ms)`);

    if (result.error) {
      console.log(chalk.red(`    Error: ${result.error}`));
    }
  }

  console.log('\n' + chalk.gray('━'.repeat(50)));

  const summaryText = `Tests: ${summary.passed} passed, ${summary.failed} failed, ${summary.total} total`;
  
  if (summary.failed === 0) {
    console.log(chalk.green(summaryText));
  } else {
    console.log(chalk.red(summaryText));
  }

  console.log(`Time: ${summary.duration}ms\n`);
}
