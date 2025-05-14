// This file provides Deno alternatives to Node.js packages used in the CLI version

// Commander -> Cliffy Command
export { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.3/command/mod.ts";

// Inquirer -> Cliffy Prompt
export * as Prompt from "https://deno.land/x/cliffy@v1.0.0-rc.3/prompt/mod.ts";

// chalk -> colors
export * as colors from "https://deno.land/std@0.224.0/fmt/colors.ts";

// date-fns -> datetime
export * as datetime from "https://deno.land/std@0.224.0/datetime/mod.ts";

// uuid
export * as uuid from "https://deno.land/std@0.224.0/uuid/mod.ts";

// path
export * as path from "https://deno.land/std@0.224.0/path/mod.ts";

// fs
export * as fs from "https://deno.land/std@0.224.0/fs/mod.ts";