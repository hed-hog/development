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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonTypeController = void 0;
const admin_1 = require("@hedhog/admin");
const pagination_1 = require("@hedhog/pagination");
const common_1 = require("@nestjs/common");
const delete_dto_1 = require("../dto/delete.dto");
const create_person_type_dto_1 = require("./dto/create-person-type.dto");
const update_person_type_dto_1 = require("./dto/update-person-type.dto");
const person_type_service_1 = require("./person-type.service");
let PersonTypeController = class PersonTypeController {
    constructor(personTypeService) {
        this.personTypeService = personTypeService;
    }
    async create(data) {
        return this.personTypeService.create(data);
    }
    async list(paginationParams, locale) {
        return this.personTypeService.list(locale, paginationParams);
    }
    async get(id, locale) {
        return this.personTypeService.get(locale, id);
    }
    async update(id, data) {
        return this.personTypeService.update({
            id,
            data,
        });
    }
    async delete(data) {
        return this.personTypeService.delete(data);
    }
};
exports.PersonTypeController = PersonTypeController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_person_type_dto_1.CreatePersonTypeDTO]),
    __metadata("design:returntype", Promise)
], PersonTypeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, pagination_1.Pagination)()),
    __param(1, (0, admin_1.Locale)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PersonTypeController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':personTypeId'),
    __param(0, (0, common_1.Param)('personTypeId', common_1.ParseIntPipe)),
    __param(1, (0, admin_1.Locale)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PersonTypeController.prototype, "get", null);
__decorate([
    (0, common_1.Patch)(':personTypeId'),
    __param(0, (0, common_1.Param)('personTypeId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_person_type_dto_1.UpdatePersonTypeDTO]),
    __metadata("design:returntype", Promise)
], PersonTypeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_dto_1.DeleteDTO]),
    __metadata("design:returntype", Promise)
], PersonTypeController.prototype, "delete", null);
exports.PersonTypeController = PersonTypeController = __decorate([
    (0, admin_1.Role)(),
    (0, common_1.Controller)('person-type'),
    __metadata("design:paramtypes", [person_type_service_1.PersonTypeService])
], PersonTypeController);
//# sourceMappingURL=person-type.controller.js.map