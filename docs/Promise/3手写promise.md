# （三）手写 Promise

## 1. 构造函数实现

使用 `IIFI` 模块化，`function` 构造函数手写 Promise。
```js
/*
  * 自定义 Promise 函数模块：IIFE立即执行函数
  * 关键：then方法实现
  * 构造函数实现
*/
(function (window) {

  const PENDING = 'pending'
  const RESOLVED = 'fulfilled'
  const REJECTED = 'rejected'

  /*
    Promise 构造函数
    executor: 执行器函数，立即同步执行
  */
  function Promise(executor) {
    const that = this
    // Promise对象状态属性，初始值为pending
    that.status = PENDING
    // 存储结果数据
    that.data = 'undefined'
    // 保存待执行的回调函数，数据结构：{onResolved(){},onRejected(){}}
    that.callbacks = []

    function resolve(value) {
      // 若当前状态不是 pending，直接结束
      if (that.status !== PENDING) {
        return
      }
      // 修改状态
      that.status = RESOLVED
      // 修改值
      that.data = value
      // 如有待执行的 callback 函数，立即异步执行回调函数 onResolved
      if (that.callbacks.length > 0) {
        // 模拟异步执行所有成功的回调函数
        setTimeout(() => {
          that.callbacks.forEach(callbacksObj => {
            callbacksObj.onResolved(value)
          });
        })

      }
    }

    function reject(reason) {
      // 若当前状态不是 pending，直接结束
      if (that.status !== PENDING) {
        return
      }
      // 修改状态
      that.status = REJECTED
      // 修改值
      that.data = reason
      // 如有待执行的 callback 函数，立即异步执行回调函数 onRejected
      if (that.callbacks.length > 0) {
        // 模拟异步执行所有成功的回调函数
        setTimeout(() => {
          that.callbacks.forEach(callbacksObj => {
            callbacksObj.onRejected(reason)
          });
        })

      }
    }

    // 立即同步执行
    try {
      executor(resolve, reject)
    } catch (error) {
      // 若执行器异常，promise 对象变为 rejected 状态
      reject(error)
    }

  }

  /*
    Promise原型对象 then 方法，
    两个回调函数 成功 onResolved ，失败onRejected
    返回一个新的Promise对象
    返回promise的结果由onResolved/onRejected执行结果决定
  */
  Promise.prototype.then = function (onResolved, onRejected) {

    const that = this

    onResolved = typeof onResolved === 'function' ? onResolved : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

    // 返回一个新的 promise
    return new Promise((resolve, reject) => {
      // 使用指定函数处理，根据执行结果，改变return的promise的状态
      function handle(callback) {
        /* 1.回调函数抛出异常，则返回的Promise就会失败，reason就是error
          2. 回调函数返回的不是 promise，则返回的promise就会成功，value就是result
          3.回调函数返回的是promise，则返回的promise取决于这个promise
        */
        try {
          const result = callback(that.data)
          if (result instanceof Promise) {
            // 3.回调函数返回的是promise，则返回的promise取决于这个promise
            result.then(
              value => resolve(value), // 当result成功，返回的promise也成功
              reason => reject(reason) // 当result失败，返回的promise也失败
            )
            // result.then(resolve, reject) // 等同写法
          } else {
            //2. 回调函数返回的不是 promise，则返回的promise就会成功，value就是result
            resolve(result)
          }
        } catch (error) {
          // 1.回调函数抛出异常，则返回的Promise就会失败，reason就是error
          reject(error)
        }
      }

      // pending状态，保存回调函数
      if (that.status === PENDING) {
        that.callbacks.push({
          onResolved(value) {
            handle(onResolved)
          },
          onRejected(reason) {
            handle(onRejected)
          }
        })
        // resolved状态，异步执行回调函数，改变return的promise的状态
      } else if (this.status === RESOLVED) {
        setTimeout(() => {
          handle(onResolved)
        })
      } else { // 'rejected'，异步执行回调函数，改变return的promise的状态
        setTimeout(() => {
          handle(onRejected)
        })
      }
    })

  }

  /*
    Promise原型对象 catch ,参数为失败的回掉函数 onRejected
    返回一个新的Promise对象
  */
  Promise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected)
  }


  /*
    Promise函数对象的 resolve 方法
    返回一个新的Promise对象,Promise.resolve()中可以传入Promise
    返回新promise得结果：
     - 若非promise，则返回成功的promise，value就是这个传入的参数
     - 若为promise，则返回成功或失败的promsie，取决于传入的promise的成功或失败
  */
  Promise.resolve = function (value) {

    return new Promise((resolve, reject) => {
      // 若为promise，则返回成功或失败的promsie，取决于传入的promise的成功或失败
      if (value instanceof Promise) {
        value.then(resolve, reject)
      } else { // 若非promise，则返回成功的promise，value就是这个传入的参数
        resolve(value)
      }
    })

  }

  /*
  Promise函数对象的 reject 方法
   返回一个新的Promise对象 Promise.reject中不能再传入Promise
 */
  Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }

  /*
    Promise函数对象的 all 方法,接受一个promise类型的数组
    返回一个新的Promise对象
    所有promise成功则返回成功，只要有一个失败就失败
  */
  Promise.all = function (promises) {
    // 成功的promise的值
    const values = new Array(promises.length)
    // 记录成功的promise的数目
    let count = 0
    return new Promise((resolve, reject) => {
      // 遍历promises，获取每个promise的结果
      promises.forEach((p, index) => {
        // 使用  Promise.resolve(p) 再包装一遍，以接收字面量参数
        Promise.resolve(p).then(
          value => {
            count++
            values[index] = value
            // 全部成功，返回所有成功的值的数组
            if (count === promises.length) {
              resolve(values)
            }

          },
          reason => {
            // 出现失败就返回失败
            resolve(reason)
          }
        )
      })

    })
  }

  /*
    Promise函数对象的 race 方法,接受一个promise类型的数组
    返回一个新的Promise对象
  */
  Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
      promises.forEach(p => {
        Promise.resolve(p).then(
          value => {
            resolve(value)
          },
          reason => {
            reject(reason)
          }
        )
      })
    })
  }

  /*
    resolveDelay：扩展工具方法，延迟返回结果
  */
  Promise.resolveDelay = function (value, time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (value instanceof Promise) {
          value.then(resolve, reject)
        } else {
          resolve(value)
        }
      }, time)
    })
  }

  /*
    rejectDelay：扩展工具方法，延迟返回结果
  */
  Promise.rejectDelay = function (reason, time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(reason)
      }, time)
    })
  }

  // 向外暴露 Promise 函数
  window.Promise = Promise
})(window)
```

