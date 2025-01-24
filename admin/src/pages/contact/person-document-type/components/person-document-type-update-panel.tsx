<<<<<<< HEAD
import { Overlay } from '@/components/custom/overlay'
import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from '@/components/panels/form-panel'
import { TabPanel } from '@/components/panels/tab-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import {
  usePersonDocumentTypeGet,
  usePersonDocumentTypeUpdate,
} from '@/features/contact/person-document-type'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { PersonDocumentType } from '@/types/models'
import { t } from 'i18next'
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export type PersonDocumentTypeUpdatePanelProps = {
  data: PersonDocumentType
  onUpdated?: (data: PersonDocumentType) => void
}

const PersonDocumentTypeUpdatePanel = forwardRef(
  ({ data, onUpdated }: PersonDocumentTypeUpdatePanelProps, ref) => {
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { data: item, isLoading } = usePersonDocumentTypeGet(
      data.id as number
    )
    const { mutate: personDocumentTypeUpdate } = usePersonDocumentTypeUpdate()
    const formRef = useRef<FormPanelRef>(null)

    useEffectAfterFirstUpdate(() => {
      if (item && formRef.current) {
        formRef.current.setValuesFromItem(item)
      }
    }, [item])

    useEffect(() => {
      console.log({ item })
    }, [item])

    useImperativeHandle(ref, () => ({}))
=======
import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
  usePersonDocumentTypeGet,
  usePersonDocumentTypeUpdate,
} from "@/features/contact/person-document-type";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { PersonDocumentType } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { EnumFieldType } from "@/enums/EnumFieldType";

export type PersonDocumentTypeUpdatePanelProps = {
  data: PersonDocumentType;
  onUpdated?: (data: PersonDocumentType) => void;
};

const PersonDocumentTypeUpdatePanel = forwardRef(
  ({ data, onUpdated }: PersonDocumentTypeUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = usePersonDocumentTypeGet(
      data.id as number,
    );
    const { mutate: personDocumentTypeUpdate } = usePersonDocumentTypeUpdate();
    const formRef = useRef<FormPanelRef>(null);

    useEffectAfterFirstUpdate(() => {
      if (item && formRef.current) {
        formRef.current.setValuesFromItem(item);
      }
    }, [item]);

    useImperativeHandle(ref, () => ({}));
>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4

    return (
      <TabPanel
        activeTabIndex={0}
        tabs={[
          {
<<<<<<< HEAD
            title: t('details', { ns: 'actions' }),
=======
            title: t("details", { ns: "actions" }),
>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4
            children: (
              <Overlay loading={isLoading}>
                <FormPanel
                  ref={formRef}
                  fields={[
                    {
<<<<<<< HEAD
                      name: 'country_id',
                      label: {
                        text: t('person_document_type.country_id', {
                          ns: 'fields',
=======
                      name: "country_id",
                      label: {
                        text: t("person_document_type.country_id", {
                          ns: "fields",
>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4
                        }),
                      },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
<<<<<<< HEAD
                      url: '/country',
                      displayName: 'country',
                      valueName: 'id',
                    },

                    {
                      name: 'slug',
                      label: {
                        text: t('person_document_type.slug', { ns: 'fields' }),
=======
                      url: "/country",
                      displayName: "country",
                      valueName: "id",
                    },

                    {
                      name: "slug",
                      label: {
                        text: t("person_document_type.slug", { ns: "fields" }),
>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

<<<<<<< HEAD
                    ...getFieldsLocale([{ name: 'name' }], item),
                  ]}
                  button={{ text: t('save', { ns: 'actions' }) }}
=======
                    ...getFieldsLocale([{ name: "name" }], item),
                  ]}
                  button={{ text: t("save", { ns: "actions" }) }}
>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4
                  onSubmit={(data) => {
                    personDocumentTypeUpdate({
                      id: data.id,
                      data,
<<<<<<< HEAD
                    })
                    if (typeof onUpdated === 'function') {
                      onUpdated(data)
=======
                    });
                    if (typeof onUpdated === "function") {
                      onUpdated(data);
>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4
                    }
                  }}
                />
              </Overlay>
            ),
          },
        ]}
      />
<<<<<<< HEAD
    )
  }
)

PersonDocumentTypeUpdatePanel.displayName = 'PersonDocumentTypeUpdatePanel'

export default PersonDocumentTypeUpdatePanel
=======
    );
  },
);

PersonDocumentTypeUpdatePanel.displayName = "PersonDocumentTypeUpdatePanel";

export default PersonDocumentTypeUpdatePanel;
>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4
