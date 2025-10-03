#### Location表示浏览器的地址栏信息

- 可以直接讲Location的值修改为一个新的地址,会使网页跳转
- Location.href 可以获取当前地址
- Location.assign()跳转新地址
- Location.replace()跳转新地址.(无法通过回退按钮回退)
- Location.reload()刷新页面
  - 可以传true 强制清空缓存