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
exports.DocumentService = void 0;
const pagination_1 = require("@hedhog/pagination");
const prisma_1 = require("@hedhog/prisma");
const common_1 = require("@nestjs/common");
let DocumentService = class DocumentService {
    constructor(prismaService, paginationService) {
        this.prismaService = prismaService;
        this.paginationService = paginationService;
    }
    async create(personId, data) {
        return this.prismaService.person_document.create({
            data: Object.assign({ person_id: personId }, data),
        });
    }
    async list(personId, typeId, documentId) {
        const where = {};
        if (personId)
            where.person_id = personId;
        if (typeId)
            where.type_id = typeId;
        if (documentId)
            where.id = documentId;
        const documents = await this.paginationService.paginate(this.prismaService.person_document, {
            fields: 'id,person_id,type_id,primary,value,country_id,issued_at,expiry_at',
        }, {
            where,
            include: {
                person_document_type: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                country: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        if (documentId && !documents) {
            throw new common_1.NotFoundException(`Document with ID ${documentId} not found`);
        }
        return documents;
    }
    async update(documentId, data) {
        return this.prismaService.person_document.update({
            where: { id: documentId },
            data,
        });
    }
    async delete(documentId) {
        return this.prismaService.person_document
            .delete({
            where: {
                id: documentId,
            },
        })
            .then(() => {
            return { count: 1 };
        });
    }
};
exports.DocumentService = DocumentService;
exports.DocumentService = DocumentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService,
        pagination_1.PaginationService])
], DocumentService);
//# sourceMappingURL=document.service.js.map