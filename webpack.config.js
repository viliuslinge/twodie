const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const prod = process.env.NODE_ENV === "production";

module.exports = {
  mode: prod ? "production" : "development",
  entry: "./src/index.ts",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(".", "tsconfig.json"),
        extensions: [".ts", ".tsx", ".js", "jsx", ".json"],
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: [".ts", ".tsx", ".js", "jsx", ".json"],
        },
        use: "ts-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.png/,
        type: "asset/resource",
      },
    ],
  },
  devtool: prod ? undefined : "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "/public/index.html"),
    }),
  ],
};
