//1导入http模块
const http = require('http')
const fs = require("fs")

//2创建服务列表
const server = http.createServer((request,response)=>{
    //request获取请求行请求头请求体
    //response对响应报文封装
    //获取请求url的路径
    let {pathname} = new URL(request.url,'http://127.0.0.1')
    if(pathname === '/'){
        let html = fs.readFileSync(__dirname+'/home.html')
        //response.setHeader('content-type','text/html;charset=utf-8')//设置响应头的字符集解决乱码
        response.end(html)//设施响应体并结束响应
    }else if(pathname === '/home.css'){
        let css = fs.readFileSync(__dirname+'/home.css')
        //response.setHeader('content-type','text/html;charset=utf-8')//设置响应头的字符集解决乱码
        response.end(css)//设施响应体并结束响应
    }else if(pathname === '/home.js'){
        let js = fs.readFileSync(__dirname+'/home.js')
        response.end(js)
    }else{
        response.statuscode = 404
        response.end('404 Not Found')
    }

})
//3监视端口,启动服务
server.listen(9000,()=>{
    console.log('服务已经启用');
})
