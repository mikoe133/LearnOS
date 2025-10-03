var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 从'./routes/index'文件中导入了indexRouter模块。
var indexRouter = require('./routes/index');
const accountrouter = require('./routes/account')

var app = express();

// view engine setup
// 这部分是设置视图引擎的配置。在这个例子中，视图引擎被设置为 EJS（Embedded JavaScript），这意味着应用程序将使用 EJS 模板来渲染视图
app.set('views', path.join(__dirname, 'views'));
// 这行代码设置了视图文件的目录。在这个例子中，视图文件被设置为位于应用程序根目录下的 views 文件夹。
app.set('view engine', 'ejs');
// : 这里使用了一系列中间件来处理请求。中间件是 Express 应用程序中处理 HTTP 请求的功能模块
// 这是一个日志中间件，用于记录请求的信息。
app.use(logger('dev'));
//解析请求体
// 这些是用于解析请求体的中间件，用于处理客户端提交的 JSON 数据和 URL 编码数据。
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 这是用于解析 cookie 的中间件。
app.use(cookieParser());
// 这是用于提供静态文件的中间件，将应用程序的 public 目录设置为静态文件目录。
app.use(express.static(path.join(__dirname, 'public')));
// 告诉应用程序对根URL的请求使用indexRouter
// 这行代码告诉应用程序对根 URL 的请求使用 indexRouter 中间件。
app.use('/', indexRouter);
// 这行代码告诉应用程序对 /api URL 的请求使用 accountrouter 中间件。
app.use('/api',accountrouter)
// 拦截所有请求
app.use((req, res, next) => {
  // 允许哪些客户端访问
  res.header('Access-Control-Allow-Origin', '*');
// 设置响应头，允许跨域 
  res.setHeader('Access-Control-Allow-Headers', '*');
  // 允许哪些请求方法
  res.header('Access-Control-Allow-Methods', 'get,post');
  next();
})
// catch 404 and forward to error handler
// 这是一个用于捕获 404 错误并转发到错误处理程序的中间件。
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// 这是一个错误处理程序中间件，用于处理应用程序中的错误情况，并渲染错误页面。
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
