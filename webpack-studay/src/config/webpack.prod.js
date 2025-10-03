const path = require("path");
const os = require('os')
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const threads = os.cpus().length
const TerserPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
function getStyleLoader(pre) {
  return [MiniCssExtractPlugin.loader, "css-loader",
  {
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        plugins: [
          "postcss-preset-env", // 能解决大多数样式兼容性问题
        ],
      },
    },
  },
    pre
  ].filter(Boolean)
}
module.exports = {
  entry: "./main.js",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "static/js/main.js", // 将 js 文件输出到 static/js 目录中
    clean: true, // 自动将上次打包目录资源清空
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            // 用来匹配 .css 结尾的文件
            test: /\.css$/,
            // use 数组里面 Loader 执行顺序是从右到左
            // eslint-disable-next-line no-undef
            use: getStyleLoader(),
          },
          {
            test: /\.less$/,
            use: getStyleLoader('less-loader'),
          },
          {
            test: /\.s[ac]ss$/,
            use: getStyleLoader('sass-loader'),
          },
          {
            test: /\.styl$/,
            use: getStyleLoader('stylus-loader'),
          },
          {
            test: /\.(png|jpe?g|gif|webp)$/,
            type: "asset",
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
              },
            },
            generator: {
              // 将图片文件输出到 static/imgs 目录中
              // 将图片文件命名 [hash:8][ext][query]
              // [hash:8]: hash值取8位
              // [ext]: 使用之前的文件扩展名
              // [query]: 添加之前的query参数
              filename: "static/imgs/[hash:8][ext][query]",
            },
          },
          {
            test: /\.(ttf|woff2?)$/,
            type: "asset/resource",
            generator: {
              filename: "static/media/[hash:8][ext][query]",
            },
          },
          {
            test: /\.js$/,
            exclude: /node_modules/, // 排除node_modules代码不编译
            use: [
              {
                loader:'thread-loader',//开启多进程处理
                options:{
                  works:threads//进程数量
                }
              },
              {
                loader: "babel-loader",
                options: {
                  cacheDirectory: true,//开启babel缓存
                  cacheCompression: false,//关闭缓存压缩
                  plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
                }
              }
            ]
          },

        ]
      }
    ],
  },
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules",
      cache: true,//开启缓存
      cacheLocation: path.resolve(__dirname, '../node_modules/.cahce/eslintcache'),
      threads//开启多进程
    }),
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    // eslint-disable-next-line no-undef
    new MiniCssExtractPlugin({
      filename: 'static/css/main.css'
    }),
    new PreloadWebpackPlugin({
      rel: "preload", // preload兼容性更好
      as: "script",
      // rel: 'prefetch' // prefetch兼容性更差
    }),
    new WorkboxPlugin.GenerateSW({
      // 这些选项帮助快速启用 ServiceWorkers
      // 不允许遗留任何“旧的” ServiceWorkers
      clientsClaim: true,
      skipWaiting: true,
    }),
    // new CssMinimizerPlugin(),
    // new TerserPlugin({
    //   parallel:threads//开启多进程和设置进程数量
    // })

  ],
  optimization:{
    // 压缩操作
    minimizer:[
      new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel:threads//开启多进程和设置进程数量
      }),
    // 压缩图片
     new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminGenerate,
        options: {
          plugins: [
            ["gifsicle", { interlaced: true }],
            ["jpegtran", { progressive: true }],
            ["optipng", { optimizationLevel: 5 }],
            [
              "svgo",
              {
                plugins: [
                  "preset-default",
                  "prefixIds",
                  {
                    name: "sortAttrs",
                    params: {
                      xmlnsOrder: "alphabetical",
                    },
                  },
                ],
              },
            ],
          ],
        },
      },
    }),
    ],
    // 代码分割操作
    splitChunks:{
      chunks:'all'
    },
    runtimeChunk:{
      name:entrypoint=>`runtime~${entrypoint.name}.js`
    }
  },
  mode: "production",
  devtool: "source-map",
};