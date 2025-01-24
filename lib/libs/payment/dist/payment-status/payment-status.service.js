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
exports.PaymentStatusService = void 0;
const pagination_1 = require("@hedhog/pagination");
const prisma_1 = require("@hedhog/prisma");
const common_1 = require("@nestjs/common");
const locale_1 = require("@hedhog/locale");
let PaymentStatusService = class PaymentStatusService {
    constructor(prismaService, paginationService, localeService) {
        this.prismaService = prismaService;
        this.paginationService = paginationService;
        this.localeService = localeService;
        this.modelName = 'payment_status';
        this.foreignKey = '';
    }
    async list(locale, paginationParams) {
        return this.localeService.listModelWithLocale(locale, this.modelName, paginationParams);
    }
    async get(id) {
        return this.localeService.getModelWithLocale(this.modelName, id);
    }
    async create(data) {
        return this.localeService.createModelWithLocale(this.modelName, this.foreignKey, data);
    }
    async update({ id, data }) {
        return this.localeService.updateModelWithLocale(this.modelName, this.foreignKey, id, data);
    }
    async delete({ ids }) {
        if (ids == undefined || ids == null) {
            throw new common_1.BadRequestException('You must select at least one item to delete.');
        }
        return this.prismaService.payment_status.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        });
    }
};
exports.PaymentStatusService = PaymentStatusService;
exports.PaymentStatusService = PaymentStatusService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => prisma_1.PrismaService))),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => pagination_1.PaginationService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => locale_1.LocaleService))),
    __metadata("design:paramtypes", [prisma_1.PrismaService,
        pagination_1.PaginationService,
        locale_1.LocaleService])
], PaymentStatusService);
//# sourceMappingURL=payment-status.service.js.map