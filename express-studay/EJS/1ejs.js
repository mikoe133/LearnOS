const ejs = require('ejs')
const fs = require('fs')
let a = '我是'
let b = '人'
let c = "我好6"
let str = fs.readFileSync('./1的html.html').toString()
let result = ejs.render(str,{b,c})
console.log(result);