var path = require("path");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: "./app/app.js",
    output: {
        path: path.join(__dirname + "/build"),
        filename: "bundle.js"
    },
    watch: true,
    module: {
        loaders: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract('css!sass')
            },
            {
                // I want to uglify with mangling only app files, not thirdparty libs
                test: /.*\/app\/.*\.js$/,
                exclude: /.spec.js/, // excluding .spec files
                loader: "uglify"
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("style.css"),
        new CopyWebpackPlugin([
            {
                from: "app/index1.html"
            },
            {
                from: "app/assets/images/",
                to: "assets/images/"
            }
        ],
            {copyUnmodified: true}
        )
    ],
    devServer: {
        outputPath: path.join(__dirname, '/build'),
        contentBase: path.join(__dirname + "/build"),
        compress: true,
        inline: true
    }
};
