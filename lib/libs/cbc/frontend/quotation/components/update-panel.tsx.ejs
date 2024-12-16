import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import { useQuotationGet, useQuotationUpdate } from "@/features/cbc/quotation";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { Quotation } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { EnumFieldType } from "@/enums/EnumFieldType";

export type QuotationUpdatePanelProps = {
  data: Quotation;
  onUpdated?: (data: Quotation) => void;
};

const QuotationUpdatePanel = forwardRef(
  ({ data, onUpdated }: QuotationUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useQuotationGet(data.id as number);
    const { mutate: quotationUpdate } = useQuotationUpdate();
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
                  fields={[
                    {
                      name: "coin_id",
                      label: { text: t("quotation.coin_id", { ns: "fields" }) },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: "/coin",
                      displayName: "coin",
                      valueName: "id",
                    },

                    {
                      name: "type_id",
                      label: { text: t("quotation.type_id", { ns: "fields" }) },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: "/quotation-type",
                      displayName: "type",
                      valueName: "id",
                    },
                  ]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    quotationUpdate({
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

QuotationUpdatePanel.displayName = "QuotationUpdatePanel";

export default QuotationUpdatePanel;
