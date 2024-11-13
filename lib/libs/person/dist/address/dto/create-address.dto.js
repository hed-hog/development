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
exports.CreatePersonAddressDTO = void 0;
const class_validator_1 = require("class-validator");
class CreatePersonAddressDTO {
    constructor() {
        this.primary = false;
    }
}
exports.CreatePersonAddressDTO = CreatePersonAddressDTO;
__decorate([
    (0, class_validator_1.IsInt)({ message: 'TypeID must be an integer number.' }),
    __metadata("design:type", Number)
], CreatePersonAddressDTO.prototype, "type_id", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)({ message: 'Primary must be a boolean.' }),
    __metadata("design:type", Object)
], CreatePersonAddressDTO.prototype, "primary", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Street must be a string.' }),
    __metadata("design:type", String)
], CreatePersonAddressDTO.prototype, "street", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: 'Number must be a number.' }),
    __metadata("design:type", Number)
], CreatePersonAddressDTO.prototype, "number", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Complement must be a string.' }),
    __metadata("design:type", String)
], CreatePersonAddressDTO.prototype, "complement", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'District must be a string.' }),
    __metadata("design:type", String)
], CreatePersonAddressDTO.prototype, "district", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'City must be a string.' }),
    __metadata("design:type", String)
], CreatePersonAddressDTO.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'State must be a string.' }),
    __metadata("design:type", String)
], CreatePersonAddressDTO.prototype, "state", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Postal Code must be a string.' }),
    __metadata("design:type", String)
], CreatePersonAddressDTO.prototype, "postal_code", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Reference must be a string.' }),
    __metadata("design:type", String)
], CreatePersonAddressDTO.prototype, "reference", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'CountryID must be a number.' }),
    __metadata("design:type", Number)
], CreatePersonAddressDTO.prototype, "country_id", void 0);
//# sourceMappingURL=create-address.dto.js.map