import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from "@/components/panels/form-panel";

import { useCategoryCreate } from "@/features/blog/category";
import { Category } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type CategoryCreatePanelRef = {
  submit: () => void;
};

export type CategoryCreatePanelProps = {
  onCreated?: (data: Category) => void;
};

const CategoryCreatePanel = forwardRef(
  ({ onCreated }: CategoryCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions"]);
    const { mutateAsync: createCategory } = useCategoryCreate();

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
        fields={[...getFieldsLocale([{ name: "name" }])]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createCategory(data);
          if (typeof onCreated === "function") {
            onCreated(createdData);
          }
        }}
      />
    );
  },
);

CategoryCreatePanel.displayName = "CategoryCreatePanel";

export default CategoryCreatePanel;
