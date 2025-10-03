//1导入http模块
const http = require('http')
//2创建服务列表
const server = http.createServer((request,response)=>{
    //request获取请求行请求头请求体
    //response对响应报文封装
    console.log(request.method);//获取请求的方法
    console.log(request.url);//获取只包含URL中的路径与查询字符串
    console.log(request.httpVersion);//获取版本号
    console.log(request.headers.host);
    //response.setHeader('content-type','text/html;charset=utf-8')//设置响应头的字符集解决乱码
    response.end('薛屹阳')//设施响应体并结束响应
})
//3监视端口,启动服务
server.listen(9000,()=>{
    console.log('服务已经启用');
})
