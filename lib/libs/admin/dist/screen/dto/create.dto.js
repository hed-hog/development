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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDTO = void 0;
const class_validator_1 = require("class-validator");
class CreateDTO {
}
exports.CreateDTO = CreateDTO;
__decorate([
    (0, class_validator_1.IsString)({ message: 'O nome deve ser uma string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O nome é obrigatório.' }),
    __metadata("design:type", String)
], CreateDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'O slug deve ser uma string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O slug é obrigatório.' }),
    __metadata("design:type", String)
], CreateDTO.prototype, "slug", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'A descrição deve ser uma string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'A descrição é obrigatória.' }),
    __metadata("design:type", String)
], CreateDTO.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'O ícone deve ser uma string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'A descrição é obrigatória.' }),
    __metadata("design:type", String)
], CreateDTO.prototype, "icon", void 0);
//# sourceMappingURL=create.dto.js.map