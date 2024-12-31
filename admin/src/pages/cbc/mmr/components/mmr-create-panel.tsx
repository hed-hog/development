import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import { useMmrCreate } from "@/features/cbc/mmr";
import { Mmr } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type MmrCreatePanelRef = {
  submit: () => void;
};

export type MmrCreatePanelProps = {
  onCreated?: (data: Mmr) => void;
};

const MmrCreatePanel = forwardRef(({ onCreated }: MmrCreatePanelProps, ref) => {
  const formRef = useRef<FormPanelRef>(null);
  const { t } = useTranslation(["actions", "fields", "translations"]);
  const { mutateAsync: createMmr } = useMmrCreate();

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
          name: "leverage",
          label: { text: t("mmr.leverage", { ns: "fields" }) },
          type: EnumFieldType.TEXT,
          required: true,
        },

        {
          name: "percentage",
          label: { text: t("mmr.percentage", { ns: "fields" }) },
          type: EnumFieldType.TEXT,
          required: true,
        },

        {
          name: "mmr_percentage",
          label: { text: t("mmr.mmr_percentage", { ns: "fields" }) },
          type: EnumFieldType.TEXT,
          required: true,
        },

        {
          name: "addtiononal_margin",
          label: { text: t("mmr.addtiononal_margin", { ns: "fields" }) },
          type: EnumFieldType.TEXT,
          required: true,
        },
      ]}
      button={{ text: t("create", { ns: "actions" }) }}
      onSubmit={async (data) => {
        const createdData = await createMmr({
          data,
        });
        if (typeof onCreated === "function") {
          onCreated(createdData as any);
        }
      }}
    />
  );
});

MmrCreatePanel.displayName = "MmrCreatePanel";

export default MmrCreatePanel;
