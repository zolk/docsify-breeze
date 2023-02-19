import browserSync from "browser-sync";
import commandLineArgs from "command-line-args";
import { deleteSync } from "del";
import esbuild from "esbuild";
import { globby } from "globby";
import mkdirp from "mkdirp";
import { execSync } from "child_process";
import copy from "recursive-copy";

const bs = browserSync.create();

const { serve, copydir } = commandLineArgs([
  { name: "serve", type: Boolean },
  { name: "copydir", type: String },
]);

const outdir = "./dist";

const generateCem = () => {
  console.log("Generating component metadata manifest...");
  execSync(`cem analyze --outdir "${outdir}"`, { stdio: "inherit" });
};

deleteSync([outdir, "*/dist"]);
mkdirp.sync(outdir);

(async () => {
  try {
    if (!serve) {
      console.log("Generating type definitions...");
      execSync("tsc --emitDeclarationOnly", { stdio: "inherit" });
    }
    generateCem();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("Compiling code...");

  await esbuild
    .build({
      format: "esm",
      target: "es2017",
      entryPoints: [
        // Breeze Plugins
        "./src/breeze/index.js",
        ...(await globby("./src/breeze/plugins/**/*.js")),
        // Breeze Theme
        "./src/breeze/theme/breeze.css",
        "./src/breeze/theme/tokens/breeze-tokens.css",
        // Components
        ...(await globby("./src/components/**/!(*.(styles|test)).ts")),
        // Global Styles
        ...(await globby("./src/styles/*.css")),
      ],
      outExtension: { ".js": ".min.js", ".css": ".min.css" },
      outdir,
      incremental: serve,
      bundle: true,
      splitting: false,
      minify: true,
      sourcemap: true,
      plugins: [],
      watch: {
        onRebuild(err) {
          if (err) console.error("🚨 Build failure:", err);
          else generateCem();
          console.log("✅ Rebuild complete.");
        },
      },
    })
    .catch((err) => {
      console.error("🚨 Build failure:", err);
      process.exit(1);
    })
    .then((result) => {
      console.log("🎉 Project has been successfully built!");
      if (!serve) result.stop();
    });

  // Copy the build output to an additional directory
  if (copydir) {
    deleteSync(copydir);
    copy(outdir, copydir);
  }

  if (serve) {
    bs.init({
      open: false,
      single: true,
      notify: false,
      ghostMode: false,
      logPrefix: "Dev Server",
      server: {
        baseDir: "docs",
        routes: {
          "/dist": "./dist",
        },
      },
    });

    bs.watch(["docs/**/*.(md|html)", "dist/**/*.js"]).on("change", () => {
      bs.reload();
    });
  }
})();
