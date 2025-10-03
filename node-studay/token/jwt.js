//导入 jsonwebtokan
const jwt = require('jsonwebtoken');
//创建 token
// jwt.sign(数据, 加密字符串, 配置对象)
let token = jwt.sign({
username: 'zhangsan'
}, 'atguigu', {
expiresIn: 60 //单位是 秒
})
console.log(token);
let t = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InpoYW5nc2FuIiwiaWF0IjoxNzAxNDE1MDc5LCJleHAiOjE3MDE0MTUxMzl9.W-fiuh6CCbDVLLwRDhv0du3mHKNL3qzYMC-7c2lTNig'
//解析 token
jwt.verify(t, 'atguigu', (err, data) => {
if(err){
console.log('校验失败~~');
return
}
console.log('成功校验',data);
})