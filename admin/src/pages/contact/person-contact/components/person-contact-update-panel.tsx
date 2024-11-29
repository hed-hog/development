import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
  usePersonContactGet,
  usePersonContactUpdate,
} from "@/features/contact/person-contact";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { PersonContact } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { EnumFieldType } from "@/enums/EnumFieldType";

export type PersonContactUpdatePanelProps = {
  data: PersonContact;
  onUpdated?: (data: PersonContact) => void;
};

const PersonContactUpdatePanel = forwardRef(
  ({ data, onUpdated }: PersonContactUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions"]);
    const { data: item, isLoading } = usePersonContactGet(data.id as number);
    const { mutate: personContactUpdate } = usePersonContactUpdate();
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
                      url: "/person-contact-type",
                      displayName: "type",
                      valueName: "id",
                    },

                    {
                      name: "primary",
                      label: { text: t("primary", { ns: "translation" }) },
                      type: EnumFieldType.SWITCH,
                      required: true,
                    },

                    {
                      name: "value",
                      label: { text: t("value", { ns: "translation" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },
                  ]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    personContactUpdate({ id: data.id, data });
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

PersonContactUpdatePanel.displayName = "PersonContactUpdatePanel";

export default PersonContactUpdatePanel;
