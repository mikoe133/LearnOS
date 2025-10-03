const mongoose = require('mongoose');
// 导入mongoose
mongoose.connect('mongodb://127.0.0.1:27017/bilibili', { useNewUrlParser: true, useUnifiedTopology: true });
// 连接MongoDB数据库
mongoose.connection.once('open', () => {
    // 创建文档结构对象
    let bookschema = new mongoose.Schema({
        name: String,
        author: String,
        price: Number
    });
    // 创建模型对象
    let bookmodel = mongoose.model('books', bookschema);
    // 新增
    bookmodel.create({
        name: 'aaa',
        author: '吴承恩',
        price: 19
    })
    .then(data => {
        console.log(data);
        mongoose.disconnect();
    })
    .catch(err => {
        console.log(err);
        mongoose.disconnect();
    });
});
mongoose.connection.once('error', () => {
    console.log('连接失败');
});
mongoose.connection.once('close', () => {
    console.log('连接关闭');
});