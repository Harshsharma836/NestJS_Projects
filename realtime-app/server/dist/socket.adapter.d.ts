/// <reference types="node" />
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as socketio from 'socket.io';
import * as http from 'http';
export declare class SocketIoAdapter extends IoAdapter {
    createIOServer(port: number, options?: socketio.ServerOptions & {
        namespace?: string;
        server?: http.Server;
    }): any;
}
