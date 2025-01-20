import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import { useIndicesCreate } from "@/features/cbc/indices";
import { Indices } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type IndicesCreatePanelRef = {
  submit: () => void;
};

export type IndicesCreatePanelProps = {
  onCreated?: (data: Indices) => void;
};

const IndicesCreatePanel = forwardRef(
  ({ onCreated }: IndicesCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createIndices } = useIndicesCreate();

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
            label: { text: t("indices.description", { ns: "fields" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },

          {
            name: "in_inght_var_percentage",
            label: {
              text: t("indices.in_inght_var_percentage", { ns: "fields" }),
            },
            type: EnumFieldType.TEXT,
            required: true,
          },

          {
            name: "in_inght_tech_rating",
            label: {
              text: t("indices.in_inght_tech_rating", { ns: "fields" }),
            },
            type: EnumFieldType.TEXT,
            required: true,
          },

          {
            name: "future_var_percentage",
            label: {
              text: t("indices.future_var_percentage", { ns: "fields" }),
            },
            type: EnumFieldType.TEXT,
            required: true,
          },

          {
            name: "future_tech_rating",
            label: { text: t("indices.future_tech_rating", { ns: "fields" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },
        ]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createIndices({
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

IndicesCreatePanel.displayName = "IndicesCreatePanel";

export default IndicesCreatePanel;
