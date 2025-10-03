// open message error close
((doc, loc, location) => {
    // 获取列表，消息框，发送按钮
    const olist = doc.querySelector("#list")
    const omsg = doc.querySelector('#message')
    const osend = doc.querySelector('#send')
    // 创建WebSocket连接
    let ws = new WebSocket('ws://localhost:8000')
    // 保存用户名
    let username = ''
    // 初始化
    const init = () => {
        // 绑定事件
        bindevent()
    }
    // let handlesendbtnclick
    // 绑定事件
    function bindevent() {
        // 绑定发送按钮点击事件
        osend.addEventListener('click', handlesendbtnclick, false)
        // 绑定WebSocket打开事件
        ws.addEventListener('open', handleopen, false)
        // 绑定WebSocket消息事件
        ws.addEventListener('message', handlemessage, false)
        // 绑定WebSocket关闭事件
        ws.addEventListener('close', handleclose, false)
        // 绑定WebSocket错误事件
        ws.addEventListener('error', handleerror, false)
    }
    // 处理发送按钮点击事件
    function handlesendbtnclick() {
        console.log('sendmessage');
        // 获取消息框中的消息
        const msg = omsg.value
        // 判断消息是否为空
        if (msg.trim().length < 0) {
            return
        }
        // 发送消息
        ws.send(JSON.stringify({
            user: username,
            datetime: new Date().getTime(),
            message: msg
        }))
        // 清空消息框
        omsg.value = ''
    }
    // 处理WebSocket打开事件
    function handleopen(e) {
        console.log('websocket open', e);
        // 获取用户名
        username = loc.getItem('username')
        // 判断用户名是否为空
        if (!username) {
            // 跳转到登录页面
            location.href = '/entry.html'
            return
        }
        // 发送心跳消息
        heartbeatInterval = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({type: 'heartbeat'}));
            }else{
                reconnect()
            }
        }, 50000); // 每隔50秒发送一次心跳消息
    }
    function reconnect(){
        let reconnecttimeout
        clearInterval(reconnecttimeout)
        setTimeout(() => {
            console.log('重连中');
            ws = new WebSocket('ws://localhost:8080');
        },1000)
    }
    // 处理WebSocket消息事件
    function handlemessage(e) {
        console.log('websocket message', e);
        if(e.data==='pong'){
            clearInterval(heartbeatInterval)
            heartbeatInterval = setInterval(() => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send('heartbeat');
                }else{
                    reconnect()
                }
            }, 50000); // 每隔50秒发送一次心跳消息
        }
        const msgdata = e.data
        console.log("msgdata~~~~", msgdata);
        olist.appendChild(createListItem(msgdata))

    }
    function createListItem(m) {
        console.log('m~~~', m);
        const { user, datetime, message } = JSON.parse(m)
        console.log(user, datetime, message);
        const oItem = doc.createElement('li')
        oItem.innerHTML = `
        <div class="user">
            <span>${user}</span>
            <span>时间:${new Date(datetime)}</span>
            <span>消息:${message}</span>
        </div>
        `
        return oItem
    }
    // 处理WebSocket关闭事件
    function handleclose(e) {
        console.log('websocket close', e);
        clearInterval(heartbeatInterval);
    }
    // 处理WebSocket错误事件
    function handleerror(e) {
        console.log('websocket error', e);
    }
    // 初始化
    init()
})(document, localStorage, location)