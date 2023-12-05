import { OnGatewayConnection, OnGatewayInit } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Socket } from 'socket.io';
import { AuthService } from '../auth/auth.service';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayInit {
    private readonly authService;
    server: Server;
    constructor(authService: AuthService);
    afterInit(server: Server): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handlePersonalMessage(data: {
        to: string;
        message: string;
    }, sender: Socket): void;
}
