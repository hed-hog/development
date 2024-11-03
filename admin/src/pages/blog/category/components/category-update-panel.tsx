import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from "@/components/custom/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/custom/tab-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import { useCategoryGet, useCategoryUpdate } from "@/features/category";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { Category } from "@/types/models";
import { t } from "i18next";
import { forwardRef, useImperativeHandle, useRef } from "react";

export type CategoryUpdatePanelProps = {
  data: Category;
  onUpdated?: (data: Category) => void;
};

export const CategoryUpdatePanel = forwardRef(
  ({ data, onUpdated }: CategoryUpdatePanelProps, ref) => {
    const { data: item, isLoading } = useCategoryGet(data.id as number);
    const { mutate: categoryUpdate } = useCategoryUpdate();
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
                  fields={[...getFieldsLocale([{ name: "name" }])]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    categoryUpdate({ id: data.id, data });
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
