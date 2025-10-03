# Axios

## 1axios.get与axios.post发送ajax

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script crossorigin="anonymous" src="https://cdn.bootcdn.net/ajax/libs/axios/1.5.0/axios.min.js"></script>
</head>

<body>
</body>
<button>get</button>
<button>post</button>
<button>ajax</button>
<script>
    const btn = document.querySelectorAll('button')
    // 配置baseURL
    axios.defaults.baseURL = 'http://127.0.0.1:8000'
    btn[0].onclick = function () {
        axios.get('/axios', {
            // 请求参数
            params: {
                id: 100,
                name: '牛比'
            },
            // 请求头信息
            headers: {
                name: 'content',
                age: 11
            }
        }).then((result) => {
            console.log(result);
        }).catch((err) => {

        });
    }
    btn[1].onclick = function () {
        axios.post('/axios',{
            username: 'admin',// 请求体
            psd: '123'
        }, {
            params: {
                id: 101,
                name: 'hhhhhhh'
            },
            headers: {
                height: 188
            },
        })
    }
</script>
</html>
```

发送get请求参数为:URL,请求行,请求头

发送post请求参数为:URL,请求行,请求体,请求头

## 2直接axios发ajax

```js
btn[2].onclick = function (){
        axios({
            method:'post',
            // url
            url:'/axios',
            params:{
                vip:10//指定路径中的查询字符串
            },
            headers:{
                a:999999
            },
            data:{
                username:"admin",
                psd:"123"
            },
          signal//用来终止请求,和fetch一样
          timeout:1000,//过期时间
          transformRequest:[function (data,headers){
                data.name = 'aaa'
                headers['Content-Type']='application/json'
                return data
            },function (data,headers){
                // 会拿到上一步返回的结果
                // 最后一个函数必须返回一个字符串
                console.log(data);
                return JSON.stringify(data)
            }]
            //transformRequest可以用来处理请求数据data
            // 它需要一个数组作为参数,数组可以接收多个函数,请求发送时doge函数会按照顺序执行
            // 函数在执行时,接受两个参数data和headers
        }).then(res=>{
            console.log(res.status);//状态码
            console.log(res.statusText);//状态字符串
            console.log(res.headers);//响应头信息
            console.log(res.data);//响应体
        })
    }
```

### 跟fetch的区别

- 不需要写请求头content-type:application/json,会自动指定
- 读结果时会自动转换数据,不需要调用response.json
- 不是只要响应返回就会走then,而是2xx的状态码会走then

### Axios实例及拦截器

可以对请求或响应拦截,在请求发送前和响应读取前处理数据

```js
import axios from 'axios';

// 创建一个 Axios 实例
const instance = axios.create({
  baseURL: 'http://example.com/api',
});

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 发送请求
instance.get('/user')
  .then(response => {
    // 处理响应数据
    console.log(response.data);
  })
  .catch(error => {
    // 处理请求错误
    console.log(error);
  });
```

