const CopyPlugin = require("copy-webpack-plugin");
const WorkerPlugin = require("worker-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const copyRules = [
  {
    from: __dirname + "/src/index.html",
    to: __dirname + "/dist/index.html",
  },
];

module.exports = {
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  output: {
    globalObject: "self",
    filename: "[name].js",
    chunkFilename: "[name].[id].[contenthash].js",
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        test: /\.m?js(\?.*)?$/i,
        sourceMap: true,
        terserOptions: {
          safari10: true,
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.worker\.ts$/,
        use: [
          {
            loader: "comlink-loader",
            options: {
              singleton: true
            }
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [new CopyPlugin({ patterns: copyRules }), new WorkerPlugin()],
};
