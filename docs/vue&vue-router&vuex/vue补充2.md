# vue初试

## 内嵌vue

### 基本语法

#### Mustaache胡子语法

```
<div id="app">
    <h1>{{msg+num}}</h1>
    <h3>{{msg+"abc"+num}}</h3>
    <h2>{{num==1}}</h2>
  </div>
  <script src="../js/vue.min.js"></script>
  <script>
    let app=new Vue({
      el:"#app",
      data:{
        msg:"abc",
        num:10
      }
    })
  </script>
```

#### v-once指令

```
<div id="app">
    <h1>{{msg}}</h1>
    <!--当msg值改变时，添加了v-once指令的内容不会变化-->
    <h2 v-once>{{msg}}</h2>
  </div>
  <script src="../js/vue.min.js"></script>
  <script>
    let app=new Vue({
      el:"#app",
      data:{
        msg:"abc"
      }
    })
  </script>
```

#### v-text指令

```
<div id="app">
    <h1>{{msg}},xxx</h1>
    <!--相当于js的text函数,但是会覆盖元素原始的值-->
    <p v-text="str">xxx</p>
  </div>
  <script src="../js/vue.min.js"></script>
  <script>
    let app=new Vue({
      el:"#app",
      data:{
        msg:"abc",
        str:"<a href='http://www.baidu.com'>百度一下</a>"
      }
    })
  </script>
```

#### v-html指令

```
<div id="app">
    <h1>{{msg}}</h1>
    <!--相当于js的html函数-->
    <p v-html="str"></p>
  </div>
  <script src="../js/vue.min.js"></script>
  <script>
    let app=new Vue({
      el:"#app",
      data:{
        msg:"abc",
        str:"<a href='http://www.baidu.com'>百度一下</a>"
      }
    })
  </script>
```

#### v-bind指令

绑定属性：

```
<div id="app">
    <!--v-bind用于将data数据绑定在属性当中   mustache语法只能改变元素文本内容-->
    <img v-bind:src="url">
    <a v-bind:href="hre">点击</a>
    <!--v-bind的语法糖，直接使用:替代-->
    <img :src="url">
  </div>
  <script src="../js/vue.min.js"></script>
  <script>
    let app=new Vue({
      el:"#app",
      data:{
        msg:"abc",
        url:"https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2588111137,2818876915&fm=26&gp=0.jpg",
        hre:"http://www.baidu.com"
      }
    })
  </script>
```

绑定样式

```
 <div id="app">
    <h1>{{msg}}</h1>
    <!--<div :style="{属性名:属性值}"></div>     属性值记得打引号-->
    <!--<div :style="{color:'red',fontSize:'100px'}">测试文字！！！！！</div>-->
   <!-- <div :style="{color:showColor,fontSize:showFontSize}">测试文字！！！！！</div>-->
    <div :style="change()">测试文字！！！！！</div>
  </div>
  <script src="../js/vue.min.js"></script>
  <script>
    let app=new Vue({
      el:"#app",
      data:{
        msg:"dasdas",
        showColor:"red",
        showFontSize:"100px"
      },
      methods:{
        change:function () {
          return {color:this.showColor,fontSize:this.showFontSize}
        }
      }
    })
  </script>
```

样式如果太多，建议绑定class

```
<style>
    .borderStyle{
      width: 300px;
      height: 300px;
      margin: 0 auto;
      color: red;
      border-style: dashed;
      border-width: 1px;
    }
    .backColor{
      background-color: blueviolet;
    }
  </style>
  
  <div id="app">
    <!--通过v-bind来绑定class元素，并且通过data属性值来决定class是否绑定-->
    <div v-bind:class="{borderStyle:haveBorderStyle,backColor:haveBackColor}">
      测试
    </div>
    <button v-on:click="addClass()">点击</button>
  </div>
  <script src="../js/vue.min.js"></script>
  <script>
    let app=new Vue({
      el:"#app",
      data:{
        msg:"abc",
        haveBorderStyle:true,
        haveBackColor:false
      },
      methods:{
        addClass:function () {
          this.haveBackColor=!this.haveBackColor;
        }
      }
    })
  </script>
```

#### computed属性

```
<div id="app">
    <!--当想要某些属性输出之后做一些处理时，就会比较麻烦，特别是多次去用-->
    <h1>{{country}} {{privions}} {{city}}</h1>
    <!--使用vue的computed属性对要输出的值预先进行处理-->
    <h1>{{address}}</h1>
  </div>
  <script src="../js/vue.min.js"></script>
  <script>
    let app=new Vue({
      el:"#app",
      data:{
        country:"中国",
        privions:"湖北省",
        city:"武汉市"
      },
      computed:{
        address:function () {//虽然address是一个匿名函数，但是使用的时候要当做属性来用
          return this.country+' '+this.privions+' '+this.city;
        }
      }
    })
  </script>
```

#### v-on指令

```
<div id="app">
    <!--  普通情况下点击按钮也会触发div的点击事件，出现事件冒泡效果  -->
    <div @click="divClick">
      div的范围
      <!--为v-on指令指定修饰符则可以阻止事件冒泡的发生-->
      <button @click.stop="btnClick">点击</button>
    </div>
  </div>
  <script src="../js/vue.min.js"></script>
  <script>
    let app=new Vue({
      el:"#app",
      data:{
        msg:"abc"
      },
      methods:{
        divClick(){
          console.log("div点击事件触发");
        },
        btnClick(){
          console.log("按钮点击事件触发");
        }
      }
    })
  </script>
```

#### v-if指令及v-show指令

```
<div id="app">
    <!--v-if需要得到一个boolean类型的值，值为true时会显示标签-->
    <div v-if="isShow">
      <ul>
        <li>大喊大叫按时</li>
        <li>哒哒哒哒哒哒</li>
        <li>辅导费三点分</li>
        <li>大大大</li>
      </ul>
    </div>
    <div v-else>
      上方文字不显示时则显示我
    </div>
    <hr>
    <!-- v-show的作用与v-if一致，但区别在于v-if的html元素会消失在body中，而v-show只是隐藏，元素还在！   -->
    <!--因此在元素的隐藏和显示之间切换次数比较高的时候使用v-show会比较好-->
    <div v-show="isShow">
      <ul>
        <li>大喊大叫按时</li>
        <li>哒哒哒哒哒哒</li>
        <li>辅导费三点分</li>
        <li>大大大</li>
      </ul>
    </div>
    <!--如果逻辑相当复杂建议使用computed属性去判断-->
  </div>
  <script src="../js/vue.min.js"></script>
  <script>
    let app=new Vue({
      el:"#app",
      data:{
        msg:"abc",
        isShow:true
      }
    })
  </script>
```

#### v-model指令

