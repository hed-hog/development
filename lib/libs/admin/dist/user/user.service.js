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
exports.UserService = void 0;
const pagination_1 = require("@hedhog/pagination");
const prisma_1 = require("@hedhog/prisma");
const common_1 = require("@nestjs/common");
const bcrypt_1 = require("bcrypt");
const user_constants_1 = require("./constants/user.constants");
let UserService = class UserService {
    constructor(prismaService, paginationService) {
        this.prismaService = prismaService;
        this.paginationService = paginationService;
    }
    async listRoles(userId, paginationParams) {
        return this.paginationService.paginate(this.prismaService.roles, paginationParams, {
            include: {
                role_users: {
                    where: {
                        user_id: userId,
                    },
                    select: {
                        user_id: true,
                        role_id: true,
                    },
                },
            },
        });
    }
    async updateRoles(userId, { ids }) {
        await this.prismaService.roles.deleteMany({
            where: {
                user_id: userId,
            },
        });
        return this.prismaService.roles.createMany({
            data: ids.map((role) => {
                return {
                    user_id: userId,
                    role_id: role,
                };
            }),
            skipDuplicates: true,
        });
    }
    async getUsers(paginationParams) {
        const fields = ['name', 'email'];
        const OR = this.prismaService.createInsensitiveSearch(fields, paginationParams);
        return this.paginationService.paginate(this.prismaService.users, paginationParams, {
            where: {
                OR,
            },
        });
    }
    async get(userId) {
        return this.prismaService.users.findUnique({ where: { id: userId } });
    }
    async hashPassword(password) {
        const salt = await (0, bcrypt_1.genSalt)(user_constants_1.SALT_ROUNDS);
        return (0, bcrypt_1.hash)(password, salt);
    }
    async create({ email, name, password }) {
        const hashedPassword = await this.hashPassword(password);
        return this.prismaService.users.create({
            data: {
                email,
                name,
                password: hashedPassword,
            },
        });
    }
    async update({ id, data }) {
        return this.prismaService.users.update({
            where: { id },
            data,
        });
    }
    async delete({ ids }) {
        if (ids == undefined || ids == null) {
            throw new common_1.BadRequestException(`You must select at least one user to delete.`);
        }
        return this.prismaService.users.deleteMany({
            where: {
                id: {
                    in: ids,
                },
                email: {
                    not: {
                        startsWith: 'root@',
                    },
                },
            },
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => prisma_1.PrismaService))),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => pagination_1.PaginationService))),
    __metadata("design:paramtypes", [prisma_1.PrismaService,
        pagination_1.PaginationService])
], UserService);
//# sourceMappingURL=user.service.js.map