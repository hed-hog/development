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
exports.MenuService = void 0;
const pagination_1 = require("@hedhog/pagination");
const prisma_1 = require("@hedhog/prisma");
const common_1 = require("@nestjs/common");
let MenuService = class MenuService {
    constructor(prismaService, paginationService) {
        this.prismaService = prismaService;
        this.paginationService = paginationService;
    }
    async updateScreens(menuId, data) {
        await this.prismaService.menu_screens.deleteMany({
            where: {
                menu_id: menuId,
            },
        });
        return this.prismaService.menu_screens.createMany({
            data: data.ids.map((screenId) => ({
                menu_id: menuId,
                screen_id: screenId,
            })),
            skipDuplicates: true,
        });
    }
    async updateRoles(menuId, data) {
        await this.prismaService.role_menus.deleteMany({
            where: {
                menu_id: menuId,
            },
        });
        return this.prismaService.role_menus.createMany({
            data: data.ids.map((roleId) => ({
                menu_id: menuId,
                role_id: roleId,
            })),
            skipDuplicates: true,
        });
    }
    async listScreens(menuId, paginationParams) {
        return this.paginationService.paginate(this.prismaService.screens, paginationParams, {
            include: {
                menu_screens: {
                    where: {
                        menu_id: menuId,
                    },
                    select: {
                        screen_id: true,
                        menu_id: true,
                    },
                },
            },
        });
    }
    async listRoles(menuId, paginationParams) {
        return this.paginationService.paginate(this.prismaService.roles, paginationParams, {
            include: {
                role_menus: {
                    where: {
                        menu_id: menuId,
                    },
                    select: {
                        role_id: true,
                        menu_id: true,
                    },
                },
            },
        });
    }
    async getMenus(userId, menuId = 0) {
        if (menuId === 0) {
            menuId = null;
        }
        const menus = (await this.prismaService.menus.findMany({
            where: {
                menu_id: menuId,
                role_menus: {
                    some: {
                        roles: {
                            role_users: {
                                some: {
                                    user_id: userId,
                                },
                            },
                        },
                    },
                },
            },
            orderBy: {
                order: 'asc',
            },
        }));
        for (let i = 0; i < menus.length; i++) {
            menus[i].menus = await this.getMenus(userId, menus[i].id);
        }
        return menus;
    }
    async getSystemMenu(userId) {
        return this.getMenus(userId);
    }
    async getMenu(paginationParams) {
        const fields = ['name', 'url', 'icon'];
        const OR = this.prismaService.createInsensitiveSearch(fields, paginationParams);
        return this.paginationService.paginate(this.prismaService.menus, paginationParams, {
            where: {
                OR,
            },
        });
    }
    async get(menuId) {
        return this.prismaService.menus.findUnique({
            where: { id: menuId },
        });
    }
    async create({ name, url, icon, order, menuId }) {
        return this.prismaService.menus.create({
            data: { name, url, icon, order, menu_id: menuId },
        });
    }
    async update({ id, data }) {
        return this.prismaService.menus.update({
            where: { id },
            data,
        });
    }
    async delete({ ids }) {
        if (ids == undefined || ids == null) {
            throw new common_1.BadRequestException(`You must select at least one menu to delete.`);
        }
        return this.prismaService.menus.deleteMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });
    }
    async updateOrder({ ids }) {
        const count = await this.prismaService.menus.count({
            where: {
                id: {
                    in: ids,
                },
            },
        });
        if (count !== ids.length) {
            throw new common_1.BadRequestException('IDs inválidos.');
        }
        await Promise.all(ids.map((id, index) => this.prismaService.menus.update({
            where: { id },
            data: { order: index + 1 },
        })));
    }
};
exports.MenuService = MenuService;
exports.MenuService = MenuService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => prisma_1.PrismaService))),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => pagination_1.PaginationService))),
    __metadata("design:paramtypes", [prisma_1.PrismaService,
        pagination_1.PaginationService])
], MenuService);
//# sourceMappingURL=menu.service.js.map