```
<div id="app">
    <!--  v-model能将参数与模型数据进行双向绑定，改变输入框的值时也会将msg进行改变  -->
    <input type="text" v-model="people.msg"><br>
    <!--当只需要在用户敲回车键或者失去光标时才去双向绑定的话，需要用到lazy修饰符-->
    <input type="text" v-model.lazy="people.msg"><br>
    <!--当想要得到输入框中的数字并且以number类型接收时，使用number修饰符-->
    <input type="text" v-model.number="people.num">
    <!--当想要去除用户输入的前后空格时，使用trim修饰符-->
    <!--单选按钮-->
    <label for="r1">
      <input type="radio" value="男" v-model="people.gender" id="r1">男
    </label>
    <label for="r2">
      <input type="radio" value="女" v-model="people.gender" id="r2">女
    </label>
    <br>

    <!--复选框-->
    <label for="c1">
      <input type="checkbox" id="c1" value="唱" v-model="people.hobbys">唱
    </label>
    <label for="c2">
      <input type="checkbox" id="c2" value="跳" v-model="people.hobbys">跳
    </label>
    <label for="c3">
      <input type="checkbox" id="c3" value="rap" v-model="people.hobbys">rap
    </label>
    <label for="c4">
      <input type="checkbox" id="c4" value="篮球" v-model="people.hobbys">篮球
    </label>
    <br>

    <!--下拉框-->
    <select v-model="people.address">
      <option value="武汉市">武汉市</option>
      <option value="襄阳市">襄阳市</option>
      <option value="荆门市">荆门市</option>
      <option value="仙桃市">仙桃市</option>
    </select>
    <h1>{{people.msg}}{{people.gender}}{{people.hobbys}}{{people.address}}</h1>
  </div>
  <script src="../js/vue.min.js"></script>
  <script>
    let app=new Vue({
      el:"#app",
      data:{
        people:{
			msg:"abc",
			num:0,
			gender:"男",
			hobbys:[],
			address:""
		}
      }
    })
  </script>
```

#### v-for指令

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
  <link href="../css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div id="shopCart" class="container">
    <table class="table table-hover table-bordered table-striped">
      <tr>
        <th>编号</th>
        <th>商品</th>
        <th>单价</th>
        <th>数量</th>
        <th>操作</th>
      </tr>

      <tr v-if="products.length===0"> 
        <td colspan="5">
          <h1 align="center">购物车为空</h1>
        </td>
      </tr>

      <tr v-for="(p,index) in products" v-else>
        <td>{{index+1}}</td>
        <td>{{p.pname}}</td>
        <td>{{p.price|showPrice}}</td>
        <td>
          <button class="btn btn-info"   @click="jia(index)" >+</button>
          {{p.num}}
          <button class="btn btn-info"   @click="jian(index)" :disabled="p.num===1">-</button>
        </td>
        <td>
          <button class="btn btn-danger" @click="removeProduct(index)">移除</button>
        </td>
      </tr>

      <tr>
        <td colspan="5" align="right">总价:{{totalPrice|showPrice}}</td>
      </tr>
    </table>
  </div>
  <script src="../js/jquery-3.1.1.min.js"></script>
  <script src="../js/bootstrap.min.js"></script>
  <script src="../js/vue.min.js"></script>
  <script>
    let app=new Vue({
      el:"#shopCart",
      data:{
        products:[
          {
            pid:1,
            pname:"iphone11 pro Max",
            price:11999,
            num:1
          },
          {
            pid:2,
            pname:"Nike Blazer Mid‘77",
            price:549,
            num:1
          },
          {
            pid:3,
            pname:"Rolex 黄金迪拿通",
            price:24800,
            num:1
          },
          {
            pid:4,
            pname:"roseonly 怦然心动",
            price:19999,
            num:1
          },
        ]
      },
      methods:{
        jia(index){
          this.products[index].num++;
        },
        jian(index){
          this.products[index].num--;
        },
        removeProduct(index){
          this.products.splice(index,1)
        }
      },
      computed:{
        totalPrice(){
          let tp=0;
          for(let i=0;i<this.products.length;i++){
            tp+=this.products[i].price*this.products[i].num;
          }
          return tp;
        }
      },
      filters:{
        showPrice(price){
          return '¥'+price.toFixed(2)
        }
      }
    })
  </script>
</body>
</html>
```



### 组件化

#### 全局组件

```
<div id="app">
    <mb></mb>
  </div>
  <script src="../js/vue.min.js"></script>
  <script>
    /*全局组件能够在所有Vue绑定的实例中使用   必须要把模块的所有标签用一个总标签套起来*/
    Vue.component('mb',{
      template:`
        <div>
          <h1>这是一个标题</h1>
          <p>这是标题的介绍</p>
          <a href="#">这是标题的链接</a>
        </div>
      `
    })

    let app=new Vue({
      el:"#app",
      data:{
        msg:"abc"
      }
    })
  </script>
```

#### 局部组件

```
 <div id="app">
    <mb></mb>
    <nmb></nmb>
  </div>
  <script src="../js/vue.min.js"></script>
  <script>
    /*局部组件声明和注册在Vue的实例当中，只能被当前实例绑定的标签内部使用*/
    let app=new Vue({
      el:"#app",
      data:{
        msg:"abc"
      },
      components:{
        mb:{
          template:`
            <div>
              <h1>这是一个标题</h1>
              <p>这是标题的介绍</p>
              <a href="#">这是标题的链接</a>
            </div>
          `
        },
        nmb:{
          template: `
            <div>无敌</div>
          `
        }
      }
    })
  </script>
```

#### 模板抽离

```
<div id="app">
    <mb></mb>
    <ts></ts>
  </div>

  <template id="cpn">
    <div>
      <h1>这是一个标题</h1>
      <p>这是标题的介绍</p>
      <a href="#">这是标题的链接</a>
    </div>
  </template>

  <script src="../js/vue.min.js"></script>
  <script>
    //全局组件
    Vue.component('ts',{
      template: '#cpn'
    })


    let app=new Vue({
      el:"#app",
      data:{
        msg:"abc"
      },
      components:{
        'mb':{
          template:"#cpn"
        }
      }
    })
  </script>
```

#### 模板数据

```
<div id="app">
    <cpn></cpn>
  </div>

  <template id="cpn">
    <div>
      <h1>{{title}}</h1>
      <p>这是标题的介绍</p>
      <a href="#">这是标题的链接</a>
    </div>
  </template>

  <script src="../js/vue.min.js"></script>
  <script>
    Vue.component('cpn',{
      template:"#cpn",
      data(){//用于规定模板中用到的动态数据，如果组件被重复使用时，title不会公共！
        return{
          title:"动态数据！！！"
        }
      }
    })


    let app=new Vue({
      el:"#app",
      data:{
        msg:"abc"
      }
    })
  </script>
```

#### 父组件获取服务器的数据传递给子组件使用

```
<div id="app">
    <!--将app组件中的movies属性值传递给子组件中的smovies属性-->
    <cpn :smovies="movies"></cpn>
  </div>

  <template id="cpn">
    <div>
      <div v-for="item in smovies">
        <h1>{{item}}</h1>
        <p>这是电影的介绍</p>
        <a href="#">这是电影的播放链接</a>
      </div>
    </div>
  </template>
  <script src="../js/vue.min.js"></script>
  <script>
    //模板对象
    const showMovie={
      template:"#cpn",
      props:{
        smovies:{//设定当前组件含有一个属性为smovies，能够接收父组件传递过来的值，类型为Array
          type:Array,
          default:["没有电影数据"],
          required:true//代表当前这个属性必须有值传递过来
        }
      }
    }

    let app=new Vue({
      el:"#app",
      data:{
        msg:"abc",
        movies:["白日焰火","大好时光","南方车站的聚会","幽冥"]
      },
      components:{//注册为局部组件
        cpn:showMovie
      }
    })
  </script>
