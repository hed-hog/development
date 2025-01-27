import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import { useEventGet, useEventUpdate } from "@/features/cbc/event";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { Event } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";

export type EventUpdatePanelProps = {
  data: Event;
  onUpdated?: (data: Event) => void;
};

const EventUpdatePanel = forwardRef(
  ({ data, onUpdated }: EventUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useEventGet(data.id as number);
    const { mutate: eventUpdate } = useEventUpdate();
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
                  fields={[...getFieldsLocale([{ name: "name" }], item)]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    eventUpdate({
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

EventUpdatePanel.displayName = "EventUpdatePanel";

export default EventUpdatePanel;
