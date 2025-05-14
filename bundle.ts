import * as esbuild from "https://deno.land/x/esbuild@v0.25.4/mod.js";
import * as http from "https://deno.land/std@0.224.0/http/mod.ts";

// Start esbuild's server on a random local port
const ctx = await esbuild.context({
  entryPoints: ["./src/app/index.tsx"],
  bundle: true,
  outfile: "./www/dist/main.js",
  format: "esm",
  jsx: "automatic",
  jsxImportSource: "react",
  define: {
    "process.env.NODE_ENV": JSON.stringify("development"),
  },
  banner: {
    js: `
    const process = { env: { NODE_ENV: "development" } };
    `,
  },
});

// Then start the http server
const SERVER_PORT = 3000;
const WWW_FOLDER = "./www";

console.log(`Server started at http://localhost:${SERVER_PORT}`);

console.log(`Access http://localhost:${SERVER_PORT} for the web`);

await http.serve(
  async (request) => {
    const url = new URL(request.url);
    let filePath = `${WWW_FOLDER}${url.pathname}`;

    if (
      url.pathname === "/" ||
      filePath.endsWith("/") ||
      !filePath.split("/").at(-1)?.includes(".")
    ) {
      filePath = `${filePath}${filePath.endsWith("/") ? "" : "/"}index.html`;
    }

    if (filePath.endsWith(".js") && !filePath.includes("/dist/")) {
      return new Response(null, {
        status: 302,
        headers: {
          "location": `/dist${url.pathname}`,
        },
      });
    }

    try {
      const fileInfo = await Deno.lstat(filePath);

      if (fileInfo.isFile) {
        const fileData = await Deno.readFile(filePath);

        let contentType = "text/plain";

        if (filePath.endsWith(".html")) {
          contentType = "text/html";
        } else if (filePath.endsWith(".js")) {
          contentType = "text/javascript";
        } else if (filePath.endsWith(".json")) {
          contentType = "application/json";
        } else if (filePath.endsWith(".css")) {
          contentType = "text/css";
        }

        return new Response(fileData, {
          status: 200,
          headers: {
            "content-type": contentType,
          },
        });
      }
    } catch {
      return new Response("Not found", { status: 404 });
    }

    return new Response("Not found", { status: 404 });
  },
  {
    port: SERVER_PORT,
  }
);

// The esbuild server will rebuild whenever a file changes
await ctx.watch();