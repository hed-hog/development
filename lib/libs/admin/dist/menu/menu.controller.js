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
exports.MenuController = void 0;
const pagination_1 = require("@hedhog/pagination");
const common_1 = require("@nestjs/common");
const create_dto_1 = require("./dto/create.dto");
const delete_dto_1 = require("./dto/delete.dto");
const update_dto_1 = require("./dto/update.dto");
const menu_service_1 = require("./menu.service");
const order_dto_1 = require("./dto/order.dto");
const permission_decorator_1 = require("../permission/decorators/permission.decorator");
const auth_guard_1 = require("../auth/guards/auth.guard");
const user_decorator_1 = require("../auth/decorators/user.decorator");
let MenuController = class MenuController {
    constructor(menuService) {
        this.menuService = menuService;
    }
    async getSystemMenu({ id }) {
        return this.menuService.getSystemMenu(id);
    }
    async getMenu(paginationParams) {
        return this.menuService.getMenu(paginationParams);
    }
    async show(menuId) {
        return this.menuService.get(menuId);
    }
    async create(data) {
        return this.menuService.create(data);
    }
    async update(menuId, data) {
        return this.menuService.update({
            id: menuId,
            data,
        });
    }
    async delete(data) {
        return this.menuService.delete(data);
    }
    async updateOrder(data) {
        return this.menuService.updateOrder(data);
    }
};
exports.MenuController = MenuController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('system'),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "getSystemMenu", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, pagination_1.Pagination)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "getMenu", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(':menuId'),
    __param(0, (0, common_1.Param)('menuId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "show", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dto_1.CreateDTO]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Patch)(':menuId'),
    __param(0, (0, common_1.Param)('menuId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_dto_1.UpdateDTO]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_dto_1.DeleteDTO]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "delete", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Patch)('order'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_dto_1.OrderDTO]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "updateOrder", null);
exports.MenuController = MenuController = __decorate([
    (0, permission_decorator_1.Permission)(),
    (0, common_1.Controller)('menus'),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => menu_service_1.MenuService))),
    __metadata("design:paramtypes", [menu_service_1.MenuService])
], MenuController);
//# sourceMappingURL=menu.controller.js.map