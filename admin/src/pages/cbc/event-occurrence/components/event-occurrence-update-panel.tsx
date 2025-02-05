import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
  useEventOccurrenceGet,
  useEventOccurrenceUpdate,
} from "@/features/cbc/event-occurrence";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { EventOccurrence } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";

export type EventOccurrenceUpdatePanelProps = {
  data: EventOccurrence;
  onUpdated?: (data: EventOccurrence) => void;
};

const EventOccurrenceUpdatePanel = forwardRef(
  ({ data, onUpdated }: EventOccurrenceUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useEventOccurrenceGet(data.id as number);
    const { mutate: eventOccurrenceUpdate } = useEventOccurrenceUpdate();
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
                  fields={[]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    eventOccurrenceUpdate({
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

EventOccurrenceUpdatePanel.displayName = "EventOccurrenceUpdatePanel";

export default EventOccurrenceUpdatePanel;
