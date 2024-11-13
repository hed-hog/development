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
exports.CustomController = void 0;
const admin_1 = require("@hedhog/admin");
const common_1 = require("@nestjs/common");
const optional_parse_int_pipe_1 = require("../pipes/optional-parse-int.pipe");
const custom_service_1 = require("./custom.service");
const create_custom_dto_1 = require("./dto/create-custom.dto");
const update_custom_dto_1 = require("./dto/update-custom.dto");
let CustomController = class CustomController {
    constructor(customService) {
        this.customService = customService;
    }
    create(personId, data) {
        return this.customService.create(personId, data);
    }
    list(personId, typeId, customId) {
        if (customId) {
            return this.customService.list(personId, null, customId);
        }
        if (typeId) {
            return this.customService.list(personId, typeId);
        }
        return this.customService.list(personId);
    }
    update(id, data) {
        return this.customService.update(id, data);
    }
    delete(CustomId) {
        return this.customService.delete(CustomId);
    }
};
exports.CustomController = CustomController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('personId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_custom_dto_1.CreatePersonCustomDTO]),
    __metadata("design:returntype", void 0)
], CustomController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('personId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('typeId', optional_parse_int_pipe_1.OptionalParseIntPipe)),
    __param(2, (0, common_1.Query)('id', optional_parse_int_pipe_1.OptionalParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", void 0)
], CustomController.prototype, "list", null);
__decorate([
    (0, common_1.Patch)(':customId'),
    __param(0, (0, common_1.Param)('customId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_custom_dto_1.UpdatePersonCustomDTO]),
    __metadata("design:returntype", void 0)
], CustomController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':customId'),
    __param(0, (0, common_1.Param)('customId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CustomController.prototype, "delete", null);
exports.CustomController = CustomController = __decorate([
    (0, admin_1.Role)(),
    (0, common_1.Controller)('person/:personId/customs'),
    __metadata("design:paramtypes", [custom_service_1.CustomService])
], CustomController);
//# sourceMappingURL=custom.controller.js.map