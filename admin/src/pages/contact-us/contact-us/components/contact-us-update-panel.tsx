import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
  useContactUsGet,
  useContactUsUpdate,
} from "@/features/contact-us/contact-us";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { ContactUs } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { EnumFieldType } from "@/enums/EnumFieldType";

export type ContactUsUpdatePanelProps = {
  data: ContactUs;
  onUpdated?: (data: ContactUs) => void;
};

const ContactUsUpdatePanel = forwardRef(
  ({ data, onUpdated }: ContactUsUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useContactUsGet(data.id as number);
    const { mutate: contactUsUpdate } = useContactUsUpdate();
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
                      label: { text: t("contact_us.name", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "email",
                      label: { text: t("contact_us.email", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "message",
                      label: {
                        text: t("contact_us.message", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },
                  ]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    contactUsUpdate({
                      id: data.id,
                      data,
                    });
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

ContactUsUpdatePanel.displayName = "ContactUsUpdatePanel";

export default ContactUsUpdatePanel;
