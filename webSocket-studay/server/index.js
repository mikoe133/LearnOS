const ws = require('ws');

((ws) => {
    const server = new ws.Server({ port: 8000 });

    const init = () => {
        bindevent();
    }

    // 绑定事件函数
    function bindevent() {
        // 监听listening事件，触发handleopen函数
        server.on('listening', handleopen);
        // 监听close事件，触发handclose函数
        server.on('close', handclose);
        // 监听error事件，触发handleerror函数
        server.on('error', handleerror);
        // 监听connection事件，触发handleconnection函数
        server.on('connection', handleconnection);
    }

    // 处理listening事件函数
    function handleopen() {
        console.log('Server is running on port 8000');
    }

    // 处理close事件函数
    function handclose() {
        console.log('Server is closed');
    }

    // 处理error事件函数
    function handleerror(error) {
        console.log('Error occurred:', error.message);
        // 关闭连接
        // ws.terminate()
    }

    // 处理connection事件函数
    function handleconnection(ws) {
        console.log('New client connected');
        // 监听message事件，触发handlemessage函数
        ws.on('message', handlemessage);
    }

    // 处理message事件函数
    function handlemessage(data) {
        if (data.JSON.parse().type === 'heartbeat') {
            ws.send('pong')
        } else {
            console.log(data.toString());
            server.clients.forEach(function each(client) {
                if (client.readyState === ws.OPEN) {
                    client.send(data.toString());
                }
            });
        }
    }

    // 初始化函数
    init();
})(ws);