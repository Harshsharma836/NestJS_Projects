import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Socket } from 'socket.io';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
    server: Server;
    afterInit(server: Server): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleMessage(data: string, client: Socket): void;
}
