import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";

import { useChatMessageCreate } from "@/features/chat/chat-message";
import { ChatMessage } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type ChatMessageCreatePanelRef = {
  submit: () => void;
};

export type ChatMessageCreatePanelProps = {
  onCreated?: (data: ChatMessage) => void;
};

const ChatMessageCreatePanel = forwardRef(
  ({ onCreated }: ChatMessageCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createChatMessage } = useChatMessageCreate();

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
        fields={[]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createChatMessage({
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

ChatMessageCreatePanel.displayName = "ChatMessageCreatePanel";

export default ChatMessageCreatePanel;
