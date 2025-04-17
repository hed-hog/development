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
  id: number;
  onCreated?: (data: PersonAddress) => void;
};

const PersonAddressCreatePanel = forwardRef(
  ({ id, onCreated }: PersonAddressCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
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
            name: "country_id",
            label: { text: t("person_address.country_id", { ns: "fields" }) },
            type: EnumFieldType.COMBOBOX,
            required: true,
            url: "/country",
            displayName: "country",
            valueName: "id",
          },

          {
            name: "type_id",
            label: { text: t("person_address.type_id", { ns: "fields" }) },
            type: EnumFieldType.COMBOBOX,
            required: true,
            url: "/person-address-type",
            displayName: "type",
            valueName: "id",
          },

          {
            name: "primary",
            label: { text: t("person_address.primary", { ns: "fields" }) },
            type: EnumFieldType.SWITCH,
            required: true,
          },

          {
            name: "street",
            label: { text: t("person_address.street", { ns: "fields" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },

          {
            name: "number",
            label: { text: t("person_address.number", { ns: "fields" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },

          {
            name: "complement",
            label: { text: t("person_address.complement", { ns: "fields" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },

          {
            name: "district",
            label: { text: t("person_address.district", { ns: "fields" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },

          {
            name: "city",
            label: { text: t("person_address.city", { ns: "fields" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },

          {
            name: "state",
            label: { text: t("person_address.state", { ns: "fields" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },

          {
            name: "postal_code",
            label: { text: t("person_address.postal_code", { ns: "fields" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },

          {
            name: "reference",
            label: { text: t("person_address.reference", { ns: "fields" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },
        ]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createPersonAddress({
            personId: Number(id),
            data,
          });
          if (typeof onCreated === "function") {
            onCreated(createdData as any);
          }
        }}
      />
    );
  },
);

PersonAddressCreatePanel.displayName = "PersonAddressCreatePanel";

export default PersonAddressCreatePanel;
