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
exports.PermissionController = void 0;
const pagination_1 = require("@hedhog/pagination");
const common_1 = require("@nestjs/common");
const create_dto_1 = require("./dto/create.dto");
const delete_dto_1 = require("./dto/delete.dto");
const update_dto_1 = require("./dto/update.dto");
const permission_service_1 = require("./permission.service");
const permission_decorator_1 = require("./decorators/permission.decorator");
const auth_guard_1 = require("../auth/guards/auth.guard");
let PermissionController = class PermissionController {
    constructor(permissionService) {
        this.permissionService = permissionService;
    }
    async getPermissions(paginationParams) {
        return this.permissionService.getPermissions(paginationParams);
    }
    async show(permissionId) {
        return this.permissionService.get(permissionId);
    }
    create(data) {
        return this.permissionService.create(data);
    }
    async update(permissionId, data) {
        return this.permissionService.update({
            id: permissionId,
            data,
        });
    }
    async delete(data) {
        return this.permissionService.delete(data);
    }
};
exports.PermissionController = PermissionController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, pagination_1.Pagination)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "getPermissions", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(':permissionId'),
    __param(0, (0, common_1.Param)('PermissionId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "show", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dto_1.CreateDTO]),
    __metadata("design:returntype", void 0)
], PermissionController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Patch)(':permissionId'),
    __param(0, (0, common_1.Param)('PermissionId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_dto_1.UpdateDTO]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_dto_1.DeleteDTO]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "delete", null);
exports.PermissionController = PermissionController = __decorate([
    (0, permission_decorator_1.Permission)(),
    (0, common_1.Controller)('permissions'),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => permission_service_1.PermissionService))),
    __metadata("design:paramtypes", [permission_service_1.PermissionService])
], PermissionController);
//# sourceMappingURL=permission.controller.js.map