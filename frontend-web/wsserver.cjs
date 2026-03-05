const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
    console.log("Client connected");
    ws.on('error', console.error);

    ws.on('message', function message(data) {
        console.log('received: %s', data);
        // Broadcast to all other clients
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === 1) { // 1 is ws.OPEN
                client.send(data);
            }
        });
    });
});

console.log("Local WebRTC Signaling Server running on ws://localhost:8080");
