import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import { useRatingGet, useRatingUpdate } from "@/features/rating/rating";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { Rating } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { EnumFieldType } from "@/enums/EnumFieldType";

export type RatingUpdatePanelProps = {
  data: Rating;
  onUpdated?: (data: Rating) => void;
};

const RatingUpdatePanel = forwardRef(
  ({ data, onUpdated }: RatingUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useRatingGet(data.id as number);
    const { mutate: ratingUpdate } = useRatingUpdate();
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
                      name: "comment",
                      label: { text: t("rating.comment", { ns: "fields" }) },
                      type: EnumFieldType.RICHTEXT,
                      required: true,
                    },

                    {
                      name: "note",
                      label: { text: t("rating.note", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "person_id",
                      label: { text: t("rating.person_id", { ns: "fields" }) },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: "/person",
                      displayName: "person",
                      valueName: "id",
                    },
                  ]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    ratingUpdate({
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

RatingUpdatePanel.displayName = "RatingUpdatePanel";

export default RatingUpdatePanel;
