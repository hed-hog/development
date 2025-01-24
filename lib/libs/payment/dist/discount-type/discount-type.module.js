"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscountTypeModule = void 0;
const admin_1 = require("@hedhog/admin");
const pagination_1 = require("@hedhog/pagination");
const prisma_1 = require("@hedhog/prisma");
const common_1 = require("@nestjs/common");
const discount_type_service_1 = require("./discount-type.service");
const discount_type_controller_1 = require("./discount-type.controller");
let DiscountTypeModule = class DiscountTypeModule {
};
exports.DiscountTypeModule = DiscountTypeModule;
exports.DiscountTypeModule = DiscountTypeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => admin_1.AdminModule),
            (0, common_1.forwardRef)(() => prisma_1.PrismaModule),
            (0, common_1.forwardRef)(() => pagination_1.PaginationModule)
        ],
        controllers: [discount_type_controller_1.DiscountTypeController],
        providers: [discount_type_service_1.DiscountTypeService],
        exports: [discount_type_service_1.DiscountTypeService]
    })
], DiscountTypeModule);
//# sourceMappingURL=discount-type.module.js.map