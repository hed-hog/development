import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import { useContactusGet, useContactusUpdate } from "@/features/blog/contactus";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { Contactus } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type ContactusUpdatePanelProps = {
  data: Contactus;
  onUpdated?: (data: Contactus) => void;
};

const ContactusUpdatePanel = forwardRef(
  ({ data, onUpdated }: ContactusUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions"]);
    const { data: item, isLoading } = useContactusGet(data.id as number);
    const { mutate: contactusUpdate } = useContactusUpdate();
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
                      name: "name",
                      label: { text: t("name", { ns: "translation" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "email",
                      label: { text: t("email", { ns: "translation" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "message",
                      label: { text: t("message", { ns: "translation" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "subject_id",
                      label: { text: t("subject_id", { ns: "translation" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },
                  ]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    contactusUpdate({ id: data.id, data });
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

ContactusUpdatePanel.displayName = "ContactusUpdatePanel";

export default ContactusUpdatePanel;
