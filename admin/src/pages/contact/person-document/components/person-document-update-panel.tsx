import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
  usePersonDocumentGet,
  usePersonDocumentUpdate,
} from "@/features/contact/person-document";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { PersonDocument } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { EnumFieldType } from "@/enums/EnumFieldType";

export type PersonDocumentUpdatePanelProps = {
  data: PersonDocument;
  onUpdated?: (data: PersonDocument) => void;
};

const PersonDocumentUpdatePanel = forwardRef(
  ({ data, onUpdated }: PersonDocumentUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions"]);
    const { data: item, isLoading } = usePersonDocumentGet(data.id as number);
    const { mutate: personDocumentUpdate } = usePersonDocumentUpdate();
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
                      url: "/person-document-type",
                      displayName: "type",
                      valueName: "id",
                    },

                    {
                      name: "country_id",
                      label: { text: t("country_id", { ns: "translation" }) },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: "/country",
                      displayName: "country",
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

                    {
                      name: "issued_at",
                      label: { text: t("issued_at", { ns: "translation" }) },
                      type: EnumFieldType.DATEPICKER,
                      required: true,
                    },

                    {
                      name: "expiry_at",
                      label: { text: t("expiry_at", { ns: "translation" }) },
                      type: EnumFieldType.DATEPICKER,
                      required: true,
                    },
                  ]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    personDocumentUpdate({ id: data.id, data });
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

PersonDocumentUpdatePanel.displayName = "PersonDocumentUpdatePanel";

export default PersonDocumentUpdatePanel;