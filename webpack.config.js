const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const commonRules = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"],
      },
    },
  },
  {
    test: /\.css$/,
    use: [MiniCssExtractPlugin.loader, "css-loader"],
  },
  {
    test: /\.json$/,
    type: "json",
  },
  {
    test: /\.svg$/,
    type: "asset/source",
  },
];

const optimization = {
  minimize: true,
  minimizer: [
    new TerserPlugin({
      terserOptions: {
        format: {
          comments: false,
        },
      },
      extractComments: false,
    }),
    new CssMinimizerPlugin(),
  ],
};

module.exports = {
  mode: "production",
  entry: {
    "senangstart-icon": "./src/index.js",
    "icons": "./src/svg/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].min.js",
    library: {
      name: "SenangStartIcons",
      type: "umd",
      export: "default",
    },
    globalObject: "this",
    // clean: true, // Moved to build script to avoid race conditions
  },
  module: {
    rules: commonRules,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "senangstart.min.css",
    }),
  ],
  optimization: optimization,
  devtool: "source-map",
};
