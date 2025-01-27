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
exports.DiscountTypeController = void 0;
const pagination_1 = require("@hedhog/pagination");
const common_1 = require("@nestjs/common");
const create_dto_1 = require("./dto/create.dto");
const update_dto_1 = require("./dto/update.dto");
const discount_type_service_1 = require("./discount-type.service");
const core_1 = require("@hedhog/core");
let DiscountTypeController = class DiscountTypeController {
    constructor(discountTypeService) {
        this.discountTypeService = discountTypeService;
    }
    async list(paginationParams) {
        return this.discountTypeService.list(paginationParams);
    }
    async get(id) {
        return this.discountTypeService.get(id);
    }
    async create(data) {
        return this.discountTypeService.create(data);
    }
    async update(id, data) {
        return this.discountTypeService.update({
            id,
            data
        });
    }
    async delete(data) {
        return this.discountTypeService.delete(data);
    }
};
exports.DiscountTypeController = DiscountTypeController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, pagination_1.Pagination)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DiscountTypeController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DiscountTypeController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dto_1.CreateDTO]),
    __metadata("design:returntype", Promise)
], DiscountTypeController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_dto_1.UpdateDTO]),
    __metadata("design:returntype", Promise)
], DiscountTypeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.DeleteDTO]),
    __metadata("design:returntype", Promise)
], DiscountTypeController.prototype, "delete", null);
exports.DiscountTypeController = DiscountTypeController = __decorate([
    (0, core_1.Role)(),
    (0, common_1.Controller)('discount-type'),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => discount_type_service_1.DiscountTypeService))),
    __metadata("design:paramtypes", [discount_type_service_1.DiscountTypeService])
], DiscountTypeController);
//# sourceMappingURL=discount-type.controller.js.map