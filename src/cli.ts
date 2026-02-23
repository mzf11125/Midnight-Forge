#!/usr/bin/env node
import { Command } from 'commander';
import { initCommand } from './commands/init';
import { testCommand } from './commands/test';
import { scanCommand } from './commands/scan';

const program = new Command();

program
  .name('midnight-forge')
  .description('Testing, security, and profiling framework for Compact smart contracts')
  .version('0.1.0');

program
  .command('init [name]')
  .description('Create a new project with template')
  .action(initCommand);

program
  .command('test [filter]')
  .description('Run tests with optional filter')
  .option('--json', 'Output results as JSON')
  .action(testCommand);

program
  .command('scan <path>')
  .description('Run static security analysis')
  .option('--json', 'Output results as JSON')
  .action(scanCommand);

program.parse();
