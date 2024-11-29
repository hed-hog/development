import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import { usePersonGet, usePersonUpdate } from "@/features/contact/person";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { Person } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { EnumFieldType } from "@/enums/EnumFieldType";

import DataPanel from "@/components/panels/data-panel";
import { PersonValue } from "@/types/models/PersonValue.ts";
import { PersonAddress } from "@/types/models/PersonAddress.ts";
import { PersonContact } from "@/types/models/PersonContact.ts";
import { PersonDocument } from "@/types/models/PersonDocument.ts";
import { PersonCustom } from "@/types/models/PersonCustom.ts";

export type PersonUpdatePanelProps = {
  data: Person;
  onUpdated?: (data: Person) => void;
};

const PersonUpdatePanel = forwardRef(
  ({ data, onUpdated }: PersonUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions"]);
    const { data: item, isLoading } = usePersonGet(data.id as number);
    const { mutate: personUpdate } = usePersonUpdate();
    const formRef = useRef<FormPanelRef>(null);

    const personValueRef = useRef<any>(null);
    const personAddressRef = useRef<any>(null);
    const personContactRef = useRef<any>(null);
    const personDocumentRef = useRef<any>(null);
    const personCustomRef = useRef<any>(null);

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
                      name: "name",
                      label: { text: t("name", { ns: "translation" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "photo_id",
                      label: { text: t("photo_id", { ns: "translation" }) },
                      type: EnumFieldType.FILE,
                      required: true,
                      url: "/file",
                      displayName: "photo",
                      valueName: "id",
                    },

                    {
                      name: "type_id",
                      label: { text: t("type_id", { ns: "translation" }) },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: "/person-type",
                      displayName: "type",
                      valueName: "id",
                    },

                    {
                      name: "birth_at",
                      label: { text: t("birth_at", { ns: "translation" }) },
                      type: EnumFieldType.DATEPICKER,
                      required: true,
                    },
                  ]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    personUpdate({ id: data.id, data });
                    if (typeof onUpdated === "function") {
                      onUpdated(data);
                    }
                  }}
                />
              </Overlay>
            ),
          },
          {
            title: t("person-value", { ns: "modules" }),
            children: (
              <DataPanel
                ref={personValueRef}
                selectable
                multiple
                layout="list"
                id={`person-${item?.id}`}
                url={`/person/${item?.id}/person-value`}
                render={(item: PersonValue) => (
                  <div className="flex flex-row gap-2">
                    <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                      value: {item.value}
                    </span>
                  </div>
                )}
              />
            ),
            buttons: [
              {
                text: t("apply", { ns: "actions" }),
                variant: "default",
                onClick: () => {},
              },
            ],
          },
          {
            title: t("person-address", { ns: "modules" }),
            children: (
              <DataPanel
                ref={personAddressRef}
                selectable
                multiple
                layout="list"
                id={`person-${item?.id}`}
                url={`/person/${item?.id}/person-address`}
                render={(item: PersonAddress) => (
                  <div className="flex flex-row gap-2">
                    <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                      street: {item.street}
                    </span>
                  </div>
                )}
              />
            ),
            buttons: [
              {
                text: t("apply", { ns: "actions" }),
                variant: "default",
                onClick: () => {},
              },
            ],
          },
          {
            title: t("person-contact", { ns: "modules" }),
            children: (
              <DataPanel
                ref={personContactRef}
                selectable
                multiple
                layout="list"
                id={`person-${item?.id}`}
                url={`/person/${item?.id}/person-contact`}
                render={(item: PersonContact) => (
                  <div className="flex flex-row gap-2">
                    <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                      value: {item.value}
                    </span>
                  </div>
                )}
              />
            ),
            buttons: [
              {
                text: t("apply", { ns: "actions" }),
                variant: "default",
                onClick: () => {},
              },
            ],
          },
          {
            title: t("person-document", { ns: "modules" }),
            children: (
              <DataPanel
                ref={personDocumentRef}
                selectable
                multiple
                layout="list"
                id={`person-${item?.id}`}
                url={`/person/${item?.id}/person-document`}
                render={(item: PersonDocument) => (
                  <div className="flex flex-row gap-2">
                    <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                      value: {item.value}
                    </span>
                  </div>
                )}
              />
            ),
            buttons: [
              {
                text: t("apply", { ns: "actions" }),
                variant: "default",
                onClick: () => {},
              },
            ],
          },
          {
            title: t("person-custom", { ns: "modules" }),
            children: (
              <DataPanel
                ref={personCustomRef}
                selectable
                multiple
                layout="list"
                id={`person-${item?.id}`}
                url={`/person/${item?.id}/person-custom`}
                render={(item: PersonCustom) => (
                  <div className="flex flex-row gap-2">
                    <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                      id: {item.id}
                    </span>
                  </div>
                )}
              />
            ),
            buttons: [
              {
                text: t("apply", { ns: "actions" }),
                variant: "default",
                onClick: () => {},
              },
            ],
          },
        ]}
      />
    );
  },
);

PersonUpdatePanel.displayName = "PersonUpdatePanel";

export default PersonUpdatePanel;
