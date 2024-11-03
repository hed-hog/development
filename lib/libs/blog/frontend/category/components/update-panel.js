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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryUpdatePanel = void 0;
const form_panel_1 = __importStar(require("@/components/custom/form-panel"));
const overlay_1 = require("@/components/custom/overlay");
const tab_panel_1 = require("@/components/custom/tab-panel");
const category_1 = require("@/features/category");
const use_effect_after_first_update_1 = __importDefault(require("@/hooks/use-effect-after-first-update"));
const i18next_1 = require("i18next");
const react_1 = require("react");
exports.CategoryUpdatePanel = (0, react_1.forwardRef)(({ data, onUpdated }, ref) => {
    const { data: item, isLoading } = (0, category_1.useCategoryGet)(data.id);
    const { mutate: categoryUpdate } = (0, category_1.useCategoryUpdate)();
    const formRef = (0, react_1.useRef)(null);
    (0, use_effect_after_first_update_1.default)(() => {
        if (item && formRef.current) {
            formRef.current.setValuesFromItem(item);
        }
    }, [item]);
    (0, react_1.useImperativeHandle)(ref, () => ({}));
    return (<tab_panel_1.TabPanel activeTabIndex={0} tabs={[
            {
                title: (0, i18next_1.t)("details", { ns: "actions" }),
                children: (<overlay_1.Overlay loading={isLoading}>
                <form_panel_1.default ref={formRef} fields={[...(0, form_panel_1.getFieldsLocale)([{ name: "name" }])]} button={{ text: (0, i18next_1.t)("save", { ns: "actions" }) }} onSubmit={(data) => {
                        categoryUpdate({ id: data.id, data });
                        if (typeof onUpdated === "function") {
                            onUpdated(data);
                        }
                    }}/>
              </overlay_1.Overlay>),
            },
        ]}/>);
});
//# sourceMappingURL=update-panel.js.map