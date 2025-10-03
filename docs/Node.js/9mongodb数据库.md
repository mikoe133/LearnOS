# MongoDB 非关系型数据库

## 1. 数据库简介

### 1.1 数据库是什么

数据库（DataBase）是按照数据结构来组织、存储和管理数据的仓库。

### 1.2 为什么要使用数据库

我们的程序都是在内存中运行的，一旦程序运行结束或者计算机断电，程序运行中的数据都会丢失。所以我们就需要将一些程序运行的数据持久化到硬盘之中，以确保数据的安全性。而数据库就是数据持久化的最佳选择。说白了，数据库就是存储数据的仓库。

### 1.3 数据库的分类

#### 1.3.1 关系型数据库（RDBS）

- 代表有：MySQL、Oracle、DB2、SQL Server...
- 特点：关系紧密，**表结构**
- 优点：
    1. 易于维护：都是使用表结构，格式一致；
    2. 使用方便：SQL 结构化查询通用，可用于复杂查询；
    3. 高级查询：可用于一个表以及多个表之间非常复杂的查询。
- 缺点：
    1. 读写性能比较差，尤其是海量数据的高效率读写；
    2. 有固定的表结构，字段不可随意更改，灵活度稍欠；
    3. 高并发读写需求，传统关系型数据库来说，硬盘I/O是一个很大的瓶颈。

#### 1.3.2 非关系型数据库（NoSQL）

- 代表有：MongoDB、Redis...
- 特点：关系不紧密，文档存储，有**键值对**
- 优点：
    1. 格式灵活：存储数据的格式可以是key,value形式。
    2. 速度快：nosql可以内存作为载体，而关系型数据库只能使用硬盘；
    3. 易用：nosql数据库部署简单。
- 缺点：
    1. 不支持sql，学习和使用成本较高；
    2. 不支持事务；
    3. 复杂查询时语句过于繁琐。

## 2. MongoDB 的简介和安装

### 2.1 MongoDB 简介

- MongoDB 是为 **快速开发互联网 Web 应用而设计的数据库系统**。
- MongoDB 的设计目标是极简、灵活、作为Web应用栈的一部分。
- MongoDB 的数据模型是面向文档的，所谓文档是一种类似于 `JSON` 的结构，简单理解 MongoDB 这个数据库中存的是各种各样的JSON。（`BSON`）

### 2.2 MongoDB 安装和基本配置

#### 1.下载 官网下载地址 ：https://www.mongodb.com/

下载社区版，解压，解压后重命名为 mongodb 

#### 2. 安装位置

安装没有固定位置，但是一般都放在 /usr/local 下面， 注: mac 的/usr/local 对用户时隐藏的，可以在访达中使用 command+shift+G 搜索进入

#### 3.配置环境变量

```shell
//在终端上打开环境变量 

1. open .bash_profile   //这里很多 mac 一开始是没有这个文件的，没有的话就在终端上创建一个 touch .bash_profile

//第二部：添加环境配置，这样以后就不用每次都 cd 到 mongodb 的 bin 目录开启服务了(注意： 这里 /usr/local/mongodb/bin 为你安装 mongodb 的目录）

2. export PATH=${PATH}:/usr/local/mongodb/bin

//让配置生效

3. source .bash_profile

//运行命令，查看 mongodb 版本

4. mongod -version
   /**
   显示如下就算成功了
   linwinwin@LinwinwindeMacBook-Pro etc % mongod -version
   db version v5.0.9
   Build Info: {
    "version": "5.0.9",
    "gitVersion": "6f7dae919422dcd7f4892c10ff20cdc721ad00e6",
    "modules": [],
    "allocator": "system",
    "environment": {
        "distarch": "x86_64",
        "target_arch": "x86_64"
    }
   }
   linwinwin@LinwinwindeMacBook-Pro etc % 
   */
   此时新开一个终端输入 mongon -version 应该也是可以运行命令的，但是我遇到了一个一个问题就是会报 zsh: command not found xxx 的错误
   解决方案：是将 .bash_profile 里面的配置放入到 .zshrc 文件中就可以了，步骤和上面一样
   1.打开终端输入 open .zshrc (没有就 touch .zshrc 创建一个）
   2.把 .bash_profile 的配置放进来（就是 export PATH 之类的）

   source .zshrc 就ok了
```

#### 4.基本配置

