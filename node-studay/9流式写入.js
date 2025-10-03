const fs = require("fs")
const ws =fs.createWriteStream('./薛屹阳的流式写入内容.txt')
ws.write('第一条内容\r\n');
ws.write('第二条内容\r\n');
ws.write('第三条内容\r\n');
ws.close()