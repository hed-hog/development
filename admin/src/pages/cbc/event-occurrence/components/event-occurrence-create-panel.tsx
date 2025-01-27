import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";

import { useEventOccurrenceCreate } from "@/features/cbc/event-occurrence";
import { EventOccurrence } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type EventOccurrenceCreatePanelRef = {
  submit: () => void;
};

export type EventOccurrenceCreatePanelProps = {
  onCreated?: (data: EventOccurrence) => void;
};

const EventOccurrenceCreatePanel = forwardRef(
  ({ onCreated }: EventOccurrenceCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createEventOccurrence } = useEventOccurrenceCreate();

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
          const createdData = await createEventOccurrence({
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

EventOccurrenceCreatePanel.displayName = "EventOccurrenceCreatePanel";

export default EventOccurrenceCreatePanel;
