import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
  usePersonCustomTypeGet,
  usePersonCustomTypeUpdate,
} from "@/features/contact/person-custom-type";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { PersonCustomType } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { EnumFieldType } from "@/enums/EnumFieldType";

export type PersonCustomTypeUpdatePanelProps = {
  data: PersonCustomType;
  onUpdated?: (data: PersonCustomType) => void;
};

const PersonCustomTypeUpdatePanel = forwardRef(
  ({ data, onUpdated }: PersonCustomTypeUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = usePersonCustomTypeGet(data.id as number);
    const { mutate: personCustomTypeUpdate } = usePersonCustomTypeUpdate();
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
                      label: {
                        text: t("person_custom_type.slug", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    ...getFieldsLocale([{ name: "name" }], item),
                  ]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    personCustomTypeUpdate({
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

PersonCustomTypeUpdatePanel.displayName = "PersonCustomTypeUpdatePanel";

export default PersonCustomTypeUpdatePanel;
