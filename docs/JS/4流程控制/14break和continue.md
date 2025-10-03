##  break和continue

- break
  - break用来终止Switch和循环语句
  - break执行后当前的Switch或循环会立刻停止
  - break会终止离他最近的循环

```js
			for(let i = 0;i<5;i++){
				if(i===3){
					break//当i执行到3时跳出循环
				}
				console.log(i);
			}
```

```js
		for(let i=0;i<5;i++){
			console.log(i);
			for(let j=0;j<5;j++){
				if(j===1){break}
				console.log('内层循环--->',j);
			}
		}
//外层循环会执行12345，内层循环只执行到1
```

- continue
  - 用来跳过当次循环



