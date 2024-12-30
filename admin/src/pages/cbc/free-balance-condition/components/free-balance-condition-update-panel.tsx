import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
  useFreeBalanceConditionGet,
  useFreeBalanceConditionUpdate,
} from "@/features/cbc/free-balance-condition";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { FreeBalanceCondition } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { EnumFieldType } from "@/enums/EnumFieldType";

export type FreeBalanceConditionUpdatePanelProps = {
  data: FreeBalanceCondition;
  onUpdated?: (data: FreeBalanceCondition) => void;
};

const FreeBalanceConditionUpdatePanel = forwardRef(
  ({ data, onUpdated }: FreeBalanceConditionUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useFreeBalanceConditionGet(
      data.id as number,
    );
    const { mutate: freeBalanceConditionUpdate } =
      useFreeBalanceConditionUpdate();
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
                      name: "capital",
                      label: {
                        text: t("free_balance_condition.capital", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "initial_margin",
                      label: {
                        text: t("free_balance_condition.initial_margin", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "final_margin",
                      label: {
                        text: t("free_balance_condition.final_margin", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },
                  ]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    freeBalanceConditionUpdate({
                      id: data.id,
                      data,
                    });
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

FreeBalanceConditionUpdatePanel.displayName = "FreeBalanceConditionUpdatePanel";

export default FreeBalanceConditionUpdatePanel;
