const fs = require('fs').promises; // 使用 promise 版本
const mongoose = require('mongoose');

// 定义模型（应在模块顶层定义一次）
const newTestSchema = new mongoose.Schema({
    title: String,
    author: String,
    body: String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {}
});

const NewTestModel = mongoose.model('newtestmodel', newTestSchema);

// 读取文件函数
async function readFile(path) {
    try {
        const data = await fs.readFile(path, 'utf8');
        return data;
    } catch (err) {
        throw new Error(`读取文件失败 ${path}: ${err.message}`);
    }
}

// 主流程
async function main() {
    try {
        // 1. 读取三个文件
        const [firstdata, seconddata, thirddata] = await Promise.all([
            readFile('./recource/1.txt'),
            readFile('./recource/2.txt'),
            readFile('./recource/3.txt')
        ]);

        console.log('读取成功', { firstdata, seconddata, thirddata });

        // 2. 连接 MongoDB
        await mongoose.connect('mongodb://localhost:27017/test');
        console.log('MongoDB 连接成功');

        // 3. 查询数据
        const docs = await NewTestModel.find({});

        const result = {
            firstdata,
            seconddata,
            thirddata,
            mongodbdata: 'connected',
            newtestmodeldata: docs
        };

        console.log('最终结果:', result);
        return result;

    } catch (err) {
        console.error('读取失败 alllllll', err);
        throw err;
    } finally {
        // 可选：关闭连接（如果这是脚本）
        // await mongoose.disconnect();
    }
}

// 执行
main();