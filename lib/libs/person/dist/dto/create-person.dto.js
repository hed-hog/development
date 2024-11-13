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
exports.CreatePersonDTO = void 0;
const class_validator_1 = require("class-validator");
class CreatePersonDTO {
}
exports.CreatePersonDTO = CreatePersonDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Name is mandatory.' }),
    (0, class_validator_1.IsString)({ message: 'Name needs to be a string.' }),
    __metadata("design:type", String)
], CreatePersonDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'TypeID is mandatory.' }),
    (0, class_validator_1.IsInt)({ message: 'TypeID must be an integer number.' }),
    __metadata("design:type", Number)
], CreatePersonDTO.prototype, "type_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreatePersonDTO.prototype, "birth_at", void 0);
//# sourceMappingURL=create-person.dto.js.map