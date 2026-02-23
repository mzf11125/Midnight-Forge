import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';
import { analyzeFile } from '../analyzer';
import { printFindings } from '../analyzer/reporter';

export async function scanCommand(targetPath: string, options: { json?: boolean }): Promise<void> {
  if (!fs.existsSync(targetPath)) {
    console.error(`Error: Path '${targetPath}' does not exist`);
    process.exit(1);
  }

  let files: string[];
  if (fs.statSync(targetPath).isDirectory()) {
    files = await glob(`${targetPath}/**/*.compact`);
  } else {
    files = [targetPath];
  }

  if (files.length === 0) {
    console.log('No Compact files found.');
    return;
  }

  let totalFindings = 0;
  const allFindings: any[] = [];

  for (const file of files) {
    const findings = analyzeFile(file);
    totalFindings += findings.length;

    if (options.json) {
      allFindings.push({ file, findings });
    } else {
      printFindings(findings, file);
    }
  }

  if (options.json) {
    console.log(JSON.stringify({ files: allFindings }, null, 2));
  }

  if (totalFindings > 0) {
    process.exit(1);
  }
}
