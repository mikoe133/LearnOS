const express = require('express')
const app = express()
// 静态资源文件路径
app.use(express.static(__dirname+'/public'))
app.get('/home',(req,res)=>{
    res.send('home页')
})
app.get('/a',(req,res)=>{
    res.send('a页')
})
app.listen(3000,()=>{
    console.log('服务启动');
})