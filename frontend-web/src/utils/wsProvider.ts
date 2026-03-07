// Real-time sync provider using Socket.IO
// Connects to the production backend WebSocket gateway

type Listener = (data: any) => void;
const listeners: Listener[] = [];

let socket: any = null;
let reconnectTimer: any = null;

const getWsUrl = () => {
    const api = import.meta.env.VITE_API_URL || 'https://syncheart-backend-production.up.railway.app';
    return api; // Socket.IO uses the same base URL
};

const connectWS = () => {
    if (socket && socket.connected) return;

    // Dynamically import socket.io-client to avoid bundle issues
    import('socket.io-client').then(({ io }) => {
        if (socket) {
            socket.disconnect();
        }
        socket = io(getWsUrl(), {
            transports: ['websocket', 'polling'],
            reconnection: true,
            reconnectionAttempts: Infinity,
            reconnectionDelay: 2000,
        });

        socket.on('connect', () => {
            console.log('🔗 SynchHeart WS connected');
            // Register self
            const store = (window as any).__SYNCHEART_STORE__;
            if (store?.profile?.id) {
                socket.emit('register', { userId: store.profile.id });
            }
        });

        socket.on('message', (data: any) => {
            listeners.forEach(l => l(data));
        });

        socket.on('disconnect', () => {
            console.log('WS disconnected');
        });

        socket.on('connect_error', (err: any) => {
            console.warn('WS connect error:', err.message);
        });
    }).catch(err => {
        console.warn('socket.io-client not available, WS disabled:', err);
    });
};

// Initialize
connectWS();

export const subscribeToWS = (callback: Listener) => {
    listeners.push(callback);
    return () => {
        const index = listeners.indexOf(callback);
        if (index > -1) listeners.splice(index, 1);
    };
};

export const sendWS = (data: any) => {
    if (socket && socket.connected) {
        socket.emit('message', data);
    } else {
        // Queue and retry
        connectWS();
        const checkReady = setInterval(() => {
            if (socket && socket.connected) {
                socket.emit('message', data);
                clearInterval(checkReady);
            }
        }, 200);
        setTimeout(() => clearInterval(checkReady), 5000);
    }
};

export const registerUserWS = (userId: string) => {
    if (socket && socket.connected) {
        socket.emit('register', { userId });
    }
};
