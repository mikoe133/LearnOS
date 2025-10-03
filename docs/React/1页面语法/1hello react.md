```react
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <!-- 准备容器 -->
    <div id="test"></div>
  	    <div id="demo"></div>	
</body>
<!-- 引入React核心库 -->
<script src="../js/react.development.js"></script>
<!-- React-dom,用于支持React操作dom -->
<script src="../js/react-dom.development.js"></script>
<!-- 引入babel,用于将jsx转换为js -->
<script src="../js/babel.min.js"></script>
<!-- 添加babel -->
<script type="text/babel">
// 创建虚拟dom
const VDOM = (
    <h1>
        <span>asdasd</span>    
    </h1>
)
//渲染dom到页面
// ReactDOM.render(虚拟dom,容器)
ReactDOM.render(VDOM,document.getElementById('test'))
//创建真实dom
  const TDOM = document.getElementByid('demo')
</script>
</html>
```

#### 关于虚拟dom:

- 本质是Object类型的对象
- 虚拟dom比较轻,真实dom比较重,因为虚拟dom是React内部在用,无需真实dom上那麽多属性
- 虚拟dom最终会被React转换为真实dom,呈现在页面上