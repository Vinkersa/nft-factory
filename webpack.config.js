import { fileURLToPath } from "url";
import path, { dirname } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import ESLintWebpackPlugin from "eslint-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import webpack from "webpack";
import dotenv from "dotenv";
dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isDev = process.env.NODE_ENV === 'development'

const webpackConfig = {
  ...(isDev ? { devtool: "inline-source-map" } : {}),
  stats: isDev ? "errors-warnings" : "normal",
  mode: isDev ? "development" : "production",
  entry: "./src/index.tsx",
  output: {
    filename: "[name]_[fullhash].js",
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    clean: true,
  },
  devServer: {
    static: false,
    client: {
      logging: "info",
      overlay: {
        errors: true,
        runtimeErrors: true,
        warnings: false,
      },
    },
    compress: true,
    open: false,
    port: 3000,
    setupExitSignals: true,
    server: "http",
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./public/manifest.json", to: "manifest.json" },
        { from: "./public/logo192.svg", to: "logo192.svg" },
        { from: "./public/favicon.ico", to: "favicon.ico" },
      ],
    }),
    isDev && new ReactRefreshPlugin(),
    new ESLintWebpackPlugin({
      extensions: ["js", "ts", "jsx", "tsx"],
      emitError: true,
      emitWarning: true,
      failOnError: true,
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ].filter(Boolean),
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: "vendor",
          chunks: "all",
        },
      },
    },
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", "..."],
    alias: {
      "@src": path.resolve(__dirname, "src/"),
      "@assets": path.resolve(__dirname, "src/assets/"),
      "@components": path.resolve(__dirname, "src/components/"),
      "@configs": path.resolve(__dirname, "src/configs/"),
      "@constants": path.resolve(__dirname, "src/constants/"),
      "@models": path.resolve(__dirname, "src/models/"),
      "@pages": path.resolve(__dirname, "src/pages/"),
      "@services": path.resolve(__dirname, "src/services/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
      "@utils": path.resolve(__dirname, "src/utils/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|jsx|tsx)/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
          ...(isDev ? {plugins: ["react-refresh/babel"]} : {})
        }
      },
      {
        test: /\.(js|ts|jsx|tsx)/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
      {
        test: /\.(css|scss|sass)/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.svg/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.(png|webp|gif|jpg|jpeg)/,
        type: "asset/resource",
      },
    ],
  },
};

export default webpackConfig;
