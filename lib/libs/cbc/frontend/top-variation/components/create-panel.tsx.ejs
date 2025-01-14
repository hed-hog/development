import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";

import { useTopVariationCreate } from "@/features/cbc/top-variation";
import { TopVariation } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type TopVariationCreatePanelRef = {
  submit: () => void;
};

export type TopVariationCreatePanelProps = {
  onCreated?: (data: TopVariation) => void;
};

const TopVariationCreatePanel = forwardRef(
  ({ onCreated }: TopVariationCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createTopVariation } = useTopVariationCreate();

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
          const createdData = await createTopVariation({
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

TopVariationCreatePanel.displayName = "TopVariationCreatePanel";

export default TopVariationCreatePanel;
