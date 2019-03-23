const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'js/index.jsx'),
    output: {
        path: path.resolve(__dirname, 'build/js'),
        filename: 'index.js',
    },
    //    devtool: 'inline-source-map',  // for development. Version of webpack is
    //                                      too old for separate dev and production
    //                                      build configs
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};
