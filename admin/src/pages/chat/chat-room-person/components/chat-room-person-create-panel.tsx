import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";

import { useChatRoomPersonCreate } from "@/features/chat/chat-room-person";
import { ChatRoomPerson } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type ChatRoomPersonCreatePanelRef = {
  submit: () => void;
};

export type ChatRoomPersonCreatePanelProps = {
  onCreated?: (data: ChatRoomPerson) => void;
};

const ChatRoomPersonCreatePanel = forwardRef(
  ({ onCreated }: ChatRoomPersonCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createChatRoomPerson } = useChatRoomPersonCreate();

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
          const createdData = await createChatRoomPerson({
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

ChatRoomPersonCreatePanel.displayName = "ChatRoomPersonCreatePanel";

export default ChatRoomPersonCreatePanel;
