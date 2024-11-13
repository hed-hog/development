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
exports.ContactTypeController = void 0;
const admin_1 = require("@hedhog/admin");
const pagination_1 = require("@hedhog/pagination");
const common_1 = require("@nestjs/common");
const delete_dto_1 = require("../dto/delete.dto");
const contact_type_service_1 = require("./contact-type.service");
const create_contact_type_dto_1 = require("./dto/create-contact-type.dto");
const update_contact_type_dto_1 = require("./dto/update-contact-type.dto");
let ContactTypeController = class ContactTypeController {
    constructor(contactTypeService) {
        this.contactTypeService = contactTypeService;
    }
    create(data) {
        return this.contactTypeService.create(data);
    }
    getContactTypes(paginationParams, locale) {
        return this.contactTypeService.list(locale, paginationParams);
    }
    getContactTypeById(id) {
        return this.contactTypeService.get(id);
    }
    update(id, data) {
        return this.contactTypeService.update(id, data);
    }
    remove(data) {
        return this.contactTypeService.delete(data);
    }
};
exports.ContactTypeController = ContactTypeController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contact_type_dto_1.CreateContactTypeDTO]),
    __metadata("design:returntype", void 0)
], ContactTypeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, pagination_1.Pagination)()),
    __param(1, (0, admin_1.Locale)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ContactTypeController.prototype, "getContactTypes", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ContactTypeController.prototype, "getContactTypeById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_contact_type_dto_1.UpdateContactTypeDTO]),
    __metadata("design:returntype", void 0)
], ContactTypeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_dto_1.DeleteDTO]),
    __metadata("design:returntype", void 0)
], ContactTypeController.prototype, "remove", null);
exports.ContactTypeController = ContactTypeController = __decorate([
    (0, admin_1.Role)(),
    (0, common_1.Controller)('contact-type'),
    __metadata("design:paramtypes", [contact_type_service_1.ContactTypeService])
], ContactTypeController);
//# sourceMappingURL=contact-type.controller.js.map