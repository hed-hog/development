import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
  usePersonCustomGet,
  usePersonCustomUpdate,
} from "@/features/contact/person-custom";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { PersonCustom } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { EnumFieldType } from "@/enums/EnumFieldType";

export type PersonCustomUpdatePanelProps = {
  data: PersonCustom;
  onUpdated?: (data: PersonCustom) => void;
};

const PersonCustomUpdatePanel = forwardRef(
  ({ data, onUpdated }: PersonCustomUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions"]);
    const { data: item, isLoading } = usePersonCustomGet(data.id as number);
    const { mutate: personCustomUpdate } = usePersonCustomUpdate();
    const formRef = useRef<FormPanelRef>(null);

    useEffectAfterFirstUpdate(() => {
      if (item && formRef.current) {
        formRef.current.setValuesFromItem(item);
      }
    }, [item]);

    useImperativeHandle(ref, () => ({}));

    return (
      <TabPanel
        activeTabIndex={0}
        tabs={[
          {
            title: t("details", { ns: "actions" }),
            children: (
              <Overlay loading={isLoading}>
                <FormPanel
                  ref={formRef}
                  fields={[
                    {
                      name: "person_id",
                      label: { text: t("person_id", { ns: "translation" }) },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: "/person",
                      displayName: "person",
                      valueName: "id",
                    },

                    {
                      name: "type_id",
                      label: { text: t("type_id", { ns: "translation" }) },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: "/person-custom-type",
                      displayName: "type",
                      valueName: "id",
                    },

                    {
                      name: "value",
                      label: { text: t("value", { ns: "translation" }) },
                      type: EnumFieldType.RICHTEXT,
                      required: true,
                    },

                    ...getFieldsLocale([{ name: "name" }], item),
                  ]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    personCustomUpdate({ id: data.id, data });
                    if (typeof onUpdated === "function") {
                      onUpdated(data);
                    }
                  }}
                />
              </Overlay>
            ),
          },
        ]}
      />
    );
  },
);

PersonCustomUpdatePanel.displayName = "PersonCustomUpdatePanel";

export default PersonCustomUpdatePanel;
