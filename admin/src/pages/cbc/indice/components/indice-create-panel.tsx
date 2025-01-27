import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import { useIndiceCreate } from "@/features/cbc/indice";
import { Indice } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type IndiceCreatePanelRef = {
  submit: () => void;
};

export type IndiceCreatePanelProps = {
  onCreated?: (data: Indice) => void;
};

const IndiceCreatePanel = forwardRef(
  ({ onCreated }: IndiceCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createIndice } = useIndiceCreate();

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
            name: "bot_id",
            label: { text: t("indice.bot_id", { ns: "fields" }) },
            type: EnumFieldType.COMBOBOX,
            required: true,
            url: "/bot",
            displayName: "bot",
            valueName: "id",
          },

          {
            name: "type_id",
            label: { text: t("indice.type_id", { ns: "fields" }) },
            type: EnumFieldType.COMBOBOX,
            required: true,
            url: "/indice-type",
            displayName: "type",
            valueName: "id",
          },

          {
            name: "slug",
            label: { text: t("indice.slug", { ns: "fields" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },

          {
            name: "description",
            label: { text: t("indice.description", { ns: "fields" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },

          {
            name: "in_inght_var_percentage",
            label: {
              text: t("indice.in_inght_var_percentage", { ns: "fields" }),
            },
            type: EnumFieldType.TEXT,
            required: true,
          },

          {
            name: "in_inght_tech_rating",
            label: { text: t("indice.in_inght_tech_rating", { ns: "fields" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },

          {
            name: "future_var_percentage",
            label: {
              text: t("indice.future_var_percentage", { ns: "fields" }),
            },
            type: EnumFieldType.TEXT,
            required: true,
          },

          {
            name: "future_tech_rating",
            label: { text: t("indice.future_tech_rating", { ns: "fields" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },
        ]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createIndice({
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

IndiceCreatePanel.displayName = "IndiceCreatePanel";

export default IndiceCreatePanel;
