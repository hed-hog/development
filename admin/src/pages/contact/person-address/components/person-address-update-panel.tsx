import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
  usePersonAddressGet,
  usePersonAddressUpdate,
} from "@/features/contact/person-address";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { PersonAddress } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { EnumFieldType } from "@/enums/EnumFieldType";

export type PersonAddressUpdatePanelProps = {
  data: PersonAddress;
  onUpdated?: (data: PersonAddress) => void;
};

const PersonAddressUpdatePanel = forwardRef(
  ({ data, onUpdated }: PersonAddressUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions"]);
    const { data: item, isLoading } = usePersonAddressGet(data.id as number);
    const { mutate: personAddressUpdate } = usePersonAddressUpdate();
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
                      name: "person_id",
                      label: { text: t("person_id", { ns: "translation" }) },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: "/person",
                      displayName: "person",
                      valueName: "id",
                    },

                    {
                      name: "country_id",
                      label: { text: t("country_id", { ns: "translation" }) },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: "/country",
                      displayName: "country",
                      valueName: "id",
                    },

                    {
                      name: "type_id",
                      label: { text: t("type_id", { ns: "translation" }) },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: "/person-address-type",
                      displayName: "type",
                      valueName: "id",
                    },

                    {
                      name: "primary",
                      label: { text: t("primary", { ns: "translation" }) },
                      type: EnumFieldType.SWITCH,
                      required: true,
                    },

                    {
                      name: "street",
                      label: { text: t("street", { ns: "translation" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "number",
                      label: { text: t("number", { ns: "translation" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "complement",
                      label: { text: t("complement", { ns: "translation" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "district",
                      label: { text: t("district", { ns: "translation" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "city",
                      label: { text: t("city", { ns: "translation" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "state",
                      label: { text: t("state", { ns: "translation" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "postal_code",
                      label: { text: t("postal_code", { ns: "translation" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "reference",
                      label: { text: t("reference", { ns: "translation" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },
                  ]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    personAddressUpdate({ id: data.id, data });
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

PersonAddressUpdatePanel.displayName = "PersonAddressUpdatePanel";

export default PersonAddressUpdatePanel;
