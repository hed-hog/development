import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
  useQuotationTypeGet,
  useQuotationTypeUpdate,
} from "@/features/cbc/quotation-type";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { QuotationType } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";

export type QuotationTypeUpdatePanelProps = {
  data: QuotationType;
  onUpdated?: (data: QuotationType) => void;
};

const QuotationTypeUpdatePanel = forwardRef(
  ({ data, onUpdated }: QuotationTypeUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useQuotationTypeGet(data.id as number);
    const { mutate: quotationTypeUpdate } = useQuotationTypeUpdate();
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
                  fields={[]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    quotationTypeUpdate({
                      id: data.id,
                      data,
                    });
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

QuotationTypeUpdatePanel.displayName = "QuotationTypeUpdatePanel";

export default QuotationTypeUpdatePanel;
