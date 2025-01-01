import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import { useBotCreate } from "@/features/cbc/bot";
import { Bot } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type BotCreatePanelRef = {
  submit: () => void;
};

export type BotCreatePanelProps = {
  onCreated?: (data: Bot) => void;
};

const BotCreatePanel = forwardRef(({ onCreated }: BotCreatePanelProps, ref) => {
  const formRef = useRef<FormPanelRef>(null);
  const { t } = useTranslation(["actions", "fields", "translations"]);
  const { mutateAsync: createBot } = useBotCreate();

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
          name: "name",
          label: { text: t("bot.name", { ns: "fields" }) },
          type: EnumFieldType.TEXT,
          required: true,
        },

        {
          name: "description",
          label: { text: t("bot.description", { ns: "fields" }) },
          type: EnumFieldType.TEXT,
          required: true,
        },
      ]}
      button={{ text: t("create", { ns: "actions" }) }}
      onSubmit={async (data) => {
        const createdData = await createBot({
          data,
        });
        if (typeof onCreated === "function") {
          onCreated(createdData as any);
        }
      }}
    />
  );
});

BotCreatePanel.displayName = "BotCreatePanel";

export default BotCreatePanel;
