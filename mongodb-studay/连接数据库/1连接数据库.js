// 安装mongoose
const mongoose = require('mongoose')
// 导入mongoose
mongoose.connect('mongodb://127.0.0.1:27017/bilibili')
// 设置回调
mongoose.connection.once('open',()=>{
    console.log('连接成功');
})
mongoose.connection.once('error',()=>{
    console.log('连接失败');
})
mongoose.connection.once('close',()=>{
    console.log('连接关闭');
})
// 关闭MongoDB连接
setTimeout(() => {
    mongoose.disconnect()
}, 3000);
