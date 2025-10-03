var express = require('express');
var path = require('path');
var router = express.Router();
const formidable = require('formidable')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/portrait', (req, res) => {
  res.render('portrait')
})
// 处理文件上传
router.post('/portrait', (req, res,next) => {
  // 创建form对象
  var dirname = __dirname;
  console.log('dirname',dirname)
  const form = new formidable.IncomingForm({
    multiples: true,
    // 设置文件上传目录
    uploadDir:  path.join('../','/generator/public/images'),
    // 保持文件后缀
    keepExtensions: true
  });
  // // 解析请求报文
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
  //   console.log('fields==>', fields);
  //   console.log('files==>', files);
  //   // 服务器保存图片的访问url
  //   let url = '/images/' + files.portrait.newFilename

  //   res.send(url);
  res.send('aa')

  });

  
})
module.exports = router;