```

#### 子组件传递数据给父组件

```
<div id="app">
   <!--  使用模板自定义事件去触发Vue组件中的方法并传递参数 -->
   <cpn @buclick="chooseType"></cpn>
 </div>

 <template id="t1">
   <div>
     <!--通过点击事件触发模板组件的buttonClick方法并传入item对象-->
     <button v-for="item in typeLists" @click="buttonClick(item)">{{item.typeName}}</button>
   </div>
 </template>
 <script src="../js/vue.min.js"></script>
 <script>
   const cpn1={
     template:"#t1",
     props:{
       typeLists:{
         type:Array,
         default:[
           {
             tid:1,
             typeName:"生鲜"
           },
           {
             tid:2,
             typeName:"果蔬"
           },
           {
             tid:3,
             typeName:"熟食"
           },
           {
             tid:4,
             typeName:"坚果"
           }
         ]
       }
     },
     methods:{
       buttonClick(item){
         //接收item对象并使用自定义的事件buclick发送出去
         this.$emit("buclick",item);
       }
     }
   }

   let app=new Vue({
     el:"#app",
     data:{
       msg:"abc"
     },
     components:{
       cpn:cpn1
     },
     methods: {
       chooseType(item){
         console.log("选择的类型是：",item);
       }
     }
   })
 </script>
```

#### 父组件直接拿到子组件的元素

```
<div id="app">
    <cpn1 ref="c1" :count="1"></cpn1>
    <cpn1 ref="c2" :count="2"></cpn1>
    <cpn1 ref="c3" :count="3"></cpn1>
    <button @click="btnClick">触发第三个组件的函数</button>
  </div>

  <template id="cpn1" >
    <div>我是模板组件{{count}}</div>
  </template>
  <script src="../js/vue.min.js"></script>
  <script>
    const cpn1={
      template:"#cpn1",
      data(){
        return{
          arg:"子组件的属性！"
        }
      },
      props:{
        count:{
          type:Number,
          default:0,
          required:true
        }
      },
      methods:{
        test(){
          console.log("子组件"+this.count+"的test方法被执行！");
        }
      }
    }

    let app=new Vue({
      el:"#app",
      data:{
        msg:"abc"
      },
      methods: {
        btnClick() {
          console.log("btnClick方法被执行！！");
          //$refs用于获取当前组件下的所有关联子组件，通过组件的ref属性值确定到底获取哪一个
          this.$refs.c3.test();
        }
      },
      components:{
        "cpn1":cpn1
      }
    })
  </script>
```

#### 组件插槽slot

```
<div id="app">
    <cpn1><a href="#">链接</a></cpn1>
    <cpn1></cpn1>
  </div>

  <template id="cpn1">
    <div>
      <span>开头</span>
      <slot>
        <label>插槽默认元素</label>
      </slot>
      <span>结尾</span>
    </div>
  </template>
  <script src="../js/vue.min.js"></script>
  <script>

    const cpn1={
      template:"#cpn1"
    }

    let app=new Vue({
      el:"#app",
      data:{
        msg:"abc"
      },
      components:{
        "cpn1":cpn1
      }
    })
  </script>
```



## Vue2.0单独环境

1. 打开node.js官网下载并安装node.js，官网如下http://nodejs.cn/download/，版本最好大于8.0
2. 检查是否安装完后，管理员身份运行cmd，输入node -v

![image-20210830093854667](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210830093854667.png)

​	3. 配置node的镜像仓库位置

​		1.  安装node.js的淘宝镜像加速器cnpm

```
npm install cnpm -g
```

​		2. 使用淘宝镜像

```
npm install --registry=https://registry.npm.taobao.org
```

4. 安装vue-cli	

```
npm install vue-cli -g
```

5. cmd检查vue-cli是否安装好

```
vue list
```

![image-20210830095829233](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210830095829233.png)

或者

一
下载并安装到xx文件夹,创建两个文件夹:node_global    node_cache                   ,node_global中创建文件夹node_modules
验证:node -v         npm -v

二
npm config set prefix "global的路径"
npm config set cache "cache的路径"

三
去系统环境变量中创建 NODE_PATH ,值为node_global中的node_modules的路径
去用户变量中的path将npm的路径修改为node_global的路径

四
使用管理员身份打开cmd,设置淘宝镜像:npm config set registry https://xxxx

五:
下载vue的环境
npm install -g @vue/cli
验证: vue -V

六:
测试创建vue3.0项目
先创建vue的工作目录,然后cmd进入,利用vue create xxxx    按照提示选择vue3.0 再等待下载按照蓝色字体开启项目(cmd不能关!)

### 第一个vue项目配置

1. 项目初始化

```
vue init webpack firstvue
npm install
```

​	注意项目名称要小写

2. 项目启动

   cd到项目之中，使用命令npm run dev

   

### vue-router

1. **终端进入项目之中**，手动下载vue-router

```
npm install vue-router@3.5.2 --save-dev
```

2. 检查vue-router是否下载成功

   1. 到项目之下的package.json中查看是否有vue-router
   2. 到node-modules中查看vue-router包是否存在

3. 在main中引入vue-router

   ```
   import VueRouter from 'vue-router'
   Vue.use(VueRouter)
   ```
   
4. 编写模板文件components/Content.vue

   ```
   <template>
      <div>
        xxxxxxxxxxxxxxxxxxxxxxx
        aaaaaaaaaaaaaaa
      </div>
   </template>
   
   <script>
     export default{
       name:"Content"
     }
   
   </script>
   ```

   

5. 编写路由配置文件router/index.js

   ```
   import Vue from "vue"
   import Router from 'vue-router'
   import Content from '../components/Content'
   Vue.use(Router);
   
   export default new Router({
     mode:'history',//默认是哈希模式，访问时路径中需要携带#符号
     routes:[{
       //路由的路径
       path:'/content',
       //路由的名称
       name:'Content',
       //路由访问的组件名称
       component:Content
     }]
   })
   ```

6. 在main.js文件中加载router文件夹

   ```
   import router from './router'
   new Vue({
     el: '#app',
     router,
     components: { App },
     template: '<App/>'
   })
   ```

7. App.vue文件中应用路由

   ```
   <template>
     <div id="app">
       <img src="./assets/logo.png">
       <router-link to="/">首页</router-link><!-- 模仿a标签 -->
       <router-link to="/content">测试页面</router-link>
       <router-view/><!-- 应用所有的路由 -->
     </div>
   </template>
   ```

   

### Element-UI

1. 项目下安装Element-ui以及sass加载器（想当于css)

   ```
   npm i element-ui -S
   npm install sass-loader@7.3.1 node-sass --save-dev
   npm install
   ```

2. main.js引入element-ui

   ```
   import Vue from 'vue';
   import ElementUI from 'element-ui';
   import 'element-ui/lib/theme-chalk/index.css';
   import App from './App.vue';
   
   Vue.use(ElementUI);
   
   new Vue({
     el: '#app',
     render: h => h(App)
   });
   ```

那么如何应用Element-UI做出对应成果呢？接下来完成一个登录页面

1. 在src下新建包view用于放置所有的视图页面

2. view下新建Login.vue并导出配置路由

   ```
   <template>
      <div>
        登录页
      </div>
   </template>
   
   <script>
     export default{
       name:"Login"
     }
   
   </script>
   ```

   src下新建router包以及index.js

   ```
   import Vue from "vue"
   import Router from 'vue-router'
   import Login from '../views/Login'
   Vue.use(Router);
   
   export default new Router({
     routes:[{
       path:'/login',
       name:'Login',
       component:Login
     }]
   })
   
   ```

   记得在mian.js应用router,参考上一小节

3. 编写登陆页面内容，最好参考Element-UI官网，也可使用以下内容

   ```
   <template>
     <div>
       <el-form ref="form" :model="form" class="form-area">
         <h1 align="center">登录</h1>
         <el-form-item label="用户名">
           <el-input type="text" placeholder="请输入用户名" v-model="form.account"></el-input>
         </el-form-item>
         <el-form-item label="密码">
           <el-input type="password" placeholder="请输入密码" v-model="form.password"></el-input>
         </el-form-item>
         <el-form-item>
           <el-button type="primary" @click="onSubmit">登录</el-button>
         </el-form-item>
       </el-form>
     </div>
   </template>
   
   <script>
     export default{
       name:"Login",
       data(){
         return{
           form:{
             account:"",
             password:""
           }
         }
       },
       methods:{
         onSubmit:function(){
           
         }
       }
     }
   </script>
   
   <style scoped>
     .form-area{
       width: 400px;
       margin: 120px auto;
       border: 1px solid #DCDFE6;
       padding: 20px;
       box-shadow: 0 0 30px #DCDFE6;
     }
   </style>
   ```

4. 编写表单校验，Form 组件提供了表单验证的功能，只需要通过 `rules` 属性传入约定的验证规则，并将 Form-Item 的 `prop` 属性设置为需校验的字段名即可

   ```
   <template>
     <div>
       <el-form ref="form" :rules="rules" :model="form" class="form-area">
         <h1 align="center">登录</h1>
         <el-form-item label="用户名" prop="account">
           <el-input type="text" placeholder="请输入用户名" v-model="form.account"></el-input>
         </el-form-item>
         <el-form-item label="密码" prop="password">
           <el-input type="password" placeholder="请输入密码" v-model="form.password"></el-input>
         </el-form-item>
         <el-form-item>
           <el-button type="primary" @click="onSubmit('form')">登录</el-button>
         </el-form-item>
       </el-form>
     </div>
   </template>
   
   <script>
     export default {
       name: "Login",
       data() {
         return {
           form: {
             account: "",
             password: ""
           },
           rules: {
             account: [{
               required: true,
               message: '用户名不可为空',
               trigger: 'blur',
             }, {
               min: 3,
               max: 5,
               message: '长度在 3 到 5 个字符',
               trigger: 'blur'
             }],
             password: [{
               required: true,
               message: '密码不可为空',
               trigger: 'blur'
             }, ],
           }
         }
       },
       methods: {
         onSubmit: function(form) {
           this.$refs[form].validate((valid) => {
             if (valid) {
               this.$router.push("/index");
             } else {
               this.$message.error('请根据表单错误提示进行修改！');
               return false;
             }
           });
         }
       }
     }
   </script>
   
   <style scoped>
     .form-area {
       width: 400px;
       margin: 120px auto;
       border: 1px solid #DCDFE6;
       padding: 20px;
       box-shadow: 0 0 30px #DCDFE6;
     }
   </style>
   
   ```

### 分栏布局

一般对于后台管理项目，基本的操作界面都是基于分栏布局进行显示，类似于html中的frameset框架，左边对应多级菜单，右边是内容主体，上面是头部信息，可以参考Element-UI官网的案例。

用于布局的容器组件，方便快速搭建页面的基本结构：

`<el-container>`：外层容器。当子元素中包含 `<el-header>` 或 `<el-footer>` 时，全部子元素会垂直上下排列，否则会水平左右排列。

`<el-header>`：顶栏容器。

`<el-aside>`：侧边栏容器。

`<el-main>`：主要区域容器。

`<el-footer>`：底栏容器。

### 嵌套路由

当前aside的菜单点击时，一般在main容器当中需要显示对应的页面，这个时候就无法使用a标签的target参数进行实现，而需要用到嵌套路由，顾名思义就是父路由包含字路由的关系。首先必须要声明好子路由对应的vue界面，然后照旧去router的index.js中进行进行注册：

```
export default new Router({
  routes:[
    {
      path:"/login",
      name:"Login",
      component:Login
    },
    {
      path:"/index",
      name:"Index",
      component:Index,
      children:[
        {
          path:"/order/list/:id",
          name:"OrderList",
          component:OrderList
        },
        {
          path:"/order/add",
          name:"AddOrder",
          component:AddOrder
        }
      ]
    },
  ]
})
```

然后记得到main容器中应用路由视图

```
		<el-main>
          <router-view/>
        </el-main>
