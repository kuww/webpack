const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const glob = require('glob')
// const newConfig = require('./webpack.entry')

function getEntry(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        console.log(dirname,basename);
        pathname = pathDir ? pathname.replace(pathDir, '') : pathname;
        entries[basename] = entry;
    }
    return entries;
}
var entries = {};
var HtmlPlugin = [];
var htmls = getEntry('./src/**/*.html', 'src\\');
console.log(htmls);
for (var key in htmls) {
    entries[key] = htmls[key].replace('.html', '.js')
    console.log(key);
    HtmlPlugin.push(
        new ExtractTextPlugin('css/[name].css'),
        new HtmlWebpackPlugin({
            filename: (key == 'index' ? 'index.html' : key + '.html'),
            template: htmls[key],
            inject: true,
            chunks: [key],
            inlineSource: '.(js|css)$'
        })
    )
}
HtmlPlugin.push( new CleanWebpackPlugin())

// console.log(htmls);
module.exports = {
    // entry:{
    //     app:'./src/index.js',
    // entry: newConfig.addEntry(),
    // },
    entry:entries,
    plugins: HtmlPlugin,
    // plugins:[
    //     new CleanWebpackPlugin(),
    //     new HtmlWebpackPlugin({
    //         // title:'production'
    //     }),
    // ], 
    module:{      
          rules : [
          {
              test:/\.js$/,
              exclude: '/node_modules/',
              use:{
                  loader:'babel-loader'
              },
          },
        //   {
        //     test: /\.css$/,
        //     use:[
        //         {
        //             loader:'style-loader'
        //         },{
		// 			loader:'postcss-loader',
		// 			options:{
		// 					presets:['@babel/preset-env']
		// 				}
        //             }
        //     ]

        //     // use: 
        // }
    ]
    },
    // output:{
    //     filename:'js/[name].[chunkhash].bundle.js',
    //     path:path.resolve(__dirname,'dist')
    // },
    output: {
        filename: '[name]/[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
        /*publicPath: options.dev ? '/assets/' : publicPath*/
      },
    resolve:{
        alias:{
            "@":path.resolve(__dirname,'src')
        }
    }
}