const fs = require('fs')
fs.readFile('./座右铭.txt',(err,data)=>{
    if(err){
        console.log('读取失败');
        return
    }
    console.log(data.toString());
})
let data = fs.readFileSync('./座右铭.txt')
console.log(data.toString());