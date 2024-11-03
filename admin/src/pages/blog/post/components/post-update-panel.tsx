import FormPanel, { FormPanelRef } from "@/components/custom/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/custom/tab-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import { usePostGet, usePostUpdate } from "@/features/post";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { Post } from "@/types/models";
import { t } from "i18next";
import { forwardRef, useImperativeHandle, useRef } from "react";

export type PostUpdatePanelProps = {
  data: Post;
  onUpdated?: (data: Post) => void;
};

export const PostUpdatePanel = forwardRef(
  ({ data, onUpdated }: PostUpdatePanelProps, ref) => {
    const { data: item, isLoading } = usePostGet(data.id as number);
    const { mutate: postUpdate } = usePostUpdate();
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
                      name: "title",
                      label: { text: t("title", { ns: "translation" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "content",
                      label: { text: t("content", { ns: "translation" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "author_id",
                      label: { text: t("author_id", { ns: "translation" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "category_id",
                      label: { text: t("category_id", { ns: "translation" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },
                  ]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    postUpdate({ id: data.id, data });
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
