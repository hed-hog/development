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
const screen_module_1 = require("./screen/screen.module");
const user_module_1 = require("./user/user.module");
const role_module_1 = require("./role/role.module");
const route_module_1 = require("./route/route.module");
const settings_module_1 = require("./setting/settings.module");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => menu_module_1.MenuModule),
            (0, common_1.forwardRef)(() => pagination_1.PaginationModule),
            (0, common_1.forwardRef)(() => role_module_1.RoleModule),
            (0, common_1.forwardRef)(() => route_module_1.RouteModule),
            (0, common_1.forwardRef)(() => prisma_1.PrismaModule),
            (0, common_1.forwardRef)(() => screen_module_1.ScreenModule),
            (0, common_1.forwardRef)(() => settings_module_1.SettingModule),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
        ],
        exports: [
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            route_module_1.RouteModule,
            role_module_1.RoleModule,
            menu_module_1.MenuModule,
            settings_module_1.SettingModule,
            screen_module_1.ScreenModule,
        ],
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map