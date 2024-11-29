import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import { usePersonAddressCreate } from "@/features/contact/person-address";
import { PersonAddress } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type PersonAddressCreatePanelRef = {
  submit: () => void;
};

export type PersonAddressCreatePanelProps = {
  onCreated?: (data: PersonAddress) => void;
};

const PersonAddressCreatePanel = forwardRef(
  ({ onCreated }: PersonAddressCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions"]);
    const { mutateAsync: createPersonAddress } = usePersonAddressCreate();

    useImperativeHandle(
      ref,
      () => ({
        submit: () => {
          formRef.current?.submit();
        },
      }),
      [formRef],
    );

    return (
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
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createPersonAddress(data);
          if (typeof onCreated === "function") {
            onCreated(createdData);
          }
        }}
      />
    );
  },
);

PersonAddressCreatePanel.displayName = "PersonAddressCreatePanel";

export default PersonAddressCreatePanel;
