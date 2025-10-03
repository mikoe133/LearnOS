const mongoose = require('mongoose');
// 导入mongoose
mongoose.connect('mongodb://127.0.0.1:27017/bilibili');
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
    // // 新增
    // bookmodel.create({
    //     name: 'eee',
    //     author: 'ccc',
    //     price: 19111
    // })
    // .then(data=>{
    //     console.log(data);
    // })
    // bookmodel.deleteOne({_id:'655cc7a77649423f99570638'})
    // .then(data => {
    //     console.log(data);
    //     // mongoose.disconnect();
    // })
    // .catch(err => {
    //     console.log(err);
    //     mongoose.disconnect();
    // });
    bookmodel.deleteOne({ name:'bbb' }, (err, data) => {
        if (!err) {
          console.log(data)
        } else {
          console.log(err)
          return
        }
      })
    // bookmodel.deleteMany({name:'bbb'})
    // .then(data=>{
    //     console.log(data);
    // })
    // .catch(err=>{
    //     console.log(err);
    //     mongoose.disconnect()
    // })
});
mongoose.connection.once('error', () => {
    console.log('连接失败');
});
mongoose.connection.once('close', () => {
    console.log('连接关闭');
});