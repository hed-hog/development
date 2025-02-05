import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
  useNotificationTypeGet,
  useNotificationTypeUpdate,
} from "@/features/cbc/notification-type";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { NotificationType } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { EnumFieldType } from "@/enums/EnumFieldType";

export type NotificationTypeUpdatePanelProps = {
  data: NotificationType;
  onUpdated?: (data: NotificationType) => void;
};

const NotificationTypeUpdatePanel = forwardRef(
  ({ data, onUpdated }: NotificationTypeUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useNotificationTypeGet(data.id as number);
    const { mutate: notificationTypeUpdate } = useNotificationTypeUpdate();
    const formRef = useRef<FormPanelRef>(null);

    useEffectAfterFirstUpdate(() => {
      if (item && formRef.current) {
        formRef.current.setValuesFromItem(item);
      }
    }, [item]);

    useImperativeHandle(ref, () => ({}));

    return (
      <TabPanel
        activeTabIndex={0}
        tabs={[
          {
            title: t("details", { ns: "actions" }),
            children: (
              <Overlay loading={isLoading}>
                <FormPanel
                  ref={formRef}
                  fields={[
                    {
                      name: "slug",
                      label: {
                        text: t("notification_type.slug", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },
                  ]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    notificationTypeUpdate({
                      id: data.id,
                      data,
                    });
                    if (typeof onUpdated === "function") {
                      onUpdated(data);
                    }
                  }}
                />
              </Overlay>
            ),
          },
        ]}
      />
    );
  },
);

NotificationTypeUpdatePanel.displayName = "NotificationTypeUpdatePanel";

export default NotificationTypeUpdatePanel;
