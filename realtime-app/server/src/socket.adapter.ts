// import { IoAdapter } from '@nestjs/platform-ws';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as socketio from 'socket.io';
import * as http from 'http';
import * as cors from 'cors';

export class SocketIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: socketio.ServerOptions & { namespace?: string; server?: http.Server }): any {
    const server = super.createIOServer(port, options);

    // Enable CORS for Socket.IO
    const corsOptions: cors.CorsOptions = {
      origin: 'http://localhost:3000', // Replace with your frontend URL
      methods: ['GET', 'POST'],
      credentials: true, // Enable credentials (cookies, authorization headers, etc.)
    };

    server.use(cors(corsOptions));

    return server;
  }
}
