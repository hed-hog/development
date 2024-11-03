import FormPanel, { FormPanelRef } from "@/components/custom/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/custom/tab-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import { useAuthorGet, useAuthorUpdate } from "@/features/author";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { Author } from "@/types/models";
import { t } from "i18next";
import { forwardRef, useImperativeHandle, useRef } from "react";

export type AuthorUpdatePanelProps = {
  data: Author;
  onUpdated?: (data: Author) => void;
};

export const AuthorUpdatePanel = forwardRef(
  ({ data, onUpdated }: AuthorUpdatePanelProps, ref) => {
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
