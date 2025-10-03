const express = require('express')
const app = express()
const  bodyParser = require('body-parser')
const port = 3000
//处理 querystring 格式的请求体
let urlParser = bodyParser.urlencoded({extended:false});
//处理 JSON 格式的请求体
let jsonParser = bodyParser.json();
app.get('/login', (req, res) => {
    // res.send('表单页面')
    res.sendFile(__dirname+'/public/form.html')
})
app.post('/login',urlParser,(req,res)=>{
    console.log(req.body);
    res.send('aaaaa')
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))