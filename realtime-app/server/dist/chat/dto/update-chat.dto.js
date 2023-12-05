"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateChatDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_chat_dto_1 = require("./create-chat.dto");
class UpdateChatDto extends (0, swagger_1.PartialType)(create_chat_dto_1.CreateChatDto) {
}
exports.UpdateChatDto = UpdateChatDto;
//# sourceMappingURL=update-chat.dto.js.map