import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";

import {
  useContactusSubjectGet,
  useContactusSubjectUpdate,
} from "@/features/blog/contactus-subject";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { ContactusSubject } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type ContactusSubjectUpdatePanelProps = {
  data: ContactusSubject;
  onUpdated?: (data: ContactusSubject) => void;
};

const ContactusSubjectUpdatePanel = forwardRef(
  ({ data, onUpdated }: ContactusSubjectUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions"]);
    const { data: item, isLoading } = useContactusSubjectGet(data.id as number);
    const { mutate: contactusSubjectUpdate } = useContactusSubjectUpdate();
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
                  fields={[...getFieldsLocale([{ name: "name" }])]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    contactusSubjectUpdate({ id: data.id, data });
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

ContactusSubjectUpdatePanel.displayName = "ContactusSubjectUpdatePanel";

export default ContactusSubjectUpdatePanel;
