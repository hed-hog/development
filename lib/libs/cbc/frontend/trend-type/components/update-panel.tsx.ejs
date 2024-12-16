import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import { useTrendTypeGet, useTrendTypeUpdate } from "@/features/cbc/trend-type";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { TrendType } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { EnumFieldType } from "@/enums/EnumFieldType";

export type TrendTypeUpdatePanelProps = {
  data: TrendType;
  onUpdated?: (data: TrendType) => void;
};

const TrendTypeUpdatePanel = forwardRef(
  ({ data, onUpdated }: TrendTypeUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useTrendTypeGet(data.id as number);
    const { mutate: trendTypeUpdate } = useTrendTypeUpdate();
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
                      name: "slug",
                      label: { text: t("trend_type.slug", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    ...getFieldsLocale([{ name: "name" }], item),
                  ]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    trendTypeUpdate({
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

TrendTypeUpdatePanel.displayName = "TrendTypeUpdatePanel";

export default TrendTypeUpdatePanel;
