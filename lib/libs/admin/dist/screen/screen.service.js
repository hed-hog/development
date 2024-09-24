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
exports.ScreenService = void 0;
const pagination_1 = require("@hedhog/pagination");
const prisma_1 = require("@hedhog/prisma");
const common_1 = require("@nestjs/common");
let ScreenService = class ScreenService {
    constructor(prismaService, paginationService) {
        this.prismaService = prismaService;
        this.paginationService = paginationService;
    }
    async updateRoles(screenId, data) {
        await this.prismaService.role_screens.deleteMany({
            where: {
                screen_id: screenId,
            },
        });
        return this.prismaService.role_screens.createMany({
            data: data.ids.map((roleId) => ({
                screen_id: screenId,
                role_id: roleId,
            })),
            skipDuplicates: true,
        });
    }
    async updateRoutes(screenId, data) {
        await this.prismaService.route_screeens.deleteMany({
            where: {
                screen_id: screenId,
            },
        });
        return this.prismaService.route_screeens.createMany({
            data: data.ids.map((routeId) => ({
                screen_id: screenId,
                route_id: routeId,
            })),
            skipDuplicates: true,
        });
    }
    async listRoutes(screenId) {
        return this.prismaService.routes.findMany({
            where: {
                screens: {
                    some: {
                        id: screenId,
                    },
                },
            },
        });
    }
    async listRoles(screenId) {
        return this.prismaService.roles.findMany({
            where: {
                screens: {
                    some: {
                        id: screenId,
                    },
                },
            },
        });
    }
    async getScreens(paginationParams) {
        const fields = ['name', 'slug', 'description', 'icon'];
        const OR = this.prismaService.createInsensitiveSearch(fields, paginationParams);
        return this.paginationService.paginate(this.prismaService.screens, paginationParams, {
            where: {
                OR,
            },
        });
    }
    async get(screenId) {
        return this.prismaService.screens.findUnique({ where: { id: screenId } });
    }
    async create({ name, slug, description, icon }) {
        return this.prismaService.screens.create({
            data: {
                name,
                slug,
                description,
                icon,
            },
        });
    }
    async update({ id, data }) {
        return this.prismaService.screens.update({
            where: { id },
            data,
        });
    }
    async delete({ ids }) {
        if (ids == undefined || ids == null) {
            throw new common_1.BadRequestException(`You must select at least one screen to delete.`);
        }
        return this.prismaService.screens.deleteMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });
    }
};
exports.ScreenService = ScreenService;
exports.ScreenService = ScreenService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => prisma_1.PrismaService))),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => pagination_1.PaginationService))),
    __metadata("design:paramtypes", [prisma_1.PrismaService,
        pagination_1.PaginationService])
], ScreenService);
//# sourceMappingURL=screen.service.js.map