type Listener = (data: any) => void;
const listeners: Listener[] = [];
let ws: WebSocket | null = null;
let reconnectTimer: any = null;

const getWSUrl = () => {
    const apiBase = import.meta.env.VITE_API_URL || 'syncheart-backend-production.up.railway.app';
    const cleanUrl = apiBase.replace('https://', '').replace('http://', '');
    return (apiBase.includes('localhost') ? 'ws://' : 'wss://') + cleanUrl;
};

const connectWS = () => {
    if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) return;

    ws = new WebSocket(getWSUrl());

    ws.onmessage = (e) => {
        try {
            const data = JSON.parse(e.data);
            listeners.forEach(l => l(data));
        } catch (err) {
            console.error(err);
        }
    };

    ws.onclose = () => {
        clearTimeout(reconnectTimer);
        reconnectTimer = setTimeout(connectWS, 2000);
    };

    ws.onerror = () => ws?.close();
};

// Initialize connection
connectWS();

export const subscribeToWS = (callback: Listener) => {
    listeners.push(callback);
    return () => {
        const index = listeners.indexOf(callback);
        if (index > -1) listeners.splice(index, 1);
    }
};

export const sendWS = (data: any) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(data));
    } else {
        // Queue the message or try reconnecting
        connectWS();
        const checkReady = setInterval(() => {
            if (ws && ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify(data));
                clearInterval(checkReady);
            }
        }, 100);
        // Timeout queue
        setTimeout(() => clearInterval(checkReady), 5000);
    }
};
