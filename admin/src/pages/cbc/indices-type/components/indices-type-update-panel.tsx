import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
  useIndicesTypeGet,
  useIndicesTypeUpdate,
} from "@/features/cbc/indices-type";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { IndicesType } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { EnumFieldType } from "@/enums/EnumFieldType";

export type IndicesTypeUpdatePanelProps = {
  data: IndicesType;
  onUpdated?: (data: IndicesType) => void;
};

const IndicesTypeUpdatePanel = forwardRef(
  ({ data, onUpdated }: IndicesTypeUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useIndicesTypeGet(data.id as number);
    const { mutate: indicesTypeUpdate } = useIndicesTypeUpdate();
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
                      label: { text: t("indices_type.slug", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },
                  ]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    indicesTypeUpdate({
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

IndicesTypeUpdatePanel.displayName = "IndicesTypeUpdatePanel";

export default IndicesTypeUpdatePanel;
