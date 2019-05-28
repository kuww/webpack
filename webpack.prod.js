const webpack = require("webpack");
const merge = require("webpack-merge");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const common = require("./webpack.common.js");

module.exports = merge(common, {
    optimization: {
        minimizer: [new UglifyJSPlugin({})],
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    },
    module :{
        rules : [ {
            test: /\.css$/,
            // use:[
            //     {
            //         loader:'style-loader'
            //     },{
			// 		loader:'postcss-loader',
			// 		options:{
			// 				presets:['@babel/preset-env']
			// 			}
            //         }
            // ]
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    {
					loader:'postcss-loader',
					options:{
							presets:['@babel/preset-env']
						}
                    }
            ]})
            // use: 
        }]
    
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        }),
        // new ExtractTextPlugin({
        //     filename:"css/[chunkhash].css",
        //     allChunks:false
        // }),
        new webpack.HashedModuleIdsPlugin(),
    ]
});
