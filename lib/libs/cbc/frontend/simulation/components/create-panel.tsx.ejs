import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import { useSimulationCreate } from "@/features/cbc/simulation";
import { Simulation } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type SimulationCreatePanelRef = {
  submit: () => void;
};

export type SimulationCreatePanelProps = {
  onCreated?: (data: Simulation) => void;
};

const SimulationCreatePanel = forwardRef(
  ({ onCreated }: SimulationCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createSimulation } = useSimulationCreate();

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
            name: "user_id",
            label: { text: t("simulation.user_id", { ns: "fields" }) },
            type: EnumFieldType.COMBOBOX,
            required: true,
            url: "/user",
            displayName: "user",
            valueName: "id",
          },

          {
            name: "banking_id",
            label: { text: t("simulation.banking_id", { ns: "fields" }) },
            type: EnumFieldType.COMBOBOX,
            required: true,
            url: "/banking",
            displayName: "banking",
            valueName: "id",
          },

          {
            name: "stock_exchange_id",
            label: {
              text: t("simulation.stock_exchange_id", { ns: "fields" }),
            },
            type: EnumFieldType.COMBOBOX,
            required: true,
            url: "/stock-exchange",
            displayName: "stock_exchange",
            valueName: "id",
          },

          {
            name: "strategy_id",
            label: { text: t("simulation.strategy_id", { ns: "fields" }) },
            type: EnumFieldType.COMBOBOX,
            required: true,
            url: "/strategy",
            displayName: "strategy",
            valueName: "id",
          },

          {
            name: "trade_signal_type_id",
            label: {
              text: t("simulation.trade_signal_type_id", { ns: "fields" }),
            },
            type: EnumFieldType.COMBOBOX,
            required: true,
            url: "/trade-signal-type",
            displayName: "trade_signal_type",
            valueName: "id",
          },

          {
            name: "coin_id",
            label: { text: t("simulation.coin_id", { ns: "fields" }) },
            type: EnumFieldType.COMBOBOX,
            required: true,
            url: "/coin",
            displayName: "coin",
            valueName: "id",
          },

          {
            name: "layers",
            label: { text: t("simulation.layers", { ns: "fields" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },

          {
            name: "leverage",
            label: { text: t("simulation.leverage", { ns: "fields" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },
        ]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createSimulation({
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

SimulationCreatePanel.displayName = "SimulationCreatePanel";

export default SimulationCreatePanel;
