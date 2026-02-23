import { Rule, Finding, Severity } from './validation';

export class AccessControlRule extends Rule {
  check(source: string, lines: string[]): Finding[] {
    const findings: Finding[] = [];
    const pubFnRegex = /pub\s+fn\s+(\w+)/;

    for (let i = 0; i < lines.length; i++) {
      const match = lines[i].match(pubFnRegex);
      if (match) {
        const fnName = match[1];
        if (fnName.startsWith('get')) continue;

        const nextLines = lines.slice(i, i + 15).join('\n');
        const hasCheck = nextLines.includes('require') && 
                        (nextLines.includes('owner') || nextLines.includes('sender'));

        if (!hasCheck) {
          findings.push({
            rule: 'missing-access-control',
            severity: Severity.Warning,
            line: i + 1,
            column: 0,
            message: `Public function '${fnName}' lacks access control`,
            suggestion: 'Add: require(msg.sender == owner);'
          });
        }
      }
    }

    return findings;
  }
}

export class UnboundedLoopRule extends Rule {
  check(source: string, lines: string[]): Finding[] {
    const findings: Finding[] = [];
    const loopRegex = /\b(for|while)\b/;

    for (let i = 0; i < lines.length; i++) {
      if (loopRegex.test(lines[i])) {
        if (!lines[i].includes('..') && !/\d+/.test(lines[i])) {
          findings.push({
            rule: 'unbounded-loop',
            severity: Severity.Warning,
            line: i + 1,
            column: 0,
            message: 'Loop may be unbounded',
            suggestion: 'Add explicit bounds to loops in circuits'
          });
        }
      }
    }

    return findings;
  }
}

export class HardcodedValueRule extends Rule {
  check(source: string, lines: string[]): Finding[] {
    const findings: Finding[] = [];
    const constRegex = /const\s+(\w+)\s*:\s*\w+\s*=\s*"(0x[a-fA-F0-9]+|\d+)"/;

    for (let i = 0; i < lines.length; i++) {
      const match = lines[i].match(constRegex);
      if (match) {
        const name = match[1];
        if (name.toUpperCase().includes('ADMIN') || name.toUpperCase().includes('OWNER')) {
          findings.push({
            rule: 'hardcoded-sensitive-value',
            severity: Severity.Info,
            line: i + 1,
            column: 0,
            message: `Hardcoded sensitive value in '${name}'`,
            suggestion: 'Consider environment-based configuration'
          });
        }
      }
    }

    return findings;
  }
}
