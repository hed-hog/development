import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import { useMarketReflectionDirectionCreate } from "@/features/cbc/market-reflection-direction";
import { MarketReflectionDirection } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type MarketReflectionDirectionCreatePanelRef = {
  submit: () => void;
};

export type MarketReflectionDirectionCreatePanelProps = {
  onCreated?: (data: MarketReflectionDirection) => void;
};

const MarketReflectionDirectionCreatePanel = forwardRef(
  ({ onCreated }: MarketReflectionDirectionCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createMarketReflectionDirection } =
      useMarketReflectionDirectionCreate();

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
            name: "direction",
            label: {
              text: t("market_reflection_direction.direction", {
                ns: "fields",
              }),
            },
            type: EnumFieldType.TEXT,
            required: true,
          },
        ]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createMarketReflectionDirection({
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

MarketReflectionDirectionCreatePanel.displayName =
  "MarketReflectionDirectionCreatePanel";

export default MarketReflectionDirectionCreatePanel;
