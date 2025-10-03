## Switch语句

- 语法:

  - Switch(表达式){

    case 表达式:

    代码:

    break

    case 表达式:

    代码:

    Break

    Default:

    代码:

    }

  - 执行流程

    - Switch语句在执行时,会依次将Switch后的表达式和case后的表单式进行全等比较
      - 如果比较结果为true,则自当前case处开始执行代码
      - 如果比较结果为false,则继续比较其他case后的表达式,直到找到true为止
      - 可以使用break来避免执行其他的case
      - 如果所有的比较都是false,则执行default后的语句

```js
		let num = +prompt("输入值")
			switch(num){
				case 1:alert("yi")
				break
				case 2:alert("er")
				break
				case 3:alert("san")
				break
				default:alert("no")
				break
			}
```

