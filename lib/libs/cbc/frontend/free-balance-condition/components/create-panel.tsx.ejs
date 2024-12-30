import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import { useFreeBalanceConditionCreate } from "@/features/cbc/free-balance-condition";
import { FreeBalanceCondition } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type FreeBalanceConditionCreatePanelRef = {
  submit: () => void;
};

export type FreeBalanceConditionCreatePanelProps = {
  onCreated?: (data: FreeBalanceCondition) => void;
};

const FreeBalanceConditionCreatePanel = forwardRef(
  ({ onCreated }: FreeBalanceConditionCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createFreeBalanceCondition } =
      useFreeBalanceConditionCreate();

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
            name: "capital",
            label: {
              text: t("free_balance_condition.capital", { ns: "fields" }),
            },
            type: EnumFieldType.TEXT,
            required: true,
          },

          {
            name: "initial_margin",
            label: {
              text: t("free_balance_condition.initial_margin", {
                ns: "fields",
              }),
            },
            type: EnumFieldType.TEXT,
            required: true,
          },

          {
            name: "final_margin",
            label: {
              text: t("free_balance_condition.final_margin", { ns: "fields" }),
            },
            type: EnumFieldType.TEXT,
            required: true,
          },
        ]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createFreeBalanceCondition({
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

FreeBalanceConditionCreatePanel.displayName = "FreeBalanceConditionCreatePanel";

export default FreeBalanceConditionCreatePanel;
