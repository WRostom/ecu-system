const CompressionPlugin = require(`compression-webpack-plugin`);
const BrotliPlugin = require(`brotli-webpack-plugin`);
const webpack = require("webpack");
module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      $ENV: {
        ENVIRONMENT: JSON.stringify(process.env.ENVIRONMENT),
        PORT: JSON.stringify(process.env.PORT),
        API: JSON.stringify(process.env.APIUrl),
      },
    }),
    new BrotliPlugin({
      asset: "[fileWithoutExt].[ext].br",
      test: /\.(js|html|svg|txt|eot|otf|ttf|gif)$/,
    }),
    new CompressionPlugin({
      test: /\.(js|html|svg|txt|eot|otf|ttf|gif)$/,
      filename: "[path][base].gz",
    }),
  ],
};
