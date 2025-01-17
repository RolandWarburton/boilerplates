import * as esbuild from "esbuild";
import { denoPlugins } from "esbuild-deno-loader";
import { htmlCopyPlugin } from "./htmlCopyPlugin.ts";
import { join } from "jsr:@std/path";

console.log(`Running esbuild version ${esbuild.version}`);

const settings: esbuild.BuildOptions = {
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
};

const result = await esbuild.build({ ...settings });

console.log(result);

esbuild.stop();
