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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomService = void 0;
const pagination_1 = require("@hedhog/pagination");
const prisma_1 = require("@hedhog/prisma");
const common_1 = require("@nestjs/common");
let CustomService = class CustomService {
    constructor(prismaService, paginationService) {
        this.prismaService = prismaService;
        this.paginationService = paginationService;
    }
    async create(personId, data) {
        return this.prismaService.person_customs.create({
            data: Object.assign({ person_id: personId }, data),
        });
    }
    async list(personId, customId, typeId) {
        const whereClause = { person_id: personId };
        if (customId) {
            whereClause.id = customId;
        }
        if (typeId) {
            whereClause.type_id = typeId;
        }
        const customs = await this.prismaService.person_customs.findMany({
            where: whereClause,
            include: {
                person_custom_types: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
        if (customId && customs.length === 0) {
            throw new common_1.NotFoundException(`ID not found`);
        }
        return this.paginationService.paginate(this.prismaService.person_customs, {
            fields: 'id,person_id,type_id,name,value',
        }, {
            where: whereClause,
            include: {
                person_custom_types: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
    }
    async update(customId, data) {
        return this.prismaService.person_customs.update({
            where: { id: customId },
            data,
        });
    }
    async delete(customId) {
        return this.prismaService.person_customs
            .delete({
            where: {
                id: customId,
            },
        })
            .then(() => {
            return { count: 1 };
        });
    }
};
exports.CustomService = CustomService;
exports.CustomService = CustomService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService,
        pagination_1.PaginationService])
], CustomService);
//# sourceMappingURL=custom.service.js.map