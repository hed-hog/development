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
const pagination_1 = require("@hedhog/pagination");
const prisma_1 = require("@hedhog/prisma");
const common_1 = require("@nestjs/common");
const payment_item_controller_1 = require("./payment-item/payment-item.controller");
const payment_item_service_1 = require("./payment-item/payment-item.service");
const payment_notification_controller_1 = require("./payment-notification/payment-notification.controller");
const payment_notification_service_1 = require("./payment-notification/payment-notification.service");
const payment_value_controller_1 = require("./payment-value/payment-value.controller");
const payment_value_service_1 = require("./payment-value/payment-value.service");
const payment_controller_1 = require("./payment.controller");
const payment_service_1 = require("./payment.service");
let PaymentModule = class PaymentModule {
};
exports.PaymentModule = PaymentModule;
exports.PaymentModule = PaymentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => admin_1.AdminModule),
            (0, common_1.forwardRef)(() => prisma_1.PrismaModule),
            (0, common_1.forwardRef)(() => pagination_1.PaginationModule),
        ],
        controllers: [
            payment_item_controller_1.PaymentItemController,
            payment_value_controller_1.PaymentValueController,
            payment_notification_controller_1.PaymentNotificationController,
            payment_controller_1.PaymentController,
        ],
        providers: [
            payment_item_service_1.PaymentItemService,
            payment_value_service_1.PaymentValueService,
            payment_notification_service_1.PaymentNotificationService,
            payment_service_1.PaymentService,
        ],
        exports: [(0, common_1.forwardRef)(() => payment_service_1.PaymentService)],
    })
], PaymentModule);
//# sourceMappingURL=payment.module.js.map