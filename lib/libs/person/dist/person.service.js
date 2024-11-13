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
exports.PersonService = void 0;
const pagination_1 = require("@hedhog/pagination");
const prisma_1 = require("@hedhog/prisma");
const utils_1 = require("@hedhog/utils");
const common_1 = require("@nestjs/common");
let PersonService = class PersonService {
    constructor(prismaService, paginationService) {
        this.prismaService = prismaService;
        this.paginationService = paginationService;
    }
    async create(data) {
        return await this.prismaService.person.create({
            data,
        });
    }
    async list(locale, paginationParams) {
        const fields = ['name'];
        const OR = this.prismaService.createInsensitiveSearch(fields, paginationParams);
        const paginate = await this.paginationService.paginate(this.prismaService.person, paginationParams, {
            where: {
                OR,
            },
            include: {
                person_type: {
                    select: {
                        id: true,
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
                },
                person_document: {
                    include: {
                        person_document_type: {
                            select: {
                                id: true,
                                person_document_type_locale: {
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
                        },
                    },
                },
                person_contact: {
                    include: {
                        person_contact_type: {
                            select: {
                                id: true,
                                person_contact_type_locale: {
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
                        },
                    },
                },
                person_address: true,
                person_custom: {
                    include: {
                        person_custom_type: true,
                    },
                },
            },
        });
        paginate.data = paginate.data.map((person) => {
            if (person.person_type) {
                person.person_type = (0, utils_1.itemTranslations)('person_type_locale', person.person_type);
            }
            if (person.person_document) {
                person.person_document = person.person_document.map((document) => {
                    if (document.person_document_type) {
                        document.person_document_type = (0, utils_1.itemTranslations)('person_document_type_locale', document.person_document_type);
                    }
                    return document;
                });
            }
            if (person.person_contact) {
                person.person_contact = person.person_contact.map((contact) => {
                    if (contact.person_contact_type) {
                        contact.person_contact_type = (0, utils_1.itemTranslations)('person_contact_type_locale', contact.person_contact_type);
                    }
                    return contact;
                });
            }
            return person;
        });
        return paginate;
    }
    async get(id) {
        const person = await this.prismaService.person.findUnique({
            where: { id },
            include: {
                person_address: true,
                /*
                person_contact: {
                  include: {
                    person_contact_type: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
                person_custom: {
                  include: {
                    person_custom_type: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
                person_document: {
                  include: {
                    person_document_type: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
                */
            },
        });
        if (!person) {
            throw new common_1.NotFoundException(`Person with ID ${id} not found`);
        }
        return person;
    }
    async update(id, data) {
        return await this.prismaService.person.update({
            where: { id },
            data: data,
        });
    }
    async delete({ ids }) {
        if (ids == undefined || ids == null) {
            throw new common_1.BadRequestException(`You must select at least one person to delete.`);
        }
        return await this.prismaService.person.deleteMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });
    }
};
exports.PersonService = PersonService;
exports.PersonService = PersonService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService,
        pagination_1.PaginationService])
], PersonService);
//# sourceMappingURL=person.service.js.map