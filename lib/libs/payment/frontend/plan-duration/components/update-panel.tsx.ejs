import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import {
  usePlanDurationGet,
  usePlanDurationUpdate,
} from "@/features/blog/plan-duration";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { PlanDuration } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type PlanDurationUpdatePanelProps = {
  data: PlanDuration;
  onUpdated?: (data: PlanDuration) => void;
};

const PlanDurationUpdatePanel = forwardRef(
  ({ data, onUpdated }: PlanDurationUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions"]);
    const { data: item, isLoading } = usePlanDurationGet(data.id as number);
    const { mutate: planDurationUpdate } = usePlanDurationUpdate();
    const formRef = useRef<FormPanelRef>(null);

    useEffectAfterFirstUpdate(() => {
      if (item && formRef.current) {
        formRef.current.setValuesFromItem(item);
      }
    }, [item]);

    useImperativeHandle(ref, () => ({}));

    return (
      <TabPanel
        activeTabIndex={0}
        tabs={[
          {
            title: t("details", { ns: "actions" }),
            children: (
              <Overlay loading={isLoading}>
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
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    planDurationUpdate({ id: data.id, data });
                    if (typeof onUpdated === "function") {
                      onUpdated(data);
                    }
                  }}
                />
              </Overlay>
            ),
          },
        ]}
      />
    );
  },
);

PlanDurationUpdatePanel.displayName = "PlanDurationUpdatePanel";

export default PlanDurationUpdatePanel;
