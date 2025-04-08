import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";

import { useChatRoomCreate } from "@/features/chat/chat-room";
import { ChatRoom } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type ChatRoomCreatePanelRef = {
  submit: () => void;
};

export type ChatRoomCreatePanelProps = {
  onCreated?: (data: ChatRoom) => void;
};

const ChatRoomCreatePanel = forwardRef(
  ({ onCreated }: ChatRoomCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createChatRoom } = useChatRoomCreate();

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
          const createdData = await createChatRoom({
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

ChatRoomCreatePanel.displayName = "ChatRoomCreatePanel";

export default ChatRoomCreatePanel;
