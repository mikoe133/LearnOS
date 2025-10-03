/*
 * @Author: xyyvscode 3432010031@qq.com
 * @Date: 2023-12-05 21:36:53
 * @LastEditors: xyyvscode 3432010031@qq.com
 * @LastEditTime: 2023-12-08 20:15:52
 * @FilePath: /vscode document/webpack/src/.eslintrc.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
    // 继承 Eslint 规则
    extends: ["eslint:recommended"],
    env: {
      node: true, // 启用node中全局变量
      browser: true, // 启用浏览器中全局变量
    },
    parserOptions: {
      ecmaVersion: 6,
      sourceType: "module",
    },
    rules: {
      "no-var": 2, // 不能使用 var 定义变量
    },
    Plugins:["import"]
  };