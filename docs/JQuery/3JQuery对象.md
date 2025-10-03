- jQuery对象本质是一个DOM对象的数组(类数组),可以通过索引获取jQuery对象中的DOM对象

- #### 当修改jQuery对象时,他会自动修改jQuery中的所有元素,这一特点称为***<u>隐式迭代</u>***

```js
  $("#btn").click(function (){
        var $li = $("li")
        // alert($li[0].textContent)
        $li.text("hhhh")
    })
```

##### 读取文本时,返回所有标签的文本

```js
var text = $li.text()
```

##### 读取属性时,返回第一个标签的属性

```js
var id = $li.attr("id")
```



#### jQuery对象的返回值依然是jQuery对象,所以调用方法后继续调用其他的jQuery对象 的方法,称为***<u>链式调用</u>***

```js
$li.text("新的文本内容").css("color","red")
```

