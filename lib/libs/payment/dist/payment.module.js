"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModule = void 0;
const admin_1 = require("@hedhog/admin");
const locale_1 = require("@hedhog/locale");
const pagination_1 = require("@hedhog/pagination");
const prisma_1 = require("@hedhog/prisma");
const common_1 = require("@nestjs/common");
const checkout_module_1 = require("./checkout/checkout.module");
const discount_type_module_1 = require("./discount-type/discount-type.module");
const item_module_1 = require("./item/item.module");
const payment_card_brand_module_1 = require("./payment-card-brand/payment-card-brand.module");
const payment_coupon_module_1 = require("./payment-coupon/payment-coupon.module");
const payment_gateway_module_1 = require("./payment-gateway/payment-gateway.module");
const payment_method_item_module_1 = require("./payment-method-item/payment-method-item.module");
const payment_method_module_1 = require("./payment-method/payment-method.module");
const payment_status_module_1 = require("./payment-status/payment-status.module");
const payment_module_1 = require("./payment/payment.module");
let PaymentModule = class PaymentModule {
};
exports.PaymentModule = PaymentModule;
exports.PaymentModule = PaymentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => admin_1.AdminModule),
            (0, common_1.forwardRef)(() => locale_1.LocaleModule),
            (0, common_1.forwardRef)(() => prisma_1.PrismaModule),
            (0, common_1.forwardRef)(() => pagination_1.PaginationModule),
            (0, common_1.forwardRef)(() => payment_status_module_1.PaymentStatusModule),
            (0, common_1.forwardRef)(() => checkout_module_1.CheckoutModule),
            (0, common_1.forwardRef)(() => payment_method_module_1.PaymentMethodModule),
            (0, common_1.forwardRef)(() => discount_type_module_1.DiscountTypeModule),
            (0, common_1.forwardRef)(() => payment_module_1.PaymentModule),
            (0, common_1.forwardRef)(() => item_module_1.ItemModule),
            (0, common_1.forwardRef)(() => payment_method_item_module_1.PaymentMethodItemModule),
            (0, common_1.forwardRef)(() => payment_gateway_module_1.PaymentGatewayModule),
            (0, common_1.forwardRef)(() => payment_card_brand_module_1.PaymentCardBrandModule),
            (0, common_1.forwardRef)(() => payment_coupon_module_1.PaymentCouponModule),
        ],
        controllers: [],
        providers: [],
        exports: [],
    })
], PaymentModule);
//# sourceMappingURL=payment.module.js.map