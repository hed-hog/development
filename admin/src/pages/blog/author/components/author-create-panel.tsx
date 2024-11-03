import FormPanel, { FormPanelRef } from "@/components/custom/form-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import { useAuthorCreate } from "@/features/person-type";
import { Author } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type AuthorCreatePanelRef = {
  submit: () => void;
};

export type AuthorCreatePanelProps = {
  onCreated?: (data: Author) => void;
};

export const AuthorCreatePanel = forwardRef(
  ({ onCreated }: AuthorCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["author", "actions"]);
    const { mutateAsync: createAuthor } = useAuthorCreate();

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
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createAuthor(data);
          if (typeof onCreated === "function") {
            onCreated(createdData);
          }
        }}
      />
    );
  },
);
