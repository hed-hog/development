import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
  usePersonValueGet,
  usePersonValueUpdate,
} from "@/features/contact/person-value";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { PersonValue } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { EnumFieldType } from "@/enums/EnumFieldType";

export type PersonValueUpdatePanelProps = {
  id: number;
  data: PersonValue;
  onUpdated?: (data: PersonValue) => void;
};

const PersonValueUpdatePanel = forwardRef(
  ({ id, data, onUpdated }: PersonValueUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = usePersonValueGet(id, data.id as number);
    const { mutate: personValueUpdate } = usePersonValueUpdate();
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
                      name: "value",
                      label: {
                        text: t("person_value.value", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },
                  ]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    personValueUpdate({
                      personId: id,
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

PersonValueUpdatePanel.displayName = "PersonValueUpdatePanel";

export default PersonValueUpdatePanel;
