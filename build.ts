import * as esbuild from "https://deno.land/x/esbuild@v0.25.4/mod.js";

await esbuild.build({
  entryPoints: ["./src/app/index.tsx"],
  outfile: "./www/dist/main.js",
  bundle: true,
  minify: true,
  format: "esm",
  jsx: "automatic",
  jsxImportSource: "react",
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  banner: {
    js: `
    const process = { env: { NODE_ENV: "production" } };
    `,
  },
});

esbuild.stop();