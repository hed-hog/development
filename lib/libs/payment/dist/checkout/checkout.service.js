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
const pagination_1 = require("@hedhog/pagination");
const prisma_1 = require("@hedhog/prisma");
const setting_1 = require("@hedhog/setting");
const common_1 = require("@nestjs/common");
const provider_factory_1 = require("./provider/provider.factory");
let CheckoutService = class CheckoutService {
    constructor(prismaService, paginationService, settingService) {
        this.prismaService = prismaService;
        this.paginationService = paginationService;
        this.settingService = settingService;
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
        const provider = provider_factory_1.ProviderFactory.create(providerName, this.setting);
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
    async createPaymentIntent(amount, currency) {
        const provider = await this.getProvider();
        return provider.createPaymentIntent(amount, currency);
    }
    async createSubscription(priceId, customerId) {
        const provider = await this.getProvider();
        return provider.createSubscription(priceId, customerId);
    }
};
exports.CheckoutService = CheckoutService;
exports.CheckoutService = CheckoutService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => prisma_1.PrismaService))),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => pagination_1.PaginationService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => setting_1.SettingService))),
    __metadata("design:paramtypes", [prisma_1.PrismaService,
        pagination_1.PaginationService,
        setting_1.SettingService])
], CheckoutService);
//# sourceMappingURL=checkout.service.js.map