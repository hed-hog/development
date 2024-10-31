import FormPanel from '@/components/custom/form-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import { useCreatePersonType } from '@/features/person-type'
import { PersonType } from '@/types/models'
import { forwardRef, useImperativeHandle } from 'react'
import { useTranslation } from 'react-i18next'

export type PersonTypeCreatePanelProps = {
  onCreated?: (data: PersonType) => void
}

export const PersonTypeCreatePanel = forwardRef(
  ({ onCreated }: PersonTypeCreatePanelProps, ref) => {
    const { t } = useTranslation(['person-types', 'actions'])
    const { mutateAsync: createPersonType } = useCreatePersonType()

    useImperativeHandle(ref, () => ({}))

    return (
      <FormPanel
        fields={[
          {
            name: 'name',
            label: { text: t('name', { ns: 'person-types' }) },
            type: EnumFieldType.TEXT,
            required: true,
          },
        ]}
        button={{ text: t('create', { ns: 'actions' }) }}
        onSubmit={(data: PersonType) => {
          createPersonType({
            id: Number(data.id),
            name: data.name,
            slug: '',
          }).then((data) => {
            if (typeof onCreated === 'function') {
              onCreated(data)
            }
          })
        }}
      />
    )
  }
)
