// 导入db
const db = require('./db/db')
const mongoose = require('mongoose')
// 导入bookmodel
const bookmodel = require('./models/bookmodel')
db(() => {
    console.log('连接成功');
    // 连接MongoDB数据库

        // 新增
        bookmodel.create({
            name: 'saishidadsadsad',
            author: '吴承恩',
            price: 19211
        })
            .then(data => {
                console.log(data);
                mongoose.disconnect();
            })
            .catch(err => {
                console.log(err);
                mongoose.disconnect();
            });

}, () => {
    console.log('连接失败');
})

