const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const WorkboxPlugin = require("workbox-webpack-plugin");
module.exports = merge(common, {
    devtool: "inline-source-map",
    devServer: {
        contentBase: "./dist",
        hot: true,
        port: "8090"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            presets: ["@babel/preset-env"]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new WorkboxPlugin.GenerateSW({
            // 这些选项帮助 ServiceWorkers 快速启用
            // 不允许遗留任何“旧的” ServiceWorkers
            clientsClaim: true,
            skipWaiting: true
        })
    ]
});
