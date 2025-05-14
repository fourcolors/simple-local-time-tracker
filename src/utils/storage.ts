import fs from 'fs';
import path from 'path';
import { TimeRecord } from '../models/TimeRecord';

const DATA_DIR = path.join(process.env.HOME || '', '.simple-time-tracker');
const RECORDS_FILE = path.join(DATA_DIR, 'records.json');

export function initStorage(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  
  if (!fs.existsSync(RECORDS_FILE)) {
    fs.writeFileSync(RECORDS_FILE, JSON.stringify([]));
  }
}

export function saveTimeRecord(record: TimeRecord): void {
  const records = getAllTimeRecords();
  records.push(record);
  fs.writeFileSync(RECORDS_FILE, JSON.stringify(records, null, 2));
}

export function updateTimeRecord(record: TimeRecord): void {
  const records = getAllTimeRecords();
  const index = records.findIndex(r => r.id === record.id);
  
  if (index !== -1) {
    records[index] = record;
    fs.writeFileSync(RECORDS_FILE, JSON.stringify(records, null, 2));
  }
}

export function getAllTimeRecords(): TimeRecord[] {
  if (!fs.existsSync(RECORDS_FILE)) {
    initStorage();
    return [];
  }
  
  const data = fs.readFileSync(RECORDS_FILE, 'utf8');
  try {
    const records = JSON.parse(data) as TimeRecord[];
    
    // Convert ISO strings back to Date objects
    return records.map(record => ({
      ...record,
      startTime: new Date(record.startTime),
      endTime: record.endTime ? new Date(record.endTime) : undefined
    }));
  } catch (error) {
    console.error('Error parsing time records:', error);
    return [];
  }
}