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
exports.PersonTypeService = void 0;
const admin_1 = require("@hedhog/admin");
const pagination_1 = require("@hedhog/pagination");
const prisma_1 = require("@hedhog/prisma");
const utils_1 = require("@hedhog/utils");
const common_1 = require("@nestjs/common");
let PersonTypeService = class PersonTypeService {
    constructor(prismaService, paginationService, localeService) {
        this.prismaService = prismaService;
        this.paginationService = paginationService;
        this.localeService = localeService;
    }
    async list(locale, paginationParams) {
        const fields = [];
        const OR = this.prismaService.createInsensitiveSearch(fields, paginationParams);
        return this.paginationService.paginate(this.prismaService.person_type, paginationParams, {
            where: {
                OR,
            },
            include: {
                person_type_locale: {
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
        }, 'person_type_locale');
    }
    async get(locale, typeId) {
        return (0, utils_1.getWithLocale)(locale, 'person_type_locale', await this.prismaService.person_type.findUnique({
            where: { id: typeId },
            include: {
                person_type_locale: {
                    where: {
                        locale: {
                            enabled: true,
                        },
                    },
                    select: {
                        name: true,
                        locale: {
                            select: {
                                code: true,
                            },
                        },
                    },
                },
            },
        }));
    }
    async create({ slug, locale }) {
        return this.localeService.createModelWithLocale('person_type', 'type_id', { slug }, locale);
    }
    async update({ id, data: { locale, slug }, }) {
        return this.localeService.updateModelWithLocale('person_type', 'type_id', id, { slug }, locale);
    }
    async delete({ ids }) {
        if (ids == undefined || ids == null) {
            throw new common_1.BadRequestException(`You must select at least one PersonType to delete.`);
        }
        return await this.prismaService.person_type.deleteMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });
    }
};
exports.PersonTypeService = PersonTypeService;
exports.PersonTypeService = PersonTypeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService,
        pagination_1.PaginationService,
        admin_1.LocaleService])
], PersonTypeService);
//# sourceMappingURL=person-type.service.js.map