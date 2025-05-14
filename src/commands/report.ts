import chalk from 'chalk';
import { format } from 'date-fns';
import { getAllTimeRecords } from '../utils/storage';
import { TimeRecord, TimeRecordSummary } from '../models/TimeRecord';

function formatDuration(ms: number): string {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor(ms / (1000 * 60 * 60));
  
  return `${hours}h ${minutes}m ${seconds}s`;
}

export function generateDailyReport(date: Date = new Date()): void {
  const records = getAllTimeRecords();
  
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  
  const dayRecords = records.filter(record => {
    return record.startTime >= startOfDay && 
           record.startTime <= endOfDay &&
           record.endTime !== undefined;
  });
  
  if (dayRecords.length === 0) {
    console.log(`No completed time records found for ${format(date, 'yyyy-MM-dd')}`);
    return;
  }
  
  console.log(chalk.bold(`\nTime Report for ${format(date, 'yyyy-MM-dd')}`));
  console.log(chalk.dim('-'.repeat(50)));
  
  let totalDuration = 0;
  
  dayRecords.forEach(record => {
    const duration = record.durationMs || 0;
    totalDuration += duration;
    
    console.log(chalk.green(`Task: ${record.taskName}`));
    if (record.projectName) {
      console.log(chalk.blue(`Project: ${record.projectName}`));
    }
    console.log(`Started: ${format(record.startTime, 'HH:mm:ss')}`);
    console.log(`Ended: ${format(record.endTime!, 'HH:mm:ss')}`);
    console.log(`Duration: ${formatDuration(duration)}`);
    
    if (record.tags && record.tags.length > 0) {
      console.log(`Tags: ${record.tags.join(', ')}`);
    }
    
    if (record.notes) {
      console.log(`Notes: ${record.notes}`);
    }
    
    console.log(chalk.dim('-'.repeat(50)));
  });
  
  console.log(chalk.bold(`Total time: ${formatDuration(totalDuration)}`));
  console.log(chalk.bold(`Number of tasks: ${dayRecords.length}`));
}