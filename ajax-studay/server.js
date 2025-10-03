const express = require('express')
const cors = require('cors')
const app = express()
// app.use(cors())
app.get('/server',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.send('这是get响应体内容')
})
app.post('/postserver',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.send('这是post响应体内容')
})
app.get('/delay',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    setTimeout(()=>{
        res.send('这是delay响应体内容')
    },3000)
})
app.all('/jQuery',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    let data = {name:'aaa'}
    res.setHeader('Access-Control-Allow-Headers','*')
    res.send(JSON.stringify(data))
})
app.all('/axios',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    let data = {name:'aaa'}
    res.setHeader('Access-Control-Allow-Headers','*')
    res.send(JSON.stringify(data))
})
app.all('/json-server',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    // res.send('这是json响应体内容')
    const data ={
        content:'这是json响应体内容'
    }
    let str = JSON.stringify(data)
    res.send(str)
})
app.all('/fetch',(req,res)=>{
    // res.setHeader('Access-Control-Allow-Headers', '*');
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // // res.send('这是json响应体内容')
    // const data ={
    //     content:'这是json响应体内容'
    // }
    // let str = JSON.stringify(data)
    // res.send(str)
})
app.all('/jsonp',(req,res)=>{
    let data = {
        name:'content'
    };
    let str = JSON.stringify(data)
    res.end(`handle(${str})`)
})
app.all('/checkname',(req,res)=>{
    let data = {
        exist:1,
        msg:'用户名已存在'
    };
    let str = JSON.stringify(data)
    res.send(`handle(${str})`)
})
app.all('/cors',(req,res)=>{
    // res.setHeader('Access-Control-Allow-Origin','*')
    let data = {
        exist:1,
        msg:'用户名已存在'
    };
    let str = JSON.stringify(data)
    res.send(`handle(${str})`)
})
app.all('/jqueryjsonp',(req,res)=>{
    let data = {
        exist:2,
        msg:'hhhhhh'
    };
    let str = JSON.stringify(data)
    // 接收callback参数
    let cb = req.query.callback
    res.send(`${cb}(${str})`)
})
app.listen(8000,()=>{
   console.log('服务启动'); 
})