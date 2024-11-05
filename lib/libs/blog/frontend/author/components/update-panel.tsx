import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import { useAuthorGet, useAuthorUpdate } from "@/features/blog/author";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { Author } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type AuthorUpdatePanelProps = {
  data: Author;
  onUpdated?: (data: Author) => void;
};

const AuthorUpdatePanel = forwardRef(
  ({ data, onUpdated }: AuthorUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions"]);
    const { data: item, isLoading } = useAuthorGet(data.id as number);
    const { mutate: authorUpdate } = useAuthorUpdate();
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
                  ]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    authorUpdate({ id: data.id, data });
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

AuthorUpdatePanel.displayName = "AuthorUpdatePanel";

export default AuthorUpdatePanel;