```

通过router-link链接到子路由当中

```
		<el-menu :default-openeds="['1']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>订单</template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <router-link to="/order/list">订单列表</router-link>
              </el-menu-item>
              <el-menu-item index="1-2">
                <router-link to="/order/add">添加订单</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
```



### 参数传递

当需要从主路由传递参数到嵌套的路由时，就涉及到父子路由的传参问题，包含两种方式：

 1. 路径匹配方式，类似于restful的路径参数

    修改路由注册规则为：

    ```
    path:"/order/list/:id",  #id为要传递的参数名称
    name:"OrderList",
    component:OrderList
    ```

    实际的路由应用修改为：

    ```
    <router-link to="/order/list/1">订单列表</router-link>
    ```

    这个时候id就和路径中的1进行匹配，可通过$route.params.id方式获取，**注意是$route**

    或者将应用路由规则修改为：

    ```
    <router-link :to="{name:'OrderList',params:{id:2}}">订单列表</router-link>
    ```

    其中name表示路由注册时指定的name，params表示要传递的参数

    

 2. props属性方式

    修改路由注册规则为：

    ```
    path:"/order/list",
    name:"OrderList",
    component:OrderList,
    props:true   #表示开启props式传参
    ```

    路由应用规则与上面第二种相同，但在子路由的vue界面中接收参数方式有所不同：

    ```
    <template>
      <div>
        订单列表id-{{id}}
      </div>
    </template>
    
    <script>
      export default{
        name:"OrderList",
        props:['id']   #在此规定参数
      }
    </script>
    ```

以上两种参数方式都可，但官方比较推荐使用props传参方式，更加的解耦，其它方式不在这里赘述。



### 404页面配置

当用户输入的路径不存在时，需要友好的进行页面提示,只需要将对应页面的路由注册为*，并写在路由的最后即可。

### axios

前后端分离时，前端只做数据的显示，其显示的数据就从后端而来，相信大家对于ajax都不默认，vue中建议使用axios进行异步请求。

首先需要在项目中下载：

```
npm install axios -s
```

main.js中配置axios：

```
import axios from 'axios'

Vue.prototype.$axios=axios
Vue.config.productionTip = false
// axios.default.withCredentials=true
```

axios也提供了各种类似于jq中ajax的api，可以参考https://www.jianshu.com/p/e107cecfa019

跨域问题，需要在后端配置跨域过滤器的相关信息

```
//在webconfigurer中配置
public void addCorsMappings(CorsRegistry registry) {
		// TODO Auto-generated method stub
		registry.addMapping("/**")
		.allowCredentials(true)
		.allowedOrigins("*")
		.allowedMethods(CorsConfiguration.ALL)
		.allowedHeaders(CorsConfiguration.ALL)
		.maxAge(3600);
}

//使用过滤器方式
@Bean
public CorsFilter corsFilter() {
		CorsConfiguration config=new CorsConfiguration();
		config.addAllowedOrigin("*");
		config.addAllowedMethod("*");
		config.setAllowCredentials(true);
		config.addAllowedHeader("*");
		config.setMaxAge(3600L);
		UrlBasedCorsConfigurationSource configSource=new UrlBasedCorsConfigurationSource();
		configSource.registerCorsConfiguration("/**", config);
		return new CorsFilter(configSource);
	}
