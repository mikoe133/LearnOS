const ejs = require('ejs')
const fs = require('fs')

let html = fs.readFileSync('./条件渲染.html').toString()
let islogin = true
let result = ejs.render(html,{islogin:islogin})
console.log(result);