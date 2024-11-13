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
exports.DocumentController = void 0;
const admin_1 = require("@hedhog/admin");
const common_1 = require("@nestjs/common");
const optional_parse_int_pipe_1 = require("../pipes/optional-parse-int.pipe");
const document_service_1 = require("./document.service");
const create_document_dto_1 = require("./dto/create-document.dto");
const update_document_dto_1 = require("./dto/update-document.dto");
let DocumentController = class DocumentController {
    constructor(documentService) {
        this.documentService = documentService;
    }
    create(personId, data) {
        return this.documentService.create(personId, data);
    }
    list(personId, typeId, documentId) {
        if (documentId) {
            return this.documentService.list(personId, null, documentId);
        }
        if (typeId) {
            return this.documentService.list(personId, typeId);
        }
        return this.documentService.list(personId);
    }
    update(id, data) {
        return this.documentService.update(id, data);
    }
    delete(documentId) {
        return this.documentService.delete(documentId);
    }
};
exports.DocumentController = DocumentController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('personId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_document_dto_1.CreatePersonDocumentDTO]),
    __metadata("design:returntype", void 0)
], DocumentController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('personId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('typeId', optional_parse_int_pipe_1.OptionalParseIntPipe)),
    __param(2, (0, common_1.Query)('id', optional_parse_int_pipe_1.OptionalParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", void 0)
], DocumentController.prototype, "list", null);
__decorate([
    (0, common_1.Patch)(':documentId'),
    __param(0, (0, common_1.Param)('documentId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_document_dto_1.UpdatePersonDocumentDTO]),
    __metadata("design:returntype", void 0)
], DocumentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':documentId'),
    __param(0, (0, common_1.Param)('documentId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DocumentController.prototype, "delete", null);
exports.DocumentController = DocumentController = __decorate([
    (0, admin_1.Role)(),
    (0, common_1.Controller)('person/:personId/documents'),
    __metadata("design:paramtypes", [document_service_1.DocumentService])
], DocumentController);
//# sourceMappingURL=document.controller.js.map