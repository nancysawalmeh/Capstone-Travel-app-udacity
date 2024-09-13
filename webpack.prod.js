const common = require("./webpack.common.js"),
  { merge } = require("webpack-merge"),
  CssMinimizerPlugin = require("css-minimizer-webpack-plugin"),
  TerserPlugin = require("terser-webpack-plugin"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  WorkboxPlugin = require("workbox-webpack-plugin"),
  path = require("path");

module.exports = merge(common, {
    mode: "production",
    devtool: "hidden-source-map",
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            },
        ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'var',
        library: 'Client',
        clean: true,
    },
    optimization: {
        minimize: true,
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            // `...`,
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: "[name].css" }),
    // Add the WorkboxPlugin to generate the service worker
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
    ]
})