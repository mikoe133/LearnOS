const fs = require('fs')
const process = require('process')
//方式一
let data = fs.readFileSync('../promise/基本.html')
fs.writeFileSync('./流式复制的promise.txt',data)
console.log(process.memoryUsage());
//方式二
const  rs = fs.createReadStream('../promise/基本.html')
const ws = fs.createWriteStream('./2流式复制的promise.txt')
rs.on('data',chunk=>{
    ws.write(chunk)
})
rs.on('end',()=>{
    console.log(process.memoryUsage());
})