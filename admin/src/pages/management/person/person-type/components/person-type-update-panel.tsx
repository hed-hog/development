import FormPanel, { FormPanelRefType } from '@/components/custom/form-panel'
import { TabPanel } from '@/components/custom/tab-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import { useEditPersonType } from '@/features/person-type'
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
    const { mutate: editPersonType } = useEditPersonType()
    const formRef = useRef<FormPanelRefType>(null)

    useEffectAfterFirstUpdate(() => {
      if (item && formRef.current) {
        formRef.current.setValuesFromItem(item)
      }
    }, [item, formRef])

    useImperativeHandle(ref, () => ({}))

    return (
      <TabPanel
        activeTabIndex={0}
        tabs={[
          {
            title: t('details', { ns: 'actions' }),
            buttons: [
              {
                text: t('save', { ns: 'actions' }),
                variant: 'default',
                onClick: () => {
                  formRef.current?.submit()
                },
              },
            ],
            children: (
              <FormPanel
                ref={formRef}
                fields={[
                  {
                    name: 'name',
                    label: { text: t('name', { ns: 'person-types' }) },
                    type: EnumFieldType.TEXT,
                    required: false,
                  },
                ]}
                onSubmit={(data: PersonType) => {
                  editPersonType({
                    id: String(data.id),
                    data: { ...data, slug: '' },
                  })
                  if (typeof onUpdated === 'function') {
                    onUpdated(data)
                  }
                }}
              />
            ),
          },
        ]}
      />
    )
  }
)
