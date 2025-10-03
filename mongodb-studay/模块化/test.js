const db = require('./db/db')
const moviemodel = require('./models/moviemodel')
db(()=>{
    moviemodel.create({
        title:'asdasd',
        name:"sadsad"
    }).then(data=>{
        console.log(data);
    }).catch(err=>{
        console.log(err);
    })
},()=>{
    console.log('连接失败');
})