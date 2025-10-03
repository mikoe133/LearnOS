# fetch

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <button>ajax</button>
    <script>
        let btn = document.querySelector('button')
        btn.onclick = function (){
            fetch('http://127.0.0.1:8000/fetch',{
                method:'post',
                headers:{
                    name:"asdsa"
                },
                body:'username=admin&psd=123'//可以是对象或字符串
            }).then(res=>{
                return res.json()
            }).then(res=>{
                console.log(res);
            })
        }
    </script>
</body>
</html>
```

fetch取消请求

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <button>ajax</button>
    <script>
        let btn = document.querySelector('button')
        btn.onclick = function (){
            const controller = new AbortController()
            setTimeout(()=>{
                controller.abort()
            },3000)
            fetch('http://127.0.0.1:8000/fetch',{
                signal:controller.signal,
                method:'post',
                headers:{
                    name:"asdsa"
                },
                body:'username=admin&psd=123'//可以是对象或字符串
            }).then(res=>{
                return res.json()
            }).then(res=>{
                console.log(res);
            })
        }
    </script>
</body>
</html>
```

async await方法

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <button>ajax</button>
    <script>
        let btn = document.querySelector('button')
        btn.onclick = async function (){
            const controller = new AbortController()
            setTimeout(()=>{
                controller.abort()
            },3000)
            try {
                const response = await fetch('http://127.0.0.1:8000/fetch', {
                    signal: controller.signal,
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json', // 设置内容类型为 JSON
                    },
                    body: JSON.stringify({ username: 'admin', psd: '123' }) // 将对象转换为 JSON 字符串
                });
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Error:', error);
            }
        }
    </script>
</body>
</html>
```

