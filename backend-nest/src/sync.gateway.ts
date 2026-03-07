import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
    MessageBody,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
    transports: ['websocket', 'polling'],
})
export class SyncGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private connectedClients = new Map<string, string>(); // socketId -> userId

    handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        this.connectedClients.delete(client.id);
        console.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('register')
    handleRegister(@MessageBody() data: { userId: string }, @ConnectedSocket() client: Socket) {
        if (data.userId) {
            this.connectedClients.set(client.id, data.userId);
            client.join(`user:${data.userId}`);
            console.log(`User ${data.userId} registered on socket ${client.id}`);
        }
    }

    @SubscribeMessage('message')
    handleBroadcast(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        // Broadcast to all except sender
        client.broadcast.emit('message', data);
        // Also send to specific partner room if partnerId specified
        if (data.partnerId) {
            this.server.to(`user:${data.partnerId}`).emit('message', data);
        }
    }

    // Allow server-side code to emit to a specific user
    emitToUser(userId: string, event: string, data: any) {
        this.server.to(`user:${userId}`).emit(event, data);
    }
}
