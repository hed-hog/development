import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from "@/components/panels/form-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import { usePersonAddressTypeCreate } from "@/features/contact/person-address-type";
import { PersonAddressType } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type PersonAddressTypeCreatePanelRef = {
  submit: () => void;
};

export type PersonAddressTypeCreatePanelProps = {
  onCreated?: (data: PersonAddressType) => void;
};

const PersonAddressTypeCreatePanel = forwardRef(
  ({ onCreated }: PersonAddressTypeCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createPersonAddressType } =
      usePersonAddressTypeCreate();

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
            name: "slug",
            label: { text: t("person_address_type.slug", { ns: "fields" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },

          ...getFieldsLocale([{ name: "name" }]),
        ]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createPersonAddressType({
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

PersonAddressTypeCreatePanel.displayName = "PersonAddressTypeCreatePanel";

export default PersonAddressTypeCreatePanel;