```

vue项目配置代理，在config的index.js中

```
proxyTable: {
       '/api': {
              target: 'http://localhost:8090',  //代理地址
              changeOrigin: true,
              pathRewrite: {
                '^/api': ''    //代理前缀
              }
        }
    }
```



### 路由守卫

何为路由守卫？路由守卫有点类似于ajax的请求拦截器，就是请求发送之前先给你拦截住做一些事情之后再去发送请求，同样这里的路由守卫意思差不多；简单理解为就是你在进路由之前，首先把你拦住，对你进行检查；这是不是有点中学门口的保安？进来之前拦住，有学生证就进，没有学生证就不让进；当然，路由守卫不仅仅只是在你进入之前拦住你，还有其他的钩子函数进行其他操作；

vue-router一共给我们提供了三大类钩子函数来实现路由守卫：

　　　　**1、全局钩子函数**（beforeEach、afterEach)     一般用于控制权限，像什么进页面没有登录就跳登录页，需要用户达到什么级别才能访问当前页面都是属于页面权限控制，都是可以通过beforeEach钩子函数来实现

　　　　**2、路由独享的钩子函数**（beforeEnter） 路由独享顾名思义就是指定的路由才有这些钩子函数，通常这类路由独享的钩子函数我们是在路由配置文件中进行配置，只能设置改变前的钩子，不能设置改变后的钩子

　　　　**3、组件内钩子函数**（beforeRouterEnter、beforeRouterUpdate、beforeRouterLeave）

​				**beforeRouteEnter(to,from,next)：**

　　　　在路由进入前调用，因为此时的vue实例还没有创建，所以beforeEnter是唯一一个不能使用this的钩子函数；

　　　　 to:即将要进入的路由对象；

　　　　from：正要离开的路由对象；

　　　　next：路由控制参数

 

　　　　**beforeRouteUpdate(to,from,next):**

　　　　在路由发生修改的时候进行调用；

 

　　　　 to:即将要进入的路由对象；

　　　　 from：正要离开的路由对象；

　　　　 next：路由控制参数；



　　　　**beforeRouteLeave(to,from,next):**

　　　　在路由离开该组件时调用；

 　　　

　　　　 to:即将要进入的路由对象；

　　　　 from：正要离开的路由对象；

　　　　 next：路由控制参数

**注意：beforeRouteEnter因为触发的时候vue实例还没有创建，所以这个钩子函数中不能使用this，而beforeRouteUpdate和beforeRouteLeave都是可以访问到实例的，因为当这两个函数触发的时候实例都已经被创建了；**

全局钩子的简单应用，比如在进入到系统首页时必须要先登录，如果没有登录则回到登录页面：

首先登录成功时，要记录用户的登录状态，这里使用sessionStorage.setItem('isLogin',true)

接着在mian.js中配置全局的路由守卫：

```
router.beforeEach((to,from,next)=>{
  let isLogin=sessionStorage.getItem("isLogin");
  console.log(":::::"+isLogin);
  if(to.path=="/logout"){
    sessionStorage.clear();
    next({path:'/login'});
  }else if(to.path=='/login'){
    if(isLogin!=null){
      next({path:'/index'})
    }
  }else if(isLogin==null){
      next({path:'/login'})
  }
  next();
})
```

组件内钩子的简单应用：

```
<script>
  export default{
    name:"OrderList",
    beforeRouteEnter: (to,from,next) => {
      console.log("进入了订单列表页面！！");
      next(vm=>{//vm代表当前vue对象，相当于this
         //可在此调用一些验证方法
      });//代表放行，类似于java的过滤器
    },
    beforeRouteLeave: (to,from,next) => {
      console.log("离开了订单列表页面！！");
    }
  }
</script>
```





### vuex

sessionStorage/localStorage都是HTML5提供的保存数据的方式，但适合保存字符串，并不适合保存对象。而vuex 是一个专门为vue.js应用程序开发的状态管理模式。这个状态我们可以理解为在data中的属性，需要共享给其他组件使用的部分。

也就是说，是我们需要共享的data，使用vuex进行统一集中式的管理。

**vuex中，有默认的五种基本的对象：**

- state：存储状态（变量）
- getters：对数据获取之前的再次编译，可以理解为state的计算属性。我们在组件中使用 $sotre.getters.fun()
- mutations：修改状态，并且是同步的。在组件中使用$store.commit('',params)。这个和我们组件中的自定义事件类似。
- actions：异步操作。在组件中使用是$store.dispatch('')
- modules：store的子模块，为了开发大型项目，方便状态管理而使用的。这里我们就不解释了，用起来和上面的一样。

安装：

```
npm install vuex --save
```

配置：

```
import Vuex from 'vuex'
Vue.use(Vuex);
```

在src下新建文件夹store以及index.js

```
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
//保存公共数据
const state={
	user:{
		username:'',
		password:''
	}
}

//getter方法
const getters={
	getUser(state){
		return state.user;
	}
}

//setter方法
const mutations={
	updateUser(state,user){
		state.user=user
	}
}

//异步的setter方法
const actions={
	asyncUpdate(context,user){
		context.commit("updateUser",user);
	}
}

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions
})
```

main.js中配置

```
import store from './store'
new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
```

但是vue是一个单页面程序，当页面刷新时，所有的数据将会初始化，因此vuex中保存的数据也会初始化，那么解决方案当页面刷新时捕捉并把vuex数据存储在sessionStorage中，刷新完后判断sessionStorage是否有数据，如果有就取出来赋值给Vuex的参数。

App.vue中：

```
export default{
	name:'App',
	updated:{
		window.addEventListener('unload',this.saveState());
	}
	methods:{
		saveState(){
			sessionStorage.setItem('state',JSON.stringify(this.$stroe.state));
		}
	}
}
```

修改stroe/index.js

```
const state=sessionStorage.getItem('state')?JSON.parse(sessionStorage.getItem('state')):{
    user:{
            username:'',
            password:''
        }
}
```

## Vue3.0

### 环境配置及项目创建

环境配置，需要先将vue2.0携带，重新下载vue3.0环境

```
//卸载2.0
npm uninstall vue-cli -g
//安装3.0
npm install -g @vue/cli
```

项目创建

1. 利用webpack方式创建

```
vue create project_name
```

2. 利用vite创建

```
npm init vue@latest
```

vite 优势如下：

- 开发环境中，无需打包操作，可快速的冷启动。
- 轻量快速的热重载（HMR）。
- 真正的按需编译，不再等待整个应用编译完成。 传统 webpack 编译：每次执行编译时，都会通过入口 entry 先去找到各个路由，再去加载每个路由各自的模块，然后会进行打包成为 bundle.js 文件，最后才通知服务器热更新。所以换句话说就是等所有文件加载就绪之后才去渲染更新页面的==》较慢
- vite 编译：与传统构建不同的是，vite 会先准备好服务器更新，再去找到入口文件然后再动态的找到需要加载的路由去编译那个路由下的模块，类似于按需加载，总体体积较小且更新更快。

组合式 api(Composition API)

#### setup

它是 vue3 中一个新的配置项，值为一个函数。所有的组合 api 都要在它里面使用。

##### 使用介绍

1. 使用变量 或者事件 需要把名字 return 出去即可在模板中使用。

```js
export default {
  setup() {
    let name = 'zhang'
    function at() {
      console.log(1)
    }
    return {
      name,
      at,
    }
  },
}
```

1. setup 函数的两种返回值，一种就是上面常规返回一个对象，则对象中的属性、方法, 在模板中均可以直接使用，还有一种就是返回一个函数

```js
// 若返回一个渲染函数：则可以自定义渲染内容
import { h } from 'vue'
export default {
  setup() {
    return () => h('h1', '你好')
  },
}
```

1. 注意 vue3 虽然可以向下兼容 vue2，但是尽量不能混合使用。
2. Vue2.x 配置（data、methos、computed...）中可以访问到 setup 中的属性、方法
3. 但是由于 setup 中没有 this,所以 setup 中没办法读取 Vue2.x 配置中的数据和方法
4. 如果有重名, setup 优先

##### setup 的注意点

1. setup 执行的时机是最早的，在 beforeCreate 之前执行，所以此时 this 是 undefined
2. 参数问题 setup 接收 2 个参数

```bash
props：值为对象，包含：组件外部传递过来，且组件内部声明接收了的属性。

