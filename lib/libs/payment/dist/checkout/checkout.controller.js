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
const init_dto_1 = require("./dto/init.dto");
const set_coupon_dto_1 = require("./dto/set-coupon.dto");
let CheckoutController = class CheckoutController {
    constructor(checkoutService) {
        this.checkoutService = checkoutService;
    }
    async paymentSettings() {
        return this.checkoutService.getPaymentSettings();
    }
    async payment(data) {
        return this.checkoutService.createPaymentIntent(data);
    }
    async init({ items, slug, couponId }, user) {
        return this.checkoutService.init({
            items,
            couponId,
            slug,
            userId: user ? user.id : null,
        });
    }
    async coupon({ code, slug }) {
        return this.checkoutService.setCoupon(code, slug);
    }
    async subscription({ priceId, customerId }) {
        return this.checkoutService.createSubscription(priceId, customerId);
    }
};
exports.CheckoutController = CheckoutController;
__decorate([
    (0, common_1.Get)('payment-settings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CheckoutController.prototype, "paymentSettings", null);
__decorate([
    (0, common_1.Post)('payment'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dto_1.CreateDTO]),
    __metadata("design:returntype", Promise)
], CheckoutController.prototype, "payment", null);
__decorate([
    (0, common_1.Post)('init'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, core_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [init_dto_1.InitDTO, Object]),
    __metadata("design:returntype", Promise)
], CheckoutController.prototype, "init", null);
__decorate([
    (0, common_1.Post)('coupon'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [set_coupon_dto_1.SetCouponDTO]),
    __metadata("design:returntype", Promise)
], CheckoutController.prototype, "coupon", null);
__decorate([
    (0, common_1.Post)('subscription'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CheckoutController.prototype, "subscription", null);
exports.CheckoutController = CheckoutController = __decorate([
    (0, core_1.Public)(),
    (0, common_1.Controller)('checkout'),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => checkout_service_1.CheckoutService))),
    __metadata("design:paramtypes", [checkout_service_1.CheckoutService])
], CheckoutController);
//# sourceMappingURL=checkout.controller.js.map