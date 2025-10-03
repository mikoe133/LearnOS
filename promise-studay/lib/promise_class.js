// 自定义promise函数模块

// 1为Promise对象准备三个属性
// 2调用执行器 excutor,准备两个函数(resolve,reject),并且如果抛异常catch
// 3实现resolve和reject,先判断是否PENDING,不是直接return结束,
//  是则改状态,保存数据,异步执行待执行的回调函数
// 4



(function (window) {
    const PENDING = 'pending'
    const RESOLVED = 'resolved'
    const REJECTED = 'rejected'

    class Promise {
        // excutor:执行器函数(同步执行)
        //promise的构造函数
        constructor(excutor) {
            //将当前Promise对象保存
            const self = this
            self.status = PENDING
            self.data = undefined
            self.callbacks = []

            function resolve(value) {
                //如果当前状态不是PENDING,直接结束
                if (self.status !== PENDING) {
                    return
                }
                //改状态
                self.status = RESOLVED
                //保存value
                self.data = value
                //如果有待执行的callback函数,立即异步执行回调函数onRESOLVED
                if (self.callbacks.length > 0) {
                    setTimeout(() => { //放入队列中执行所有成功的回调
                        self.callbacks.forEach(callbacksObj => {
                            callbacksObj.onResolved(value)
                        })
                    },);
                }
            }
            function reject(reason) {
                //改状态
                self.status = REJECTED
                //保存value
                self.data = reason
                //如果有待执行的callback函数,立即异步执行回调函数onREJECTED
                if (self.callbacks.length > 0) {
                    setTimeout(() => { //放入队列中执行所有成功的回调
                        self.callbacks.forEach(callbacksObj => {
                            callbacksObj.onRejected(reason)
                        })
                    },);
                }
            }
            //立即执行excutor
            try {
                excutor(resolve, reject)
            } catch (error) {
                reject(error)
            }
        }


    //Promise原型对象的和then
    // 指定成功和失败的回调函数
    // 返回一个新的Promise对象
    //返回Promise的结果由onResolved/onRejected执行结果决定
then(onResolved, onRejected) {
            //指定回调函数的默认值(必须是函数)
            onResolved = typeof onResolved === 'function' ? onResolved : value => value
            //指定默认的失败的回调
            onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
            const self = this
            return new Promise((resolve, reject) => {
                function handle(callbacks) {
                    try {
                        const result = callbacks(self.data)
                        if (result instanceof Promise) {
                            result.then(
                                value => {
                                    resolve(value)
                                },
                                reason => {
                                    reject(reason)
                                }
                            )
                        } else {
                            resolve(result)
                        }
                    } catch (error) {
                        reject(error)
                    }
                }

                if (self.status === PENDING) {//将成功和失败的回调函数保存callbacks容器中缓存起来
                    self.callbacks.push({
                        onResolved(value) {
                            handle(onResolved)
                        },
                        onRejected(reason) {
                            handle(onRejected)
                        }
                    })
                } else if (self.status === RESOLVED) {
                    setTimeout(() => {
                        handle(onResolved)
                    },);
                } else {
                    setTimeout(() => {
                        handle(onRejected)
                    },);
                }
            })
        }
catch(onRejected) {
            return this.then(undefined, onRejected)
        }
//Promise函数对象的方法
//Promise函数对象的resolve方法,返回一个指定value的成功的Promise
static resolve = function (value) {
            //返回一个成功或失败的Promise
            return new Promise((resolve, reject) => {
                //value是Promise
                if (value instanceof Promise) {
                    //使用value的结果作为Promise的结果
                    value.then(resolve, reject)
                } else {
                    //value不是Promise
                    resolve(value)
                }
            })
        }
//Promise函数对象的reject方法,返回一个指定reason的失败的Promise
static reject = function (reason) {
            return new Promise((resolve, reject) => {
                reject(reason)
            })
        }
static all = function (Promises) {
            //声明一个数组长度为传入的Promise数组长度
            const values = new Array(Promises.length)//用来保存所有成功value的数组
            //声明一个计数器,用来保存成功Promise的数量也就是进入value回调函数的数量
            let resolvedcount = 0
            return new Promise((resolve, reject) => {
                //遍历获取每一个Promise的结果
                Promises.forEach((p, index) => {
                    Promise.resolve(p).then(//用来判断传入的值是否是promise,包装成promise,如果本身就是promise,也是取决于p,
                        //如果成功则成功,如果失败则失败.如果是一个值最后也会返回一个值
                        value => {
                            resolvedcount++
                            //将成功的value保存到values当中,并且保存顺序按照Promise传入的index顺序
                            values[index] = value
                            //如果全部成功,将return的Promise改为成功
                            if (resolvedcount === Promises.length) {
                                resolve(values)
                            }
                        },
                        reason => {
                            //只要有一个失败return的Promise就为失败
                            reject(reason)
                        }
                    )
                })
            })
        }
static race = function (Promises) {
            return new Promise((resolve, reject) => {
                Promises.forEach((p, index) => {
                    Promise.resolve(p).then(
                        value => {
                            //一旦有成功的,将return变为成功
                            resolve(value)
                        },
                        reason => {
                            reject(reason)
                            //一旦有失败,将return变为失败
                        }
                    )
                })
            })
        }
//自定义方法
//返回一个promise,它在指定的时间后才确定结果
static resolveDelay = function (value, time) {
            //返回一个成功或失败的Promise
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    //value是Promise
                    if (value instanceof Promise) {
                        //使用value的结果作为Promise的结果
                        value.then(resolve, reject)
                    } else {
                        //value不是Promise
                        resolve(value)
                    }
                }, time)
            })
        }
//返回一个promise,它在指定的时间后才失败
static rejectDelay = function (reason, time) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject(reason)
                }, time);
            })
        }

    }




    //向外暴露promise函数
    window.Promise = Promise
})(window)  