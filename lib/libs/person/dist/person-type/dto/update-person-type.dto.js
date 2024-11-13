"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePersonTypeDTO = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_person_type_dto_1 = require("./create-person-type.dto");
class UpdatePersonTypeDTO extends (0, mapped_types_1.PartialType)(create_person_type_dto_1.CreatePersonTypeDTO) {
}
exports.UpdatePersonTypeDTO = UpdatePersonTypeDTO;
//# sourceMappingURL=update-person-type.dto.js.map