context：上下文对象
- attrs: 值为对象，包含：组件外部传递过来，但没有在props配置中声明的属性, 相当于 ```this.$attrs```。
- slots: 收到的插槽内容, 相当于 ```this.$slots```。
- emit: 分发自定义事件的函数, 相当于 ```this.$emit```
// 在子组件中
export default {
  props: ['msg', 'school'],
  emits: ['hello'],
  setup(props, context) {
    // props接收props配置项中的相应式数据{msg:'',school:''}
    // context相当于上下文对象，里面有三个值attrs，slots，emit
    //方法
    function test() {
      // 调用父组件方法
      context.emit('hello', 666)
    }
    return {
      test,
    }
  },
}
```

#### ref 函数

作用: 定义一个响应式的数据（主要针对基础类型数据） 方法：引入 ref 函数，const xxx = ref(initValue) 模板中读取数据: 不需要.value，直接：`<div>{{xxx}}</div>`

##### 处理基本数据类型

RefImpl 对象中.value 是基础类型时，用的是 Object.defineProperty 通过 get 和 set 实现的响应式数据

```js
import { ref } from 'vue'
export default {
  setup() {
    let name = ref('张三')
    function change() {
      console.log(name, 'name')
      //ref加工之后生成一个 RefImpl引用对象，该对象的原型对象上可以发现，底层其实还是Object.defineProperty通过
      // get 和set实现的响应式数据
      // 因此改变基本数据需要用到RefImpl引用对象中的value属性
      name.value = '小明'
    }
    return {
      name,
      change,
    }
  },
}
```

##### 处理对象类型

RefImpl 对象中.value 是对象时候，用的是 proxy 代理对象实现的响应式数据

```js
import { ref } from 'vue'
export default {
  setup() {
    let obj = ref({
      name: '小明',
      age: 20,
    })
    function change() {
      obj.value.name = '小工'
      obj.value.age++
      console.log(obj.value)
      //可以发现是一个Proxy 对象,其本质其实调用的是```reactive```函数实现Proxy代理响应式对象
    }
    return {
      obj,
      change,
    }
  },
}
```

#### reactive 函数

作用: 定义一个**对象类型**的响应式数据（基本类型不要用它，要用`ref`函数） 方法：`const x= reactive(源对象)`接收一个对象（或数组），返回一个代理对象（Proxy 的实例对象，简称 proxy 对象） 特点：可以实现数组、深层对象的响应式数据，这是 vue2.0 中无法实现的，底层基于 Proxy

```js
export default {
  setup() {
    let obj = reactive({
      name: '小明',
      age: 20,
    })
    function change() {
      console.log(obj, 'obj')
      //可以发现obj此时就是一个Proxy的实例对象可以直接修改对象内部属性
      obj.name = '小三'
      obj.age++
    }
    return {
      obj,
      change,
    }
  },
}
```

#### 总结 ref 和 reactive

1. 从定义数据角度对比
2. ref 用来定义：基本类型数据。
3. reactive 用来定义：对象（或数组）类型数据。
4. 备注：ref 也可以用来定义对象（或数组）类型数据, 它内部会自动通过`reactive`转为代理对象。
5. 从原理角度对比
6. ref 通过`Object.defineProperty()`的`get`与`set`来实现响应式（数据劫持）。
7. reactive 通过使用 Proxy 来实现响应式（数据劫持）, 并通过 Reflect 操作源对象内部的数据。

#### 计算属性与监视

##### computed函数

与Vue2.x中computed配置功能一致

```js
// 1.直接读取（简写）
import { reactive,computed } from 'vue'
export default {
  setup () {
    let obj = reactive({
      name: 'haha',
      age: 18
    })
    let ages = computed(() => {
      return obj.age + 1
    })
    return {
      ages
    }
  },
}
// 1.计算属性修改情况(完整版)
export default {
  setup () {
    let obj = reactive({
      name: 'haha',
      age: 18
    })
    let fullName = computed({
      get () {
        return obj.age + 1
      },
      set (value) {
        obj.age = value
      }
    })
    return {
      obj,
      fullName
    }
  },
}
```

##### watch函数

watch接收三个参数 监听的对象，监听的回调和监视的配置参数

```text
watch('被监听的对象'，()=>{},{immediate:'立即监听'，deep:'深度监听'})
export default {
  setup () {
    let age = ref(18)
    let name = ref('小明')
    let obj = reactive({
      money: 100
    })
    function change () {
      obj.money += 100
      age.value++
      name.value += '-'
    }
      //情况一：监视ref所定义的一个响应式数据
      watch(age, (newValue, oldValue) => {
        console.log('age', newValue, oldValue)
      }，{immediate:true})

     //情况二：监视ref所定义的多个响应式数据
      watch([age, name], (newValue, oldValue) => {
      console.log('age-name', newValue, oldValue)//也是数组形式返回
    })
    // 情况三：监视reactive所定义的一个响应式数据的全部属性
      watch(obj, (newValue, oldValue) => {
        // 如果监听的是正规响应式对象的话
                // 1.注意：此处无法正确的获取oldValue
                // 2.注意：强制开启了深度监视（deep配置无效）
    })
    // 情况四：监视reactive所定义的一个响应式数据中的某个属性
       watch(() => obj.money, (newValue, oldValue) => {
        // [()=>person.name,()=>person.age]多参数时候也需要数组
        // 监听的参数需要以函数的形式返回才可以监听到
        //当监听的参数是深层对象，需要配置deep为true
    })
    return {
      obj,
      name,
      age,
      change
    }
  },
}
```

##### watchEffect函数

不用指明监视哪个属性，监视的回调中用到哪个属性，那就监视哪个属性。 watchEffect有点像computed： - 但computed注重的计算出来的值（回调函数的返回值），所以必须要写返回值。 - 而watchEffect更注重的是过程（回调函数的函数体），所以不用写返回值。

```js
watchEffect(() => {
      let a = obj.money
      console.log('改变了')
      //默认是立即监听，当使用的数据改变时，就会触发。可以用于关联数据改变回调方法等场景
    })
```

#### 自定义hook函数

什么是hook： 本质是一个函数，把setup函数中使用的Composition API进行了封装。 特点：类似于vue2.x中的mixin 优势: 复用代码, 让setup中的逻辑更清楚易懂。

##### toRef和toRefs

创建一个 ref 对象，其value值指向另一个对象中的某个属性。 用法：const name = toRef(obj,'name') 要将响应式对象中的某个属性单独提供给外部使用时，便于简写。

```js
//  toRef生成一个对象，本质还是保持对其源对象属性的响应式连接。
export default {
  setup () {
    let obj = reactive({
      take: {
        money: 100,
      }
    })
    function change () {
      obj.take.money += 100
    }
    return {
      money: toRef(obj.take, 'money'),
      //注意：此处不能使用ref(obj.take, 'money'),一般情况下页面虽然效果一样，但是本质上修改的源对象不是reactive里面
      // 的obj,而是ref出来的一个新对象，不能使源obj响应式修改。
      change
    }
  },
}
```

toRefs的使用与toRef一样，不过是处理整个对象的所有属性，批量创建多个 ref 对象

```text
<template>
  <div>
    {{money}}
    {{age}}
    <button @click="change">改变 </button>
  </div>