## 2. ES6 class 类实现

```js
/*
  * 自定义 Promise 函数模块：IIFE立即执行函数
  * 关键：then方法实现 
  * class类实现
*/
(function (window) {
  const PENDING = 'pending'
  const RESOLVED = 'fulfilled'
  const REJECTED = 'rejected'

  /*
    Promise 构造函数
    executor: 执行器函数，立即同步执行
  */
  class Promise {
    constructor(executor) {
      const that = this
      // Promise对象状态属性，初始值为pending
      that.status = PENDING
      // 存储结果数据
      that.data = 'undefined'
      // 保存待执行的回调函数，数据结构：{onResolved(){},onRejected(){}}
      that.callbacks = []

      function resolve(value) {
        // 若当前状态不是 pending，直接结束
        if (that.status !== PENDING) {
          return
        }
        // 修改状态
        that.status = RESOLVED
        // 修改值
        that.data = value
        // 如有待执行的 callback 函数，立即异步执行回调函数 onResolved
        if (that.callbacks.length > 0) {
          // 模拟异步执行所有成功的回调函数
          setTimeout(() => {
            that.callbacks.forEach(callbacksObj => {
              callbacksObj.onResolved(value)
            });
          })

        }
      }

      function reject(reason) {
        // 若当前状态不是 pending，直接结束
        if (that.status !== PENDING) {
          return
        }
        // 修改状态
        that.status = REJECTED
        // 修改值
        that.data = reason
        // 如有待执行的 callback 函数，立即异步执行回调函数 onRejected
        if (that.callbacks.length > 0) {
          // 模拟异步执行所有成功的回调函数
          setTimeout(() => {
            that.callbacks.forEach(callbacksObj => {
              callbacksObj.onRejected(reason)
            });
          })

        }
      }

      // 立即同步执行
      try {
        executor(resolve, reject)
      } catch (error) {
        // 若执行器异常，promise 对象变为 rejected 状态
        reject(error)
      }

    }
    /*
      Promise原型对象 then 方法，
      两个回调函数 成功 onResolved ，失败onRejected
      返回一个新的Promise对象
      返回promise的结果由onResolved/onRejected执行结果决定
    */
    then(onResolved, onRejected) {

      const that = this

      onResolved = typeof onResolved === 'function' ? onResolved : value => value
      onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

      // 返回一个新的 promise
      return new Promise((resolve, reject) => {
        // 使用指定函数处理，根据执行结果，改变return的promise的状态
        function handle(callback) {
          /* 1.回调函数抛出异常，则返回的Promise就会失败，reason就是error
            2. 回调函数返回的不是 promise，则返回的promise就会成功，value就是result
            3.回调函数返回的是promise，则返回的promise取决于这个promise
          */
          try {
            const result = callback(that.data)
            if (result instanceof Promise) {
              // 3.回调函数返回的是promise，则返回的promise取决于这个promise
              result.then(
                value => resolve(value), // 当result成功，返回的promise也成功
                reason => reject(reason) // 当result失败，返回的promise也失败
              )
              // result.then(resolve, reject) // 等同写法
            } else {
              //2. 回调函数返回的不是 promise，则返回的promise就会成功，value就是result
              resolve(result)
            }
          } catch (error) {
            // 1.回调函数抛出异常，则返回的Promise就会失败，reason就是error
            reject(error)
          }
        }

        // pending状态，保存回调函数
        if (that.status === PENDING) {
          that.callbacks.push({
            onResolved(value) {
              handle(onResolved)
            },
            onRejected(reason) {
              handle(onRejected)
            }
          })
          // resolved状态，异步执行回调函数，改变return的promise的状态
        } else if (this.status === RESOLVED) {
          setTimeout(() => {
            handle(onResolved)
          })
        } else { // 'rejected'，异步执行回调函数，改变return的promise的状态
          setTimeout(() => {
            handle(onRejected)
          })
        }
      })

    }
    /*
      Promise原型对象 catch ,参数为失败的回掉函数 onRejected
      返回一个新的Promise对象
    */
    catch(onRejected) {
      return this.then(undefined, onRejected)
    }

    /*
    Promise函数对象的 resolve 方法
    返回一个新的Promise对象,Promise.resolve()中可以传入Promise
    返回新promise得结果：
    - 若非promise，则返回成功的promise，value就是这个传入的参数
    - 若为promise，则返回成功或失败的promsie，取决于传入的promise的成功或失败
  */
    static resolve = function (value) {

      return new Promise((resolve, reject) => {
        // 若为promise，则返回成功或失败的promsie，取决于传入的promise的成功或失败
        if (value instanceof Promise) {
          value.then(resolve, reject)
        } else { // 若非promise，则返回成功的promise，value就是这个传入的参数
          resolve(value)
        }
      })

    }

    /*
Promise函数对象的 reject 方法
返回一个新的Promise对象 Promise.reject中不能再传入Promise
*/
    static reject = function (reason) {
      return new Promise((resolve, reject) => {
        reject(reason)
      })
    }

    /*
    Promise函数对象的 all 方法,接受一个promise类型的数组
    返回一个新的Promise对象
    所有promise成功则返回成功，只要有一个失败就失败
  */
    static all = function (promises) {
      // 成功的promise的值
      const values = new Array(promises.length)
      // 记录成功的promise的数目
      let count = 0
      return new Promise((resolve, reject) => {
        // 遍历promises，获取每个promise的结果
        promises.forEach((p, index) => {
          // 使用  Promise.resolve(p) 再包装一遍，以接收字面量参数
          Promise.resolve(p).then(
            value => {
              count++
              values[index] = value
              // 全部成功，返回所有成功的值的数组
              if (count === promises.length) {
                resolve(values)
              }

            },
            reason => {
              // 出现失败就返回失败
              resolve(reason)
            }
          )
        })

      })
    }

    /*
      Promise函数对象的 race 方法,接受一个promise类型的数组
      返回一个新的Promise对象
    */
    static race = function (promises) {
      return new Promise((resolve, reject) => {
        promises.forEach(p => {
          Promise.resolve(p).then(
            value => {
              resolve(value)
            },
            reason => {
              reject(reason)
            }
          )
        })
      })
    }

    /*
      resolveDelay：扩展工具方法，延迟返回结果
    */
    static resolveDelay = function (value, time) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (value instanceof Promise) {
            value.then(resolve, reject)
          } else {
            resolve(value)
          }
        }, time)
      })
    }

    /*
    rejectDelay：扩展工具方法，延迟返回结果
  */
    static rejectDelay = function (reason, time) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(reason)
        }, time)
      })
    }

  }

  // 向外暴露 Promise 函数
  window.Promise = Promise
})(window)
```

