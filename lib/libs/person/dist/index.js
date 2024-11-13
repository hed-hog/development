"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./person.controller"), exports);
__exportStar(require("./person.module"), exports);
__exportStar(require("./person.service"), exports);
__exportStar(require("./address/address.service"), exports);
__exportStar(require("./address-type/address-type.service"), exports);
__exportStar(require("./contact/contact.service"), exports);
__exportStar(require("./contact-type/contact-type.service"), exports);
__exportStar(require("./country/country.service"), exports);
__exportStar(require("./custom/custom.service"), exports);
__exportStar(require("./custom-type/custom-type.service"), exports);
__exportStar(require("./document/document.service"), exports);
__exportStar(require("./document-type/document-type.service"), exports);
__exportStar(require("./person-type/person-type.service"), exports);
//# sourceMappingURL=index.js.map