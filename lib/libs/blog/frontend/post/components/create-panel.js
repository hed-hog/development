"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCreatePanel = void 0;
const form_panel_1 = __importDefault(require("@/components/custom/form-panel"));
const EnumFieldType_1 = require("@/enums/EnumFieldType");
const person_type_1 = require("@/features/person-type");
const react_1 = require("react");
const react_i18next_1 = require("react-i18next");
exports.PostCreatePanel = (0, react_1.forwardRef)(({ onCreated }, ref) => {
    const formRef = (0, react_1.useRef)(null);
    const { t } = (0, react_i18next_1.useTranslation)(["post", "actions"]);
    const { mutateAsync: createPost } = (0, person_type_1.usePostCreate)();
    (0, react_1.useImperativeHandle)(ref, () => ({
        submit: () => {
            var _a;
            (_a = formRef.current) === null || _a === void 0 ? void 0 : _a.submit();
        },
    }), [formRef]);
    return (<form_panel_1.default ref={formRef} fields={[
            {
                name: "title",
                label: { text: t("title", { ns: "translation" }) },
                type: EnumFieldType_1.EnumFieldType.TEXT,
                required: true,
            },
            {
                name: "content",
                label: { text: t("content", { ns: "translation" }) },
                type: EnumFieldType_1.EnumFieldType.TEXT,
                required: true,
            },
            {
                name: "author_id",
                label: { text: t("author_id", { ns: "translation" }) },
                type: EnumFieldType_1.EnumFieldType.TEXT,
                required: true,
            },
            {
                name: "category_id",
                label: { text: t("category_id", { ns: "translation" }) },
                type: EnumFieldType_1.EnumFieldType.TEXT,
                required: true,
            },
        ]} button={{ text: t("create", { ns: "actions" }) }} onSubmit={async (data) => {
            const createdData = await createPost(data);
            if (typeof onCreated === "function") {
                onCreated(createdData);
            }
        }}/>);
});
//# sourceMappingURL=create-panel.js.map