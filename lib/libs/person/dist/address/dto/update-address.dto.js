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
exports.UpdatePersonAddressDTO = void 0;
const class_validator_1 = require("class-validator");
class UpdatePersonAddressDTO {
    constructor() {
        this.primary = false;
    }
}
exports.UpdatePersonAddressDTO = UpdatePersonAddressDTO;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'TypeID must be an integer number.' }),
    __metadata("design:type", Number)
], UpdatePersonAddressDTO.prototype, "type_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)({ message: 'Primary must be a boolean.' }),
    __metadata("design:type", Boolean)
], UpdatePersonAddressDTO.prototype, "primary", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Street must be a string.' }),
    __metadata("design:type", String)
], UpdatePersonAddressDTO.prototype, "street", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'Number must be a number.' }),
    __metadata("design:type", Number)
], UpdatePersonAddressDTO.prototype, "number", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Complement must be a string.' }),
    __metadata("design:type", String)
], UpdatePersonAddressDTO.prototype, "complement", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'District must be a string.' }),
    __metadata("design:type", String)
], UpdatePersonAddressDTO.prototype, "district", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'City must be a string.' }),
    __metadata("design:type", String)
], UpdatePersonAddressDTO.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'State must be a string.' }),
    __metadata("design:type", String)
], UpdatePersonAddressDTO.prototype, "state", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Postal Code must be a string.' }),
    __metadata("design:type", String)
], UpdatePersonAddressDTO.prototype, "postal_code", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Reference must be a string.' }),
    __metadata("design:type", String)
], UpdatePersonAddressDTO.prototype, "reference", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'CountryID must be a number.' }),
    __metadata("design:type", Number)
], UpdatePersonAddressDTO.prototype, "country_id", void 0);
//# sourceMappingURL=update-address.dto.js.map