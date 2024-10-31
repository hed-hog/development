import FormPanel, { FormPanelRefType } from '@/components/custom/form-panel'
import { TabPanel } from '@/components/custom/tab-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import { useEditPersonType } from '@/features/person-type'
import { PersonType } from '@/types/models'
import { t } from 'i18next'
import { forwardRef, useRef } from 'react'

export type PersonTypeUpdatePanelProps = {
  onUpdated?: (data: PersonType) => void
}

export const PersonTypeUpdatePanel = forwardRef(
  ({ onUpdated }: PersonTypeUpdatePanelProps, ref) => {
    const { mutate: editPersonType } = useEditPersonType()
    const formRef = useRef<FormPanelRefType>(null)

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
