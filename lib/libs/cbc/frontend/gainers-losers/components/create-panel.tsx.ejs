import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";

import { useGainersLosersCreate } from "@/features/cbc/gainers-losers";
import { GainersLosers } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type GainersLosersCreatePanelRef = {
  submit: () => void;
};

export type GainersLosersCreatePanelProps = {
  onCreated?: (data: GainersLosers) => void;
};

const GainersLosersCreatePanel = forwardRef(
  ({ onCreated }: GainersLosersCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createGainersLosers } = useGainersLosersCreate();

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
          const createdData = await createGainersLosers({
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

GainersLosersCreatePanel.displayName = "GainersLosersCreatePanel";

export default GainersLosersCreatePanel;
