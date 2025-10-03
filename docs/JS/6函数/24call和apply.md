#### 可以用过调用函数的call()和apply()两个方法来调用函数

- 还可以用来指定函数中的this
- call和apply的第一个参数.将会作为函数的this

#### 通过call调用函数,函数的实参直接在第一个参数后面排列

```js
const obj = [1,1,1,1]
function fn2(a,b){
	console.log(this)
}
fn2.call(obj,1,2)
```

#### 通过apply调用函数,函数的实参需要通过数组传递

```js
const obj = [1,1,1,1]
function fn2(a,b){
	console.log(this)
}
fn2.call(obj,[1,2])
```

