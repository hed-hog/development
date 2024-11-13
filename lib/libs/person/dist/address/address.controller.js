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
exports.AddressController = void 0;
const admin_1 = require("@hedhog/admin");
const common_1 = require("@nestjs/common");
const optional_parse_int_pipe_1 = require("../pipes/optional-parse-int.pipe");
const address_service_1 = require("./address.service");
const create_address_dto_1 = require("./dto/create-address.dto");
const update_address_dto_1 = require("./dto/update-address.dto");
let AddressController = class AddressController {
    constructor(addressService) {
        this.addressService = addressService;
    }
    create(personId, data) {
        return this.addressService.create(personId, data);
    }
    list(personId, typeId, addressId) {
        if (addressId) {
            return this.addressService.list(personId, null, addressId);
        }
        if (typeId) {
            return this.addressService.list(personId, typeId);
        }
        return this.addressService.list(personId);
    }
    update(addressId, data) {
        return this.addressService.update(addressId, data);
    }
    delete(addressId) {
        return this.addressService.delete(addressId);
    }
};
exports.AddressController = AddressController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('personId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_address_dto_1.CreatePersonAddressDTO]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('personId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('typeId', optional_parse_int_pipe_1.OptionalParseIntPipe)),
    __param(2, (0, common_1.Query)('id', optional_parse_int_pipe_1.OptionalParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "list", null);
__decorate([
    (0, common_1.Patch)(':addressId'),
    __param(0, (0, common_1.Param)('addressId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_address_dto_1.UpdatePersonAddressDTO]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':addressId'),
    __param(0, (0, common_1.Param)('addressId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "delete", null);
exports.AddressController = AddressController = __decorate([
    (0, admin_1.Role)(),
    (0, common_1.Controller)('person/:personId/address'),
    __metadata("design:paramtypes", [address_service_1.AddressService])
], AddressController);
//# sourceMappingURL=address.controller.js.map