#!/usr/bin/env -S deno run -A
import { Command } from "cliffy/command/mod.ts";
import { initStorage } from "./utils/storage.ts";

// Import command handlers
// Note: These would need to be updated to use Deno imports
import { startTask } from "./commands/start.ts";
import { stopCurrentTask } from "./commands/stop.ts";
import { generateDailyReport } from "./commands/report.ts";

// Initialize storage
initStorage();

const program = new Command();

program
  .name("time-tracker")
  .description("A simple CLI time tracker")
  .version("1.0.0");

program
  .command("start")
  .description("Start tracking a new task")
  .action(async () => {
    await startTask();
  });

program
  .command("stop")
  .description("Stop tracking the current task")
  .action(() => {
    stopCurrentTask();
  });

program
  .command("report")
  .description("Generate a time report")
  .option(
    "-d, --date <date:string>", 
    "Report date (YYYY-MM-DD)", 
    { default: new Date().toISOString().split("T")[0] }
  )
  .action(({ date }) => {
    const reportDate = new Date(date);
    generateDailyReport(reportDate);
  });

// Parse the command
await program.parse(Deno.args);