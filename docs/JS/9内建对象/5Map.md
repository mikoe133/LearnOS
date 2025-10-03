#### Map

- 用来存储键值对结构的数据(key-value)
- 对象中存储的数据就是一种键值对结构
- Map和Object的主要区别:
  - Object中的属性名只能是字符串或符号
  - Map中任何类型的值都可以称为数据的key

```js
const map = new Map()
map.set("name","孙悟空")//存数据
map.get("name")
```

##### 创建

- new Map()

##### 属性和方法

- map.size()获取map中键值对的数量
- map.set(key,value)向map中添加键值对
- map.get(key)根据key获取值
- map.delete(key)删除指定数据
- map.has(key)检查map中是否包含指定键
- map.clear()删除全部键值对
- map.keys()获取map的所有key
- map.values()获取map的所有value

#### 将map转换为数组

```js
const arr = Array.from(map) 
//或者
const arr = [...map] //[["name","孙悟空"],["age",18]
```

#### Map创建二维数组

```js
const map2 = new Map([["name","猪八戒"],["age",18],[{},()=>{}]])
```

#### 遍历map

```js
for(const entry of map){
	console.log(entry)
}
```

#### 遍历map并拿取其中的值

```js
for(const entry of map){
	const [key,value] = entry
  console.log(key,value)
}
```

```js
map.forEach((key,value)=>{
	  console.log(key,value)
})
```

