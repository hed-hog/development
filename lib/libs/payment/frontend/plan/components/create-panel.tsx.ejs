import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from "@/components/panels/form-panel";

import { usePlanCreate } from "@/features/blog/plan";
import { Plan } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type PlanCreatePanelRef = {
  submit: () => void;
};

export type PlanCreatePanelProps = {
  onCreated?: (data: Plan) => void;
};

const PlanCreatePanel = forwardRef(
  ({ onCreated }: PlanCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions"]);
    const { mutateAsync: createPlan } = usePlanCreate();

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
        fields={[...getFieldsLocale([{ name: "name" }])]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createPlan(data);
          if (typeof onCreated === "function") {
            onCreated(createdData);
          }
        }}
      />
    );
  },
);

PlanCreatePanel.displayName = "PlanCreatePanel";

export default PlanCreatePanel;
