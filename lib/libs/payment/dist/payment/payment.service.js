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
exports.PaymentService = void 0;
const pagination_1 = require("@hedhog/pagination");
const prisma_1 = require("@hedhog/prisma");
const common_1 = require("@nestjs/common");
let PaymentService = class PaymentService {
    constructor(prismaService, paginationService) {
        this.prismaService = prismaService;
        this.paginationService = paginationService;
    }
    async list(paginationParams) {
        const fields = [
            'slug',
            'amount',
            'document',
            'payment_at',
            'currency',
            'installments',
            'delivered',
            'discount',
        ];
        const OR = this.prismaService.createInsensitiveSearch(fields, paginationParams);
        if (paginationParams.search && !isNaN(+paginationParams.search)) {
            OR.push({ id: { equals: +paginationParams.search } });
        }
        return this.paginationService.paginate(this.prismaService.payment, paginationParams, {
            where: {
                OR,
            },
        });
    }
    async get(id) {
        return this.prismaService.payment.findUnique({
            where: { id: id },
        });
    }
    async create(data) {
        return this.prismaService.payment.create({
            data,
        });
    }
    async update({ id, data }) {
        console.log('update', { id, data });
        return this.prismaService.payment.update({
            where: { id: id },
            data,
        });
    }
    async delete({ ids }) {
        if (ids == undefined || ids == null) {
            throw new common_1.BadRequestException('You must select at least one item to delete.');
        }
        return this.prismaService.payment.deleteMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => prisma_1.PrismaService))),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => pagination_1.PaginationService))),
    __metadata("design:paramtypes", [prisma_1.PrismaService,
        pagination_1.PaginationService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map