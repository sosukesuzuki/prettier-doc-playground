const CopyPlugin = require("copy-webpack-plugin");
const WorkerPlugin = require("worker-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { GenerateSW } = require("workbox-webpack-plugin");

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
        test: /\.ts?$/,
        use: [
          {
            loader: "worker-loader",
            options: {
              publicPath: process.env.ASSET_HOST || "/",
              inline: true,
            },
          },
          {
            loader: "ts-loader",
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
    ],
  },
  plugins: [
    new CopyPlugin({ patterns: copyRules }),
    new WorkerPlugin(),
    new GenerateSW({
      swDest: "service-worker.js",
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
};
