"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const socket_io_2 = require("socket.io");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth/auth.service");
let ChatGateway = class ChatGateway {
    constructor(authService) {
        this.authService = authService;
    }
    afterInit(server) {
        common_1.Logger.log('Initialized');
    }
    handleConnection(client) {
        common_1.Logger.log(`Client Connected ${client.id}`);
    }
    handleDisconnect(client) {
        common_1.Logger.log(`Client Disconnected ${client.id}`);
    }
    handlePersonalMessage(data, sender) {
        const { to, message } = data;
        const recipient = this.server.sockets.sockets[to];
        if (recipient && this.authService.isSocketAuthenticated(recipient)) {
            recipient.emit('personalMessage', { from: sender.id, message });
        }
        else {
            sender.emit('personalMessageError', { to, message: 'User is not connected or not authenticated' });
        }
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('personalMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_2.Socket]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handlePersonalMessage", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map