import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";

import { useSubscriptionPersonCreate } from "@/features/subscription/subscription-person";
import { SubscriptionPerson } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type SubscriptionPersonCreatePanelRef = {
  submit: () => void;
};

export type SubscriptionPersonCreatePanelProps = {
  id: number;
  onCreated?: (data: SubscriptionPerson) => void;
};

const SubscriptionPersonCreatePanel = forwardRef(
  ({ id, onCreated }: SubscriptionPersonCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createSubscriptionPerson } =
      useSubscriptionPersonCreate();

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
          const createdData = await createSubscriptionPerson({
            subscriptionId: Number(id),
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

SubscriptionPersonCreatePanel.displayName = "SubscriptionPersonCreatePanel";

export default SubscriptionPersonCreatePanel;
