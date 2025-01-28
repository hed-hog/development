import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";

import { useAltcoinSeasonCreate } from "@/features/cbc/altcoin-season";
import { AltcoinSeason } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type AltcoinSeasonCreatePanelRef = {
  submit: () => void;
};

export type AltcoinSeasonCreatePanelProps = {
  onCreated?: (data: AltcoinSeason) => void;
};

const AltcoinSeasonCreatePanel = forwardRef(
  ({ onCreated }: AltcoinSeasonCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createAltcoinSeason } = useAltcoinSeasonCreate();

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
          const createdData = await createAltcoinSeason({
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

AltcoinSeasonCreatePanel.displayName = "AltcoinSeasonCreatePanel";

export default AltcoinSeasonCreatePanel;
