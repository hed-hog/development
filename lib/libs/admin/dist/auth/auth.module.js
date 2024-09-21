"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const prisma_1 = require("@hedhog/prisma");
const jwt_1 = require("@nestjs/jwt");
const core_1 = require("@nestjs/core");
const auth_guard_1 = require("./guards/auth.guard");
const mail_1 = require("@hedhog/mail");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => jwt_1.JwtModule.registerAsync({
                global: true,
                useFactory: () => {
                    return {
                        secret: String(process.env.JWT_SECRET),
                        global: true,
                        signOptions: {
                            expiresIn: process.env.JWT_EXPIRES_IN || '30d',
                        },
                    };
                },
            })),
            (0, common_1.forwardRef)(() => prisma_1.PrismaModule),
            (0, common_1.forwardRef)(() => mail_1.MailModule),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.AuthGuard,
            },
        ],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map