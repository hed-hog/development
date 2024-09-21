"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permission = exports.WITH_PERMISSION = void 0;
const common_1 = require("@nestjs/common");
exports.WITH_PERMISSION = 'withPermission';
const Permission = () => (0, common_1.SetMetadata)(exports.WITH_PERMISSION, true);
exports.Permission = Permission;
//# sourceMappingURL=permission.decorator.js.map