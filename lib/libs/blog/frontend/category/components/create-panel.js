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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryCreatePanel = void 0;
const form_panel_1 = __importStar(require("@/components/custom/form-panel"));
const person_type_1 = require("@/features/person-type");
const react_1 = require("react");
const react_i18next_1 = require("react-i18next");
exports.CategoryCreatePanel = (0, react_1.forwardRef)(({ onCreated }, ref) => {
    const formRef = (0, react_1.useRef)(null);
    const { t } = (0, react_i18next_1.useTranslation)(["category", "actions"]);
    const { mutateAsync: createCategory } = (0, person_type_1.useCategoryCreate)();
    (0, react_1.useImperativeHandle)(ref, () => ({
        submit: () => {
            var _a;
            (_a = formRef.current) === null || _a === void 0 ? void 0 : _a.submit();
        },
    }), [formRef]);
    return (<form_panel_1.default ref={formRef} fields={[...(0, form_panel_1.getFieldsLocale)([{ name: "name" }])]} button={{ text: t("create", { ns: "actions" }) }} onSubmit={async (data) => {
            const createdData = await createCategory(data);
            if (typeof onCreated === "function") {
                onCreated(createdData);
            }
        }}/>);
});
//# sourceMappingURL=create-panel.js.map