</template>

<script>

import {  reactive, toRefs } from 'vue'
export default {
  setup () {
    let obj = reactive({
      money: 100,
      age: 18,
    })
    function change () {
      obj.money += 100
      obj.age++
    }
    console.log(toRefs(obj));//生成的是一个和obj源对象关联的处理对象集合
    return {
      ...toRefs(obj),
      change
    }
  },
}
</script>
```

##### shallowReactive 与 shallowRef

- shallowReactive：只处理对象最外层属性的响应式（浅响应式）。
- shallowRef：只处理基本数据类型的响应式, 不进行对象的响应式处理。
- 如果有一个对象数据，结构比较深, 但变化时只是外层属性变化 ===> shallowReactive。
- 如果有一个对象数据，后续功能不会修改该对象中的属性，而是生新的对象来替换 ===> shallowRef。

```js
export default {
  setup () {
    // 只会处理第一层属性
    let obj = shallowReactive({
      money: 100,
      age: 18,
      per:{
        name:'lili'
      }
    })
    // 此时不会响应式修改这个x对象
    let x = shallowRef({
                y:0
            })
    return {
      obj，
      x 
    }
  },
}
```

##### readonly 与 shallowReadonly

- readonly: 让一个响应式数据变为只读的（深只读）。
- shallowReadonly：让一个响应式数据变为只读的（浅只读）。
- 应用场景: 不希望数据被修改时。

##### toRaw 与 markRaw

1. toRaw 将一个由reactive生成的响应式对象转为普通对象 使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新。

```js
export default {
  setup () {
    let obj = reactive({
      money: 100,
      age: 18,
    })
    function change () {
      let p = toRaw(obj)
      //此时的p就是一个不具有响应式的原生对象，且只能针对reactive包装后的响应式对象
      p.money += 100
      p.age++
    }
    return {
      ...toRefs(obj),
      change
    }
  },
}
```

1. markRaw 标记一个对象，使其永远不会再成为响应式对象.
2. 有些值不应被设置为响应式的，例如复杂的第三方类库等。
3. 当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能

```js
export default {
  setup () {
    let obj = reactive({
      money: 100,
      age: 18,
      person: {}
    })
    function change () {
      // 当定义好的对象后面需要再加入新的属性时
      let person = { name: 'xixi', class: 'one' }
      // obj.person = person //此时也是响应式数据，如果当新增的数据对象非常复杂，只要求展示的时候，
      // 就要求不是响应式对象时 :
      obj.person = markRaw(person)
    }
    return {
      obj,
      ...toRefs(obj),
      change
    }
  },
}
```

##### customRef

创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制。它需要一个工厂函数，该函数接收 track 和 trigger 函数作为参数，并且应该返回一个带有 get 和 set 的对象.

使用自定义 ref 通过 v-model 实现 debounce(防抖) 的示例

```text
<template>
    <input type="text" v-model="keyWord">
    <h3>{{keyWord}}</h3>
</template>

<script>
    import {ref,customRef} from 'vue'
    export default {
        name: 'App',
        setup() {
            //自定义一个ref——名为：myRef
            function myRef(value,delay){
                let timer
                return customRef((track,trigger)=>{
                    return {
                        get(){
                            console.log(`有人从myRef这个容器中读取数据了，我把${value}给他了`)
                            track() //通知Vue追踪value的变化（提前和get商量一下，让他认为这个value是有用的）
                            return value
                        },
                        set(newValue){
                            console.log(`有人把myRef这个容器中数据改为了：${newValue}`)
                            clearTimeout(timer)
                            timer = setTimeout(()=>{
                                value = newValue
                                trigger() //通知Vue去重新解析模板
                            },delay)
                        },
                    }
                })
            }

            // let keyWord = ref('hello') //使用Vue提供的ref
            let keyWord = myRef('hello',500) //使用程序员自定义的ref

            return {keyWord}
        }
    }
</script>
```

#### 响应式数据的判断

- isRef: 检查一个值是否为一个 ref 对象
- isReactive: 检查一个对象是否是由 `reactive` 创建的响应式代理
- isReadonly: 检查一个对象是否是由 `readonly` 创建的只读代理
- isProxy: 检查一个对象是否是由 `reactive` 或者 `readonly` 方法创建的代理

#### Composition API 的优势

##### Options API 存在的问题（vue2）

传统OptionsAPI中，实现一个需求，就需要分别在data，methods，computed里修改，当代码量巨大逻辑复杂时，就会造成代码难以维护和查找。

##### Composition API 的优势（vue3）

可以更加优雅的组织的代码，函数。让相关功能的代码更加有序的组织在一起，更加有逻辑性可读性

### 新的内置组件

#### Fragment

- 在Vue2中: 组件必须有一个根标签
- 在Vue3中: 组件可以没有根标签, 内部会将多个标签包含在一个Fragment虚拟元素中
- 好处: 减少标签层级, 减小内存占用

#### Teleport

`Teleport` 是一种能够将我们的**组件html结构**移动到指定位置的技术

需要 prop，必须是有效的查询选择器或 HTMLElement (如果在浏览器环境中使用)。指定将在其中移动 内容的目标元素

请注意，这将移动实际的 DOM 节点，而不是被销毁和重新创建，并且它还将保持任何组件实例的活动状态。

```text
<teleport to="#some-id" />
<teleport to=".some-class" />
<teleport to="[data-teleport]" />

<teleport to="移动位置">
    <div v-if="isShow" class="mask">
        <div class="dialog">
            <h3>我是一个弹窗</h3>
            <button @click="isShow = false">关闭弹窗</button>
        </div>
    </div>
</teleport>
```

### 其他改动

1. 全局API的转移
2. 将全局的API，即：`Vue.xxx`调整到应用实例（`app`）上

| 2.x 全局 API（Vue）      | 3.x 实例 API (app)          |
| ------------------------ | --------------------------- |
| Vue.config.xxxx          | app.config.xxxx             |
| Vue.config.productionTip | 移除                        |
| Vue.component            | app.component               |
| Vue.directive            | app.directive               |
| Vue.mixin                | app.mixin                   |
| Vue.use                  | app.use                     |
| Vue.prototype            | app.config.globalProperties |

1. 其他改动
2. **移除**keyCode作为 v-on 的修饰符，同时也不再支持`config.keyCodes`
3. **移除**`v-on.native`修饰符
4. 父组件中绑定事件
   `vue <my-component v-on:close="handleComponentEvent" v-on:click="handleNativeClickEvent" />`
5. 子组件中声明自定义事件
   `vue <script> export default { emits: ['close'] } </script>`
6. **移除**过滤器（filter）

> 过滤器虽然这看起来很方便，但它需要一个自定义语法，打破大括号内表达式是 “只是 JavaScript” 的假设，这不仅有学习成本，而且有实现成本！建议用方法调用或计算属性去替换过滤器。

### ElementPlus

安装Element-plus

```
npm install element-plus
```

#### 全局引入

```
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App).use(ElementPlus).mount("#app")
```

在全局导入所有组件，避免在单独的页面或组件导入

```
import {
  ElButton,
  ElTable,
  ElAlert,
  ElAside,
  ElAutocomplete,
  ElAvatar,
  ElBacktop,
  ElBadge,
} from 'element-plus'

