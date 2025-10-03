var express = require('express');
var router = express.Router();
// // 导入lowdb
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(__dirname+'/../data/db.json')
const db = low(adapter)
// // 导入shortid
// const shortid = require('shortid')
/* GET home page. */
// 记账本列表
router.get('/account', function(req, res, next) {
  //获取所有的账单信息
  let accounts = db.get('accounts').value()
  console.log("accounts----->",accounts);
  res.render('list',{accounts:accounts})
});
// 添加记录
router.get('/account/create', function(req, res, next) {
  res.render('create')
  res.send('helloxyy')
});
router.post('/account', function(req, res, next) {
  console.log(req.body);
  let id = shortid.generate()
  // 写入文件
  db.get('accounts').unshift({id:id,...req.body}).write()
  // 成功提现
  res.render('success',{msg:'添加成功哦~~~',url:'/account'})
});
router.get('/account/:id',(req,res)=>{
  // 获取params的id参数
  let id = req.params.id
  // 删除
  db.get('accounts').remove({id:id}).write()
  res.render('success',{msg:'删除成功哦~~~',url:'/account'})
})
module.exports = router;
