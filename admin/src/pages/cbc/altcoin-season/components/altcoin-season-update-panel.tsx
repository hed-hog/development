import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
<<<<<<<< HEAD:lib/libs/cbc/frontend/altcoin-season/components/update-panel.tsx.ejs
  useAltcoinSeasonGet,
  useAltcoinSeasonUpdate,
} from "@/features/cbc/altcoin-season";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { AltcoinSeason } from "@/types/models";
========
  useComponentTypeGet,
  useComponentTypeUpdate,
} from "@/features/page/component-type";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { ComponentType } from "@/types/models";
>>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4:lib/libs/page/frontend/component-type/components/update-panel.tsx.ejs
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";

<<<<<<<< HEAD:lib/libs/cbc/frontend/altcoin-season/components/update-panel.tsx.ejs
export type AltcoinSeasonUpdatePanelProps = {
  data: AltcoinSeason;
  onUpdated?: (data: AltcoinSeason) => void;
};

const AltcoinSeasonUpdatePanel = forwardRef(
  ({ data, onUpdated }: AltcoinSeasonUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useAltcoinSeasonGet(data.id as number);
    const { mutate: altcoinSeasonUpdate } = useAltcoinSeasonUpdate();
========
export type ComponentTypeUpdatePanelProps = {
  data: ComponentType;
  onUpdated?: (data: ComponentType) => void;
};

const ComponentTypeUpdatePanel = forwardRef(
  ({ data, onUpdated }: ComponentTypeUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useComponentTypeGet(data.id as number);
    const { mutate: componentTypeUpdate } = useComponentTypeUpdate();
>>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4:lib/libs/page/frontend/component-type/components/update-panel.tsx.ejs
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
<<<<<<<< HEAD:lib/libs/cbc/frontend/altcoin-season/components/update-panel.tsx.ejs
                    altcoinSeasonUpdate({
========
                    componentTypeUpdate({
>>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4:lib/libs/page/frontend/component-type/components/update-panel.tsx.ejs
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

<<<<<<<< HEAD:lib/libs/cbc/frontend/altcoin-season/components/update-panel.tsx.ejs
AltcoinSeasonUpdatePanel.displayName = "AltcoinSeasonUpdatePanel";

export default AltcoinSeasonUpdatePanel;
========
ComponentTypeUpdatePanel.displayName = "ComponentTypeUpdatePanel";

export default ComponentTypeUpdatePanel;
>>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4:lib/libs/page/frontend/component-type/components/update-panel.tsx.ejs
