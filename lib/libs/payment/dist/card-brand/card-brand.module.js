"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardBrandModule = void 0;
const admin_1 = require("@hedhog/admin");
const pagination_1 = require("@hedhog/pagination");
const prisma_1 = require("@hedhog/prisma");
const common_1 = require("@nestjs/common");
const card_brand_service_1 = require("./card-brand.service");
const card_brand_controller_1 = require("./card-brand.controller");
let CardBrandModule = class CardBrandModule {
};
exports.CardBrandModule = CardBrandModule;
exports.CardBrandModule = CardBrandModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => admin_1.AdminModule),
            (0, common_1.forwardRef)(() => prisma_1.PrismaModule),
            (0, common_1.forwardRef)(() => pagination_1.PaginationModule)
        ],
        controllers: [card_brand_controller_1.CardBrandController],
        providers: [card_brand_service_1.CardBrandService],
        exports: [card_brand_service_1.CardBrandService]
    })
], CardBrandModule);
//# sourceMappingURL=card-brand.module.js.map