"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentTypeModule = void 0;
const pagination_1 = require("@hedhog/pagination");
const prisma_1 = require("@hedhog/prisma");
const common_1 = require("@nestjs/common");
const document_type_controller_1 = require("./document-type.controller");
const document_type_service_1 = require("./document-type.service");
const admin_1 = require("@hedhog/admin");
let DocumentTypeModule = class DocumentTypeModule {
};
exports.DocumentTypeModule = DocumentTypeModule;
exports.DocumentTypeModule = DocumentTypeModule = __decorate([
    (0, common_1.Module)({
        providers: [document_type_service_1.DocumentTypeService],
        exports: [document_type_service_1.DocumentTypeService],
        controllers: [document_type_controller_1.DocumentTypeController],
        imports: [
            (0, common_1.forwardRef)(() => admin_1.AdminModule),
            (0, common_1.forwardRef)(() => prisma_1.PrismaModule),
            (0, common_1.forwardRef)(() => pagination_1.PaginationModule),
        ],
    })
], DocumentTypeModule);
//# sourceMappingURL=document-type.module.js.map