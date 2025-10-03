const fs = require('fs')
const rs = fs.createReadStream('../promise/基本.html')
rs.on('data',chunk=>{
    console.log(chunk.toJSON());
    console.log(chunk.toString());
})
rs.on('end',()=>{
    console.log('读取完成');
})