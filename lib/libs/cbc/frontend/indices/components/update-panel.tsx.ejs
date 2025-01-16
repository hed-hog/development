import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import { useIndicesGet, useIndicesUpdate } from "@/features/cbc/indices";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { Indices } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { EnumFieldType } from "@/enums/EnumFieldType";

export type IndicesUpdatePanelProps = {
  data: Indices;
  onUpdated?: (data: Indices) => void;
};

const IndicesUpdatePanel = forwardRef(
  ({ data, onUpdated }: IndicesUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useIndicesGet(data.id as number);
    const { mutate: indicesUpdate } = useIndicesUpdate();
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
                      name: "bot_id",
                      label: { text: t("indices.bot_id", { ns: "fields" }) },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: "/bot",
                      displayName: "bot",
                      valueName: "id",
                    },

                    {
                      name: "type_id",
                      label: { text: t("indices.type_id", { ns: "fields" }) },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: "/indices-type",
                      displayName: "type",
                      valueName: "id",
                    },

                    {
                      name: "slug",
                      label: { text: t("indices.slug", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "description",
                      label: {
                        text: t("indices.description", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "in_inght_var_percentage",
                      label: {
                        text: t("indices.in_inght_var_percentage", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "in_inght_tech_rating",
                      label: {
                        text: t("indices.in_inght_tech_rating", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "future_var_percentage",
                      label: {
                        text: t("indices.future_var_percentage", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "future_tech_rating",
                      label: {
                        text: t("indices.future_tech_rating", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },
                  ]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    indicesUpdate({
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

IndicesUpdatePanel.displayName = "IndicesUpdatePanel";

export default IndicesUpdatePanel;
