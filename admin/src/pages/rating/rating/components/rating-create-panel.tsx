import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import { useRatingCreate } from "@/features/rating/rating";
import { Rating } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type RatingCreatePanelRef = {
  submit: () => void;
};

export type RatingCreatePanelProps = {
  onCreated?: (data: Rating) => void;
};

const RatingCreatePanel = forwardRef(
  ({ onCreated }: RatingCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createRating } = useRatingCreate();

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
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createRating({
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

RatingCreatePanel.displayName = "RatingCreatePanel";

export default RatingCreatePanel;
