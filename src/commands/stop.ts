import { getAllTimeRecords, updateTimeRecord } from '../utils/storage';
import { TimeRecord } from '../models/TimeRecord';
import { formatDistance } from 'date-fns';

export function stopCurrentTask(): TimeRecord | null {
  const records = getAllTimeRecords();
  
  // Find the most recent unfinished task
  const unfinishedTasks = records.filter(record => !record.endTime);
  
  if (unfinishedTasks.length === 0) {
    console.log('No active task found.');
    return null;
  }
  
  // Sort by start time, newest first
  const sortedTasks = unfinishedTasks.sort((a, b) => 
    b.startTime.getTime() - a.startTime.getTime()
  );
  
  const currentTask = sortedTasks[0];
  const now = new Date();
  const durationMs = now.getTime() - currentTask.startTime.getTime();
  
  const updatedTask: TimeRecord = {
    ...currentTask,
    endTime: now,
    durationMs
  };
  
  updateTimeRecord(updatedTask);
  
  const durationFormatted = formatDistance(currentTask.startTime, now);
  console.log(`Stopped tracking: ${currentTask.taskName}`);
  console.log(`Duration: ${durationFormatted}`);
  
  return updatedTask;
}