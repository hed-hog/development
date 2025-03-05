import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from '@/components/panels/form-panel'
import { Overlay } from '@/components/custom/overlay'
import { TabPanel } from '@/components/panels/tab-panel'
import {
  usePersonContactTypeGet,
  usePersonContactTypeUpdate,
} from '@/features/contact/person-contact-type'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { PersonContactType } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { EnumFieldType } from '@/enums/EnumFieldType'

export type PersonContactTypeUpdatePanelProps = {
  data: PersonContactType
  onUpdated?: (data: PersonContactType) => void
}

const PersonContactTypeUpdatePanel = forwardRef(
  ({ data, onUpdated }: PersonContactTypeUpdatePanelProps, ref) => {
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { data: item, isLoading } = usePersonContactTypeGet(data.id as number)
    const { mutate: personContactTypeUpdate } = usePersonContactTypeUpdate()
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
                      name: 'slug',
                      label: {
                        text: t('person_contact_type.slug', { ns: 'fields' }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    ...getFieldsLocale([{ name: 'name' }], item),
                  ]}
                  button={{ text: t('save', { ns: 'actions' }) }}
                  onSubmit={(data) => {
                    personContactTypeUpdate({
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

PersonContactTypeUpdatePanel.displayName = 'PersonContactTypeUpdatePanel'

export default PersonContactTypeUpdatePanel
