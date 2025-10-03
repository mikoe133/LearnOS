箭头函数没有自己的this,他的this由外层作用域来决定,和它的调用方式无关

```js
当箭头函数在不同的上下文环境中被调用时，其 `this` 的值也会随之改变。下面是一些不同情况下箭头函数的 `this` 的示例：

1. 全局环境中的箭头函数：


const greet = () => {
  console.log(this);
};

greet(); // 输出：Window


在全局环境中定义的箭头函数的 `this` 值指向全局对象 `Window`。

2. 对象方法中的箭头函数：


const obj = {
  name: 'Alice',
  greet: () => {
    console.log(this);
  }
};

obj.greet(); // 输出：Window


在对象的方法中定义的箭头函数的 `this` 值同样指向全局对象 `Window`，而不是对象本身。

3. 事件处理函数中的箭头函数：


const button = document.querySelector('button');

button.addEventListener('click', () => {
  console.log(this);
});


在事件处理函数中定义的箭头函数的 `this` 值指向 `undefined`，因为事件处理函数的执行上下文是由事件触发决定的，而不是箭头函数的定义位置。

4. 构造函数中的箭头函数：


function Person(name) {
  this.name = name;
  this.greet = () => {
    console.log(this);
  };
}

const person = new Person('Alice');
person.greet(); // 输出：Person {name: "Alice"}


在构造函数中定义的箭头函数的 `this` 值指向新创建的对象，因此在实例化对象后调用箭头函数时，`this` 指向该对象。

总的来说，箭头函数的 `this` 值是静态绑定的，取决于箭头函数定义时所处的上下文环境。在全局环境和对象方法中，箭头函数的 `this` 值指向全局对象 `Window`；在事件处理函数中，箭头函数的 `this` 值为 `undefined`；在构造函数中，箭头函数的 `this` 值指向新创建的对象。
```

