## if-else语句

- 语法

  - if(条件表达式){语句...}

    Else{语句...}

```js
let age = 50
if (age>=60){
  alert("退休")
}else{
  alert("不退休")
}
```

## If-else if-else语句

- 语法

  - if(条件表达式){语句...}

    Else if(条件表达式){语句...}

    Else if(条件表达式){语句...}

    Else{语句...}
    
  - 执行流程
  
    自上向下以及对if后非条件表达式进行求求值判断
  
    **如果一个代码块为true,则后续都不执行** 
    
    ```js
    let age = 50
    if (age>=60){
      alert("退休")
    } else if(age>=50){
      alert("1")
    }else if(age>=40){
      alert("2")
    }else{
      alert("3")
    }
    ```
    
    
