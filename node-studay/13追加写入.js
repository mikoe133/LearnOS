const fs = require("fs")
fs.appendFile('./座右铭.txt',',66666',err=>{
    if(err){
        console.log('写入失败');
        return
    }
    console.log("成功");
})