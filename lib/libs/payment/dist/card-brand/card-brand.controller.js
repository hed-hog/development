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
exports.CardBrandController = void 0;
const pagination_1 = require("@hedhog/pagination");
const common_1 = require("@nestjs/common");
const create_dto_1 = require("./dto/create.dto");
const update_dto_1 = require("./dto/update.dto");
const card_brand_service_1 = require("./card-brand.service");
const core_1 = require("@hedhog/core");
let CardBrandController = class CardBrandController {
    constructor(cardBrandService) {
        this.cardBrandService = cardBrandService;
    }
    async list(paginationParams) {
        return this.cardBrandService.list(paginationParams);
    }
    async get(id) {
        return this.cardBrandService.get(id);
    }
    async create(data) {
        return this.cardBrandService.create(data);
    }
    async update(id, data) {
        return this.cardBrandService.update({
            id,
            data
        });
    }
    async delete(data) {
        return this.cardBrandService.delete(data);
    }
};
exports.CardBrandController = CardBrandController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, pagination_1.Pagination)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CardBrandController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CardBrandController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dto_1.CreateDTO]),
    __metadata("design:returntype", Promise)
], CardBrandController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_dto_1.UpdateDTO]),
    __metadata("design:returntype", Promise)
], CardBrandController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.DeleteDTO]),
    __metadata("design:returntype", Promise)
], CardBrandController.prototype, "delete", null);
exports.CardBrandController = CardBrandController = __decorate([
    (0, core_1.Role)(),
    (0, common_1.Controller)('card-brand'),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => card_brand_service_1.CardBrandService))),
    __metadata("design:paramtypes", [card_brand_service_1.CardBrandService])
], CardBrandController);
//# sourceMappingURL=card-brand.controller.js.map