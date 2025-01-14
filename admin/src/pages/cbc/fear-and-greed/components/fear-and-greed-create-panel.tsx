import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";

import { useFearAndGreedCreate } from "@/features/cbc/fear-and-greed";
import { FearAndGreed } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type FearAndGreedCreatePanelRef = {
  submit: () => void;
};

export type FearAndGreedCreatePanelProps = {
  onCreated?: (data: FearAndGreed) => void;
};

const FearAndGreedCreatePanel = forwardRef(
  ({ onCreated }: FearAndGreedCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createFearAndGreed } = useFearAndGreedCreate();

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
          const createdData = await createFearAndGreed({
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

FearAndGreedCreatePanel.displayName = "FearAndGreedCreatePanel";

export default FearAndGreedCreatePanel;
