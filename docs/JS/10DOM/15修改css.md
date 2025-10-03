```js
    <style>
        .box1{
            width: 200px;
            height: 200px;
            background-color: #bfa;
        }
    </style>
</head>
<body>
    <button id="btn">...</button>
    <div class="box1"></div>
</body>
<script>
    const btn = document.getElementById('btn')
    const box1 = document.querySelector('.box1')
    btn.addEventListener("click",function (){
        box1.style.width = "400px"
        box1.style.height = "400px"
        // 样式中有-,需要使用驼峰命名法
        box1.style.backgroundColor = "purple"
    })
```

#### 除了直接修改样式外,可以通过修改class属性简介修改样式

```js
box1.className += " box2"
```

##### 元素.classList 是一个对象,对象中提供了对当前元素的类的各种操作

###### .add()向元素中添加一个或多个class

```js
box1.classList.add("box2","box3","box4")
```

###### .remove()移除class

```js
box1.classList.remove("box2","box3","box4")
```

###### .toggle()切换元素中的一个class(有则删,无则加)

```js
box1.classList.toggle("box2")
```

###### .replace("box1","box2)box2替换box1

```js
box1.classList.replace("box1","box2")
```

###### .contains()检查class(有则true,无则false)

```js
box1.classList.contains("box1")
```

