import { spawn } from 'child_process';

export class CompactCompiler {
  constructor(private compilerPath: string = 'compact') {}

  async compile(sourcePath: string): Promise<{ success: boolean; output: string; error: string }> {
    return new Promise((resolve) => {
      const proc = spawn(this.compilerPath, ['compile', sourcePath]);
      let output = '';
      let error = '';

      proc.stdout.on('data', (data) => {
        output += data.toString();
      });

      proc.stderr.on('data', (data) => {
        error += data.toString();
      });

      proc.on('close', (code) => {
        resolve({
          success: code === 0,
          output,
          error
        });
      });
    });
  }

  async isAvailable(): Promise<boolean> {
    return new Promise((resolve) => {
      const proc = spawn(this.compilerPath, ['--version']);
      proc.on('close', (code) => resolve(code === 0));
      proc.on('error', () => resolve(false));
    });
  }
}
