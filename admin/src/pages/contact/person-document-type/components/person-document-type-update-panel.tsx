import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from '@/components/panels/form-panel'
import { Overlay } from '@/components/custom/overlay'
import { TabPanel } from '@/components/panels/tab-panel'
import {
  usePersonDocumentTypeGet,
  usePersonDocumentTypeUpdate,
} from '@/features/contact/person-document-type'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { PersonDocumentType } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { EnumFieldType } from '@/enums/EnumFieldType'

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

    useImperativeHandle(ref, () => ({}))

    return (
      <TabPanel
        activeTabIndex={0}
        tabs={[
          {
            title: t('details', { ns: 'actions' }),
            children: (
              <Overlay loading={isLoading}>
                <FormPanel
                  ref={formRef}
                  fields={[
                    {
                      name: 'country_id',
                      label: {
                        text: t('person_document_type.country_id', {
                          ns: 'fields',
                        }),
                      },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: '/country?pageSize=200',
                      displayName: 'country',
                      valueName: 'id',
                    },

                    {
                      name: 'slug',
                      label: {
                        text: t('person_document_type.slug', { ns: 'fields' }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    ...getFieldsLocale([{ name: 'name' }], item),
                  ]}
                  button={{ text: t('save', { ns: 'actions' }) }}
                  onSubmit={(data) => {
                    personDocumentTypeUpdate({
                      id: data.id,
                      data,
                    })
                    if (typeof onUpdated === 'function') {
                      onUpdated(data)
                    }
                  }}
                />
              </Overlay>
            ),
          },
        ]}
      />
    )
  }
)

PersonDocumentTypeUpdatePanel.displayName = 'PersonDocumentTypeUpdatePanel'

export default PersonDocumentTypeUpdatePanel
