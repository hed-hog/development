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
exports.ContactService = void 0;
const pagination_1 = require("@hedhog/pagination");
const prisma_1 = require("@hedhog/prisma");
const common_1 = require("@nestjs/common");
let ContactService = class ContactService {
    constructor(prismaService, paginationService) {
        this.prismaService = prismaService;
        this.paginationService = paginationService;
    }
    async create(personId, data) {
        return this.prismaService.person_contact.create({
            data: Object.assign({ person_id: personId }, data),
        });
    }
    async list(personId, typeId, contactId) {
        const where = {};
        if (personId !== undefined)
            where.person_id = personId;
        if (typeId !== undefined)
            where.type_id = typeId;
        if (contactId !== undefined)
            where.id = contactId;
        const contacts = await this.prismaService.person_contact.findMany({
            where,
            include: {
                person_contact_type: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
        if (Boolean(contactId) && contacts.length === 0) {
            throw new common_1.NotFoundException(`Contact with ID ${contactId} not found`);
        }
        if (Boolean(typeId) && contacts.length === 0) {
            throw new common_1.NotFoundException(`Type with ID ${typeId} not found`);
        }
        return this.paginationService.paginate(this.prismaService.person_contact, {
            fields: 'id,person_id,type_id,primary,value',
        }, {
            where,
            include: {
                person_contact_type: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
    }
    async update(contactId, data) {
        return this.prismaService.person_contact.update({
            where: { id: contactId },
            data,
        });
    }
    async delete(contactId) {
        return this.prismaService.person_contact
            .delete({
            where: {
                id: contactId,
            },
        })
            .then(() => {
            return { count: 1 };
        });
    }
};
exports.ContactService = ContactService;
exports.ContactService = ContactService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService,
        pagination_1.PaginationService])
], ContactService);
//# sourceMappingURL=contact.service.js.map