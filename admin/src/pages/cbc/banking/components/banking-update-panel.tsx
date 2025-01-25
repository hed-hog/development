import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import { useBankingGet, useBankingUpdate } from "@/features/cbc/banking";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { Banking } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { EnumFieldType } from "@/enums/EnumFieldType";

export type BankingUpdatePanelProps = {
  data: Banking;
  onUpdated?: (data: Banking) => void;
};

const BankingUpdatePanel = forwardRef(
  ({ data, onUpdated }: BankingUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useBankingGet(data.id as number);
    const { mutate: bankingUpdate } = useBankingUpdate();
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
                      label: { text: t("banking.name", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "user_id",
                      label: { text: t("banking.user_id", { ns: "fields" }) },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: "/user",
                      displayName: "user",
                      valueName: "id",
                    },

                    {
                      name: "stock_exchange_id",
                      label: {
                        text: t("banking.stock_exchange_id", { ns: "fields" }),
                      },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: "/stock-exchange",
                      displayName: "stock_exchange",
                      valueName: "id",
                    },

                    {
                      name: "strategy_id",
                      label: {
                        text: t("banking.strategy_id", { ns: "fields" }),
                      },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: "/strategy",
                      displayName: "strategy",
                      valueName: "id",
                    },
                  ]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    bankingUpdate({
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

BankingUpdatePanel.displayName = "BankingUpdatePanel";

export default BankingUpdatePanel;
