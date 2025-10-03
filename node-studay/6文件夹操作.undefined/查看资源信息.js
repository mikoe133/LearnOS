const fs = require('fs')
fs.stat('../文件夹操作/查看资源信息.js',(err,data)=>{
    if(err){
        console.log('操作失败',err);
        return
    }
    console.log(data);
})
console.log(data.isFile());//查看是否是文件
console.log(data.isDirectory());//查看是否是文件夹