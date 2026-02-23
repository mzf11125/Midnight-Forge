import * as fs from 'fs';
import * as path from 'path';
import * as toml from '@iarna/toml';

export interface ProjectConfig {
  name: string;
  version: string;
}

export interface CompilerConfig {
  path: string;
}

export interface TestConfig {
  include: string[];
  exclude: string[];
}

export interface ScanConfig {
  severity: string;
  rules: string[];
}

export interface ForgeConfig {
  project: ProjectConfig;
  compiler: CompilerConfig;
  test: TestConfig;
  scan: ScanConfig;
}

export class Config {
  static find(): { root: string; config: ForgeConfig } | null {
    let currentDir = process.cwd();

    while (true) {
      const configPath = path.join(currentDir, 'forge.toml');
      if (fs.existsSync(configPath)) {
        const content = fs.readFileSync(configPath, 'utf-8');
        const config = toml.parse(content) as unknown as ForgeConfig;
        return { root: currentDir, config };
      }

      const parent = path.dirname(currentDir);
      if (parent === currentDir) break;
      currentDir = parent;
    }

    return null;
  }
}
