#### bind()

- 用来创建一个新的函数
- 可以为新函数绑定this
- 可以为新函数绑定参数(不可变)

```js
function fn(a,b,c){

}
const obj = {name:"aaa"}
const newFn = fn.bind(obj,10,20,30)
```

> ### 箭头函数没有自身的this,他的this由外层作用域决定
>
> ### 无法通过call apply bind修改this
>
> ### 箭头函数没有arguments
