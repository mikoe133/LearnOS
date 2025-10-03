- #### re.exec()

  - 获取字符串中符合正则表达式的内容

  - ```js
    let str = "abcaecafcacc"
    let re = /a[a-z]c/ig //i表示不区分大小写,g表示全局匹配
    let result = re.exec(str)
    ```

    ```js
    let re = /a(([a-z])c)/ig
    先匹配最大括弧,多次调用后依次匹配,abc,bc,b
    ```
    
    ##### 写循环来遍历
    
    ```js
    while(result){
    	console.log(result[0],result[1],result[2])
    	result = re.exec(str)
    }
    ```
    
    