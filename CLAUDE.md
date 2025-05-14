# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Build and Run

- **Start the application**: `npm start`
- **Build the application**: `npm run build`
- **Run tests**: `npm test`
- **Run a single test file**: `npx jest path/to/test/file.test.ts`
- **Lint the code**: `npm run lint`
- **Type check**: `npm run typecheck`

### Project Structure

This is a simple CLI time tracker application built with TypeScript.

## Architecture

### Core Components

1. **Models**
   - `TimeRecord` - Represents a single time tracking record with task details, start/end times, and metadata.
   - `TimeRecordSummary` - Used for aggregating time tracking data for reports.

2. **Commands**
   - `start.ts` - Handles starting a new time tracking session.
   - `stop.ts` - Stops the current time tracking session.
   - `report.ts` - Generates reports from time tracking data.

3. **Utils**
   - `storage.ts` - Handles persisting and retrieving time records from the local filesystem.
   - `duration.ts` - Utilities for formatting and calculating time durations.

### Data Flow

1. User starts a task using the CLI
2. Application creates a TimeRecord with start time
3. Record is saved to local storage
4. User stops the task
5. Application updates the record with end time and duration
6. User can generate reports based on the stored records

### Storage

Time tracking data is stored in JSON format in the user's home directory (`~/.simple-time-tracker/records.json`).

### CLI Interface

The application uses Commander.js to provide a CLI interface with the following commands:
- `start` - Start tracking a new task
- `stop` - Stop tracking the current task
- `report` - Generate a time report with optional date filtering

## Development Preferences

- Prefer using deno and mise for version management