如果和我一样是从官网上直接下载的，会发现在文件路径下是没有关于日志及数据存放的位置的，所以要新建两个文件夹(log:日志存储、data:数据存放)。这两个文件夹存放的位置任意的，但是为了方便查找，我们还是放在/usr/local/mongodb下。

```shell
//1.进入 mongodb 目录
cd /usr/local/mongodb
//2. 创建 data 和 log 文件夹（名字可以是其他的，不强制）
mkdir data log
//3. 由于读写权限的问题， 需要给这两个文件夹赋予读写权限, 这里 linwinwin 是我的用户名，要替换成你自己的
sudo chown linwinwin /usr/local/mongodb/data
sudo chown linwinwin /usr/local/mongodb/log
```

#### 5.启动

```shell
//1.⚠️当前的位置是/usr/local/mongodb, 所以这里的 --dbpath 是 data; --fork表示在后台运行  --logappend 表示追加
cd /usr/local/mongodb
mongod --fork -dbpath data --logpath log/mongo.log --logappend
// 出现如下，则表示启动成功
about to fork child process, waiting until server is ready for connections.
forked process: 4649
child process started successfully, parent exiting
// 新开一个终端窗口 输入命令 mongo
mongo
// 展示一个箭头则表示启动成功
// 打开浏览器输入： http://127.0.0.1:27017/
It looks like you are trying to access MongoDB over HTTP on the native driver port.
// 出现上面情况就算成功了启动成功
```

#### 6.关闭mongodb 服务

```shell
//1.切换到管理员
use admin
// 2.运行命令(参数可写可不写)
db.shutdownServer({force:true});
// 展示如下：关闭成功
server should be down...
// 通过浏览器访问 http://127.0.0.1:27017/  拒绝连接
```

> 这里关闭服务如果是非正常关闭的话（如直接删除终端等），下一次再开启mongodb时会报错的

#### 2.2.3 MongoDB 客户端

- 我们通过客户端来管理数据库
- 在 CMD 输入 `mongo` 来启动客户端

### 2.3 将 MongoDB 设置为 windows 系统服务

每次使用服务都要手动启动依次服务器，且启动服务窗口不能关闭。这里我们将将 MongoDB 设置为 windows 系统服务，使其开机自启。

1. 在c盘根目录创建如下文件夹
    ```
    C:\data\log
    C:\data\db
    ```
2. 在MongoDB的安装目录添加一个配置文件 `mongod.cfg`。  
    其中，目录位置如下（根据自己数据库版本确定）：
    
    ```
    // 目录
    C:\Program Files\MongoDB\Server\4.4
    ```
    `mongod.cfg` 的文件内容如下：
    ```
    systemLog:
    destination: file
    path: c:\data\log\mongod.log
    storage:
        dbPath: c:\data\db
    net:
        port: 27017
    ```
3. 以管理员身份打开命令行，执行以下指令（注意版本号根据自己的修改）：
    ```
    sc.exe create MongoDB binPath= "\"C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe\" --service --config=\"C:\Program Files\MongoDB\Server\3.2\mongod.cfg\"" DisplayName= "MongoDB" start= "auto"
    ```
4. 打开系统服务器，启动名为 MongoDB 的服务，将其启动方式设置为自动。
5. 如果无法启动服务，在管理员的命令行窗口中输入如下指令，然后重复步骤1。
    ```
    sc delete MongoDB
    ```

### 2.4 安装 MongoDB 图形化工具

**数据库图形化管理工具** 极大地方便了数据库的操作与管理，**推荐的 MongoDB 图形化管理工具** 有：
- Studio 3T   https://studio3t.com/
- Navicat   https://navicat.com.cn/

### 2.5 常用端口号总结

端口号：`1-65535`，不建议使用 `1--199`的端口号，这些是预留给系统的，一般使用 4 位的，4 位的也不要用 1 开头的。

常见端口号：
- `21` 端口：FTP 文件传输服务
- `22` 端口：SSH 端口
- `23` 端口：TELNET 终端仿真服务
- `25` 端口：SMTP 简单邮件传输服务
- `53` 端口：DNS 域名解析服务
- `80` 端口：HTTP 超文本传输服务
- `110` 端口：POP3 “邮局协议版本3”使用的端口
- `443` 端口：HTTPS 加密的超文本传输服务
- `1433` 端口：MS SQL*SERVER数据库 默认端口号
- `1521` 端口：Oracle数据库服务
- `1863` 端口：MSN Messenger的文件传输功能所使用的端口
- `3306` 端口：MYSQL 默认端口号
- `3389` 端口：Microsoft RDP 微软远程桌面使用的端口
- `5631` 端口：Symantec pcAnywhere 远程控制数据传输时使用的端口
- `5632` 端口：Symantec pcAnywhere 主控端扫描被控端时使用的端口
- `5000` 端口：MS SQL Server使用的端口
- `27017` 端口：MongoDB 实例默认端口

