const path = require("path");
const NodemonPlugin = require("nodemon-webpack-plugin");

module.exports = {
  entry: {
    main: "./expressSrc/index.js"
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].js"
  },
  target: "node",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [new NodemonPlugin()],
  watch: path.resolve("./expressSrc")
};
