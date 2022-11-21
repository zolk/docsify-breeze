import { esbuildPlugin } from "@web/dev-server-esbuild";
import { playwrightLauncher } from "@web/test-runner-playwright";

export default {
  files: "src/**/*.test.ts",
  concurrentBrowsers: 3,
  nodeResolve: true,
  browsers: [
    playwrightLauncher({ product: "chromium" }),
    playwrightLauncher({ product: "firefox" }),
    playwrightLauncher({ product: "webkit" }),
  ],
  plugins: [esbuildPlugin({ ts: true, target: "auto" })],
};
