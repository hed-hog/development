import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import { useIndicesTypeCreate } from "@/features/cbc/indices-type";
import { IndicesType } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type IndicesTypeCreatePanelRef = {
  submit: () => void;
};

export type IndicesTypeCreatePanelProps = {
  onCreated?: (data: IndicesType) => void;
};

const IndicesTypeCreatePanel = forwardRef(
  ({ onCreated }: IndicesTypeCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createIndicesType } = useIndicesTypeCreate();

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
            label: { text: t("indices_type.slug", { ns: "fields" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },
        ]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createIndicesType({
            data,
          });
          if (typeof onCreated === "function") {
            onCreated(createdData as any);
          }
        }}
      />
    );
  },
);

IndicesTypeCreatePanel.displayName = "IndicesTypeCreatePanel";

export default IndicesTypeCreatePanel;
