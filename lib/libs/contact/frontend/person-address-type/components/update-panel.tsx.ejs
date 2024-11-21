import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import {
  usePersonAddressTypeGet,
  usePersonAddressTypeUpdate,
} from "@/features/contact/person-address-type";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { PersonAddressType } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type PersonAddressTypeUpdatePanelProps = {
  data: PersonAddressType;
  onUpdated?: (data: PersonAddressType) => void;
};

const PersonAddressTypeUpdatePanel = forwardRef(
  ({ data, onUpdated }: PersonAddressTypeUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions"]);
    const { data: item, isLoading } = usePersonAddressTypeGet(
      data.id as number,
    );
    const { mutate: personAddressTypeUpdate } = usePersonAddressTypeUpdate();
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
                      label: { text: t("slug", { ns: "translation" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    ...getFieldsLocale([{ name: "name" }], item),
                  ]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    personAddressTypeUpdate({ id: data.id, data });
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

PersonAddressTypeUpdatePanel.displayName = "PersonAddressTypeUpdatePanel";

export default PersonAddressTypeUpdatePanel;
