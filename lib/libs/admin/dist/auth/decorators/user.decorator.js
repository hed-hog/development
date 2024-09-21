"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const common_1 = require("@nestjs/common");
exports.User = (0, common_1.createParamDecorator)((field = null, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.auth || !request.auth.user) {
        throw new common_1.UnauthorizedException(`User is not authenticated`);
    }
    return field ? request.auth.user[field] : request.auth.user;
});
//# sourceMappingURL=user.decorator.js.map