const ws = require('ws');
; ((ws) => {
    const server = new ws.Server({ port: 8000 });
    const init = () => {
        bindevent()
    }
    function bindevent() {
        server.on('listening', (ws) => {
            console.log('BE:listening')
        })
        server.on('error', (err) => {
            console.log('BE:error', err)
        })
        server.on('close', (ws) => {
            console.log('BE:close')
        })
        server.on('connection', (ws) => {
            console.log('BE:connection')
            ws.on('message', (message) => {
                console.log(message);
                console.log('BE:message', JSON.parse(message))
                console.log(JSON.stringify(JSON.parse(message)));
                // ws.send(message)
                // console.log( ' server.clients',server.clients);
                server.clients.forEach(function each(client) {
                    client.send(JSON.stringify(JSON.parse(message)));
                })
            })
            // ws.on('close', (ws) => {
            //     console.log('BE:close')
            // })
        })
    }

    init()
})(ws);