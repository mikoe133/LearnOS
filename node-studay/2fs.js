const fs = require('fs');
fs.writeFile('./座右铭.txt','哈哈哈哈哈',err=>{
    if(err){
        console.log("写入失败");
        return
    }else{
        console.log("写入成功");
    }
})