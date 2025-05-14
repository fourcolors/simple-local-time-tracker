# Simple Time Tracker

A desktop time tracking application built with Tauri, Deno, React, and TypeScript.

## Features

- Track time spent on tasks
- Categorize tasks by projects
- View reports on time spent
- Export time records to different formats
- Cross-platform desktop application with Tauri

## Tech Stack

- **Tauri**: Cross-platform desktop application framework (v2.0.0 - May 2025)
- **Deno**: JavaScript/TypeScript runtime (v2.3.0 - May 2025)
- **React**: UI library (v19.0.0)
- **TypeScript**: Type-safe JavaScript
- **esbuild**: Fast JavaScript bundler (v0.25.4)

## Prerequisites

- [Deno](https://deno.land/manual/getting_started/installation)
- [Rust](https://www.rust-lang.org/tools/install)
- [Tauri prerequisites](https://tauri.app/v1/guides/getting-started/prerequisites)

## Development

### Setup

Clone the repository:

```bash
git clone https://github.com/your-username/simple-time-tracker.git
cd simple-time-tracker
```

### Run Development Server

```bash
deno task dev
```

This will start a development server on http://localhost:3000.

### Build for Production

```bash
deno task build
```

### Run Tauri App

```bash
cargo tauri dev
```

### Build Tauri App

```bash
cargo tauri build
```

### CLI Usage (Deno version)

The application also includes a CLI interface:

```bash
deno task cli
```

Or run specific commands:

```bash
deno task cli start
deno task cli stop
deno task cli report
```

## Project Structure

- `src/app/`: Frontend React application
- `src/commands/`: CLI commands for the time tracker
- `src/models/`: Data models
- `src/utils/`: Utility functions
- `src-tauri/`: Tauri/Rust backend
- `www/`: Static web assets

## Dependencies

- Tauri 2.0.0 (May 2025)
- React 19.0.0
- esbuild 0.25.4
- Deno 2.3.0 (May 2025)
- Deno standard library 0.224.0
- TypeScript

## Transition from Node.js

This project was originally a Node.js CLI application that has been converted to use Deno and Tauri. See [TRANSITION.md](./TRANSITION.md) for details on the migration process.

## License

MIT