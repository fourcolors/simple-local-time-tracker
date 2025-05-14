import { formatDuration, calculateDuration } from '../duration';

describe('Duration Utils', () => {
  describe('formatDuration', () => {
    it('should format milliseconds into human-readable format', () => {
      // 2 hours, 30 minutes, 15 seconds
      const ms = 2 * 60 * 60 * 1000 + 30 * 60 * 1000 + 15 * 1000;
      expect(formatDuration(ms)).toBe('2h 30m 15s');
    });

    it('should handle zero duration', () => {
      expect(formatDuration(0)).toBe('0h 0m 0s');
    });
  });

  describe('calculateDuration', () => {
    it('should calculate the duration between two dates', () => {
      const startTime = new Date('2023-01-01T10:00:00Z');
      const endTime = new Date('2023-01-01T11:30:00Z');
      
      // 1 hour 30 minutes = 90 minutes = 5400000 milliseconds
      expect(calculateDuration(startTime, endTime)).toBe(5400000);
    });
  });
});