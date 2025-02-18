const WebSocket  = require('ws')

const PORT = 8082 // 定义服务器运行的端口号
const wss = new WebSocket.Server({port: PORT}) 

const userLists = {} // 用户列表

wss.on('connection', (ws, req) => {
    console.log(`当前连接数：${wss.clients.size}`) 
    // console.log(req.connection.remoteAddress)
    // console.log(req.headers['sec-websocket-key'])
    let user = req.url.substr(1)
    userLists[user] = ws

    console.log(req.url.substr(1))
    ws.on('message', res => {
        console.log(`[SERVER] Received: ${res}`)
        broadCast(wss.clients, res, ws)
        // ws.send(res)
    })

    ws.on('close', res => {
        console.log('退出连接')
    });
})

// 定义广播方法
/**
 * @param {Set} clientLists    广播成员列表
 * @param {String} data        广播的数据
 * @param {Object(ws)} itself  是否包含自己，传入ws
 */
const broadCast = (clientLists, data, itself=null) => {
    clientLists.forEach(function each(client) {
        if (client !== itself && client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    })
}

console.log(`WebSocket 运行在 ${PORT}`)
