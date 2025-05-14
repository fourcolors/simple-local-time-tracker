export interface TimeRecord {
  id: string;
  taskName: string;
  projectName?: string;
  startTime: Date;
  endTime?: Date;
  durationMs?: number;
  notes?: string;
  tags?: string[];
}

export interface TimeRecordSummary {
  taskName: string;
  projectName?: string;
  totalDurationMs: number;
  recordCount: number;
}