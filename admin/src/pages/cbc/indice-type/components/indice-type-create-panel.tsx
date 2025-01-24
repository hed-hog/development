import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import { useIndiceTypeCreate } from "@/features/cbc/indice-type";
import { IndiceType } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type IndiceTypeCreatePanelRef = {
  submit: () => void;
};

export type IndiceTypeCreatePanelProps = {
  onCreated?: (data: IndiceType) => void;
};

const IndiceTypeCreatePanel = forwardRef(
  ({ onCreated }: IndiceTypeCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createIndiceType } = useIndiceTypeCreate();

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
            label: { text: t("indice_type.slug", { ns: "fields" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },
        ]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createIndiceType({
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

IndiceTypeCreatePanel.displayName = "IndiceTypeCreatePanel";

export default IndiceTypeCreatePanel;
