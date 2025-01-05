import * as esbuild from "esbuild";
import { denoPlugins } from "esbuild-deno-loader";
import { htmlCopyPlugin } from "./htmlCopyPlugin.ts";
import { join } from "jsr:@std/path";
import { rebuildLoggerPlugin } from "./loggerPlugin.ts";

console.log(`Running esbuild version ${esbuild.version}`);

const settings: esbuild.BuildOptions = {
  plugins: [
    ...denoPlugins(),
    htmlCopyPlugin({ source: join(Deno.cwd(), "./src/index.html") }),
    rebuildLoggerPlugin(),
  ],
  entryPoints: ["./src/main.tsx"],
  outdir: "./dist",
  bundle: true,
  format: "esm",
  minify: false,
  sourcemap: true,
};

const ctx = await esbuild.context({ ...settings });
await ctx.watch();

await ctx.serve({
  servedir: "./dist",
}).then(({ host, port }) => {
  console.log(`${host}:${port}`);
});
