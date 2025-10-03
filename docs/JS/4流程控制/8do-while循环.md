## do-while循环

- 语法:

  - do{

    语句...

    }while(条件表达式)

- 执行顺序:

  - do-while语句在执行时,会先执行do后的循环体,执行完毕后,会对while后的条件表达式进行判断
    - 如果是false,则循环终止
    - 如果为true,则继续执行循环体

```js
let i = 0 
			do{
				console.log(i);
				i++
			}while(i<5)
```

- 和while的区别
  - while语句是先判断在执行
  - do-while语句是先执行在判断
  - 实质区别:
    - do-while可以确保循环至少执行一次