import FormPanel, { FormPanelRef } from "@/components/custom/form-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import { usePostCreate } from "@/features/person-type";
import { Post } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type PostCreatePanelRef = {
  submit: () => void;
};

export type PostCreatePanelProps = {
  onCreated?: (data: Post) => void;
};

export const PostCreatePanel = forwardRef(
  ({ onCreated }: PostCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["post", "actions"]);
    const { mutateAsync: createPost } = usePostCreate();

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
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createPost(data);
          if (typeof onCreated === "function") {
            onCreated(createdData);
          }
        }}
      />
    );
  },
);
