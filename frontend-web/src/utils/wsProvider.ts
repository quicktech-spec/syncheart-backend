export const ws = new WebSocket('ws://localhost:8080');

type Listener = (data: any) => void;
const listeners: Listener[] = [];

ws.onmessage = (e) => {
    try {
        const data = JSON.parse(e.data);
        listeners.forEach(l => l(data));
    } catch (err) {
        console.error(err);
    }
};

export const subscribeToWS = (callback: Listener) => {
    listeners.push(callback);
    return () => {
        const index = listeners.indexOf(callback);
        if (index > -1) listeners.splice(index, 1);
    }
};

export const sendWS = (data: any) => {
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(data));
    } else {
        ws.addEventListener('open', () => {
            ws.send(JSON.stringify(data));
        }, { once: true });
    }
};
