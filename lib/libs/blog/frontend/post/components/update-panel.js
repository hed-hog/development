"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostUpdatePanel = void 0;
const form_panel_1 = __importDefault(require("@/components/custom/form-panel"));
const overlay_1 = require("@/components/custom/overlay");
const tab_panel_1 = require("@/components/custom/tab-panel");
const EnumFieldType_1 = require("@/enums/EnumFieldType");
const post_1 = require("@/features/post");
const use_effect_after_first_update_1 = __importDefault(require("@/hooks/use-effect-after-first-update"));
const i18next_1 = require("i18next");
const react_1 = require("react");
exports.PostUpdatePanel = (0, react_1.forwardRef)(({ data, onUpdated }, ref) => {
    const { data: item, isLoading } = (0, post_1.usePostGet)(data.id);
    const { mutate: postUpdate } = (0, post_1.usePostUpdate)();
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
                <form_panel_1.default ref={formRef} fields={[
                        {
                            name: "title",
                            label: { text: (0, i18next_1.t)("title", { ns: "translation" }) },
                            type: EnumFieldType_1.EnumFieldType.TEXT,
                            required: true,
                        },
                        {
                            name: "content",
                            label: { text: (0, i18next_1.t)("content", { ns: "translation" }) },
                            type: EnumFieldType_1.EnumFieldType.TEXT,
                            required: true,
                        },
                        {
                            name: "author_id",
                            label: { text: (0, i18next_1.t)("author_id", { ns: "translation" }) },
                            type: EnumFieldType_1.EnumFieldType.TEXT,
                            required: true,
                        },
                        {
                            name: "category_id",
                            label: { text: (0, i18next_1.t)("category_id", { ns: "translation" }) },
                            type: EnumFieldType_1.EnumFieldType.TEXT,
                            required: true,
                        },
                    ]} button={{ text: (0, i18next_1.t)("save", { ns: "actions" }) }} onSubmit={(data) => {
                        postUpdate({ id: data.id, data });
                        if (typeof onUpdated === "function") {
                            onUpdated(data);
                        }
                    }}/>
              </overlay_1.Overlay>),
            },
        ]}/>);
});
//# sourceMappingURL=update-panel.js.map