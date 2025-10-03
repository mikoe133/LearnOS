## 一、node.js 介绍

1)  异步I/O，读写数据时不等待

2）单线程，cup运行效率高

3）事件驱动，保证node程序准确高效运行



## 二、安装配置

https://nodejs.org/zh-cn/

注意，node的安装全部采用默认设置，建议不要修改安装路径。

安装完成后，打开命令行窗口（在vscode中选择终端菜单==>新建终端 ）,然后输入 node -v 命令，如果出现版本号即安装成功



## 三、node的模块化

随着JS项目的越来越复杂，就必须考虑模块化。

最大的好处是大大提高了代码的可维护性。

其次，编写代码不必从零开始。当一个模块编写完毕，就可以 被其他地方引用。我们在编写程序的时候，也经常引用其他模块，包括Node.js内置的模块和来自第三方的模块。 

使用模块还可以避免**函数名和变量名**冲突。相同名字的函数和变量完全可以分别存在不同的模块中，因此， 我们自己在编写模块时，不必考虑名字会与其他模块冲突。但是也要注意，尽量不要与内置函数名字冲突。

### 	3.1 node中模块的特征

​		node中每一个js文件都被称为一个模块。

#### 		1） require() 加载模块

#### 		2）模块之间天生具有隔离作用域

​	每个模块中声明的变量，函数等在其他模块中无法直接使用。

#### 		3）使用exports或 module.exports语法向外暴露模块

声明a.js

```js
let a = 10;
// 向外暴露a变量，其他模块才可以使用
// 第一种暴露的写法： exports.xxx=xxx
// exports.a = a;
// 第二种暴露写法：module.exports = xxx
module.exports = {
  a:a
}
```

声明b.js

```js
// 在b.js中使用a.js中的声明的变量
// 声明变量a保存加载的结果
let a = require("./a.js")
console.log( a );
```

右键点击b.js, 选择“在集成终端中打开”，执行命令：

```js
node b.js
```



## 四、node的第三方模块

第三方模块：其他人开发的可重复使用的功能模块（js文件）

npm网站：https://www.npmjs.com/

包（package）：包含至少一个js文件的文件夹。

#### 4.1  node package manager（NPM）包管理器

​	从npm网站上下载使用包的步骤：

1） 创建一个目录（目录名不要和常见的关键词重复，不能是汉字），然后进入该目录命令行下

2） 执行初始化命令，生成一个用来安装包的配置文件，必须要有package.json才可以从npm网站上下载包

```
npm init
```

必须包含 name，version，main   完整属性如下表:

| 属性名          | 说明                     |
| --------------- | ------------------------ |
| name            | 包（项目）的名称         |
| version         | 包（项目）的版本号       |
| description     | 包（项目）的描述         |
| main            | 包（项目）入口文件       |
| scripts         | 定义快捷脚本命令         |
| keywords        | 项目关键词               |
| author          | 作者                     |
| license         | 协议                     |
| dependencies    | 包（项目）依赖的模块     |
| devDependencies | 包（项目）开发依赖的模块 |

3）执行npm 安装命令

https://www.npmjs.com/package/chinese-finance-number

​	npm i ( npm install ) 表示安装包的名字

​	安装完成后，项目目录下会多出 package-lock.json 和 node_modules 文件夹。下载的包统一存在在node_modules 下面

4） 使用包，根据包作者的教程

小练习：安装使用包 time-stamp



#### 4.2 设置淘宝下载镜像网站

​	npm网站官网服务器位于国外，下载速度比较慢而且不稳定。一般国内开发者需要将npm 的下载地址修改为为国内的淘宝镜像网站。

 命令: 完成后会在C:/users/adminstrator/目录下生产.npmrc文件

```
npm config set registry https://registry.npm.taobao.org
```

2022域名更新为 [https://registry.npmmirror.com](https://link.zhihu.com/?target=https%3A//registry.npmmirror.com/)，[点此去官网](https://npmmirror.com/)，npm 及 yarn 分别执行以下命令更新源

```
npm config set registry https://registry.npmmirror.com
```

 验证命令:

```
npm config get registry
```



## 五、 package.json文件 

​	package.json 文件是npm的创造性发明。每次安装包后，都会在package.json中添加 dependencies （依赖）。那么其他开发者可根据package.json知道你的项目需要依赖那些第三方的包才可以运行。





## 六、开发环境配置

在vscode中安装插件

![image-20230905092456867](C:/Users/samsung/AppData/Roaming/Typora/typora-user-images/image-20230905092456867.png)

![](img/QQ%E5%9B%BE%E7%89%8720221107101542.png)