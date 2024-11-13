"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryModule = void 0;
const prisma_1 = require("@hedhog/prisma");
const common_1 = require("@nestjs/common");
const country_controller_1 = require("./country.controller");
const country_service_1 = require("./country.service");
let CountryModule = class CountryModule {
};
exports.CountryModule = CountryModule;
exports.CountryModule = CountryModule = __decorate([
    (0, common_1.Module)({
        providers: [country_service_1.CountryService],
        exports: [country_service_1.CountryService],
        controllers: [country_controller_1.CountryController],
        imports: [(0, common_1.forwardRef)(() => prisma_1.PrismaModule)],
    })
], CountryModule);
//# sourceMappingURL=country.module.js.map