const express = require('express')
const app = express()
app.get('/',(req,res)=>{
    res.send('hello')
})
app.listen(8000,()=>{
   console.log('服务启动'); 
})