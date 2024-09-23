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
exports.PermissionGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const constants_1 = require("@nestjs/common/constants");
const permission_decorator_1 = require("../decorators/permission.decorator");
const prisma_1 = require("@hedhog/prisma");
let PermissionGuard = class PermissionGuard {
    constructor(reflector, prisma) {
        this.reflector = reflector;
        this.prisma = prisma;
    }
    async canActivate(context) {
        var _a, _b;
        const withPermission = this.reflector.getAllAndOverride(permission_decorator_1.WITH_PERMISSION, [context.getHandler(), context.getClass()]);
        if (!withPermission) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const controller = context.getClass();
        const handler = context.getHandler();
        const controllerPath = this.reflector.get('path', controller) || '';
        const methodPath = this.reflector.get('path', handler) || '';
        const requestMethod = this.reflector.get(constants_1.METHOD_METADATA, handler);
        const fullPath = `/${controllerPath}/${methodPath}`.replace(/\/+/g, '/');
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new common_1.UnauthorizedException();
        }
        const userId = (_b = (_a = request === null || request === void 0 ? void 0 : request.auth) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.id;
        let httpMethod;
        switch (requestMethod) {
            case common_1.RequestMethod.GET:
                httpMethod = 'GET';
                break;
            case common_1.RequestMethod.POST:
                httpMethod = 'POST';
                break;
            case common_1.RequestMethod.PUT:
                httpMethod = 'PUT';
                break;
            case common_1.RequestMethod.DELETE:
                httpMethod = 'DELETE';
                break;
            case common_1.RequestMethod.PATCH:
                httpMethod = 'PATCH';
                break;
            case common_1.RequestMethod.OPTIONS:
                httpMethod = 'OPTIONS';
                break;
            case common_1.RequestMethod.HEAD:
                httpMethod = 'HEAD';
                break;
            case common_1.RequestMethod.ALL:
                httpMethod = 'ALL';
                break;
        }
        const route = await this.prisma.routes.count({
            where: {
                method: httpMethod,
                url: fullPath,
                role_routes: {
                    some: {
                        roles: {
                            role_users: {
                                some: {
                                    user_id: Number(userId),
                                },
                            },
                        },
                    },
                },
            },
        });
        return route === 1;
    }
    extractTokenFromHeader(request) {
        var _a, _b;
        const [type, token] = (_b = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')) !== null && _b !== void 0 ? _b : [];
        return type === 'Bearer' ? token : undefined;
    }
};
exports.PermissionGuard = PermissionGuard;
exports.PermissionGuard = PermissionGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => prisma_1.PrismaService))),
    __metadata("design:paramtypes", [core_1.Reflector,
        prisma_1.PrismaService])
], PermissionGuard);
//# sourceMappingURL=permission.guard.js.map