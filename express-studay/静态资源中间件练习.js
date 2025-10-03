const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// 使用 express.static 中间件来提供静态文件服务
app.use('/bbb',express.static(path.join(__dirname,"public")))
// app.use(express.static(path.join(__dirname, '/public')));
// app.use('/aa/',express.static(path.join(__dirname, '/test/')));
// app.use('/aa',express.static(path.join(__dirname, '/public'),{index:'aaa.html'}));
// app.use('/aa',express.static(__dirname+'/public',{index:'aaa.html'} ));
// app.use('/', express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));