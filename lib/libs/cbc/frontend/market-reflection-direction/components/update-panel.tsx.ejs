import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
  useMarketReflectionDirectionGet,
  useMarketReflectionDirectionUpdate,
} from "@/features/cbc/market-reflection-direction";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { MarketReflectionDirection } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { EnumFieldType } from "@/enums/EnumFieldType";

export type MarketReflectionDirectionUpdatePanelProps = {
  data: MarketReflectionDirection;
  onUpdated?: (data: MarketReflectionDirection) => void;
};

const MarketReflectionDirectionUpdatePanel = forwardRef(
  ({ data, onUpdated }: MarketReflectionDirectionUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useMarketReflectionDirectionGet(
      data.id as number,
    );
    const { mutate: marketReflectionDirectionUpdate } =
      useMarketReflectionDirectionUpdate();
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
                      name: "direction",
                      label: {
                        text: t("market_reflection_direction.direction", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },
                  ]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    marketReflectionDirectionUpdate({
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

MarketReflectionDirectionUpdatePanel.displayName =
  "MarketReflectionDirectionUpdatePanel";

export default MarketReflectionDirectionUpdatePanel;
