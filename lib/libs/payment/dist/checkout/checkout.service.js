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
exports.CheckoutService = void 0;
const prisma_1 = require("@hedhog/prisma");
const setting_1 = require("@hedhog/setting");
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const disccount_type_enum_1 = require("../disccount-type.enum");
const payment_status_enum_1 = require("../payment-status.enum");
const payment_service_1 = require("../payment/payment.service");
const provider_enum_1 = require("./provider/provider.enum");
const provider_factory_1 = require("./provider/provider.factory");
let CheckoutService = class CheckoutService {
    constructor(httpService, prismaService, settingService, paymentService) {
        this.httpService = httpService;
        this.prismaService = prismaService;
        this.settingService = settingService;
        this.paymentService = paymentService;
    }
    async onModuleInit() {
        await this.getProvider();
    }
    async init({ items, slug = '', userId = null, couponId = null, }) {
        console.log('init', { items, slug, userId, couponId });
        if (!items || !items.length) {
            throw new common_1.BadRequestException('Items not found.');
        }
        await this.getProvider();
        console.log('provider loaded', this.providerId);
        const personId = await this.getPersonId(userId);
        console.log('personId', personId);
        let payment = await this.getPaymentBySlug(slug, personId);
        console.log('payment 1', payment);
        if (!payment) {
            payment = await this.createPayment(items, slug, personId);
            console.log('payment 2', payment);
        }
        else {
            payment = await this.updatePaymentItems(payment.id, items);
            console.log('payment 3', payment);
        }
        return this.getPaymentDetails(payment.id);
    }
    async createPayment(items, slug, personId) {
        if (!slug) {
            slug = await this.getNewSlug();
        }
        const item = await this.getPaymentItems(items);
        const payment = await this.paymentService.create({
            gateway_id: this.providerId,
            person_id: personId !== null && personId !== void 0 ? personId : undefined,
            status_id: payment_status_enum_1.EnumPaymentStatus.PENDING,
            currency: 'brl',
            document: '00000000000',
            slug,
            amount: Number(item.reduce((acc, i) => acc + Number(i.price), 0)),
        });
        await this.prismaService.payment_item.createMany({
            data: item.map((i) => ({
                payment_id: payment.id,
                item_id: i.id,
                unit_price: i.price,
            })),
        });
        return payment;
    }
    async getPaymentItems(items) {
        return this.prismaService.item.findMany({
            where: { id: { in: items } },
            select: { id: true, price: true },
        });
    }
    async updatePaymentItems(paymentId, items) {
        await this.prismaService.payment_item.deleteMany({
            where: { payment_id: paymentId },
        });
        const item = await this.getPaymentItems(items);
        const payment = await this.prismaService.payment.update({
            where: { id: paymentId },
            data: {
                amount: Number(item.reduce((acc, i) => acc + Number(i.price), 0)),
            },
        });
        await this.prismaService.payment_item.createMany({
            data: item.map((i) => ({
                payment_id: paymentId,
                item_id: i.id,
                unit_price: i.price,
            })),
        });
        return payment;
    }
    async getPaymentSettings() {
        await this.getProvider();
        switch (this.setting['payment-provider']) {
            case provider_enum_1.EnumProvider.MERCADO_PAGO:
                return {
                    publicKey: this.setting['payment-mercado-pago-public-key'],
                };
            default:
                return {};
        }
    }
    async getProvider() {
        var _a;
        if (this.providerId > 0 &&
            this.providerLoadedAt < new Date().getTime() - 60000) {
            return this.provider;
        }
        this.setting = await this.settingService.getSettingValues([
            'payment-provider',
            'payment-currency',
            'payment-mercado-pago-token',
            'payment-mercado-pago-public-key',
        ]);
        if (this.providerId > 0 && ((_a = this.provider) === null || _a === void 0 ? void 0 : _a.id) === this.providerId) {
            return this.provider;
        }
        if (!this.setting['payment-provider']) {
            throw new common_1.BadRequestException('You must set the payment provider in the settings.');
        }
        const providerName = this.setting['payment-provider'];
        const providerData = await this.getProviderData(providerName);
        const provider = provider_factory_1.ProviderFactory.create(providerName, providerData.id, this.setting, this.httpService);
        this.providerId = providerData.id;
        this.providerLoadedAt = new Date().getTime();
        return provider;
    }
    async getProviderData(providerName) {
        const providerData = await this.prismaService.payment_gateway.findFirst({
            where: { slug: providerName },
            select: { id: true },
        });
        if (!providerData) {
            throw new common_1.BadRequestException(`Provider ${providerName} not found.`);
        }
        return providerData;
    }
    async createPaymentIntent({ token, paymentMethodId, issuerId, installments, identificationNumber, orderId, cardFirstSixDigits, cardLastFourDigits, name, email, phone, couponId, }) {
        console.log('createPaymentIntent', {
            token,
            paymentMethodId,
            issuerId,
            installments,
            identificationNumber,
            orderId,
            cardFirstSixDigits,
            cardLastFourDigits,
            name,
            email,
            phone,
            couponId,
        });
        const provider = await this.getProvider();
        return provider.createPaymentIntent(0, this.setting['payment-currency']);
    }
    async createSubscription(priceId, customerId) {
        const provider = await this.getProvider();
        // return provider.createSubscription(priceId, customerId);
    }
    async getNewSlug() {
        const slug = (0, uuid_1.v4)();
        const exists = await this.prismaService.payment.count({ where: { slug } });
        return exists ? this.getNewSlug() : slug;
    }
    async getPersonId(userId) {
        if (!userId)
            return null;
        const person = await this.prismaService.person.findUnique({
            where: { id: userId },
            select: { id: true },
        });
        return person ? person.id : null;
    }
    async getPaymentBySlug(slug, personId) {
        if (!slug)
            return null;
        const payment = await this.prismaService.payment.findFirst({
            where: { slug, status_id: payment_status_enum_1.EnumPaymentStatus.PENDING },
        });
        if (payment && !payment.person_id && personId) {
            await this.prismaService.payment.update({
                where: { id: payment.id },
                data: { person_id: personId },
            });
        }
        return payment;
    }
    async getPaymentDetails(paymentId) {
        console.log('getPaymentDetails', paymentId);
        return this.prismaService.payment.findUnique({
            where: { id: paymentId },
            include: {
                payment_item: { include: { item: true } },
                payment_method: true,
                payment_card_brand: true,
                payment_status: true,
                person: true,
            },
        });
    }
    async setCoupon(couponCode, paymentSlug) {
        var _a, _b;
        const payment = await this.getPaymentWithItems(paymentSlug);
        const coupon = await this.getCouponWithItems(couponCode);
        if (!payment || payment.status_id !== payment_status_enum_1.EnumPaymentStatus.PENDING) {
            throw new common_1.BadRequestException('Payment not found or not pending.');
        }
        if (coupon.uses_limit > 0 &&
            ((_a = coupon.uses_qtd) !== null && _a !== void 0 ? _a : 0) >= ((_b = coupon.uses_limit) !== null && _b !== void 0 ? _b : 0)) {
            throw new common_1.BadRequestException('Consumption coupon or usage limit.');
        }
        const itemsFromPaymentAndCoupon = this.getItemsFromPaymentAndCoupon(payment, coupon);
        if (itemsFromPaymentAndCoupon === null || itemsFromPaymentAndCoupon === void 0 ? void 0 : itemsFromPaymentAndCoupon.length) {
            return this.applyCouponDiscount(payment.id, coupon, Number(payment.amount));
        }
        else {
            throw new common_1.BadRequestException('Coupon not is valid.');
        }
    }
    async getPaymentWithItems(slug) {
        return this.prismaService.payment.findUnique({
            where: { slug },
            include: {
                payment_item: { include: { item: true } },
            },
        });
    }
    async getCouponWithItems(code) {
        return this.prismaService.payment_coupon.findFirst({
            where: {
                code,
                active: true,
                starts_at: { lte: new Date() },
                OR: [{ ends_at: { gte: new Date() } }, { ends_at: null }],
            },
            include: {
                payment_coupon_item: { include: { item: true } },
            },
        });
    }
    getItemsFromPaymentAndCoupon(payment, coupon) {
        var _a;
        console.log('getItemsFromPaymentAndCoupon', {
            payment_item: payment.payment_item,
            coupon_payment_coupon_item: coupon.payment_coupon_item,
        });
        return (_a = payment.payment_item) === null || _a === void 0 ? void 0 : _a.filter((item) => {
            var _a;
            return ((_a = coupon.payment_coupon_item) !== null && _a !== void 0 ? _a : [])
                .map((ci) => ci.item_id)
                .includes(item.item_id);
        });
    }
    async applyCouponDiscount(paymentId, coupon, paymentAmount) {
        switch (coupon.discount_type_id) {
            case disccount_type_enum_1.EnumDiscountType.DISCOUNT_FIXED_VALUE:
            case disccount_type_enum_1.EnumDiscountType.PROMOTIONAL_PRICE:
                console.log('applyCouponDiscount', {
                    paymentId,
                    couponId: coupon.id,
                    discount: Number(coupon.value),
                });
                return this.paymentService.update({
                    id: paymentId,
                    data: { coupon_id: coupon.id, discount: Number(coupon.value) },
                });
            case disccount_type_enum_1.EnumDiscountType.DISCOUNT_PERCENTAGE_VALUE:
                const valueToReduce = (Number(paymentAmount) * Number(coupon.value)) / 100;
                console.log('applyCouponDiscount', {
                    paymentId,
                    couponId: coupon.id,
                    discount: Number(valueToReduce),
                });
                return this.paymentService.update({
                    id: paymentId,
                    data: { coupon_id: coupon.id, discount: Number(valueToReduce) },
                });
        }
    }
};
exports.CheckoutService = CheckoutService;
exports.CheckoutService = CheckoutService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => prisma_1.PrismaService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => setting_1.SettingService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => payment_service_1.PaymentService))),
    __metadata("design:paramtypes", [axios_1.HttpService,
        prisma_1.PrismaService,
        setting_1.SettingService,
        payment_service_1.PaymentService])
], CheckoutService);
//# sourceMappingURL=checkout.service.js.map