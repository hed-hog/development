import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";

import { useGainerLoserCreate } from "@/features/cbc/gainer-loser";
import { GainerLoser } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type GainerLoserCreatePanelRef = {
  submit: () => void;
};

export type GainerLoserCreatePanelProps = {
  onCreated?: (data: GainerLoser) => void;
};

const GainerLoserCreatePanel = forwardRef(
  ({ onCreated }: GainerLoserCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createGainerLoser } = useGainerLoserCreate();

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
          const createdData = await createGainerLoser({
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

GainerLoserCreatePanel.displayName = "GainerLoserCreatePanel";

export default GainerLoserCreatePanel;
