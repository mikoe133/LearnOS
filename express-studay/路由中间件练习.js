const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
app.get('/home',(req,res)=>{
    res.send('home页')
})
let checkcode = (req,res,next)=>{
    if(req.query.code === '521'){
        next()
    }else{
        res.send('暗号错误')
    }
}
function middlefn(req,res,next){
    let{url,ip} = req
    console.log(url,ip);
    fs.appendFileSync(path.resolve(__dirname,'./access.log'),`${url} ${ip}\r\n`)
    // 调用next
    next()
}
app.use(middlefn)
app.get('/login',checkcode,(req,res)=>{
    res.send('login页')
})
app.get('/loginset',checkcode,(req,res)=>{
    res.send('loginset页')
})
app.all('*',(req,res)=>{
    res.send('<h1>404 notfound</h1>')
})
app.listen(3000,()=>{
    console.log('服务启动');
})          