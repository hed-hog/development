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
exports.CustomTypeService = void 0;
const pagination_1 = require("@hedhog/pagination");
const prisma_1 = require("@hedhog/prisma");
const common_1 = require("@nestjs/common");
let CustomTypeService = class CustomTypeService {
    constructor(prismaService, paginationService) {
        this.prismaService = prismaService;
        this.paginationService = paginationService;
    }
    async create(data) {
        return await this.prismaService.person_custom_type.create({
            data,
        });
    }
    async list(locale, paginationParams) {
        const fields = ['slug'];
        const OR = this.prismaService.createInsensitiveSearch(fields, paginationParams);
        return this.paginationService.paginate(this.prismaService.person_custom_type, paginationParams, {
            where: {
                OR,
            },
            include: {
                person_custom_type_locale: {
                    where: {
                        locale: {
                            code: locale,
                        },
                    },
                    select: {
                        name: true,
                    },
                },
            },
        }, 'person_custom_type_locale');
    }
    async get(id) {
        const customType = await this.prismaService.person_custom_type.findUnique({
            where: { id },
        });
        if (!customType) {
            throw new common_1.NotFoundException(`customType with ID ${id} not found`);
        }
        return customType;
    }
    async update(id, data) {
        return await this.prismaService.person_custom_type.update({
            where: { id },
            data: data,
        });
    }
    async delete({ ids }) {
        if (ids == undefined || ids == null) {
            throw new common_1.BadRequestException(`You must select at least one customType to delete.`);
        }
        return await this.prismaService.person_custom_type.deleteMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });
    }
};
exports.CustomTypeService = CustomTypeService;
exports.CustomTypeService = CustomTypeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService,
        pagination_1.PaginationService])
], CustomTypeService);
//# sourceMappingURL=custom-type.service.js.map