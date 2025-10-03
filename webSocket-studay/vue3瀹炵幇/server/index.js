// const express = require('express');
// const app = express();

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.listen(3000, () => {
//   console.log('Server listening on port 3000');
// });
const WebSocket = require('ws');
; ((ws) => {
    const server = new WebSocket.Server({ port: 8000 });
    const init = () => {
        bindEvent()
    }
    function bindEvent() {
        server.on('connection', function connection(ws) {
            console.log('BE:连接');
            ws.on('message', function incoming(message) {
                console.log('BE:收到消息', message);
                console.log(JSON.parse(message));
                console.log(JSON.stringify(message));
                console.log(JSON.stringify(JSON.parse(message)));
                server.clients.forEach(function each(client) {
                    client.send(JSON.stringify(JSON.parse(message)));
                },{binary:false})
            });
        });
        server.on('close', function close(ws) {
            console.log('BE:关闭');
        });
        server.on('error', function error(err) {
            console.log('BE:错误',err);
        });
        server.on('listening', function listening(ws) {
            console.log('BE:listening');
        });

    }
    init()

})(WebSocket)