const app = createApp(App)

const components = [
  ElButton,
  ElTable,
  ElAlert,
  ElAside,
  ElAutocomplete,
  ElAvatar,
  ElBacktop,
  ElBadge
]

for (const cpn of components) {
  app.component(cpn.name, cpn)
}
```

#### 自动引入

直接自动导入所有的样式及组件，先安装插件

```
npm install -D unplugin-vue-components unplugin-auto-import
```

配置vue.config.js

```
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');
module.exports = {
  configureWebpack: {
    //配置webpack自动按需引入element-plus，
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
};
```

### Vue-router

vue-router有三个概念 route, routes, router。

1、route，一条路由，它是单数，点击内容后跳转到指定内容，home按钮 => home内容， 这是一条route, about按钮 => about 内容， 这是另一条路由。

2、routes ，一组路由，所有路由组合形成的一个数组。
[ {home 按钮 =>home内容 }， { about按钮 => about 内容} ]

3、router 是一个机制，相当于一个管理者，来管理路由。
routes 只是定义了一组路由，它放在那里是静止的，当请求来了，怎么办？ 就是当用户点击home按钮的时候，怎么办？这时router会到routes 中去查找，去找到对应的 home内容，所以页面中就显示了 home内容。

**使用插件的方式也不再是通过`Vue.use`进行注册，而是转化为直接通过创建的实例注册**，就像下面这样

```js
/** Vue3.0版本 */
import { createApp } from 'vue'
import { router } from './router/index'

const app = new createApp({})
app.use(router) // 这里通过app.use方式注册插件
app.mount('#app')
```

在Vue Router4升级后，**`VueRouter`原型也不再直接暴露出来，转而使用`createRouter`的方法来创建router。除此之外，也将不再通过指定`mode`的值来指定路由模式，而是转而使用`history`字段的函数赋值方式**。

```js
/** Vue Router4.x版本 */
import { createRouter, createWebHistory } from 'vue-router'
import AComponent from './a.vue'
import BComponent from './b.vue'

const routes = [
  {
    path: '/a',
    component: AComponent,
  },
  {
    path: '/b',
    component: BComponent,
  }
]

const router = new createRouter({
  history: createWebHistory(), // history为必填项
  routes,
})

export {
    router
}
```

路由方式目前已经通过`history`来进行指定了。不同路由的创建方式如下：

- **history**: createWebHistory()
- **hash**: createWebHashHistory()
- **abstract**: createMemoryHistory()

#### 页面跳转

```
HTML中router-link跳转路径并传递参数
<router-link :to="{name:'deptInfo',params:{user:encodeURIComponent(arr)}}">部门信息</router-link>  //name表示路径，params表示参数
 
JS中利用router对象的push方法跳转页面并传递参数
 import { useRouter } from "vue-router";
 const router = useRouter();
 
 //带参数查询
 router.push({
        path: "/fapiao/request/insert",
        query: {
            id: 1,   //id传递参数
            contractid: 2   //contractid传递参数
        }
    });
 
//命名路由
 router.push({
        name: "/fapiao/request/insert",
        params: {
            id: 1,   //id传递参数
            contractid: 2   //contractid传递参数
        }
 });
```

#### 接收参数

```
//方法路由接收值
import { useRoute } from 'vue-router'
 
 const router = useRoute();
方法一：query
 const tuanduiId = router.query.id;   
 const hetongId = router.query.contractid;   
 
 方法二：params
 const tuanduiId = router.params.id;   
 const hetongId = router.params.contractid;  
```

### axios

安装：

```
npm install -s axios
```

在需要请求的地方引入：

```
import axios from 'axios'
```

应用：

```
axios.get("地址").then(res=>{处理代码})
```

但在正式开发中需要有各种请求头信息以及多种api方法对应后端的接口，因此有必要封装，首先在src下新建文件夹http

config.ts

```
// 管理后台公共接口地址
const serviceConfig = {
    // baseURL:"http://localhost:880",// mock
    // baseURL: "http://0.0.0.0:3001",// 后端接口地址
    baseURL:"/apis",// 跨域代理（跨域代理需要配置）
    useTokenAuthorization: false,
    // OtherContentType : "application/json; charset=UTF-8", 
    // ContentType : "application/x-www-form-urlencoded"
}
export default serviceConfig;
```

httpServer.ts

```
import axios from 'axios'
import serverConfig from './config'
// import { ElLoading, ElMessage } from 'element-plus'// 引入loading 
//使用axios下面的create([config])方法创建axios实例，其中config参数为axios最基本的配置信息。
const serviceRequest = axios.create({
	baseURL: serverConfig.baseURL, //请求后端数据的基本地址，自定义
	timeout: 200000,               //请求超时设置，单位ms
	withCredentials: true, // 异步请求携带cookie
	headers: {
		// 设置后端需要的传参类型
		'Content-Type': 'application/json',
		// 'token': '',
		'X-Requested-With': 'XMLHttpRequest',
	}
})
let loading: any;
function start() {
	// loading = ElLoading.service({
	// 	lock: true,
	// 	text: 'Loading',
	// 	background: 'rgba(0, 0, 0, 0.7)',
	// })
}
declare module 'axios' {
	interface AxiosInstance {
		(config: AxiosRequestConfig): Promise<any>
	}
}

// loading.close()
// 添加请求拦截器
serviceRequest.interceptors.request.use(
	function (config:any) {
		// 在发送请求之前做些什么
		// if (config.url !== '/api/traceline/data' && config.url.indexOf('/api/file/list') == -1) {
		// 	start();
		// }
		// if (config.url == '/api/file/upload') {
		// 	config.headers['Content-Type'] = 'multipart/form-data'
		// }
		return config
	},
	function (error) {
		// 对请求错误做些什么
		return Promise.reject(error)
	}
)

// 添加响应拦截器
serviceRequest.interceptors.response.use(
	function (response) {
		// 2xx 范围内的状态码都会触发该函数。
		// 对响应数据做点什么
		// dataAxios 是 axios 返回数据中的 data
		// loading.close()
		const dataAxios = response.data
		// 这个状态码是和后端约定的
		const code = dataAxios.reset
		return dataAxios
	},
	function (error) {
		// 超出 2xx 范围的状态码都会触发该函数。
		// 对响应错误做点什么
		// loading.close()
		if (error.config.url.indexOf('/api/file/list') == -1) {
			// ElMessage.error(error.response.data.message)
		}

		return Promise.reject(error)
	}
)

//导出我们建立的axios实例模块，ES6 export用法
export default serviceRequest
```

新建apis文件夹用于存放单个模块的api方法,如：testapi.ts

```
import serviceRequest from '../httpServer'

export const demoapi=(param:any)=>{
	return serviceRequest({
		url:"/test",
		method:"post",
		data:param
	})
}
```

前后端分离项目必须在vue.config.js中配置跨域：

```
module.exports = {
	devServer: {
	        proxy: {
	            '/apis': {
	                target: 'http://localhost:8080/demo', //接口域名
	                changeOrigin: true,             //是否跨域
	                ws: true,                       //是否代理 websockets
	                secure: false,                   //是否https接口
	                pathRewrite: {                  //路径重置
	                    '^/apis': ''
	                }
	            }
	        }
	    }
}
```

