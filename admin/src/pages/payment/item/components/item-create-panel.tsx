import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";

import { useItemCreate } from "@/features/payment/item";
import { Item } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type ItemCreatePanelRef = {
  submit: () => void;
};

export type ItemCreatePanelProps = {
  onCreated?: (data: Item) => void;
};

const ItemCreatePanel = forwardRef(
  ({ onCreated }: ItemCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createItem } = useItemCreate();

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
          const createdData = await createItem({
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

ItemCreatePanel.displayName = "ItemCreatePanel";

export default ItemCreatePanel;
