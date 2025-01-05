import * as esbuild from "esbuild";
import { denoPlugins } from "esbuild-deno-loader";
import { htmlCopyPlugin } from "./htmlCopyPlugin.ts";
import { join } from "jsr:@std/path";

console.log(esbuild.version);

const result = await esbuild.build({
  plugins: [
    ...denoPlugins(),
    htmlCopyPlugin({ source: join(Deno.cwd(), "./src/index.html") }),
  ],
  entryPoints: ["./src/main.tsx"],
  outdir: "./dist",
  bundle: true,
  format: "esm",
  minify: false,
  sourcemap: true,
});

console.log(result);

esbuild.stop();
