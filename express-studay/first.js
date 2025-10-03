const express = require('express')
// 创建应用对象
const app = express()
const port = 3000
//创建路由
app.get('/home', (req, res) => res.end('Hello World!'))
app.get('/',(req,res)=>{
    res.end('home')
})
app.post('/login',(req,res)=> res.end('login'))
app.all('/text',(req,res)=>res.end('test test'))
app.all('*',(req,res)=>res.end('404notfound'))
// 监听端口启动服务
app.listen(port, () => console.log(`Example app listening on port ${port}!`))