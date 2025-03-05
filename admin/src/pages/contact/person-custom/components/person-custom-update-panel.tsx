import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from '@/components/panels/form-panel'
import { Overlay } from '@/components/custom/overlay'
import { TabPanel } from '@/components/panels/tab-panel'
import {
  usePersonCustomGet,
  usePersonCustomUpdate,
} from '@/features/contact/person-custom'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { PersonCustom } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { EnumFieldType } from '@/enums/EnumFieldType'

export type PersonCustomUpdatePanelProps = {
  id: number
  data: PersonCustom
  onUpdated?: (data: PersonCustom) => void
}

const PersonCustomUpdatePanel = forwardRef(
  ({ id, data, onUpdated }: PersonCustomUpdatePanelProps, ref) => {
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { data: item, isLoading } = usePersonCustomGet(id, data.id as number)
    const { mutate: personCustomUpdate } = usePersonCustomUpdate()
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
                      name: 'value',
                      label: {
                        text: t('person_custom.value', { ns: 'fields' }),
                      },
                      type: EnumFieldType.RICHTEXT,
                      required: true,
                    },

                    ...getFieldsLocale([{ name: 'name' }], item),
                  ]}
                  button={{ text: t('save', { ns: 'actions' }) }}
                  onSubmit={(data) => {
                    personCustomUpdate({
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

PersonCustomUpdatePanel.displayName = 'PersonCustomUpdatePanel'

export default PersonCustomUpdatePanel
