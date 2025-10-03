### this

- 函数在执行时,会传递一个隐含的参数this
- this会指向一个对象,会根据函数调用方式不同而不同
  1. 以函数形式调用时,this指向Window
  2. 以方法的形式调用,this指向调用方法的对象
  3. 构造函数中,this是新建的对象
  4. 箭头函数没有this,由外层作用域决定
  5. 通过call和apply调用的函数,第一个参数就是函数的this
  6. 通过bind返回的函数,this由bind第一个参数决定

```js
1. 以函数形式调用时，`this`指向`Window`（全局对象）：

function example1() {
  console.log(this);
}

example1(); // 输出：Window


2. 以方法的形式调用，`this`指向调用方法的对象：

const obj = {
  name: 'John',
  example2() {
    console.log(this.name);
  }
};

obj.example2(); // 输出：John


3. 构造函数中，`this`是新建的对象：

function Example3(name) {
  this.name = name;
}

const obj3 = new Example3('Alice');
console.log(obj3.name); // 输出：Alice


4. 箭头函数没有自己的`this`，会继承外层作用域的`this`：

const obj4 = {
  name: 'Bob',
  example4: () => {
    console.log(this.name);
  }
};

obj4.example4(); // 输出：Bob


5. 通过`call`和`apply`调用的函数，第一个参数就是函数的`this`：

function example5() {
  console.log(this.name);
}

const obj5 = { name: 'Charlie' };

example5.call(obj5); // 输出：Charlie
example5.apply(obj5); // 输出：Charlie


6. 通过`bind`返回的函数，`this`由`bind`的第一个参数决定：

function example6() {
  console.log(this.name);
}

const obj6 = { name: 'David' };
const boundFn = example6.bind(obj6);

boundFn(); // 输出：David
```

