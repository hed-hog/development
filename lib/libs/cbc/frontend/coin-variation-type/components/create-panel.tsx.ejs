import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import { useCoinVariationTypeCreate } from "@/features/cbc/coin-variation-type";
import { CoinVariationType } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type CoinVariationTypeCreatePanelRef = {
  submit: () => void;
};

export type CoinVariationTypeCreatePanelProps = {
  onCreated?: (data: CoinVariationType) => void;
};

const CoinVariationTypeCreatePanel = forwardRef(
  ({ onCreated }: CoinVariationTypeCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createCoinVariationType } =
      useCoinVariationTypeCreate();

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
            label: { text: t("coin_variation_type.name", { ns: "fields" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },
        ]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createCoinVariationType({
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

CoinVariationTypeCreatePanel.displayName = "CoinVariationTypeCreatePanel";

export default CoinVariationTypeCreatePanel;
