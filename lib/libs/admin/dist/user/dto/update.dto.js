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
exports.UpdateDTO = void 0;
const class_validator_1 = require("class-validator");
class UpdateDTO {
}
exports.UpdateDTO = UpdateDTO;
__decorate([
    (0, class_validator_1.IsString)({ message: 'The name must be a string' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'The email must be a valid email' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsStrongPassword)({
        minLength: 6,
        minLowercase: 1,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0,
    }, {
        message: 'The password must be at least 6 characters long and contain at least one lowercase',
    }),
    __metadata("design:type", String)
], UpdateDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'The multifactor_id must be an integer' }),
    __metadata("design:type", Number)
], UpdateDTO.prototype, "multifactor_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'The code must be a string' }),
    __metadata("design:type", String)
], UpdateDTO.prototype, "code", void 0);
//# sourceMappingURL=update.dto.js.map