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
const payment_service_1 = require("../payment/payment.service");
const provider_factory_1 = require("./provider/provider.factory");
let CheckoutService = class CheckoutService {
    constructor(prismaService, settingService, paymentService, httpService) {
        this.prismaService = prismaService;
        this.settingService = settingService;
        this.paymentService = paymentService;
        this.httpService = httpService;
    }
    async getProvider() {
        this.setting = await this.settingService.getSettingValues([
            'payment-provider',
            'payment-mercado-pago-token',
        ]);
        if (!this.setting['storage']) {
            throw new common_1.BadRequestException(`You must set the storage provider in the setting.`);
        }
        const providerName = this.setting['payment-provider'];
        const provider = provider_factory_1.ProviderFactory.create(providerName, this.setting, this.httpService);
        const providerData = await this.prismaService.gateway.findFirst({
            where: {
                slug: providerName,
            },
            select: {
                id: true,
            },
        });
        if (!providerData) {
            throw new common_1.BadRequestException(`Provider ${providerName} not found.`);
        }
        this.providerId = providerData.id;
        return provider;
    }
    async createPaymentIntent({ token, paymentMethodId, issuerId, installments, identificationNumber, orderId, cardFirstSixDigits, cardLastFourDigits, name, email, phone, couponId, }) {
        const provider = await this.getProvider();
        return provider.createPaymentIntent(0, 'brl');
    }
    async createSubscription(priceId, customerId) {
        const provider = await this.getProvider();
        //return provider.createSubscription(priceId, customerId);
    }
    async init(slug, person_id) {
        let payment = null;
        if (slug) {
            payment = this.prismaService.payment.findFirst({
                where: {
                    slug,
                    status_id: 1,
                },
            });
            if (payment && !payment.person_id && person_id) {
                await this.prismaService.payment.update({
                    where: {
                        id: payment.id,
                    },
                    data: {
                        person_id: person_id !== null && person_id !== void 0 ? person_id : undefined,
                    },
                });
            }
        }
        if (!payment) {
            const item = await this.prismaService.item.findFirst();
            /*
            payment = await this.prismaService.payment.create({
              data: {
                gateway_id: this.providerId,
                person_id: person_id ?? undefined,
                status_id: 1,
                amount: item.price,
                currency: 'brl',
                document: '00000000000',
                slug: Math.random().toString(36).substring(7),
              },
            });
            */
            await this.prismaService.payment_item.create({
                data: {
                    payment_id: payment.id,
                    item_id: item.id,
                    unit_price: item.price,
                },
            });
        }
        return this.prismaService.payment.findUnique({
            where: {
                id: payment.id,
            },
            include: {
                payment_item: {
                    include: {
                        item: true,
                    },
                },
                payment_method: true,
                card_brand: true,
                payment_status: true,
                person: true,
            },
        });
    }
};
exports.CheckoutService = CheckoutService;
exports.CheckoutService = CheckoutService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => prisma_1.PrismaService))),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => setting_1.SettingService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => payment_service_1.PaymentService))),
    __metadata("design:paramtypes", [prisma_1.PrismaService,
        setting_1.SettingService,
        payment_service_1.PaymentService,
        axios_1.HttpService])
], CheckoutService);
//# sourceMappingURL=checkout.service.js.map