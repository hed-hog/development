"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuModule = void 0;
const auth_module_1 = require("../auth/auth.module");
const pagination_1 = require("@hedhog/pagination");
const prisma_1 = require("@hedhog/prisma");
const common_1 = require("@nestjs/common");
const menu_controller_1 = require("./menu.controller");
const menu_service_1 = require("./menu.service");
const role_module_1 = require("../role/role.module");
let MenuModule = class MenuModule {
};
exports.MenuModule = MenuModule;
exports.MenuModule = MenuModule = __decorate([
    (0, common_1.Module)({
        providers: [menu_service_1.MenuService],
        exports: [menu_service_1.MenuService],
        controllers: [menu_controller_1.MenuController],
        imports: [
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => prisma_1.PrismaModule),
            (0, common_1.forwardRef)(() => pagination_1.PaginationModule),
            (0, common_1.forwardRef)(() => role_module_1.PermissionModule),
        ],
    })
], MenuModule);
//# sourceMappingURL=menu.module.js.map