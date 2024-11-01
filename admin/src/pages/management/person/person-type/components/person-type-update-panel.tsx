import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from '@/components/custom/form-panel'
import { Overlay } from '@/components/custom/overlay'
import { TabPanel } from '@/components/custom/tab-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import { usePersonTypeGet, usePersonTypeUpdate } from '@/features/person-type'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { PersonType } from '@/types/models'
import { t } from 'i18next'
import { forwardRef, useImperativeHandle, useRef } from 'react'

export type PersonTypeUpdatePanelProps = {
  data: PersonType
  onUpdated?: (data: PersonType) => void
}

export const PersonTypeUpdatePanel = forwardRef(
  ({ data, onUpdated }: PersonTypeUpdatePanelProps, ref) => {
    const { data: item, isLoading } = usePersonTypeGet(data.id as number)
    const { mutate: personTypeUpdate } = usePersonTypeUpdate()
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
                      label: { text: t('slug', { ns: 'translation' }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },
                    ...getFieldsLocale([{ name: 'name' }]),
                  ]}
                  button={{ text: t('save', { ns: 'actions' }) }}
                  onSubmit={(data) => {
                    personTypeUpdate({ id: data.id, data })
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
