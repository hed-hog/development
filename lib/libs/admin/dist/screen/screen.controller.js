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
exports.ScreenController = void 0;
const pagination_1 = require("@hedhog/pagination");
const common_1 = require("@nestjs/common");
const create_dto_1 = require("./dto/create.dto");
const delete_dto_1 = require("./dto/delete.dto");
const update_dto_1 = require("./dto/update.dto");
const screen_service_1 = require("./screen.service");
const auth_guard_1 = require("../auth/guards/auth.guard");
const role_decorator_1 = require("../role/decorators/role.decorator");
let ScreenController = class ScreenController {
    constructor(screenService) {
        this.screenService = screenService;
    }
    async getScreens(paginationParams) {
        return this.screenService.getScreens(paginationParams);
    }
    async show(screenId) {
        return this.screenService.get(screenId);
    }
    create(data) {
        return this.screenService.create(data);
    }
    async update(screenId, data) {
        return this.screenService.update({
            id: screenId,
            data,
        });
    }
    async delete(data) {
        return this.screenService.delete(data);
    }
};
exports.ScreenController = ScreenController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, pagination_1.Pagination)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ScreenController.prototype, "getScreens", null);
__decorate([
    (0, common_1.Get)(':screenId'),
    __param(0, (0, common_1.Param)('screenId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ScreenController.prototype, "show", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dto_1.CreateDTO]),
    __metadata("design:returntype", void 0)
], ScreenController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':screenId'),
    __param(0, (0, common_1.Param)('screenId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_dto_1.UpdateDTO]),
    __metadata("design:returntype", Promise)
], ScreenController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_dto_1.DeleteDTO]),
    __metadata("design:returntype", Promise)
], ScreenController.prototype, "delete", null);
exports.ScreenController = ScreenController = __decorate([
    (0, role_decorator_1.Role)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('screens'),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => screen_service_1.ScreenService))),
    __metadata("design:paramtypes", [screen_service_1.ScreenService])
], ScreenController);
//# sourceMappingURL=screen.controller.js.map