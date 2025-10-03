### 一、express 介绍

express 是一个基于 Node.js 平台的极简、灵活的 WEB 应用开发框架，官方网址：https://www.expressjs.
com.cn/
简单来说，express 是一个封装好的工具包，封装了很多功能，便于我们开发 WEB 应用（HTTP 服务）

### 二、express 使用

#### 2.1 express 下载

express 本身是一个 npm 包，所以可以通过 npm 安装

#### 2.2 express 初体验

大家可以按照这个步骤进行操作：

1. 创建 JS 文件，键入如下代码
   
  ```js
  const express = require('express')
  // 创建应用对象
  const app = express()
  const port = 3000
  //创建路由
  app.get('/home', (req, res) => res.end('Hello World!'))
  // 监听端口启动服务
  app.listen(port, () => console.log(`Example app listening on port ${port}!`))
  ```
2. 命令行下执行该脚本
3. 然后在浏览器就可以访问 http://127.0.0.1:3000/home 👌



### 三、express 路由

#### 3.1 什么是路由

官方定义： 路由确定了应用程序如何响应客户端对特定端点的请求

#### 3.2 路由的使用

一个路由的组成有 请求方法 ， 路径 和 回调函数 组成
express 中提供了一系列方法，可以很方便的使用路由，使用格式如下：
代码示例：

```js
const express = require('express')
// 创建应用对象
const app = express()
const port = 3000
//创建路由
app.get('/home', (req, res) => res.end('Hello World!'))
app.get('/',(req,res)=>{
    res.end('home')
})
app.post('/login',(req,res)=> res.end('login'))
app.all('/text',(req,res)=>res.end('test test'))
app.all('*',(req,res)=>res.end('404notfound'))
// 监听端口启动服务
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
```

#### 3.3 获取请求参数

express 框架封装了一些 API 来方便获取请求报文中的数据，并且兼容原生 HTTP 模块的获取方式

```js
const express = require('express')
// 创建应用对象
const app = express()
const port = 3000
//创建路由
app.get('/home', (req, res) => res.end('Hello World!'))
app.get('/',(req,res)=>{
    res.end('home')
    // 原生操作
    console.log(req.method);
    console.log(req.url);
    console.log(req.httpVersion);
    console.log(req.headers);
    //express操作
    console.log(req.path);
    console.log(req.query);
    console.log(req.ip);
    console.log(req.get('host'));
})
app.post('/login',(req,res)=> res.end('login'))
app.all('/text',(req,res)=>res.end('test test'))
app.all('*',(req,res)=>res.end('404notfound'))
// 监听端口启动服务
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
```

#### 3.4 获取路由参数

路由参数指的是 URL 路径中的参数（数据）

```js
const express = require('express')
const app = express()
app.get('/:id',(req,res)=>{
    console.log(req.params.id);//获取路由参数
    res.setHeader('content-type','text/html;charset=utf-8')
    res.end('商品详情')
})
app.listen(3000,()=>{
    console.log('服务启动成功');
})
```

#### 3.5路由参数练习

> 要求路径/singer/:id.html

###### json文件

```json
{
    "singers":[
        {
            "singer_name":"周杰伦",
            "singer_pic":"http://baidu.com",
            "other_name":"jay chou",
            "singer_id":4588,
            "id":1
        },
        {
            "singer_name":"林俊杰",
            "singer_pic":"http://baidu.com",
            "other_name":"jay chou",
            "singer_id":12388,
            "id":2
        },
        {
            "singer_name":"邓紫棋",
            "singer_pic":"http://baidu.com",
            "other_name":"jay chou",
            "singer_id":213123,
            "id":3
        },
        {
            "singer_name":"蔡依林",
            "singer_pic":"http://baidu.com",
            "other_name":"jay chou",
            "singer_id":838,
            "id":4
        }
    ]
}
```

###### 路由接收

