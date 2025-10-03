const fs = require('fs')
// fs.rename('./薛屹阳的流式内容','./薛屹阳的流式内容.txt',err=>{
//     if(err){
//         console.log('操作失败');
//         return
//     }
//     console.log("操作成功");
// })

fs.rename('./薛屹阳的流式内容.txt','./随便的路径/薛屹阳的流式内容.txt',err=>{
    if(err){
        console.log('操作失败');
        return
    }
    console.log("操作成功");
})