/*
 * @Author: xyyvscode 3432010031@qq.com
 * @Date: 2023-12-04 15:22:45
 * @LastEditors: xyyvscode 3432010031@qq.com
 * @LastEditTime: 2023-12-08 21:02:37
 * @FilePath: /vscode document/webpack/src/main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import "core-js/es/promise"
import count from "./js/count";
import 'core-js'
import sum from "./js/sum";
// 引入资源
import "./css/index.css";

import "./less/index.less";

import "./sass/index.sass"

import "./sass/index.scss"

import "./stylus/index.styl"

import "./css/iconfont.css"
// let aaa = count(2,1)
console.log(count(2, 1));

console.log(sum(1, 2));
if(module.hot){
    module.hot.accept('./js/count')
}

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("SW registered: ", registration);
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError);
        });
    });
  }