1<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<style>
		.box1{
			width: 100px;
			height: 100px;
			background-color: #e8e7e3;
		}
		.box2{
			width: 50px;
			height: 50px;
			background-color: #3f3f3f;
			margin-top: 50px;
		}
		.clearfix::before,.clearfix::after{
			content: '';
			display: table;
			clear: both;
		}
	</style>
	<body>
		<div class="box1 clearfix">
			<div class="box2"></div>
		</div>
	</body>
</html>
clearfix是最终方案，既可以解决高度塌陷或者重叠问题，只需记住clearfix代码