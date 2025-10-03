#### for-of语句遍历可迭代对象

##### 语法:

```js
for(变量 of 可迭代对象){
  语句
}
```

##### 执行流程:

数组中有几个元素就会执行几次,每次执行时就会将一个元素赋值给变量

```js
for (let value of arr){
	console.log(value)
}
```

