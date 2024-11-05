import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";

import { useCategoryGet, useCategoryUpdate } from "@/features/blog/category";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { Category } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type CategoryUpdatePanelProps = {
  data: Category;
  onUpdated?: (data: Category) => void;
};

const CategoryUpdatePanel = forwardRef(
  ({ data, onUpdated }: CategoryUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions"]);
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

CategoryUpdatePanel.displayName = "CategoryUpdatePanel";

export default CategoryUpdatePanel;
