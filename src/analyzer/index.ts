import * as fs from 'fs';
import { ValidationRule } from './rules/validation';
import { PrivacyRule } from './rules/privacy';
import { AccessControlRule, UnboundedLoopRule, HardcodedValueRule } from './rules/common';
import { Finding } from './rules/validation';

export function analyzeFile(filePath: string): Finding[] {
  const source = fs.readFileSync(filePath, 'utf-8');
  const lines = source.split('\n');

  const rules = [
    new ValidationRule(),
    new PrivacyRule(),
    new AccessControlRule(),
    new UnboundedLoopRule(),
    new HardcodedValueRule()
  ];

  const findings: Finding[] = [];
  for (const rule of rules) {
    findings.push(...rule.check(source, lines));
  }

  return findings;
}
