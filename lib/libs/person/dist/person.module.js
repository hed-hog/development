"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonModule = void 0;
const pagination_1 = require("@hedhog/pagination");
const prisma_1 = require("@hedhog/prisma");
const common_1 = require("@nestjs/common");
const person_service_1 = require("./person.service");
const person_controller_1 = require("./person.controller");
const admin_1 = require("@hedhog/admin");
const contact_type_module_1 = require("./contact-type/contact-type.module");
const address_type_module_1 = require("./address-type/address-type.module");
const custom_type_module_1 = require("./custom-type/custom-type.module");
const document_type_module_1 = require("./document-type/document-type.module");
const person_type_module_1 = require("./person-type/person-type.module");
const document_module_1 = require("./document/document.module");
const address_module_1 = require("./address/address.module");
const contact_module_1 = require("./contact/contact.module");
const custom_module_1 = require("./custom/custom.module");
const country_module_1 = require("./country/country.module");
let PersonModule = class PersonModule {
};
exports.PersonModule = PersonModule;
exports.PersonModule = PersonModule = __decorate([
    (0, common_1.Module)({
        providers: [person_service_1.PersonService],
        exports: [person_service_1.PersonService],
        controllers: [person_controller_1.PersonController],
        imports: [
            (0, common_1.forwardRef)(() => admin_1.AdminModule),
            (0, common_1.forwardRef)(() => address_module_1.AddressModule),
            (0, common_1.forwardRef)(() => address_type_module_1.AddressTypeModule),
            (0, common_1.forwardRef)(() => contact_module_1.ContactModule),
            (0, common_1.forwardRef)(() => contact_type_module_1.ContactTypeModule),
            (0, common_1.forwardRef)(() => country_module_1.CountryModule),
            (0, common_1.forwardRef)(() => custom_module_1.CustomModule),
            (0, common_1.forwardRef)(() => custom_type_module_1.CustomTypeModule),
            (0, common_1.forwardRef)(() => document_module_1.DocumentModule),
            (0, common_1.forwardRef)(() => document_type_module_1.DocumentTypeModule),
            (0, common_1.forwardRef)(() => person_type_module_1.PersonTypeModule),
            (0, common_1.forwardRef)(() => prisma_1.PrismaModule),
            (0, common_1.forwardRef)(() => pagination_1.PaginationModule),
        ],
    })
], PersonModule);
//# sourceMappingURL=person.module.js.map