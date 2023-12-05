"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const platform_ws_1 = require("@nestjs/platform-ws");
const socket_adapter_1 = require("./socket.adapter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useWebSocketAdapter(new platform_ws_1.WsAdapter(app));
    app.useWebSocketAdapter(new socket_adapter_1.SocketIoAdapter(app));
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map