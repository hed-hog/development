import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from "@/components/panels/form-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import { useTagCreate } from "@/features/tag/tag";
import { Tag } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type TagCreatePanelRef = {
  submit: () => void;
};

export type TagCreatePanelProps = {
  onCreated?: (data: Tag) => void;
};

const TagCreatePanel = forwardRef(({ onCreated }: TagCreatePanelProps, ref) => {
  const formRef = useRef<FormPanelRef>(null);
  const { t } = useTranslation(["actions", "fields", "translations"]);
  const { mutateAsync: createTag } = useTagCreate();

  useImperativeHandle(
    ref,
    () => ({
      submit: () => {
        formRef.current?.submit();
      },
    }),
    [formRef],
  );

  return (
    <FormPanel
      ref={formRef}
      fields={[
        {
          name: "slug",
          label: { text: t("tag.slug", { ns: "fields" }) },
          type: EnumFieldType.TEXT,
          required: true,
        },

        ...getFieldsLocale([{ name: "name" }]),
      ]}
      button={{ text: t("create", { ns: "actions" }) }}
      onSubmit={async (data) => {
        const createdData = await createTag({
          data,
        });
        if (typeof onCreated === "function") {
          onCreated(createdData as any);
        }
      }}
    />
  );
});

TagCreatePanel.displayName = "TagCreatePanel";

export default TagCreatePanel;
