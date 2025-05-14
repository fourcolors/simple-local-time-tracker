# Files to Remove for Deno Migration

The following files are no longer needed after the migration to Deno and Tauri:

## Node.js Specific Files

- `package.json` - Replaced by deno.json
- `package-lock.json` or `yarn.lock` (if present)
- `node_modules/` directory
- `tsconfig.json` - Deno has built-in TypeScript support
- `jest.config.js` - Deno has built-in testing
- `.eslintrc.json` - Deno has built-in linting with `deno lint`

## Keep and Convert

The following source files should be kept but converted to use Deno imports:

- `src/models/TimeRecord.ts` 
- `src/commands/start.ts`
- `src/commands/stop.ts`
- `src/commands/report.ts`
- `src/utils/storage.ts`
- `src/utils/duration.ts`
- `src/utils/__tests__/duration.test.ts` (Convert to Deno test format)

## Convert the Main Entry Point

- Replace `src/index.ts` with `src/cli.ts` (already created with Deno-compatible code)

## Next Steps for Full Migration

1. Remove the Node.js specific files listed above
2. Convert remaining source files to use Deno imports (from `deno_imports.ts`)
3. Adapt the tests to use Deno's testing framework
4. Update CLI commands to work with Tauri UI