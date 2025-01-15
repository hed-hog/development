import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
  useNotificationGet,
  useNotificationUpdate,
} from "@/features/cbc/notification";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { Notification } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { EnumFieldType } from "@/enums/EnumFieldType";

export type NotificationUpdatePanelProps = {
  data: Notification;
  onUpdated?: (data: Notification) => void;
};

const NotificationUpdatePanel = forwardRef(
  ({ data, onUpdated }: NotificationUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useNotificationGet(data.id as number);
    const { mutate: notificationUpdate } = useNotificationUpdate();
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
                      name: "type_id",
                      label: {
                        text: t("notification.type_id", { ns: "fields" }),
                      },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: "/notification-type",
                      displayName: "type",
                      valueName: "id",
                    },

                    {
                      name: "message",
                      label: {
                        text: t("notification.message", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "user_id",
                      label: {
                        text: t("notification.user_id", { ns: "fields" }),
                      },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: "/user",
                      displayName: "user",
                      valueName: "id",
                    },

                    {
                      name: "coin_id",
                      label: {
                        text: t("notification.coin_id", { ns: "fields" }),
                      },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: "/coin",
                      displayName: "coin",
                      valueName: "id",
                    },
                  ]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    notificationUpdate({
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

NotificationUpdatePanel.displayName = "NotificationUpdatePanel";

export default NotificationUpdatePanel;
