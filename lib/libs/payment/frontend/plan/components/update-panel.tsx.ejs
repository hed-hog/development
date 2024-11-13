import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";

import { usePlanGet, usePlanUpdate } from "@/features/blog/plan";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { Plan } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type PlanUpdatePanelProps = {
  data: Plan;
  onUpdated?: (data: Plan) => void;
};

const PlanUpdatePanel = forwardRef(
  ({ data, onUpdated }: PlanUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions"]);
    const { data: item, isLoading } = usePlanGet(data.id as number);
    const { mutate: planUpdate } = usePlanUpdate();
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
                  fields={[...getFieldsLocale([{ name: "name" }])]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    planUpdate({ id: data.id, data });
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

PlanUpdatePanel.displayName = "PlanUpdatePanel";

export default PlanUpdatePanel;
