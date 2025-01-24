import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
<<<<<<<< HEAD:admin/src/pages/cbc/top-cmc/components/top-cmc-update-panel.tsx
import { useTopCmcGet, useTopCmcUpdate } from "@/features/cbc/top-cmc";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { TopCmc } from "@/types/models";
========
import { useComponentGet, useComponentUpdate } from "@/features/page/component";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { Component } from "@/types/models";
>>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4:lib/libs/page/frontend/component/components/update-panel.tsx.ejs
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";

<<<<<<<< HEAD:admin/src/pages/cbc/top-cmc/components/top-cmc-update-panel.tsx
export type TopCmcUpdatePanelProps = {
  data: TopCmc;
  onUpdated?: (data: TopCmc) => void;
};

const TopCmcUpdatePanel = forwardRef(
  ({ data, onUpdated }: TopCmcUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useTopCmcGet(data.id as number);
    const { mutate: topCmcUpdate } = useTopCmcUpdate();
========
export type ComponentUpdatePanelProps = {
  data: Component;
  onUpdated?: (data: Component) => void;
};

const ComponentUpdatePanel = forwardRef(
  ({ data, onUpdated }: ComponentUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useComponentGet(data.id as number);
    const { mutate: componentUpdate } = useComponentUpdate();
>>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4:lib/libs/page/frontend/component/components/update-panel.tsx.ejs
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
<<<<<<<< HEAD:admin/src/pages/cbc/top-cmc/components/top-cmc-update-panel.tsx
                    topCmcUpdate({
========
                    componentUpdate({
>>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4:lib/libs/page/frontend/component/components/update-panel.tsx.ejs
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

<<<<<<<< HEAD:admin/src/pages/cbc/top-cmc/components/top-cmc-update-panel.tsx
TopCmcUpdatePanel.displayName = "TopCmcUpdatePanel";

export default TopCmcUpdatePanel;
========
ComponentUpdatePanel.displayName = "ComponentUpdatePanel";

export default ComponentUpdatePanel;
>>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4:lib/libs/page/frontend/component/components/update-panel.tsx.ejs
