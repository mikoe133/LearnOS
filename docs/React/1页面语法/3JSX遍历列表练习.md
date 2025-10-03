```jsx
const data = ["Augaular","React","Vue"]
const VDOM = (
    <div>
        <h1>前端js框架列表</h1>
        <ul>
            {
                data.map(function (item,index){
                    return <li key={index}>{item}</li>
                })
            }
        </ul>
    </div>
)
```

