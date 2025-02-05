import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import { useNotificationCreate } from "@/features/cbc/notification";
import { Notification } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type NotificationCreatePanelRef = {
  submit: () => void;
};

export type NotificationCreatePanelProps = {
  onCreated?: (data: Notification) => void;
};

const NotificationCreatePanel = forwardRef(
  ({ onCreated }: NotificationCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createNotification } = useNotificationCreate();

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
            name: "type_id",
            label: { text: t("notification.type_id", { ns: "fields" }) },
            type: EnumFieldType.COMBOBOX,
            required: true,
            url: "/notification-type",
            displayName: "type",
            valueName: "id",
          },

          {
            name: "message",
            label: { text: t("notification.message", { ns: "fields" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },

          {
            name: "user_id",
            label: { text: t("notification.user_id", { ns: "fields" }) },
            type: EnumFieldType.COMBOBOX,
            required: true,
            url: "/user",
            displayName: "user",
            valueName: "id",
          },

          {
            name: "coin_id",
            label: { text: t("notification.coin_id", { ns: "fields" }) },
            type: EnumFieldType.COMBOBOX,
            required: true,
            url: "/coin",
            displayName: "coin",
            valueName: "id",
          },
        ]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createNotification({
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

NotificationCreatePanel.displayName = "NotificationCreatePanel";

export default NotificationCreatePanel;
