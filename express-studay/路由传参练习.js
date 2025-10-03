const express = require('express')
const {singers} = require('./JSON/singer.json')
console.log(singers);
const app = express()
app.get('/singer/:id.html',(req,res)=>{
    console.log(req.params.id);//获取路由参数
    let {id} = req.params
    // 在数组中寻找对应id的数据
    let result = singers.find(item=>{
        if(item.id === Number(id)){
            return true
        }
    })
    console.log(result);

    res.setHeader('content-type','text/html;charset=utf-8')
    if(!result){
        res.statusCode = 404
        res.end('<h1>404 Not Found</h1>')
        return;
    }
    res.end(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <h2>${result.singer_name}</h2>
        <h3>${result.singer_id}</h3>
    </body>
    </html>
    `)
})
app.listen(3000,()=>{
    console.log('服务启动成功');
})