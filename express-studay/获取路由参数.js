const express = require('express')
const app = express()
app.get('/:id',(req,res)=>{
    console.log(req.params.id);//获取路由参数
    res.setHeader('content-type','text/html;charset=utf-8')
    res.end('商品详情')
})
app.listen(3000,()=>{
    console.log('服务启动成功');
})