## 3. MongoDB 的使用

### 3.1 MongoDB 中的基本概念

1. 数据库（database）  
    数据库是一个仓库，在仓库中可以存放集合。
2. 集合（collection）  
    集合类似于JS中的数组，在集合中可以存放文档。
    说白了，集合就是一组文档。
3. 文档（document）  
    文档数据库中的最小单位，我们存储和操作的内容都是文档。类似于JS中的对象，在MongoDB中每一条数据都是一个文档。

![nodejs10](https://cdn.jsdelivr.net/gh/Hacker-C/Picture-Bed@main/blog/nodejs10.6hwgl7zhvtw0.png)

和 MySQL 的对比：

|MySQL|MongoDB|描述|
|-|-|-|
|数据库|数据库|一个数据库文件|
|表|集合|关系型数据库：一张表，非关系型：一个集合|
|字段|字段|每列的头，在关系型数据库中，某些字段是唯一标识，则称为主键|
|一条数据|一条文档|一行数据|

### 3.2 命令行基本命令

- 显示所有的数据库
  ```mongodb
  show dbs
  show databases
  ```
  
- 切换到指定的数据库
  ```mongodb
  use 数据库名
  ```
  
- 显示当前所在的数据库
  ```mongodb
  db
  ```
  
- 删除当前数据库
  ```
  use 库名
  db.dropDatabase()
  ```
  
- #### **集合命令**
  
- 显示当前数据库中的所有集合
  ```mongodb
  show collections
  ```
  
- 删除某个集合
  ```mongodb
  db.集合名.drop()
  ```
  
- 创建集合
  
  ```
  db.createCollection('集合名称')
  ```
  
- 重命名集合
  
  ```
  db.集合名.renameCollection('newname')
  ```
  
- #### **文档命令**

在 MongoDB，数据库和集合都不需要创建，当 **我们向集合或数据库中第一次插入文档时，集合和数据库会自动创建**。

- 向集合中插入文档
  ```mongodb
  db.集合名.insert(文档对象)
  ```
  如：
  ```mongodb
  db.stus.insert({name:"sunwukong",age:18})
  ```
  
- 查询集合中的文档
  ```mongodb
  db.集合名.find(查询条件)
  ```
  如：
  ```mongodb
  db.stus.find()
  ```
  
  > _id 是 mongodb 自动生成的唯一编号，用来唯一标识文档
  
- 更新文档
  
  ```
  db.集合名.update(查询条件,新的文档)
  db.集合名.update({name:'张三'},{$set:{age:19}})
  ```
  
- 删除文档
  
  ```
  db.集合名.remove(查询条件)
  ```

### 3.3 MongoDB 原生 CRUD（增删改查）

#### 1. C-creat（新增数据）
  ```mongodb
  db.集合名.insert(文档对象)
  db.集合名.insertOne(文档对象)
  db.集合名.insertMany([文档对象，文档对象])
  ```

#### 2. R-read（查询数据）  
（1）语法： `db.集合名.find(查询条件[, 投影])`  
  举例：查找年龄为18的所有信息  
  ```mongodb
  db.students.find({age:18})
  ```
  举例：查找年龄为18且名字为jack的学生
  ```mongodb
  db.students.find({age:18,name:'jack'})
  ```
（2）常用操作符：
  1. `< , <= , > , >= , !==` 对应为：`$lt $lte $gt $gte $ne`  

    举例：年龄是大于等于20的
    ```mongodb
    db.集合名.find({age:{$gte:20}})
    ```
  2. 逻辑或：使用 `$in` 或 `$or`  

    举例：查找年龄为18或20的学生
    ```mongodb
    db.students.find({age:{$in:[18,20]}})
    db.students.find({$or:[{age:18},{age:20}]})
    ```
  3. 逻辑非：`$nin`
  4. 正则匹配：

    举例：`db.students.find({name:/^T/})`
  5. `$where` 能写函数：

    ```mongodb
    db.students.find({$where:function(){
      return this.name === 'zhangsan' && this.age === 18
    }})
    ```

（3）投影：过滤掉不想要的数据，只保留想要展示的数据
  举例：过滤掉 id 和 name
  ```mongodb
  db.students.find({},{_id:0,name:0})
  ```
  举例：只保留 age
  ```mongodb
  db.students.find({},{age:1})
  ```
（4）补充：默认只要找到一个
```mongodb
db.集合名.findOne(查询条件[,投影])
```

#### 3. U-update（更新数据）

语法：
```mongodb
db.集合名.update(查询条件,要更新的内容[,配置对象])
```

如下写法会将更新内容替换掉整个文档对象，但 `_id` 不受影响
```mongodb
db.students.update({name:'zhangsan'},{age:19})
```

使用 `$set` 修改指定内容，其他数据不变，不过只能匹配一个 zhangsan
```mongodb
db.students.update({name:'zhangsan'},{$set:{age:19}})
```

修改多个文档对象，匹配多个 zhangsan,把所有 zhangsan 的年龄都替换为 19
```mongodb
db.students.update({name:'zhangsan'},{$set:{age:19}},{multi:true})
```

补充：
```mongodb
db.集合名.updateOne(查询条件,要更新的内容[,配置对象])
db.集合名.updateMany(查询条件,要更新的内容[,配置对象])
```

#### 4. D-delete（删除数据）

语法：
```mongodb
db.集合名.remove(查询条件)
```

删除所有年龄小于等于19的学生
```mongodb
db.students.remove({age:{$lte:19}})
```

> [!TIP]
> 学过关系型数据库的写 MongoDB 原生怎删改查确实很难受，于是有了 Nodejs 模块：Mongoose。

## 4. Mongoose 的使用

#### 4.1 简介

Mongoose是一个对象文档模型（ODM）库，它对Node原生的MongoDB模块进行了进一步的优化封装，并提供了更多的功能。

#### 4.2 优势

- 可以为文档创建一个模式结构（Schema）
- 可以对模型中的对象/文档进行验证
- 数据可以通过类型转换转换为对象模型
- 可以使用中间件来应用业务逻辑挂钩
- 比 Node 原生的 MongoDB 驱动更容易

#### 4.3 核心对象（概念）

1. Schema  
    模式对象，通过 `Schema` 可以对集合进行 **约束**。
2. Model  
    模型对象，相当于数据库中的集合，通过该对象可以 **对集合进行操作**。
3.  Document  
    文档对象，它和数据库中的文档相对应，通过它可以读取文档的信息，也可以对文档进行各种操作。

#### 4.4 Mongoose 的使用

首先通过 `npm` 或 `yarn` 下载安装 Mongoose。
```
npm i mongoose --save
```

##### 1. 连接数据库

语法：
```js
// 1. 引入 Mongoose
let mongoose = require("mongoose")
// 2. 连接数据库
mongoose.connect("mongodb://[ip地址]:[端口号]/[数据库名]")
```
举例：
```js
let mongoose = require("mongoose")
mongoose.connect('mongodb://localhost:27017/demo', {
  useNewUrlParser: true, // 使用新解析器，解决一些安全性问题
  useUnifiedTopology: true // 使用一个统一的拓扑结构
})
```

##### 2. 绑定数据库连接的监听

语法：
```js
// 安装mongoose
const mongoose = require('mongoose')
// 导入mongoose
mongoose.connect('mongodb://127.0.0.1:27017/bilibili')
// 设置回调
mongoose.connection.once('open',()=>{
    console.log('连接成功');
})
mongoose.connection.once('error',()=>{
    console.log('连接失败');
})
mongoose.connection.once('close',()=>{
    console.log('连接关闭');
})
// 关闭MongoDB连接
setTimeout(() => {
    mongoose.disconnect()
}, 3000);
```

##### 3. 创建核心对象

进行下一步操作：

1. 创建 `Schema` 对象，内部传入约束对象
  ```js
  // 引入 Schema 约束对象
  var Schema = mongoose.Schema;
  var xxxSchema = new Schema({
    字段:类型,
    字段:类型,
    字段:类型,
    字段:类型
  });
  ```

2. 生成某个集合所对应的 Model 模型对象
  ```js
  var xxxModel = mongoose.model("集合名",xxxSchema);
  ```

3. 进行 CRUD 增删改查操作

实例：
```js
// 引入 mongoose
let mongoose = require('mongoose')

// 1. 连接数据库
mongoose.connect('mongodb://localhost:27017/demo', {
  useNewUrlParser: true, // 使用新解析器，解决一些安全性问题
  useUnifiedTopology: true // 使用一个统一的拓扑结构
})
// 2. 绑定数据库连接的监听
mongoose.connection.on('open', (err) => {
  if (err) {
    console.log('数据库连接失败', err)
  } else {
    console.log('数据库连接成功')
    // 1. 引入模式对象
    let Schema = mongoose.Schema
    // 2. 创建约束对象
    let studentSchema = new Schema({})
    // 3. 生成某个集合所对应的模型对象
    let stuModel = mongoose.model('students', studentSchema)
    // 4. 进行增删改查
    stuModel.create({},(err, data)=>{})
  }
})
```

**更常用的promise形式**

```js
const mongoose = require('mongoose');
// 导入mongoose
mongoose.connect('mongodb://127.0.0.1:27017/bilibili', { useNewUrlParser: true, useUnifiedTopology: true });
// 连接MongoDB数据库
mongoose.connection.once('open', () => {
    // 创建文档结构对象
    let bookschema = new mongoose.Schema({
        name: String,
        author: String,
        price: Number
    });
    // 创建模型对象
    let bookmodel = mongoose.model('books', bookschema);
    // 新增
    bookmodel.create({
        name: 'aaa',
        author: '吴承恩',
        price: 19
    })
    .then(data => {
        console.log(data);
        mongoose.disconnect();
    })
    .catch(err => {
        console.log(err);
        mongoose.disconnect();
    });
});
mongoose.connection.once('error', () => {
    console.log('连接失败');
});
mongoose.connection.once('close', () => {
    console.log('连接关闭');
});
```

#### 4.5 Mongoose 的 CRUD 增删改查

1. Create
  ```js
  模型对象.create(文档对象，回调函数)
  模型对象.create(文档对象)
  ```
2. Read
  ```js
  模型对象.find(查询条件[,投影])不管有没有数据，都返回一个数组
  模型对象.findOne(查询条件[,投影])找到了返回一个对象，没找到返回null
  ```

3. Update
  ```js
  模型对象.updateOne(查询条件,要更新的内容[,配置对象])
  模型对象.updateMany(查询条件,要更新的内容[,配置对象])
  ```
  备注：存在 `update` 方法，但是即将废弃，查询条件匹配到多个时，依然只修改一个，强烈建议用 `updateOne` 或 `updateMany`

4. Delete
  ```js
  模型对象.deleteOne(查询条件)
  模型对象.deleteMany(查询条件)
  ```
  备注：没有 `delete` 方法，会报错！

Mongoose 增删改查案例：

（1）新增操作
```js
stuModel.create({
  stu_id: '004',
  name: '静静',
  age: 16,
  sex: '女',
  hobby: ['看番', '听音乐', '喝奶茶'],
  info: '温柔的女生'
}, function (err, data) {
  // err：错误对象，data：写入的数据
  if (!err) {
    console.log(data)
  } else {
    console.log(err)
  }
})
```

（2）查询操作：
```js
// find 方法，返回数组（即使是一条数据），查询结果为空，则返回 []
  stuModel.find({ name: '静静1' }, function (err, data) {
    if (!err) {
      console.log(data)
    } else {
      console.log(err)
    }
  })
// findOne 方法，若有结果，则返回一个对象，没有则返回 null
stuModel.findOne({ name: '静静1' }, function (err, data) {
  if (!err) {
    console.log(data)
  } else {
    console.log(err)
  }
})
// 投影
stuModel.findOne({ name: '瑞秋' }, { age: 1, _id: 0 }, function (err, data) {
  if (!err) {
    console.log(data)
  } else {
    console.log(err)
  }
})
```

（3）更新操作：
```js
stuModel.updateOne({ name: '静静' }, { age: 14 }, (err, data) => {
  if (!err) {
    console.log(data)
  } else {
    console.log(err)
  }
}) 
```

（4）删除操作：
```js
stuModel.deleteMany({ age: 22 }, (err, data) => {
  if (!err) {
    console.log(data)
  } else {
    console.log(err)
  }
})
```

#### 4.6 Mongoose 的模块化编码

直接按照上述方法依次执行，代码都写在一个文件中，代码不好维护管理，使用模块化解决。

1. 数据库连接模块  
    该模块连接数据库，判断连接状态。  
    `db/db.js` 文件内容：
  ```js
    let mongoose = require('mongoose')
    // 暴露模块，返回一个 Promise 对象
    module.exports = new Promise((resolve, reject) => {
    // 1. 连接数据库
    mongoose.connect('mongodb://localhost:27017/demo', {
      useNewUrlParser: true, // 使用新解析器，解决一些安全性问题
      useUnifiedTopology: true // 使用一个统一的拓扑结构
    })
    // 2. 绑定数据库连接的监听
      mongoose.connection.on('open', (err) => {
        if (err) reject(err)
        resolve('数据库连接成功！')
      })
    })
  ```

2. Mongoose 关键对象模块
    该模块用于提供模型对象，需要哪个模型对象就新建一个，例如 `teacherModel.js`。
    `module/studentModel.js` 文件内容：
  ```js
  let mongoose = require('mongoose')

  // （1）引入模式对象
  let Schema = mongoose.Schema

  // （2）创建约束对象
  let studentSchema = new Schema({})

  // (3) 生成某个集合所对应的模型对象
  module.exports = mongoose.model('students', studentSchema)
  ```

3. 入口文件：`app.js`
  ```js
  // 1. 引入数据库连接模块
  let p = require('./db/db')
  // 2. 引入学生模型对象
  let stuModel = require('./module/studentModel')
  // 3. 判断数据库连接状态，成功则进行CRUD 
  // 异步操作，使用 Promise 封装
  p.then((value) => {
    console.log(value)
    // !CRUD
    return new Promise((resolve, reject) => {
      stuModel.create({
        // 相关数据插入
      }, function (err, data) {
        // err：错误对象，data：写入的数据
        if (err) reject(err)
        resolve(data)
      })
    })
  }, (reason) => {
    console.log('数据库连接失败！', reason)
  }).then((value) => {
    console.log('数据添加成功！', value)
  }, (reason) => {
    console.log('数据添加错误！', reason)
  })
  ```



#### 4.7字段类型

|类型| 描述 |
|---|---|
|String| 字符串|
|Number |数字|
|Boolean |布尔值|
|Array| 数组，也可以使用 [] 来标识|
|Date |日期|
|Buffer |Buffer 对象|
|Mixed| 任意类型，需要使用 mongoose.Schema.Types.Mixed 指定|
|ObjectId |对象 ID，需要使用 mongoose.Schema.Types.ObjectId 指定|
|Decimal128 |高精度数字，需要使用 mongoose.Schema.Types.Decimal128 指定|

#### 4.8 字段值验证

Mongoose 有一些内建验证器，可以对字段值进行验证

##### 4.8.1 必填项

```js
title: {
type: String,
required: true // 设置必填项
},
```

##### 4.8.2默认值

```js
author: {
type: String,
default: '匿名' //默认值
},
```

##### 4.8.3枚举值

```js
gender: {
type: String,
enum: ['男','女'] //设置的值必须是数组中的
},
```

##### 4.8.4唯一值

```js
username: {
type: String,
unique: true
},
```

> unique 需要 重建集合 才能有效果
>
> 永远不要相信用户的输入

#### 4.9条件控制

##### 4.9.1运算符

在 mongodb 不能 > < >= <= !== 等运算符，需要使用替代符号

- \> 使用 $gt
- < 使用 $lt
- \>= 使用 $gte
- <= 使用 $lte
- !== 使用 $ne

```js
db.students.find({id:{$gt:3}}); id号比3大的所有的记录
```

##### 4.9.2逻辑运算

$or 逻辑或的情况

```js
db.students.find({$or:[{age:18},{age:24}]});
```

$and 逻辑与的情况

```js
db.students.find({$and: [{age: {$lt:20}}, {age: {$gt: 15}}]});
```

##### 4.9.3正则匹配

条件中可以直接使用 JS 的正则语法，通过正则可以进行模糊查询

```js
db.students.find({name:/imissyou/});
```

如果是传入的变量:

```js
db.students.find({name:new RegExp('xxx')});
```

#### 4.10个性化读取

##### 4.10.1字段筛选

```js
//0:不要的字段
//1:要的字段
SongModel.find().select({_id:0,title:1}).exec(function(err,data){
if(err) throw err;
console.log(data);
mongoose.connection.close();
});
```

##### 4.10.2数据排序

```js
//sort 排序
//1:升序
//-1:倒序
SongModel.find().sort({hot:1}).exec(function(err,data){
if(err) throw err;
console.log(data);
mongoose.connection.close();
});
```

##### 4.10.3数据截取

```js
//sort 排序
//1:升序
//-1:倒序
SongModel.find().sort({hot:1}).exec(function(err,data){
if(err) throw err;
console.log(data);
mongoose.connection.close();
});
```
