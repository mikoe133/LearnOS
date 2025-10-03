## 练习:

假设银行存款的年利率为5%,问1000块能存多少年可以变成5000

```js
			let money = 1000
			let year = 0 //创建一个计数器来记录循环的执行次数
			// money = money*1.05 
			// console.log(money);
			while(money < 5000){
				money = money*1.05 
				year++
			}
			console.log(`需要存${year}年最终钱为${money}`);
```



