import { Plugin, PluginBuild } from "esbuild";
import * as path from "jsr:@std/path";

interface HtmlCopyPluginOptions {
  source: string;
  destination?: string;
  verbose?: boolean;
}

export function htmlCopyPlugin(options: HtmlCopyPluginOptions): Plugin {
  const {
    source,
    destination,
    verbose = false,
  } = options;

  return {
    name: "html-copy",
    setup(build: PluginBuild) {
      build.onStart(async () => {
        try {
          const htmlContent = await Deno.readTextFile(source);

          const dest = destination || path.join(
            build.initialOptions.outdir || "dist",
            path.basename(source),
          );
          await Deno.mkdir(path.dirname(dest), { recursive: true });
          await Deno.writeTextFile(dest, htmlContent);

          if (verbose) {
            console.log(`[html-copy] Copied ${source} to ${dest}`);
          }
        } catch (error) {
          const errorMessage = (error instanceof Error)
            ? error.message
            : "unknown error";
          return {
            errors: [{
              text: `Failed to copy HTML file: ${errorMessage}`,
              location: null,
            }],
          };
        }
      });
    },
  };
}
