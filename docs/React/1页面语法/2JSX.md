###### XML早期英语存储和传输数据

```xml
<student>
	<name>tom</name>
  <age>12</age>
</student>
```

现在用JSON

```json
"{"name":"a","age","12"}"
```

##### jsx语法规则

- 定义虚拟dom时,不要写引号

- 标签中混入js表达式要用{}

- 样式的类名指定不要用class,要用className

- 内联样式要用style={{key:'value'}},且小驼峰写属性值

- 虚拟dom只有一个根标签

- 标签必须闭合

- 标签首字母

  - 若小写字母开头,则将改标签为html中同名元素,若html中无该标签对应的同名元素,则报错
  - 若大写字母开头,react则会渲染该组件,若没定义,则会报错

- ```react
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
          .title{
              color: beige;
          }
      </style>
  </head>
  <body>
      <!-- 准备容器 -->
      <div id="test"></div>
  </body>
  <!-- 引入React核心库 -->
  <script src="../js/react.development.js"></script>
  <!-- React-dom,用于支持React操作dom -->
  <script src="../js/react-dom.development.js"></script>
  <!-- 引入babel,用于将jsx转换为js -->
  <script src="../js/babel.min.js"></script>
  <!-- 添加babel -->
  <script type="text/babel">
  const myId = "aaa"
  const myData = "aadsa"
  // 创建虚拟dom
  const VDOM = (
      <div>
          <h1 className="title" id={myId.toLowerCase()}>
               <span style={{fontSize:'60px'}}> {myData.toLowerCase()}</span>    
          </h1>
          <h1 className="title" id={myId.toUpperCase()}>
               <span style={{fontSize:'60px'}}> {myData.toLowerCase()}</span>    
          </h1>
          <input type="text"/>
      </div>
  )
  
  //渲染dom到页面
  // ReactDOM.render(虚拟dom,容器)
  ReactDOM.render(VDOM,document.getElementById('test'))
  </script>
  </html>
  ```
  
  

#### 一定注意区分[js语句]与[js表达式]

- 表达式:一个表达式会产生一个值,可以放在任何一个需要值的地方

- ```
  例如:a,a+b,demo(1),arr.map(),function test()
  ```



- 语句:

  ```
  if(){},for(){},switch(){}
  
  ```

  