import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import { useNotificationTypeCreate } from "@/features/cbc/notification-type";
import { NotificationType } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type NotificationTypeCreatePanelRef = {
  submit: () => void;
};

export type NotificationTypeCreatePanelProps = {
  onCreated?: (data: NotificationType) => void;
};

const NotificationTypeCreatePanel = forwardRef(
  ({ onCreated }: NotificationTypeCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createNotificationType } = useNotificationTypeCreate();

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
            label: { text: t("notification_type.slug", { ns: "fields" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },
        ]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createNotificationType({
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

NotificationTypeCreatePanel.displayName = "NotificationTypeCreatePanel";

export default NotificationTypeCreatePanel;
