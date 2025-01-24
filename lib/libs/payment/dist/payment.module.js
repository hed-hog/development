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
const gateway_module_1 = require("./gateway/gateway.module");
const payment_status_module_1 = require("./payment-status/payment-status.module");
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
            (0, common_1.forwardRef)(() => gateway_module_1.GatewayModule),
            (0, common_1.forwardRef)(() => payment_status_module_1.PaymentStatusModule),
            (0, common_1.forwardRef)(() => checkout_module_1.CheckoutModule),
        ],
        controllers: [],
        providers: [],
        exports: [],
    })
], PaymentModule);
//# sourceMappingURL=payment.module.js.map