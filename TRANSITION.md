# Transition from Node.js to Deno

This document outlines the transition from the original Node.js-based CLI application to the new Deno+Tauri desktop application.

## Files/Dependencies to Remove

- `package.json` - Not needed in Deno projects as dependencies are imported via URLs
- `node_modules/` - Deno doesn't use local node_modules
- `tsconfig.json` - Deno has its own TypeScript configuration

## Dependencies Migration

| Node.js Package | Deno Alternative |
|-----------------|------------------|
| commander       | Deno's built-in [Command](https://deno.land/std/cli/mod.ts) module |
| inquirer        | [Cliffy](https://deno.land/x/cliffy/prompt/mod.ts) |
| chalk           | [Colors](https://deno.land/std/fmt/colors.ts) |
| date-fns        | [datetime](https://deno.land/std/datetime/mod.ts) |
| uuid            | [uuid](https://deno.land/std/uuid/mod.ts) |
| jest            | Deno's built-in [testing](https://deno.land/manual/basics/testing) functionality |
| ts-node         | Not needed - Deno runs TypeScript directly |
| typescript      | Built into Deno |
| eslint          | [deno lint](https://deno.land/manual/tools/linter) |

## Script Migration

| npm Script    | Deno Command                    |
|---------------|--------------------------------|
| npm start     | deno run -A src/index.ts       |
| npm test      | deno test                      |
| npm run build | deno task build                |
| npm run lint  | deno lint                      |

## Preserving Legacy Support

If you need to maintain support for both Node.js and Deno during transition:

1. Keep the CLI functionality in the src/commands/, src/models/, and src/utils/ directories
2. Make the CLI code compatible with both runtimes
3. Add conditional imports for Node.js vs. Deno environments

## Complete Migration

Once fully migrated to Deno:

1. Remove all Node.js-specific files (package.json, package-lock.json)
2. Update all imports to use Deno standard library and third-party modules
3. Use the deno.json file for all configuration
4. Integrate with Tauri for the desktop application UI

## Final Testing

Before removing the Node.js configuration completely:

1. Test the Deno CLI version thoroughly
2. Test the Tauri desktop application 
3. Verify all features work correctly