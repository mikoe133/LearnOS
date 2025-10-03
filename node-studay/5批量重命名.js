const fs = require('fs')
const  files = fs.readdirSync('../Nodestudy')
console.log(files);
files.forEach((item,index)=>{
    let data = item.split('.')
    console.log(data);
    let [num,js] = data
    console.log(num,js);
    num=index + num
    let newname = num + '.' + js
    console.log(newname);
    fs.renameSync(`../Nodestudy/${item}`,`../Nodestudy/${newname}`)
})