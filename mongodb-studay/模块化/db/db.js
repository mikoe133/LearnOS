// 数据连接模块
module.exports = function (success,error) {
    const mongoose = require('mongoose');
    const {dbhost,dbport,dbname} = require('../config/config')
    // 导入mongoose
    mongoose.connect(`mongodb://${dbhost}:${dbport}/${dbname}`);

    mongoose.connection.once('open', () => {
        success()
    })
    mongoose.connection.once('error', () => {
        error()
        console.log('连接失败');
    });
    mongoose.connection.once('close', () => {
        console.log('连接关闭');
    });
}

