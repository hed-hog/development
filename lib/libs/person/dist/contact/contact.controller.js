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
exports.ContactController = void 0;
const admin_1 = require("@hedhog/admin");
const common_1 = require("@nestjs/common");
const optional_parse_int_pipe_1 = require("../pipes/optional-parse-int.pipe");
const contact_service_1 = require("./contact.service");
const create_contact_dto_1 = require("./dto/create-contact.dto");
const update_contact_dto_1 = require("./dto/update-contact.dto");
let ContactController = class ContactController {
    constructor(contactService) {
        this.contactService = contactService;
    }
    create(personId, data) {
        return this.contactService.create(personId, data);
    }
    list(personId, typeId, contactId) {
        if (contactId) {
            return this.contactService.list(personId, null, contactId);
        }
        if (typeId) {
            return this.contactService.list(personId, typeId);
        }
        return this.contactService.list(personId);
    }
    update(id, data) {
        return this.contactService.update(id, data);
    }
    delete(ContactId) {
        return this.contactService.delete(ContactId);
    }
};
exports.ContactController = ContactController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('personId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_contact_dto_1.CreatePersonContactDTO]),
    __metadata("design:returntype", void 0)
], ContactController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('personId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('typeId', optional_parse_int_pipe_1.OptionalParseIntPipe)),
    __param(2, (0, common_1.Query)('id', optional_parse_int_pipe_1.OptionalParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", void 0)
], ContactController.prototype, "list", null);
__decorate([
    (0, common_1.Patch)(':contactId'),
    __param(0, (0, common_1.Param)('contactId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_contact_dto_1.UpdatePersonContactDTO]),
    __metadata("design:returntype", void 0)
], ContactController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':contactId'),
    __param(0, (0, common_1.Param)('contactId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ContactController.prototype, "delete", null);
exports.ContactController = ContactController = __decorate([
    (0, admin_1.Role)(),
    (0, common_1.Controller)('person/:personId/contact'),
    __metadata("design:paramtypes", [contact_service_1.ContactService])
], ContactController);
//# sourceMappingURL=contact.controller.js.map