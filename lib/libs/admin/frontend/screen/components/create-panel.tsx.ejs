import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from "@/components/panels/form-panel";

import { useScreenCreate } from "@/features/admin/screen";
import { Screen } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type ScreenCreatePanelRef = {
  submit: () => void;
};

export type ScreenCreatePanelProps = {
  onCreated?: (data: Screen) => void;
};

const ScreenCreatePanel = forwardRef(
  ({ onCreated }: ScreenCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createScreen } = useScreenCreate();

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
        fields={[...getFieldsLocale([{ name: "name" }])]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createScreen({
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

ScreenCreatePanel.displayName = "ScreenCreatePanel";

export default ScreenCreatePanel;
