const xiyou = ['唐僧','孙悟空','猪八戒','沙僧']
const ejs = require('ejs')
const fs = require('fs')
// 原生js
// let str = '<ul>'
// xiyou.forEach(item=>{
//     str += `<li>${item}</li>`
// })
// str += '</ul>'
// console.log(str);

// ejs实现
let html = fs.readFileSync('./xiyou.html').toString()
let result = ejs.render(html,{xiyou:xiyou})
console.log(result);