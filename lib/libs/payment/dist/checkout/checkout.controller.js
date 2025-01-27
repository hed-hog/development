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
exports.CheckoutController = void 0;
const core_1 = require("@hedhog/core");
const common_1 = require("@nestjs/common");
const checkout_service_1 = require("./checkout.service");
const create_dto_1 = require("./dto/create.dto");
let CheckoutController = class CheckoutController {
    constructor(checkoutService) {
        this.checkoutService = checkoutService;
    }
    async init(slug, user) {
        let personId = user ? user.id : null;
        return this.checkoutService.init(slug);
    }
    async create({ amount, currency }) {
        return this.checkoutService.createPaymentIntent(amount, currency);
    }
    async createSubscription({ priceId, customerId }) {
        return this.checkoutService.createSubscription(priceId, customerId);
    }
};
exports.CheckoutController = CheckoutController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('slug')),
    __param(1, (0, core_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CheckoutController.prototype, "init", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dto_1.CreateDTO]),
    __metadata("design:returntype", Promise)
], CheckoutController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('subscription'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CheckoutController.prototype, "createSubscription", null);
exports.CheckoutController = CheckoutController = __decorate([
    (0, core_1.Public)(),
    (0, common_1.Controller)('checkout'),
    __metadata("design:paramtypes", [checkout_service_1.CheckoutService])
], CheckoutController);
//# sourceMappingURL=checkout.controller.js.map