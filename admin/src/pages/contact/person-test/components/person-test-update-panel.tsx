import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
  usePersonTestGet,
  usePersonTestUpdate,
} from "@/features/contact/person-test";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { PersonTest } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { EnumFieldType } from "@/enums/EnumFieldType";

export type PersonTestUpdatePanelProps = {
  data: PersonTest;
  onUpdated?: (data: PersonTest) => void;
};

const PersonTestUpdatePanel = forwardRef(
  ({ data, onUpdated }: PersonTestUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions"]);
    const { data: item, isLoading } = usePersonTestGet(data.id as number);
    const { mutate: personTestUpdate } = usePersonTestUpdate();
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
                      label: { text: t("slug", { ns: "translation" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },
                  ]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    personTestUpdate({ id: data.id, data });
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

PersonTestUpdatePanel.displayName = "PersonTestUpdatePanel";

export default PersonTestUpdatePanel;
