import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";
import tsConfigPaths from "rollup-plugin-tsconfig-paths";

const name = "screparsed";

const bundle = (config) => ({
  ...config,
  input: "src/index.ts",
});

export default [
  bundle({
    plugins: [tsConfigPaths(), esbuild()],
    output: [
      {
        file: `dist/${name}.js`,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: `dist/${name}.mjs`,
        format: "es",
        sourcemap: true,
      },
    ],
  }),
  bundle({
    plugins: [tsConfigPaths(), dts()],
    output: {
      file: `dist/${name}.d.ts`,
    },
  }),
  {
    plugins: [tsConfigPaths(), esbuild()],
    input: "bin/cli.ts",
    output: {
      file: `dist/cli.mjs`,
    },
  },
];
