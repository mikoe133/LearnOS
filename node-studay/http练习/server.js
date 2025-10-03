//1导入http模块
const http = require('http')
const fs = require("fs")
const path = require('path')

let mimes = {
    html: 'text/html',
    css: 'text/css',
    js: 'text/javascript',
    png: 'image/png',
    jpg: 'image/jpeg',
    gif: 'image/gif',
    mp4: 'video/mp4',
    mp3: 'audio/mpeg',
    json: 'application/json'
}
//2创建服务列表
const server = http.createServer((request, response) => {
    if (request.method !== 'GET') {
        response.statusCode = 405
        response.end('<h1>405 method not allowed</h1>')
        return
    }
    //request获取请求行请求头请求体
    //response对响应报文封装
    //获取请求url的路径
    let { pathname } = new URL(request.url, 'http://127.0.0.1')
    console.log(pathname);
    //拼接文件路径
    //网站根目录
   // 获取当前文件所在的目录
    let root = __dirname + '/page'
    // 拼接文件路径
    let filepath = root + pathname
// //写一个防抖函数
//     function debounce(fn, wait) {
//         let timeout = null
//         return function () {
//             if (timeout !== null) clearTimeout(timeout)
//             timeout = setTimeout(fn, wait)
//         }
//     }
    //异步读取文件
   fs.readFile(filepath, (err, data) => {
        if (err) {
            // 设置响应头
            response.setHeader('content-type', 'text/html;charset = utf-8')
            // 根据错误码设置响应状态码
            switch (err.code) {
                case 'EMOENT':
                    response.statusCode = 404
                    response.end('<h1>404 not found</h1>')
                case 'EPERM':
                    response.statusCode = 403
                    response.end('<h1>403 forbidden</h1>')
                default:
                    response.statusCode = 500
                    response.end('<h1>internal server error</h1>')
            }
            return
        }
        //设置资源类型
        // 获取文件后缀名
        let ext = path.extname(filepath).slice(1)
        let type = mimes[ext]
        if (type) {
            if (ext === 'html') {
                response.setHeader('content-type', type + ';charset=utf-8')
            } else {
                response.setHeader('content-type', type)
            }
        } else {
            response.setHeader('content-type', 'application/octet-stream ')
        }
        response.setHeader('content-type', '')
        response.end(data)
    })
})
//3监视端口,启动服务
server.listen(9000, () => {
    console.log('node服务已经启用');
})





// const http = require('http');
// const fs = require("fs");
// const path = require("path");

// const server = http.createServer((request, response) => {
//     let { pathname } = new URL(request.url, 'http://127.0.0.1');
//     if (pathname === '/') {
//         let html = fs.readFileSync(path.join(__dirname, 'page', 'index.html'));
//         response.end(html);
//     } else if (pathname === '/index.css') {
//         let css = fs.readFileSync(path.join(__dirname, 'page', 'css', 'index.css'));
//         response.end(css);
//     } else if (pathname === '/index.js') {
//         let js = fs.readFileSync(path.join(__dirname, 'page', 'js', 'index.js'));
//         response.end(js);
//     } else {
//         response.statusCode = 404;
//         response.end('404 Not Found');
//     }
// });

// server.listen(9000, () => {
//     console.log('服务已经启用');
// });