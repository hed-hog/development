"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreenModule = void 0;
const pagination_1 = require("@hedhog/pagination");
const prisma_1 = require("@hedhog/prisma");
const common_1 = require("@nestjs/common");
const screen_controller_1 = require("./screen.controller");
const screen_service_1 = require("./screen.service");
const auth_module_1 = require("../auth/auth.module");
let ScreenModule = class ScreenModule {
};
exports.ScreenModule = ScreenModule;
exports.ScreenModule = ScreenModule = __decorate([
    (0, common_1.Module)({
        providers: [screen_service_1.ScreenService],
        exports: [screen_service_1.ScreenService],
        controllers: [screen_controller_1.ScreenController],
        imports: [
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => prisma_1.PrismaModule),
            (0, common_1.forwardRef)(() => pagination_1.PaginationModule),
        ],
    })
], ScreenModule);
//# sourceMappingURL=screen.module.js.map