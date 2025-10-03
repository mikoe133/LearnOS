const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
// 声明中间件函数
function middlefn(req,res,next){
    let{url,ip} = req
    console.log(url,ip);
    fs.appendFileSync(path.resolve(__dirname,'./access.log'),`${url} ${ip}\r\n`)
    // 调用next
    next()
}
app.use(middlefn)
app.get('/home',(req,res)=>{
    res.send('前台首页')
})
app.get('/houtai',(req,res)=>{res.send('后台首页')})
app.all('*',(req,res)=>res.send('<h1>404 notfound</h1>'))
app.listen(3000,()=>console.log('服务启动'))