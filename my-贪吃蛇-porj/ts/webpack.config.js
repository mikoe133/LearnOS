const path = require('path');
const htmlwebpackplugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [//配置babel
                    {
                      //指定加载器
                        loader: "babel-loader",
                      //设置babel
                        options:{
                          //设置预定义环境
                            presets: [
                                [
                                  //指定环境的插件
                                    "@babel/preset-env",
                                  //配置信息
                                    {
                                      //要兼容的目标浏览器
                                        "targets":{
                                            "chrome": "58",
                                            "ie": "11"
                                        },
                                      //指定corejs的版本
                                        "corejs":"3",
                                      //使用corejs的方式
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    {
                        loader: "ts-loader",
    
                    }
                ],
                exclude: /node_modules/
            },
            {
              test:/\.less$/,
                use:[
                  'style-loader',
                  "css-loader",
                  // {
                  //   loader:"postcss-loader",
                  //   options:{
                  //     postcssOptions:{
                  //       plugins:[
                  //         'postcss-preset-env',
                  //         {
                  //           browers:'last 2 version',
                  //         }
                  //       ]
                  //     }
                  //   }
                  // },
                  "less-loader"
                ]
            }
        ]
    },
    plugins:[
        new htmlwebpackplugin({
          template:'./src/index.html'
        })
    ],
    resolve: {
        extensions: ['.ts', '.js']
    }
}