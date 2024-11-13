"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactTypeModule = void 0;
const pagination_1 = require("@hedhog/pagination");
const prisma_1 = require("@hedhog/prisma");
const common_1 = require("@nestjs/common");
const contact_type_controller_1 = require("./contact-type.controller");
const contact_type_service_1 = require("./contact-type.service");
const admin_1 = require("@hedhog/admin");
let ContactTypeModule = class ContactTypeModule {
};
exports.ContactTypeModule = ContactTypeModule;
exports.ContactTypeModule = ContactTypeModule = __decorate([
    (0, common_1.Module)({
        providers: [contact_type_service_1.ContactTypeService],
        exports: [contact_type_service_1.ContactTypeService],
        controllers: [contact_type_controller_1.ContactTypeController],
        imports: [
            (0, common_1.forwardRef)(() => admin_1.AdminModule),
            (0, common_1.forwardRef)(() => prisma_1.PrismaModule),
            (0, common_1.forwardRef)(() => pagination_1.PaginationModule),
        ],
    })
], ContactTypeModule);
//# sourceMappingURL=contact-type.module.js.map