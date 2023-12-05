import { SubscribeMessage, MessageBody, ConnectedSocket, WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, OnGatewayInit } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import _ from 'lodash';
import * as WebSocket from 'ws';
import { SocketType } from './socket.type';
import { WebSocketAdapter , INestApplication } from '@nestjs/common';
// import {SocketType} from '~core/type/socket/socket.type'

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect , OnGatewayInit{
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    Logger.log("Intilize")
  }

  handleConnection(client: Socket) {
      Logger.log(`Client Connected ${client.client}`)
  }

  handleDisconnect(client: Socket) {
    // Handle disconnection event
    Logger.log(`Client Disconnected ${client.client}`)
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string, @ConnectedSocket() client: Socket ) {
    console.log(client.handshake.query);

    //const token = _.get(client.handshake.query , 'token' , 'default');
    const token = client.handshake.query.token;
    // extract user from token
    console.log(token);
    this.server.emit('message', data); // Broadcast messag to all connected clients
  }
}