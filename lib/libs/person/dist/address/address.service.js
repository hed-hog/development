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
exports.AddressService = void 0;
const pagination_1 = require("@hedhog/pagination");
const prisma_1 = require("@hedhog/prisma");
const common_1 = require("@nestjs/common");
let AddressService = class AddressService {
    constructor(prismaService, paginationService) {
        this.prismaService = prismaService;
        this.paginationService = paginationService;
    }
    async create(personId, data) {
        return this.prismaService.person_address.create({
            data: Object.assign({ person_id: personId, country_id: data.country_id }, data),
        });
    }
    async list(personId, typeId, addressId) {
        if (addressId) {
            return this.prismaService.person_address.findFirst({
                where: { id: addressId },
            });
        }
        if (typeId) {
            const address = await this.prismaService.person_address.findFirst({
                where: {
                    person_id: personId,
                    type_id: typeId,
                },
            });
            if (!address) {
                throw new common_1.NotFoundException(`Type with ID ${typeId} not found`);
            }
            return address;
        }
        return this.paginationService.paginate(this.prismaService.person_address, {
            fields: 'id,type_id,person_id,primary,street,number,complement,district,city,state,postal_code,reference,country_id',
        }, {
            where: {
                person_id: personId,
            },
        });
    }
    async update(addressId, data) {
        return this.prismaService.person_address.update({
            where: { id: addressId },
            data,
        });
    }
    async delete(addressId) {
        return this.prismaService.person_address
            .delete({
            where: {
                id: addressId,
            },
        })
            .then(() => {
            return { count: 1 };
        });
    }
};
exports.AddressService = AddressService;
exports.AddressService = AddressService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService,
        pagination_1.PaginationService])
], AddressService);
//# sourceMappingURL=address.service.js.map