import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
  useCoinVariationTypeGet,
  useCoinVariationTypeUpdate,
} from "@/features/cbc/coin-variation-type";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { CoinVariationType } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { EnumFieldType } from "@/enums/EnumFieldType";

export type CoinVariationTypeUpdatePanelProps = {
  data: CoinVariationType;
  onUpdated?: (data: CoinVariationType) => void;
};

const CoinVariationTypeUpdatePanel = forwardRef(
  ({ data, onUpdated }: CoinVariationTypeUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useCoinVariationTypeGet(
      data.id as number,
    );
    const { mutate: coinVariationTypeUpdate } = useCoinVariationTypeUpdate();
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
                      name: "name",
                      label: {
                        text: t("coin_variation_type.name", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },
                  ]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    coinVariationTypeUpdate({
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

CoinVariationTypeUpdatePanel.displayName = "CoinVariationTypeUpdatePanel";

export default CoinVariationTypeUpdatePanel;
