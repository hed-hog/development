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
exports.CreatePersonContactDTO = void 0;
const class_validator_1 = require("class-validator");
class CreatePersonContactDTO {
    constructor() {
        this.primary = false;
    }
}
exports.CreatePersonContactDTO = CreatePersonContactDTO;
__decorate([
    (0, class_validator_1.IsInt)({ message: 'TypeID must be an integer number. ' }),
    __metadata("design:type", Number)
], CreatePersonContactDTO.prototype, "type_id", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)({ message: 'Primary must be a boolean. ' }),
    __metadata("design:type", Object)
], CreatePersonContactDTO.prototype, "primary", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Value must be a string. ' }),
    __metadata("design:type", String)
], CreatePersonContactDTO.prototype, "value", void 0);
//# sourceMappingURL=create-contact.dto.js.map