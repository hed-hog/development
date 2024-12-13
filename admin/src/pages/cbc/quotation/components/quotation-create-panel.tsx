import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";

import { useQuotationCreate } from "@/features/cbc/quotation";
import { Quotation } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type QuotationCreatePanelRef = {
  submit: () => void;
};

export type QuotationCreatePanelProps = {
  onCreated?: (data: Quotation) => void;
};

const QuotationCreatePanel = forwardRef(
  ({ onCreated }: QuotationCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createQuotation } = useQuotationCreate();

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
        fields={[]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createQuotation({
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

QuotationCreatePanel.displayName = "QuotationCreatePanel";

export default QuotationCreatePanel;
