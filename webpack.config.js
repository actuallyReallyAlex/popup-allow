const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

const mode = process.env.NODE_ENV || "production";

console.log("");
console.log(`MODE - ${mode}`);
console.log("");

const config = {
  entry: "./src/index.tsx",
  mode,
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        type: "asset/inline",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
    ],
  },
  optimization: {
    moduleIds: "deterministic",
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].[contenthash].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/index.html"),
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(mode),
    }),
    new CleanWebpackPlugin(),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
};

if (process.env.NODE_ENV === "development") {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;
