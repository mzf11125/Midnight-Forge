import chalk from 'chalk';
import { Finding, Severity } from './rules/validation';

export function printFindings(findings: Finding[], filePath: string): void {
  if (findings.length === 0) {
    console.log(chalk.green('\n✓ No issues found'));
    return;
  }

  console.log(`\nScanning ${filePath}...`);
  console.log(chalk.gray('━'.repeat(50)));

  for (const finding of findings) {
    let severityStr: string;
    switch (finding.severity) {
      case Severity.Critical:
        severityStr = chalk.red.bold('[CRITICAL]');
        break;
      case Severity.Warning:
        severityStr = chalk.yellow.bold('[WARNING]');
        break;
      case Severity.Info:
        severityStr = chalk.blue.bold('[INFO]');
        break;
    }

    console.log(`\n${severityStr} Line ${finding.line}: ${finding.message}`);
    if (finding.suggestion) {
      console.log(chalk.cyan(`  Suggestion: ${finding.suggestion}`));
    }
  }

  console.log('\n' + chalk.gray('━'.repeat(50)));

  const critical = findings.filter(f => f.severity === Severity.Critical).length;
  const warning = findings.filter(f => f.severity === Severity.Warning).length;
  const info = findings.filter(f => f.severity === Severity.Info).length;

  console.log(`\nScan Complete: ${critical} critical, ${warning} warning, ${info} info\n`);
}
