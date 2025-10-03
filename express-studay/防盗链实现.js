const express = require('express')
const app = express()
const port = 3000
app.use((req, res, next) => {
    // 检测请求头中的referer是否为127.0.0.1
    // 获取referer
    let referer = req.get('Referer')
    let Accept = req.get('Accept')
    console.log('Accept',Accept)
    console.log('referer第一次打印',referer)
    // 第一次html请求,所以会打印一次,但是没有referer字段,所以直接next(),第二次img请求,有了referer字段,所以打印出请求路径http://127.0.0.1:3000/aaa.html再next()
    if (referer) {
    //     // 实例化
    console.log('referer第二次打印',referer)
        let url = new URL(referer)
        console.log('url',url)
        // 获取hostname
        let hostname = url.hostname
        console.log('referer第三次打印',referer)
        console.log(hostname);
        if(hostname!=='127.0.0.1'){
            res.status(404).send('<h1>404 not found</h1>')
            return
        }
    }

    next()
})
app.use(express.static(__dirname + '/test'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))