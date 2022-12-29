"use strict";

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const createEnvironmentHash = require("./webpack/createEnvironmentHash");

module.exports = (env, argv) => {
  const isEnvProduction = argv.mode === "production";
  const shouldUseSourceMap = true;

  return {
    mode: isEnvProduction ? "production" : "development",
    entry: path.resolve(process.cwd(), "src/index.tsx"),
    output: {
      path: path.resolve(process.cwd(), "dist"),
      filename: isEnvProduction
        ? "static/js/[name].[contenthash:8].js"
        : "static/js/bundle.js",
      chunkFilename: isEnvProduction
        ? "static/js/[name].[contenthash:8].chunk.js"
        : "static/js/[name].chunk.js",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: "babel-loader",
        },
      ],
    },
    cache: {
      type: "filesystem",
      version: createEnvironmentHash(process.env),
      cacheDirectory: path.resolve(process.cwd(), "node_modules", ".cache"),
      store: "pack",
      buildDependencies: {
        config: [__filename],
      },
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            name: "commons",
            chunks: "initial",
            minChunks: 2,
          },
        },
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(process.cwd(), "public/index.html"),
      }),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: path.resolve(process.cwd(), "tsconfig.json"),
        },
        issue: {
          include: [{ file: "**/src/**/*.{ts,tsx}" }],
          exclude: [
            { file: "**/src/**/__tests__/**" },
            { file: "**/src/**/?(*.){spec|test}.*" },
            { file: "**/src/setupProxy.*" },
            { file: "**/src/setupTests.*" },
          ],
        },
      }),
    ],
    stats: "errors-warnings",
    devtool: isEnvProduction
      ? shouldUseSourceMap
        ? "source-map"
        : false
      : "cheap-module-source-map",
    devServer: {
      compress: true,
      port: 3000,
    },
  };
};
