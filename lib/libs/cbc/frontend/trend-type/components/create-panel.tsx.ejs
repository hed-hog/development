import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from "@/components/panels/form-panel";

import { useTrendTypeCreate } from "@/features/cbc/trend-type";
import { TrendType } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type TrendTypeCreatePanelRef = {
  submit: () => void;
};

export type TrendTypeCreatePanelProps = {
  onCreated?: (data: TrendType) => void;
};

const TrendTypeCreatePanel = forwardRef(
  ({ onCreated }: TrendTypeCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createTrendType } = useTrendTypeCreate();

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
          const createdData = await createTrendType({
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

TrendTypeCreatePanel.displayName = "TrendTypeCreatePanel";

export default TrendTypeCreatePanel;