## 写完自测

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
<script src="./lib/promise.js"></script>
<script>
    const p = new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve(1)
        }, 100);
    })
    p.then(
        value=>{
            console.log('onresolved1()',value);
        },
        reason=>{
            console.log('onrejected1()',reason);
        }
    )
    p.then(
        value=>{
            console.log('onresolved2()',value);
        },
        reason=>{
            console.log('onrejected2()',reason);
        }
    )
    p.then(
        value=>{
            console.log(111111);;
        },
        reason=>{
            console.log('onrejected3()',reason);
        }
    )

</script>
</html>
```



\1. 接收新的promise对象传入resolve和reject两个回调函数

\2. 进入promise内部,创建变量,

\3. Try执行执行器excutor(resolve,reject),传入resolve和reject两个函数

\4. 设置用户如果传入resolve/reject函数,进入函数中,将传入的value保存到promise的data中,状态改为相应的状态(resolved/rejected)如果有待执行的回调函数(因调用then中的有回调),将每一个回调函数放进一个异步队列中,并且对于每一个回调函数forEach遍历,执行当前回调函数的onResolved/onRjected状态的回调函数,并且将当前函数的参数传递过去(value)

\5. 关于上一步中的状态改变需要分情况讨论,即在resolvet函数中判断当前状态是否为pending,如果是pending则继续执行,如果不是则直接return因为resolve方法只能被调用一次，用于改变Promise对象的状态。如果状态已经改变，再次调用resolve或reject方法是没有意义的，而reject方法不需要判断(如果判断了那么将会影响之后Promise的reject方法,使new的Promise状态变为pending而不执行相应的之后代码直接返回了),因为无论当前状态是什么，调用reject函数总是会使得Promise的状态变成REJECTED，并执行相应的回调函数

\6. 设定promise的原型对象的then方法,传入两种状态的回调函数onRejected和onResolved,

\7. 判断传入的回调函数,若为函数则不变,若为一个成功的value则返回一个value,若为失败的reason,则抛出异常

\8. 因为需要链式调用then,所以.then的方法返回值应为promise对象,所以函数中返回一个新的函数对象,并且传入他的resolve和reject方法为参数.

\9. 因为返回的promise结果需要由onResolved和onRejected的执行结果决定,所以封装一个处理返回结果的handle函数

\10. 如果异步函数的状态为pending,(则为加载初始化任务阶段),则将成功或失败的回调函数(onResolved和onRejected)通过push存储到callbacks数组容器(之前创建的存储回调函数的变量)中.并且onResolved和onRejected中也需要运行handle处理函数(因为异步操作还未完成，无法确定最终的结果是成功还是失败,要根据最后的状态执行相应的回调函数)

\11. 如果异步函数的状态为resolved或rejected,则异步调用处理返回结果的handle函数.

\12. handle函数中接受存储的回调函数callbacks为参数,这里需要try,将Promise对象的data赋值为一个变量,判断这个回调函数的传入值为一个Promise?还是具体数字或值?,如果是Promise,则通过调用then方法注册了两个回调函数,两个回调函数也要调用之前声明的resolve或reject函数,并且将成功或失败的值传进去并返回出来(通常使用箭头函数).如果是具体数字或值,直接调用resolve函数并传参value

\13. try完之后当然也要catch,将error通过reject函数将捕获到的错误传递给下一个Promise对象或最终的catch方法进行处理

\14. 写完.then方法后,来写catch,简单定义一下捕获到错误时，执行传入的错误回调函数(onRejected)来处理错误,通过调用then方法,将undefined作为第一个参数传入,将错误回调函数作为then方法的第二个参数传递进去，从而实现错误的捕获和处理.

\15. 接下来定义Promise函数对象的resolve方法,返回一个指定value的成功的Promise,同时在函数中定义是返回一个成功或失败的promise,并且判断函数的参数value如果为promise,则调用.then方法并传参(resolve,reject);其他情况则是value不是promise,则直接调用resolve方法并传参(value)就行

\16. 同理在定义reject函数对象的reject方法时,只需要接受参数reason,同时在函数中定义是返回一个成功或失败的promise,并且返回的promise对象中直接调用reject方法并且传参reason就可以

\17. 接着来定义promise函数对象的all方法,接受参数(promises)(可以接受多个).首先声明一个数组长度为传入的Promise数组长度例如:const values = new Array(Promises.length),这样做是用来保存所有成功value的数组,再声明一个计数器,用来保存成功Promise的数量也就是进入value回调函数的数量(后面会讲到为什么),return一个promise也是接受参数(resolve,reject),在return的promise中遍历获取每一个Promise的结果,例如:Promises.forEach((p, index),再在其中调用遍历的每一个p的then方法.但是但是但是重要的事情说三遍,因为不确定遍历的每一个p都是promise对象,所以可以使用这种写法Promise.resolve(p).then(),意为来判断传入的值是否是promise,包装成promise,如果本身就是promise,也是取决于p,如果成功则成功,如果失败则失败.如果是一个值最后也会返回一个值.这样做就免去了判断这一步骤.这时再在then方法中指定接受回调函数的value和reason,value中每次迭代循环则需要将计数器加一,并且将刚刚生命的values也就是传入的promise数组长度的第[index]项赋值为成功的value(将成功的value保存到values当中,并且保存顺序按照Promise传入的index顺序).这时再进行判断刚刚每次迭代加一的计数器是否等于当前数组的长度,如果等于,则意为全部成功,将return的Promise改为成功,(resolve(values))(需要将刚刚保存的values传入resolve函数中),接着指定接受回调函数的reason,因为只要有一个失败return的Promise就为失败,所以直接调用reject方法并且传参reason就可以.

\18. 接着定义promise函数对象的race方法,也是接受一个promises,也是需要return一个promise,传参resolve和reject,一样的方法,对promises进行forEach遍历迭代,传参(p,index),其中也是Promise.resolve(p).then()进行判断,这时再在调用then方法中指定接受回调函数的value和reason,value中直接调用resolve(value),因为一旦有成功的,将return变为成功,reason中直接调用reject(reason),因为一旦有失败,将return变为失败

\19. 好的进入最后一个环节,即自定义方法.定义一个Promise.resolveDelay,(延时成功)这时传参时需要两个参数(value,time),接着返回一个成功或失败的Promise,返回的promise中异步setTimeout一个延时参数为time的内容,其中再判断传入的value是否为promise,如果是则value.来调用then方法,传参(resolve,reject),如果不是则直接调用resolve()传参value.

\20. 再自定义一个Promise.rejectDelay,这时传参时需要两个参数(value,time),接着返回一个成功或失败的Promise,返回的promise中异步setTimeout一个延时参数为time的内容,并且直接调用reject方法传参reason即可.

\21. 最后的最后,如果你写的是立即执行函数,再向外暴露promise函数即可(window.Promise = Promise)通过将Promise对象暴露给全局环境，其他代码就可以使用这个新的Promise对象来进行异步操作，例如调用.then()或.catch()方法来处理Promise的结果。另外，这里将Promise对象作为参数传递给立即执行的函数(IIFE)，是为了避免在全局环境中引入新的变量。通过这种方式，可以确保Promise对象只被定义一次，避免产生多个实例，并且不会污染全局环境。

 
