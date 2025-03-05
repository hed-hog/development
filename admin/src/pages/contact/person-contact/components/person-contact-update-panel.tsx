import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { Overlay } from '@/components/custom/overlay'
import { TabPanel } from '@/components/panels/tab-panel'
import {
  usePersonContactGet,
  usePersonContactUpdate,
} from '@/features/contact/person-contact'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { PersonContact } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { EnumFieldType } from '@/enums/EnumFieldType'

export type PersonContactUpdatePanelProps = {
  id: number
  data: PersonContact
  onUpdated?: (data: PersonContact) => void
}

const PersonContactUpdatePanel = forwardRef(
  ({ id, data, onUpdated }: PersonContactUpdatePanelProps, ref) => {
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { data: item, isLoading } = usePersonContactGet(id, data.id as number)
    const { mutate: personContactUpdate } = usePersonContactUpdate()
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
                      name: 'type_id',
                      label: {
                        text: t('person_contact.type_id', { ns: 'fields' }),
                      },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: '/person-contact-type',
                      displayName: 'type',
                      valueName: 'id',
                    },

                    {
                      name: 'primary',
                      label: {
                        text: t('person_contact.primary', { ns: 'fields' }),
                      },
                      type: EnumFieldType.SWITCH,
                      required: true,
                    },

                    {
                      name: 'value',
                      label: {
                        text: t('person_contact.value', { ns: 'fields' }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },
                  ]}
                  button={{ text: t('save', { ns: 'actions' }) }}
                  onSubmit={(data) => {
                    personContactUpdate({
                      personId: id,
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

PersonContactUpdatePanel.displayName = 'PersonContactUpdatePanel'

export default PersonContactUpdatePanel
