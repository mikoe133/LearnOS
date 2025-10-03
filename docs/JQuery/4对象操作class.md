## addClass() 为元素添加一个或多个class

- ```js
          $(function (){
              $("#btn").click(function (){
                  $(".box1").addClass(["box2","box3"])
              })
          })
  ```

- 可以接受一个回调函数作为参数,回调函数中,this是当前的元素(DOM对象)

- ```js
     $(function (){
              $("#btn").click(function (){
                  $(".box1").addClass(function(index,className){
                    if(index%2 ==0){
                      //添加box2
                      this.classList.add("box2")
                      //相当于$(this).addCLass("box2")
                      //先将this包装为jQuery对象,再调用jQuery对象的方法
                    }else{
                      //添加box3
                      this.classList.add("box3")
                       //相当于$(this).addCLass("box3")
                    }
                  })
              })
          })
  ```

- ```js
     //回调函数的返回值会成为当前元素的class
     $(".box1").addClass(function(index){
     	if(index%2 === 0){
     		return ["box2","box3"]
         //与上段代码相同作用,但是更简便
     	}
     })
     ```
     
     