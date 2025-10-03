##### instanceof 用来检查一个对象是否是一个类的实例

- instanceof检查的是对象的原型链上是否有该类的实例,有则返回true
- Object是所有对象的原型,所以任何对象和Object进行instanceof运算都会返回true

```js
console.log(dog instanceof Object) //true
```

##### in 使用in运算符时,无论属性在对象自身还是原型中,都会返回true

```js
console.log("sayhello" in p)
```

###### 对象.hasOwnproperty(属性名),用来检查一个对象本身是否含有某个属性(旧方法)

```js
console.log(p.hasOwnProperty("sayhello"))
```

##### Object.hasOwn(对象,属性名)(),用来检查一个对象本身是否含有某个属性(新方法)

```js
console.log(Object.hasOwn(p,"sayhello"))
```

