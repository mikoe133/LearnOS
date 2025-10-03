// const fs = require('fs')
// fs.rename('./创建http.js','./1创建http.js',err=>{
//     if(err){
//     console.log("failed");
//     }
//     console.log("maked");
// })
const http = require('http')
const server = http.createServer((request,response)=>{
    console.log('requesturl=',request.url);
    let {method} = request
    let {pathname} = new URL(request.url,'http://127.0.0.1')
    console.log("method=",method);
    console.log("pathname=",pathname);
    response.setHeader('content-type','text/html;charset=utf-8')
    if(method==='GET'&&pathname==="/login"){
        response.end('欢迎来到登录页面')
    }else if(method==="GET"&&pathname==="/reg"){
        response.end("欢迎来到注册页面")
    }else{
        response.end('not found')
    }
})
server.listen(9000,()=>{
    console.log('maked');
})