import { Rule, Finding, Severity } from './validation';

export class PrivacyRule extends Rule {
  check(source: string, lines: string[]): Finding[] {
    const findings: Finding[] = [];
    const pubFnRegex = /pub\s+fn\s+(\w+)/;

    for (let i = 0; i < lines.length; i++) {
      const match = lines[i].match(pubFnRegex);
      if (match) {
        const nextLines = lines.slice(i, i + 20).join('\n');
        
        if (nextLines.includes('private') && nextLines.includes('return')) {
          findings.push({
            rule: 'private-in-public-output',
            severity: Severity.Critical,
            line: i + 1,
            column: 0,
            message: 'Public function may return private values',
            suggestion: 'Ensure private values are not exposed in public function returns'
          });
        }
      }
    }

    return findings;
  }
}
