/*
 * @Author: xyyvscode 3432010031@qq.com
 * @Date: 2023-12-05 23:16:21
 * @LastEditors: xyyvscode 3432010031@qq.com
 * @LastEditTime: 2023-12-08 20:57:59
 * @FilePath: /vscode document/webpack/src/babel.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
  // 智能预设：能够编译ES6语法
  presets: [
    [
      "@babel/preset-env",
      // 按需加载core-js的polyfill
      { useBuiltIns: "usage", corejs: { version: "3", proposals: true } },
    ],
  ],
};