import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import { useQuotationTypeCreate } from "@/features/cbc/quotation-type";
import { QuotationType } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type QuotationTypeCreatePanelRef = {
  submit: () => void;
};

export type QuotationTypeCreatePanelProps = {
  onCreated?: (data: QuotationType) => void;
};

const QuotationTypeCreatePanel = forwardRef(
  ({ onCreated }: QuotationTypeCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createQuotationType } = useQuotationTypeCreate();

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
            label: { text: t("quotation_type.name", { ns: "fields" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },

          {
            name: "headers",
            label: { text: t("quotation_type.headers", { ns: "fields" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },

          {
            name: "filters",
            label: { text: t("quotation_type.filters", { ns: "fields" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },
        ]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createQuotationType({
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

QuotationTypeCreatePanel.displayName = "QuotationTypeCreatePanel";

export default QuotationTypeCreatePanel;
