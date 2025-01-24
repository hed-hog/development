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
exports.PaymentStatusController = void 0;
const pagination_1 = require("@hedhog/pagination");
const locale_1 = require("@hedhog/locale");
const common_1 = require("@nestjs/common");
const create_dto_1 = require("./dto/create.dto");
const update_dto_1 = require("./dto/update.dto");
const payment_status_service_1 = require("./payment-status.service");
const core_1 = require("@hedhog/core");
let PaymentStatusController = class PaymentStatusController {
    constructor(paymentStatusService) {
        this.paymentStatusService = paymentStatusService;
    }
    async list(locale, paginationParams) {
        return this.paymentStatusService.list(locale, paginationParams);
    }
    async get(id) {
        return this.paymentStatusService.get(id);
    }
    async create(data) {
        return this.paymentStatusService.create(data);
    }
    async update(id, data) {
        return this.paymentStatusService.update({
            id,
            data
        });
    }
    async delete(data) {
        return this.paymentStatusService.delete(data);
    }
};
exports.PaymentStatusController = PaymentStatusController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, locale_1.Locale)()),
    __param(1, (0, pagination_1.Pagination)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentStatusController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PaymentStatusController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dto_1.CreateDTO]),
    __metadata("design:returntype", Promise)
], PaymentStatusController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_dto_1.UpdateDTO]),
    __metadata("design:returntype", Promise)
], PaymentStatusController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.DeleteDTO]),
    __metadata("design:returntype", Promise)
], PaymentStatusController.prototype, "delete", null);
exports.PaymentStatusController = PaymentStatusController = __decorate([
    (0, core_1.Role)(),
    (0, common_1.Controller)('payment-status'),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => payment_status_service_1.PaymentStatusService))),
    __metadata("design:paramtypes", [payment_status_service_1.PaymentStatusService])
], PaymentStatusController);
//# sourceMappingURL=payment-status.controller.js.map