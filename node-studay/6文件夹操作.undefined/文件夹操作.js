const fs = require('fs')
// fs.mkdir('./html',err=>{
//     if(err){
//         console.log('创建失败');
//         return
//     }
//     console.log("创建成功");
// })
// fs.mkdir('./a/b/c',{recursive:true},err=>{
//     if(err){
//         console.log('创建失败');
//         return
//     }
//     console.log("创建成功");
// })
// fs.readdir('../文件夹操作',(err,data)=>{
//     if(err){
//         console.log("读取失败");
//         return
//     }
//     console.log(data);
// })
fs.rmdir('./a/b/c',err=>{
    if(err){
        console.log("删除失败");
        return
    }
    console.log("删除成功");
})
fs.rmdir('./a',{recursive:true},err=>{
    if(err){
        console.log("删除失败");
        return
    }
    console.log("删除成功");
})