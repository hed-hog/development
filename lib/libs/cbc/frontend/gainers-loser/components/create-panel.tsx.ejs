import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";

import { useGainersLoserCreate } from "@/features/cbc/gainers-loser";
import { GainersLoser } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type GainersLoserCreatePanelRef = {
  submit: () => void;
};

export type GainersLoserCreatePanelProps = {
  onCreated?: (data: GainersLoser) => void;
};

const GainersLoserCreatePanel = forwardRef(
  ({ onCreated }: GainersLoserCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createGainersLoser } = useGainersLoserCreate();

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
          const createdData = await createGainersLoser({
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

GainersLoserCreatePanel.displayName = "GainersLoserCreatePanel";

export default GainersLoserCreatePanel;
