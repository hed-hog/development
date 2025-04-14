import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import { useContentGet, useContentUpdate } from "@/features/content/content";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { Content } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { EnumFieldType } from "@/enums/EnumFieldType";

export type ContentUpdatePanelProps = {
  data: Content;
  onUpdated?: (data: Content) => void;
};

const ContentUpdatePanel = forwardRef(
  ({ data, onUpdated }: ContentUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useContentGet(data.id as number);
    const { mutate: contentUpdate } = useContentUpdate();
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
                      name: "slug",
                      label: { text: t("content.slug", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    ...getFieldsLocale(
                      [
                        {
                          name: "title",
                          label: { text: t("content.title", { ns: "fields" }) },
                          type: EnumFieldType.TEXT,
                          required: true,
                        },
                        {
                          name: "body",
                          label: { text: t("content.body", { ns: "fields" }) },
                          type: EnumFieldType.RICHTEXT,
                          required: true,
                        },
                      ],
                      item,
                    ),
                  ]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    contentUpdate({
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

ContentUpdatePanel.displayName = "ContentUpdatePanel";

export default ContentUpdatePanel;
