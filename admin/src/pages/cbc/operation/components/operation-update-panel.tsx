import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import { useOperationGet, useOperationUpdate } from "@/features/cbc/operation";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { Operation } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { EnumFieldType } from "@/enums/EnumFieldType";

export type OperationUpdatePanelProps = {
  data: Operation;
  onUpdated?: (data: Operation) => void;
};

const OperationUpdatePanel = forwardRef(
  ({ data, onUpdated }: OperationUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useOperationGet(data.id as number);
    const { mutate: operationUpdate } = useOperationUpdate();
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
                      name: "simulation_id",
                      label: {
                        text: t("operation.simulation_id", { ns: "fields" }),
                      },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: "/simulation",
                      displayName: "simulation",
                      valueName: "id",
                    },

                    {
                      name: "user_id",
                      label: { text: t("operation.user_id", { ns: "fields" }) },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: "/user",
                      displayName: "user",
                      valueName: "id",
                    },

                    {
                      name: "banking_id",
                      label: {
                        text: t("operation.banking_id", { ns: "fields" }),
                      },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: "/banking",
                      displayName: "banking",
                      valueName: "id",
                    },

                    {
                      name: "stock_exchange_id",
                      label: {
                        text: t("operation.stock_exchange_id", {
                          ns: "fields",
                        }),
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
                        text: t("operation.strategy_id", { ns: "fields" }),
                      },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: "/strategy",
                      displayName: "strategy",
                      valueName: "id",
                    },

                    {
                      name: "trade_signal_type_id",
                      label: {
                        text: t("operation.trade_signal_type_id", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: "/trade-signal-type",
                      displayName: "trade_signal_type",
                      valueName: "id",
                    },

                    {
                      name: "coin_id",
                      label: { text: t("operation.coin_id", { ns: "fields" }) },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: "/coin",
                      displayName: "coin",
                      valueName: "id",
                    },

                    {
                      name: "layers",
                      label: { text: t("operation.layers", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "leverage",
                      label: {
                        text: t("operation.leverage", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },
                  ]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    operationUpdate({
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

OperationUpdatePanel.displayName = "OperationUpdatePanel";

export default OperationUpdatePanel;
