import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";

export default {
  input: "src/index.js",
  output: {
    name: "QueryParams",
    format: "cjs",
    file: "./dist/index.js"
  },
  external: ["react", "react-router-dom", "query-string", "prop-types"],
  plugins: [
    babel({
      exclude: "node_modules/**"
    }),
    resolve()
  ]
};
