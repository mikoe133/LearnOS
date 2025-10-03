const fs = require("fs")
// fs.unlink("./要删的文件.txt",err=>{
//     if(err){
//         console.log("删除失败");
//         return
//     }
//     console.log("删除成功");
// })
fs.rm("./aa.txt",err=>{
        if(err){
            console.log("删除失败");
            return
        }
        console.log("删除成功");
    })