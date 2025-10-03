// 关键对象模块
const mongoose = require('mongoose')
// 创建文档结构对象
  let bookschema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number
});
// 创建模型对象
let bookmodel = mongoose.model('books', bookschema);
module.exports = bookmodel