```js
const express = require('express')
const {singers} = require('./JSON/singer.json')
console.log(singers);
const app = express()
app.get('/singer/:id.html',(req,res)=>{
    console.log(req.params.id);//获取路由参数
    let {id} = req.params
    // 在数组中寻找对应id的数据
    let result = singers.find(item=>{
        if(item.id === Number(id)){
            return true
        }
    })
    console.log(result);

    res.setHeader('content-type','text/html;charset=utf-8')
    if(!result){
        res.statusCode = 404
        res.end('<h1>404 Not Found</h1>')
        return;
    }
    res.end(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <h2>${result.singer_name}</h2>
        <h3>${result.singer_id}</h3>
    </body>
    </html>
    `)
})
app.listen(3000,()=>{
    console.log('服务启动成功');
})
```

### 四、express 响应设置

express 框架封装了一些 API 来方便给客户端响应数据，并且兼容原生 HTTP 模块的获取方式

```js
const express = require('express')
const app = express()
//获取请求的路由规则
app.get("/response", (req, res) => {
//1. express 中设置响应的方式兼容 HTTP 模块的方式
res.statusCode = 404;
res.statusMessage = 'xxx';
res.setHeader('abc','xyz');
res.write('响应体');
res.end('xxx');
//2. express 的响应方法
res.status(500); //设置响应状态码
res.set('xxx','yyy');//设置响应头
res.send('中文响应不乱码');//设置响应体
//连贯操作
res.status(404).set('xxx','yyy').send('你好朋友')
//3. 其他响应
res.redirect('http://atguigu.com')//重定向
res.download('./package.json');//下载响应
res.json({
  name :'aaa',
  slogon:'bbb'
});//响应 JSON
res.sendFile(__dirname + '/home.html') //响应文件内容
});
app.listen(3000,()=>{
    console.log('服务启动成功');
})
```

### 五、express 中间件

#### 5.1 什么是中间件

中间件（Middleware）本质是一个回调函数
中间件函数 可以像路由回调一样访问 请求对象（request） ， 响应对象（response）

#### 5.2 中间件的作用

中间件的作用 就是 使用函数封装公共操作，简化代码

#### 5.3 中间件的类型

- 全局中间件
- 路由中间件

##### 5.3.1 定义全局中间件

每一个请求 到达服务端之后 都会执行全局中间件函数
声明中间件函数


```js
const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
// 声明中间件函数
function middlefn(req,res,next){
    let{url,ip} = req
    console.log(url,ip);
    fs.appendFileSync(path.resolve(__dirname,'./access.log'),`${url} ${ip}\r\n`)
    // 调用next
    next()
}
app.use(middlefn)
app.get('/home',(req,res)=>{
    res.send('前台首页')
})
app.get('/houtai',(req,res)=>{res.send('后台首页')})
app.all('*',(req,res)=>res.send('<h1>404 notfound</h1>'))
app.listen(3000,()=>console.log('服务启动'))
```

> 中间件练习
>
> 针对/login,/loginset 的请求,要求URL携带code=521 参数,如未携带提示[暗号错误]

```js
const express = require('express')
const app = express()
app.get('/home',(req,res)=>{
    res.send('home页')
})
let checkcode = (req,res,next)=>{
    if(req.query.code === '521'){
        next()
    }else{
        res.send('暗号错误')
    }
}
app.get('/login',checkcode,(req,res)=>{
    res.send('login页')
})
app.get('/loginset',checkcode,(req,res)=>{
    res.send('loginset页')
})
app.all('*',(req,res)=>{
    res.send('<h1>404 notfound</h1>')
})
app.listen(3000,()=>{
    console.log('服务启动');
})          
```

##### 5.3.2 多个全局中间件

express 允许使用 app.use() 定义多个全局中间件

##### 5.3.3 定义路由中间件

如果 只需要对某一些路由进行功能封装 ，则就需要路由中间件
调用格式如下：

```js
app.use(recordMiddleware);
app.use(function (request, response, next) {
console.log('定义第一个中间件');
next();
})
app.use(function (request, response, next) {
console.log('定义第一个中间件');
next();
})
app.use(function (request, response, next) {
console.log('定义第二个中间件');
next();
})
app.get('/路径',`中间件函数`,(request,response)=>{
});
app.get('/路径',`中间件函数1`,`中间件函数2`,(request,response)=>{
});
```

#### 5.4 静态资源中间件

express 内置处理静态资源的中间件

```js
const express = require('express')
const app = express()
// 静态资源文件路径,将当前文件夹下的public目录作为网站的根目录
app.use(express.static(__dirname+'/public'))
//express会自动寻找public目录下的index作为默认主页,如果不想,可以改变默认主页
//app.use(express.static(path.join(__dirname,"public"),{index:'aaa.html'}))
//这样则aaa.html会默认显示
//app.use('/bbb',express.static(path.join(__dirname,"public"),{index:'aaa.html'}))
//这种写法多了一个参数,搜索时必须在localhost:3000后加上/bbb/才可以加载出默认页面aaa
//如果不想加载默认页面而加载aaa
//app.use('/bbb',express.static(path.join(__dirname,"public")))
//那么这样写然后访问127.0.0.1:3000/bbb/aaa.html也是可以的
app.get('/home',(req,res)=>{
    res.send('home页')
})
app.get('/a',(req,res)=>{
    res.send('a页')
})
app.listen(3000,()=>{
    console.log('服务启动');
})
```

注意事项:

1. index.html 文件为默认打开的资源
2. 如果静态资源与路由规则同时匹配，谁先匹配谁就响应
3. 路由响应动态资源，静态资源中间件响应静态资源

#### 中间件的声明

1. 中间件函数：你可以填写一个或多个自定义的中间件函数，这些中间件函数将按照它们在 `app.use()` 中的顺序依次执行。例如：

   ```javascript
   app.use((req, res, next) => {
       // 自定义中间件函数
       next();
   });
   
   app.use((req, res, next) => {
       // 另一个自定义中间件函数
       next();
   });
   ```

2. 路由处理程序：你可以填写一个或多个路由处理程序，用于处理特定路径的请求。例如：

   ```javascript
   app.use('/users', userRouter);
   ```

3. 内置中间件：Express 内置了一些中间件，例如 `express.static` 用于提供静态文件服务。你可以使用这些内置中间件来处理特定的请求。例如：

   ```javascript
   app.use(express.static('public'));
   ```

4. 第一个参数为路径的中间件：你可以在 `app.use()` 中指定一个路径，表示只有路径匹配的请求才会执行该中间件。例如：

   ```javascript
   app.use('/admin', adminMiddleware);
   ```

#### `req` 对象的常用方法和属性：

- `req.params`: 用于访问路由中的参数。
- `req.query`: 用于访问查询字符串中的参数。
- `req.body`: 用于访问 POST 请求中的请求体参数。
- `req.cookies`: 用于访问请求中的 cookie。
- `req.header()`: 用于访问请求头中的特定字段。
- `req.path`: 获取请求的路径部分。
- `req.method`: 获取请求的 HTTP 方法。
- `req.url`: 获取请求的 URL。
- `req.hostname`: 获取请求的主机名。

#### `res` 对象的常用方法和属性：

- `res.send()`: 用于发送响应。
- `res.json()`: 用于发送 JSON 格式的响应。
- `res.status()`: 用于设置响应的状态码。
- `res.cookie()`: 用于设置响应的 cookie。
- `res.redirect()`: 用于重定向请求。
- `res.setHeader()`: 用于设置响应头的字段。
- `res.get()`: 用于访问响应头中的特定字段。
- `res.locals`: 用于在中间件中传递数据给路由处理程序。

#### 5.5 获取请求体数据 body-parser

express 可以使用 body-parser 包处理请求体
第一步：安装

```shell
npm i body-parser
```

第二步：导入 body-parser 包

```shell
const bodyParser = require('body-parser')
```

第三步：获取中间件函数

```js
//处理 querystring 格式的请求体
let urlParser = bodyParser.urlencoded({extended:false});
//处理 JSON 格式的请求体
let jsonParser = bodyParser.json();
```

第四步：设置路由中间件，然后使用 request.body 来获取请求体数据

```js
app.post('/login', urlParser, (request,response)=>{
//获取请求体数据
//console.log(request.body);
//用户名
console.log(request.body.username);
//密码
console.log(request.body.userpass);
response.send('获取请求体数据');
});
```
**获取到的请求体数据**

```json
[Object: null prototype] { username: 'admin', userpass: '123456' }
```

### 六、防盗链

#### 方法:

1. HTTP Referer 检查：HTTP Referer 是包含在 HTTP 请求头中的字段，它包含了请求的来源页面的 URL。你可以通过检查 Referer 头来确定请求资源的页面是否来自你的网站。如果 Referer 头不匹配你的网站域名，你可以拒绝提供资源。

   z这种方法的缺点是，Referer 头并不是所有浏览器都会发送的，而且它也可以被篡改。因此，这种方法并不是绝对可靠的。

2. 使用 Token 或签名：你可以为你的资源生成一个唯一的 Token 或签名，并将其作为查询参数或请求头发送。在服务器端，你可以验证这个 Token 或签名是否有效，如果不是，就拒绝提供资源。

   这种方法相对安全，因为它不依赖于浏览器发送的头信息，而是通过你的服务器进行验证。

3. 设置 CORS（跨域资源共享）：你可以在服务器端配置 CORS 规则，只允许来自特定域名的请求访问你的资源。这样可以防止其他域名的网站直接引用你的资源。

对于 Node.js 应用程序，你可以在 Express 中编写中间件来实现防盗链的逻辑。在中间件中，你可以检查请求的来源、验证 Token 或签名，或者设置 CORS 规则来保护你的资源。

```js
const express = require('express')
const app = express()
const port = 3000
app.use((req, res, next) => {
    // 检测请求头中的referer是否为127.0.0.1
    // 获取referer
    let referer = req.get('Referer')
    let Accept = req.get('Accept')
    console.log('Accept',Accept)
    console.log('referer第一次打印',referer)
    // 第一次html请求,所以会打印一次,但是没有referer字段,所以直接next(),第二次img请求,有了referer字段,所以打印出请求路径http://127.0.0.1:3000/aaa.html再next()
    if (referer) {
    //     // 实例化
    console.log('referer第二次打印',referer)
        let url = new URL(referer)
        console.log('url',url)
        // 获取hostname
        let hostname = url.hostname
        console.log('referer第三次打印',referer)
        console.log(hostname);
        if(hostname!=='127.0.0.1'){
            res.status(404).send('<h1>404 not found</h1>')
            return
        }
    }

    next()
})
app.use(express.static(__dirname + '/test'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
```

### 六、Router

#### 6.1 什么是 Router

express 中的 Router 是一个完整的中间件和路由系统，可以看做是一个小型的 app 对象。

#### 6.2 Router 作用

对路由进行模块化，更好的管理路由

#### 6.3 Router 使用

创建独立的 JS 文件（homeRouter.js）

主文件:

```js
const express = require('express')
const app = express()
const port = 3000
const homerouter = require('./routes/homerouter')
app.use(homerouter)
app.get('/abc', (req, res) => {
    res.send('abc页')
})
app.all('*', (req, res) => {
    res.send('<h1>404 not found</h1>')
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
```

路由文件:

```js
const express = require('express')
const router = express.Router()

router.get('/home', (req, res) => {
    res.send('home页')
})
router.get('/home', (req, res) => {
    res.send('home页')
})
module.exports = router
```

### 七、EJS 模板引擎

#### 7.1 什么是模板引擎

模板引擎是分离 用户界面和业务数据 的一种技术

#### 7.2 什么是 EJS

EJS 是一个高效的 Javascript 的模板引擎
官网: https://ejs.co/
中文站：https://ejs.bootcss.com/

#### 7.3 EJS 初体验

下载安装EJS

```shell
npm i ejs --save
```

主文件代码示例:

```js
const ejs = require('ejs')
const fs = require('fs')
let a = '我是'
let b = '人'
let c = "我好6"
let str = fs.readFileSync('./1的html.html').toString()
let result = ejs.render(str,{b,c})
console.log(result);
```

html代码:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h2>
        我是<%= b %>
        <%= c %>
    </h2>
</body>
</html>
```

#### 7.4 ejs列表渲染

1. `<% ... %>`：这种标记用于包裹 JavaScript 代码块，可以在其中编写任意的 JavaScript 代码，比如循环、条件判断、函数调用等。这些代码块可以用来处理数据、控制页面逻辑等。
2. `<%= ... %>`：这种标记用于输出内容，其中的内容通常会被动态地替换为具体的数值。通常情况下，这个数值是通过 JavaScript 代码计算得出的，比如从后端传递到前端的数据，或者在前端页面中进行的一些计算结果。

##### js实现

```js
// 原生js
let str = '<ul>'
xiyou.forEach(item=>{
    str += `<li>${item}</li>`
})
str += '</ul>'
console.log(str);
```

##### ejs实现

源文件:

```js
const xiyou = ['唐僧','孙悟空','猪八戒','沙僧']
const ejs = require('ejs')
const fs = require('fs')
// ejs实现
let html = fs.readFileSync('./xiyou.html').toString()
let result = ejs.render(html,{xiyou:xiyou})
console.log(result);
```

html文件:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>西游记</title>
</head>
<body>
    <ul>
        <%  xiyou.forEach(item=>{ %>
        <li><%= item  %></li>
        <%  }) %>
    </ul>
</body>
</html>
```

### 7.5 条件渲染

> 通过islogin 决定最终的输出结果
>
> True 输出<span>欢迎回来</span>
>
> false 输出<button>登录</button><button>注册</button>

ejs实现:

```js
const ejs = require('ejs')
const fs = require('fs')

let html = fs.readFileSync('./条件渲染.html').toString()
let islogin = true
let result = ejs.render(html,{islogin:islogin})
console.log(result);
```

html:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <% if(islogin){ %>
        <span>欢迎回来</span>
    <% }else{ %>    
    <button>登录</button>
    <button>注册</button>
    <% } %>
</body>
</html>
```

### 7.6 express中使用模版引擎

1. `view engine`:
   - 作用：设置模板引擎，告诉 Express 使用哪种模板引擎来渲染视图。
   - 可填值：字符串，表示所使用的模板引擎，例如 'ejs'、'pug'、'handlebars' 等。
2. `views`:
   - 作用：设置模板文件的存放位置，告诉 Express 模板文件放在哪个目录下。
   - 可填值：字符串，表示模板文件所在的目录路径。

`app.set('view engine','ejs')` 告诉 Express 使用 ejs 模板引擎来渲染视图，而 `app.set('views',path.resolve(__dirname,'./views'))` 告诉 Express 模板文件存放在 `./views` 目录下。

ejs实现:

```js
const express = require('express')
const app = express()
const path = require('path')
const port = 3000
// 1设置模版引擎
app.set('view engine','ejs')
// 2设置模版文件的存放位置
app.set('views',path.resolve(__dirname,'./views'))

app.get('/home', (req, res) => {
    // 3 render响应res.render('模版的文件名','数据')
    let str = 'aaa'
    res.render('home',{str})
    // 4创建模版文件

})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
```

html:

```ejs
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h2>哈喽哈哈哈哈哈</h2>
    <h1><%= str %></h1>
</body>
</html>
```

### 7.7express-generator

#### 7.7.1作用

通过应用生成器工具express-generator 可以快速创建一个应用的骨架

#### 7.7.2安装

```shell
$ npm i -g express-generator
$ express
##安装express 到generator 文件夹
$ express -e generator 
```

修改package.json中的start为nodemon

#### 7.7.3文件上传练习

**index.js:**

```js
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
  })
})
module.exports = router;
```

**html:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h2>文件上传</h2>
    <hr>
    <!-- 文件上传的必须属性 -->
    <form action="/portrait" method="post" enctype="multipart/form-data">
        用户名: <input type="text" name="username"><br>
        头像: <input type="file" name="portrait"><br>
        <hr>
        <button>点击提交</button>
    </form>
</body>
</html>
```

### 八、使用lowdb.js包实现增删改查

1.安装npm包

```shell
npm i lowdb@1.0.0
```

2.编写代码

```js
//导入包
const low = require('lowdb')
//引入了FileSync适配器，它是lowdb库的一部分，用于将数据库的操作同步写入到磁盘中。
const FileSync = require('lowdb/adapters/FileSync')
//这行代码创建了一个名为adapter的适配器实例，它指定了数据库文件的名称为db.json。这个适配器将会与lowdb一起使用，用于将数据持久化到磁盘中
const adapter = new FileSync('db.json')
// 最后一行代码创建了一个名为db的数据库实例，它使用之前创建的适配器adapter。这个db实例可以用于读取和操作数据库中的数据
const db = low(adapter)
// Set some defaults
// db.defaults({ posts: [], user: {} }).write()
// 写入数据
// db.get('posts').push({id:1,title:'666'}).write()
// 获取数据
console.log(db.get('posts').value());
// 删除数据
// db.get('posts').remove({id:2}).write()
// console.log(res);
// 获取数据
let res = db.get('posts').find({id:1}).value()
console.log(res);
db.get("posts").find({id:1}).assign({title:'今天有点冷'}).write()
```

### 九、实现记账本

#### 1.安装几个库

```shell
$ npm i -g express-generator
$ express
##安装express 到generator 文件夹
$ express -e generator 
$ npm i lowdb@1.0.0
$ npm i shortid
```

#### 2.index.js

```js
var express = require('express');
var router = express.Router();
// 导入lowdb
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(__dirname+'/../data/db.json')
const db = low(adapter)
// 导入shortid
const shortid = require('shortid')
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
```

#### list.ejs记账本列表页

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 20px;
}

h1 {
    text-align: center;
    margin-bottom: 20px;
}

div {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    position: relative;
}

div div {
    margin-bottom: 10px;
}

div div:last-child {
    margin-bottom: 0;
}

.divClass {
    transition: transform 0.3s ease;
}

.divClass:hover {
    transform: scale(1.05);
}

.xxx {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #007bff;
    color: #fff;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.xxx:hover {
    background-color: #0062cc;
}
.timeDiv:hover,
.titleDiv:hover,
.amountDiv:hover,
.noteDiv:hover {
    transform: scale(1.01);
    transition: transform 0.6s ease;
}

    </style>
</head>

<body>
    <h1>记账本列表</h1>
    <div>
        <% accounts.forEach(function(item) { %>
            <div class="<%= item.type==='-1'?'warn':'ok' %>">
                <div class="timeDiv">时间:<%= item.time %>
                </div>
                <div class="titleDiv">标题:<%= item.title %>
                </div>
                <div class="amountDiv"><span class="<%= item.type==='-1'?'zhichu':'shouru' %>">
                        <%= item.type==='-1' ?'支出':'收入' %>
                    </span>金额:<%= item.account %>
                </div>
                <div class="noteDiv">备注:<%= item.remarks %>
                </div>
                <a href="/account/<%= item.id %>"><div class="xxx">X</div></a>
            </div>
            <hr>
            <% }); %>
    </div>
</body>
</html>
```

#### Create.ejs表单页

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 20px;
}

h1 {
    text-align: center;
    color: #333;
}

form {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    margin: 0 auto;
}

form div {
    margin-bottom: 10px;
}

form label {
    font-weight: bold;
}

form input[type="text"],
form select {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    margin-top: 5px;
    margin-bottom: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

form button {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

form button:hover {
    background-color: #0062cc;
}
    </style>
</head>

<body>
    <h1>添加记录</h1>
    <hr>
    <div>
        <form action="/account" method="post">
            事项: <input type="text" name="title"><br>
            发生时间: <input type="text" name="time"><br>
            <div>
                <label for="type">类型</label>
                <select name="type" id="">
                    <option value="-1">支出</option>
                    <option value="+1">收入</option>
                </select>
            </div>
            金额: <input type="text" name="account"><br>
            备注: <input type="text" name="remarks"><br>
            <button>添加</button>
        </form>
    </div>
</body>
</html>
```

#### success.js成功/失败跳转页面

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

div {
    text-align: center;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 300px;
    transition: transform 0.3s ease;
}

h1 {
    color: #007bff;
    font-size: 48px;
    margin-bottom: 20px;
    animation: heartbeat 1.5s infinite;
}

p {
    margin-top: 20px;
}

a {
    display: inline-block;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

a:hover {
    background-color: #0062cc;
}

@keyframes heartbeat {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
    }
}
    </style>
</head>
<body>
    <div>
        <h1>:)<%= msg %></h1>
        <p><a href="<%= url %>">点击跳转</a></p>
    </div>
</body>
</html>
```

db.json初始化db页面

```json
{
  "accounts": [

  ]
}
```

> 启动用npmstart
>
> 如果没在package.json配置,修改为
>
> ```json
>   "scripts": {
>     "start": "nodemon ./bin/www"
>   },
> ```
