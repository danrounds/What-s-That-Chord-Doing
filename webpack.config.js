const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'js/index.js'),
    output: {
        path: path.resolve(__dirname, 'build/js'),
        filename: 'index.js',
    },
//    devtool: 'inline-source-map',  // for development. Version of webpack is
//                                      too old for separate dev and production
//                                      build configs
    devtool: 'source-map',
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: 'babel',
        },
      ]
    }
};
