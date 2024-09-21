"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const prisma_1 = require("@hedhog/prisma");
const pagination_1 = require("@hedhog/pagination");
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const menu_module_1 = require("./menu/menu.module");
const permission_module_1 = require("./permission/permission.module");
const screen_module_1 = require("./screen/screen.module");
const user_module_1 = require("./user/user.module");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => menu_module_1.MenuModule),
            (0, common_1.forwardRef)(() => pagination_1.PaginationModule),
            (0, common_1.forwardRef)(() => permission_module_1.PermissionModule),
            (0, common_1.forwardRef)(() => prisma_1.PrismaModule),
            (0, common_1.forwardRef)(() => screen_module_1.ScreenModule),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
        ],
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map