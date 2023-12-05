// src/chat/chat.gateway.ts
import { SubscribeMessage, MessageBody, ConnectedSocket, WebSocketGateway, OnGatewayConnection, WebSocketServer, OnGatewayInit } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayInit {
  @WebSocketServer()
  server: Server;

  constructor(private readonly authService: AuthService) {}

  afterInit(server: Server) {
    Logger.log('Initialized');
  }

  handleConnection(client: Socket) {
    Logger.log(`Client Connected ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    Logger.log(`Client Disconnected ${client.id}`);
  }

  @SubscribeMessage('personalMessage')
  handlePersonalMessage(
    @MessageBody() data: { to: string; message: string },
    @ConnectedSocket() sender: Socket,
  ) {
    const { to, message } = data;

    // Ensure the recipient is authenticated
    const recipient = this.server.sockets.sockets[to];

    if (recipient && this.authService.isSocketAuthenticated(recipient)) {
      recipient.emit('personalMessage', { from: sender.id, message });
    } else {
      sender.emit('personalMessageError', { to, message: 'User is not connected or not authenticated' });
    }
  }
}
