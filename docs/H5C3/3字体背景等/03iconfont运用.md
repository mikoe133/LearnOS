<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<link rel="stylesheet" href="../iconfont.css">
		<style>
			i.iconfont{
				font-size: 100px ;
			}
			p::before{
				content: '\e84b';
				font-family: 'iconfont';
				font-size: 50px;
			}
		</style>
	</head>
	<body>
		<i class="iconfont">&#xe84c;</i>
		<i class="iconfont icon-github"></i>
		<p>hello</p>
	</body>
</html>
1.先将阿里图标字体库中的图标添加进购物车
2.加入一个自己的项目
3.将项目下载解压
4.所有安装包移入自己的项目(link引入时要引入iconfont的文件)
5.将class内容写成iconfont引入图标字体
6.将标签内容写具体图标标号
7.修改样式通过  标签.iconfont来设置

5.或者将class内容写成iconfront icon-github

5.或是运用伪元素选择器，设置content为\➕编码
6.设置font-family为iconfont
