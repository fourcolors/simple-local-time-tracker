// storage.ts - Deno compatible
import { path } from "../../deno_imports.ts";
import { TimeRecord } from "../models/TimeRecord.ts";

const HOME_DIR = Deno.env.get("HOME") || "";
const DATA_DIR = path.join(HOME_DIR, ".simple-time-tracker");
const RECORDS_FILE = path.join(DATA_DIR, "records.json");

export async function initStorage(): Promise<void> {
  try {
    await Deno.stat(DATA_DIR);
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      await Deno.mkdir(DATA_DIR, { recursive: true });
    } else {
      throw error;
    }
  }
  
  try {
    await Deno.stat(RECORDS_FILE);
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      await Deno.writeTextFile(RECORDS_FILE, JSON.stringify([]));
    } else {
      throw error;
    }
  }
}

export async function saveTimeRecord(record: TimeRecord): Promise<void> {
  const records = await getAllTimeRecords();
  records.push(record);
  await Deno.writeTextFile(RECORDS_FILE, JSON.stringify(records, null, 2));
}

export async function updateTimeRecord(record: TimeRecord): Promise<void> {
  const records = await getAllTimeRecords();
  const index = records.findIndex(r => r.id === record.id);
  
  if (index !== -1) {
    records[index] = record;
    await Deno.writeTextFile(RECORDS_FILE, JSON.stringify(records, null, 2));
  }
}

export async function getAllTimeRecords(): Promise<TimeRecord[]> {
  try {
    await Deno.stat(RECORDS_FILE);
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      await initStorage();
      return [];
    }
    throw error;
  }
  
  try {
    const data = await Deno.readTextFile(RECORDS_FILE);
    const records = JSON.parse(data) as TimeRecord[];
    
    // Convert ISO strings back to Date objects
    return records.map(record => ({
      ...record,
      startTime: new Date(record.startTime),
      endTime: record.endTime ? new Date(record.endTime) : undefined
    }));
  } catch (error) {
    console.error("Error parsing time records:", error);
    return [];
  }
}