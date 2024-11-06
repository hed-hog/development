import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import { usePlanDurationCreate } from "@/features/blog/plan-duration";
import { PlanDuration } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type PlanDurationCreatePanelRef = {
  submit: () => void;
};

export type PlanDurationCreatePanelProps = {
  onCreated?: (data: PlanDuration) => void;
};

const PlanDurationCreatePanel = forwardRef(
  ({ onCreated }: PlanDurationCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions"]);
    const { mutateAsync: createPlanDuration } = usePlanDurationCreate();

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
            name: "plan_id",
            label: { text: t("plan_id", { ns: "translation" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },

          {
            name: "frequency",
            label: { text: t("frequency", { ns: "translation" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },

          {
            name: "price",
            label: { text: t("price", { ns: "translation" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },
        ]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createPlanDuration(data);
          if (typeof onCreated === "function") {
            onCreated(createdData);
          }
        }}
      />
    );
  },
);

PlanDurationCreatePanel.displayName = "PlanDurationCreatePanel";

export default PlanDurationCreatePanel;
