function require(file) {
    // 将相对路径转为绝对路径
    let absolutePath = path.resolve(__dirname, file)
    //缓存检测
    //如果加载过文件,直接返回文件的暴露值
    if (caches[absolutePath]) {
        return caches[absolutePath]
    }
    //读取文件代码
    let code = fs.readFileSync(absolutePath).toString()//将buffer转为字符串
    let module = {}
    let exports = module.exports = {}
    //包裹为一个函数
    (function (exports, require, module, __filename, __dirname) {
        const test = {
            name: 'xyy',
            age: 21
        }
        module.exports = {
            test
        }
        console.log(arguments.callee.toString());
    })(exports, require, module, __filename, __dirname)
    // 缓存结果
    caches = [absolutePath]= module.exports
    //返回module.exports的值

}
const rq = require('./a')