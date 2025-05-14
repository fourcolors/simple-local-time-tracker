#!/usr/bin/env node
import { Command } from 'commander';
import { startTask } from './commands/start';
import { stopCurrentTask } from './commands/stop';
import { generateDailyReport } from './commands/report';
import { initStorage } from './utils/storage';

// Initialize storage
initStorage();

const program = new Command();

program
  .name('time-tracker')
  .description('A simple CLI time tracker')
  .version('1.0.0');

program
  .command('start')
  .description('Start tracking a new task')
  .action(async () => {
    await startTask();
  });

program
  .command('stop')
  .description('Stop tracking the current task')
  .action(() => {
    stopCurrentTask();
  });

program
  .command('report')
  .description('Generate a time report')
  .option('-d, --date <date>', 'Report date (YYYY-MM-DD)', new Date().toISOString().split('T')[0])
  .action((options) => {
    const date = new Date(options.date);
    generateDailyReport(date);
  });

// Add default command if no command is provided
if (process.argv.length === 2) {
  process.argv.push('--help');
}

program.parse(process.argv);