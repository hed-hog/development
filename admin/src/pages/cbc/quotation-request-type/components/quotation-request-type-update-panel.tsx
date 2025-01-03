import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
  useQuotationRequestTypeGet,
  useQuotationRequestTypeUpdate,
} from "@/features/cbc/quotation-request-type";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { QuotationRequestType } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { EnumFieldType } from "@/enums/EnumFieldType";

export type QuotationRequestTypeUpdatePanelProps = {
  data: QuotationRequestType;
  onUpdated?: (data: QuotationRequestType) => void;
};

const QuotationRequestTypeUpdatePanel = forwardRef(
  ({ data, onUpdated }: QuotationRequestTypeUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useQuotationRequestTypeGet(
      data.id as number,
    );
    const { mutate: quotationRequestTypeUpdate } =
      useQuotationRequestTypeUpdate();
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
                      name: "name",
                      label: {
                        text: t("quotation_request_type.name", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "headers",
                      label: {
                        text: t("quotation_request_type.headers", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXTAREA,
                      required: true,
                    },

                    {
                      name: "filters",
                      label: {
                        text: t("quotation_request_type.filters", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXTAREA,
                      required: true,
                    },
                  ]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    quotationRequestTypeUpdate({
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

QuotationRequestTypeUpdatePanel.displayName = "QuotationRequestTypeUpdatePanel";

export default QuotationRequestTypeUpdatePanel;
