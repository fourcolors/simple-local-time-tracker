// duration_test.ts - Deno compatible test
import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { formatDuration, calculateDuration } from "./duration.ts";

// Deno uses standalone test functions instead of Jest's describe/it style
Deno.test("formatDuration should format milliseconds into human-readable format", () => {
  // 2 hours, 30 minutes, 15 seconds
  const ms = 2 * 60 * 60 * 1000 + 30 * 60 * 1000 + 15 * 1000;
  assertEquals(formatDuration(ms), "2h 30m 15s");
});

Deno.test("formatDuration should handle zero duration", () => {
  assertEquals(formatDuration(0), "0h 0m 0s");
});

Deno.test("calculateDuration should calculate the duration between two dates", () => {
  const startTime = new Date("2023-01-01T10:00:00Z");
  const endTime = new Date("2023-01-01T11:30:00Z");
  
  // 1 hour 30 minutes = 90 minutes = 5400000 milliseconds
  assertEquals(calculateDuration(startTime, endTime), 5400000);
});