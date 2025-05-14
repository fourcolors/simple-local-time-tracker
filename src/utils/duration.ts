/**
 * Formats a duration in milliseconds to a human-readable string
 * @param ms Duration in milliseconds
 * @returns Formatted duration string (e.g. "2h 30m 15s")
 */
export function formatDuration(ms: number): string {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor(ms / (1000 * 60 * 60));
  
  return `${hours}h ${minutes}m ${seconds}s`;
}

/**
 * Calculates the duration between two dates in milliseconds
 * @param startTime Start time
 * @param endTime End time
 * @returns Duration in milliseconds
 */
export function calculateDuration(startTime: Date, endTime: Date): number {
  return endTime.getTime() - startTime.getTime();
}