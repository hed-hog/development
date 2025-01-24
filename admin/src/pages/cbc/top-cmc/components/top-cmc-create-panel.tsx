import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";

<<<<<<<< HEAD:admin/src/pages/cbc/top-cmc/components/top-cmc-create-panel.tsx
import { useTopCmcCreate } from "@/features/cbc/top-cmc";
import { TopCmc } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type TopCmcCreatePanelRef = {
  submit: () => void;
};

export type TopCmcCreatePanelProps = {
  onCreated?: (data: TopCmc) => void;
};

const TopCmcCreatePanel = forwardRef(
  ({ onCreated }: TopCmcCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createTopCmc } = useTopCmcCreate();
========
import { useComponentCreate } from "@/features/page/component";
import { Component } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type ComponentCreatePanelRef = {
  submit: () => void;
};

export type ComponentCreatePanelProps = {
  onCreated?: (data: Component) => void;
};

const ComponentCreatePanel = forwardRef(
  ({ onCreated }: ComponentCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createComponent } = useComponentCreate();
>>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4:lib/libs/page/frontend/component/components/create-panel.tsx.ejs

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
<<<<<<<< HEAD:admin/src/pages/cbc/top-cmc/components/top-cmc-create-panel.tsx
          const createdData = await createTopCmc({
========
          const createdData = await createComponent({
>>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4:lib/libs/page/frontend/component/components/create-panel.tsx.ejs
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

<<<<<<<< HEAD:admin/src/pages/cbc/top-cmc/components/top-cmc-create-panel.tsx
TopCmcCreatePanel.displayName = "TopCmcCreatePanel";

export default TopCmcCreatePanel;
========
ComponentCreatePanel.displayName = "ComponentCreatePanel";

export default ComponentCreatePanel;
>>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4:lib/libs/page/frontend/component/components/create-panel.tsx.ejs
