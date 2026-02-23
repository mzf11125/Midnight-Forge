export enum Severity {
  Info = 'info',
  Warning = 'warning',
  Critical = 'critical'
}

export interface Finding {
  rule: string;
  severity: Severity;
  line: number;
  column: number;
  message: string;
  suggestion?: string;
}

export abstract class Rule {
  abstract check(source: string, lines: string[]): Finding[];
}

export class ValidationRule extends Rule {
  check(source: string, lines: string[]): Finding[] {
    const findings: Finding[] = [];
    const circuitParamRegex = /circuit\s+\w+\s*\([^)]*private\s+(\w+)\s*:\s*Field/;

    for (let i = 0; i < lines.length; i++) {
      const match = lines[i].match(circuitParamRegex);
      if (match) {
        const param = match[1];
        const nextLines = lines.slice(i, i + 10).join('\n');
        
        if (!nextLines.includes('require') || !nextLines.includes(param)) {
          findings.push({
            rule: 'missing-input-validation',
            severity: Severity.Warning,
            line: i + 1,
            column: 0,
            message: `Circuit parameter '${param}' not validated`,
            suggestion: `Add: require(${param} > 0 && ${param} < MAX_AMOUNT);`
          });
        }
      }
    }

    return findings;
  }
}
