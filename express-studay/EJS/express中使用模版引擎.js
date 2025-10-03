const express = require('express')
const app = express()
const path = require('path')
const port = 3000
// 1设置模版引擎
app.set('view engine','ejs')
// 2设置模版文件的存放位置
app.set('views',path.resolve(__dirname,'./views'))

app.get('/home', (req, res) => {
    // 3 render响应res.render('模版的文件名','数据')
    let str = 'aaa'
    res.render('home',{str})
    // 4创建模版文件

})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))