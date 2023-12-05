"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketIoAdapter = void 0;
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
const cors = require("cors");
class SocketIoAdapter extends platform_socket_io_1.IoAdapter {
    createIOServer(port, options) {
        const server = super.createIOServer(port, options);
        const corsOptions = {
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST'],
            credentials: true,
        };
        server.use(cors(corsOptions));
        return server;
    }
}
exports.SocketIoAdapter = SocketIoAdapter;
//# sourceMappingURL=socket.adapter.js.map