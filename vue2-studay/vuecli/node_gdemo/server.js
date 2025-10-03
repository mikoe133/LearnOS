const express = require('express');
var history = require('connect-history-api-fallback');
const app = express();
app.listen(3000, () => console.log('Example app listening on port 3000!'));
// 必须在静态资源use之前使用
app.use(history());
app.use(express.static(__dirname+'/static'))
app.get('/person', (req, res) => {
    res.send({
        name: "John Doe",
        age: 30,
        city: "New York",
        age:18
    });
    })