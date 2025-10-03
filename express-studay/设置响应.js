const express = require('express')
const app = express()
app.get('/otherresponse',(req,res)=>{
    //原生响应
    // res.setHeader('content-type','text/html;charset=utf-8')
    // res.statusCode = 404
    // res.statusMessage = 'love'
    // res.write('you')
    // res.end('response')
    //express响应
    // res.status(500)
    // res.set('aaa','bbb')//设置响应头
    // res.send('响应体响应体响应体')//设置响应体
    res.redirect('http://www.baidu.com')
})
app.listen(3000,()=>{
    console.log('服务启动成功');
})