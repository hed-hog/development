import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import { useQuotationRequestTypeCreate } from "@/features/cbc/quotation-request-type";
import { QuotationRequestType } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type QuotationRequestTypeCreatePanelRef = {
  submit: () => void;
};

export type QuotationRequestTypeCreatePanelProps = {
  onCreated?: (data: QuotationRequestType) => void;
};

const QuotationRequestTypeCreatePanel = forwardRef(
  ({ onCreated }: QuotationRequestTypeCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createQuotationRequestType } =
      useQuotationRequestTypeCreate();

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
            label: { text: t("quotation_request_type.name", { ns: "fields" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },

          {
            name: "description",
            label: {
              text: t("quotation_request_type.description", { ns: "fields" }),
            },
            type: EnumFieldType.TEXTAREA,
            required: true,
          },

          {
            name: "filters",
            label: {
              text: t("quotation_request_type.filters", { ns: "fields" }),
            },
            type: EnumFieldType.TEXTAREA,
            required: true,
          },
        ]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createQuotationRequestType({
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

QuotationRequestTypeCreatePanel.displayName = "QuotationRequestTypeCreatePanel";

export default QuotationRequestTypeCreatePanel;
