import inquirer from 'inquirer';
import { v4 as uuidv4 } from 'uuid';
import { TimeRecord } from '../models/TimeRecord';
import { saveTimeRecord } from '../utils/storage';

export async function startTask(): Promise<TimeRecord> {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'taskName',
      message: 'What task are you working on?',
      validate: (input) => input.trim().length > 0 ? true : 'Task name is required'
    },
    {
      type: 'input',
      name: 'projectName',
      message: 'Which project is this for? (optional)'
    },
    {
      type: 'input',
      name: 'tags',
      message: 'Add tags (comma separated, optional):'
    },
    {
      type: 'input',
      name: 'notes',
      message: 'Add notes (optional):'
    }
  ]);
  
  const record: TimeRecord = {
    id: uuidv4(),
    taskName: answers.taskName,
    projectName: answers.projectName || undefined,
    startTime: new Date(),
    tags: answers.tags ? answers.tags.split(',').map((tag: string) => tag.trim()) : undefined,
    notes: answers.notes || undefined
  };
  
  saveTimeRecord(record);
  console.log(`Started tracking: ${record.taskName}`);
  console.log(`Start time: ${record.startTime.toLocaleString()}`);
  
  return record;
}