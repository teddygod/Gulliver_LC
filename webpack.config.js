 var path = require('path');
 var webpack = require('webpack');

 module.exports = {
     entry: './src/index.js',
     output: {
         path: path.resolve(__dirname, 'build'),
         filename: 'app.bundle.js'
     },
     resolve: {
        extensions: ['.js', '.jsx']
     },
     module: {
         loaders: [
             {
                 test: /\.jsx?$/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015', 'react', 'stage-0'],
                     plugins: ["transform-decorators-legacy",
                                   "transform-class-properties"]
                 }
            }, {
                 test: /\.css$/,
                 loader: 'style-loader!css-loader'
            }, {
                 test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                 loader: 'url-loader?limit=100000'
            }
         ]
     },
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };
