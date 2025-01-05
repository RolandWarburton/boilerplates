import * as esbuild from "esbuild";

export function rebuildLoggerPlugin() {
  return ({
    name: "rebuild-logger",
    setup(build: esbuild.PluginBuild) {
      build.onEnd(() => {
        console.log("🔄 Rebuilt at", new Date().toLocaleTimeString([], { hour12: true }));
      });
    },
  });
}
