import FormPanel, { FormPanelRef } from '@/components/custom/form-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import { useLocaleListEnabled } from '@/features/locale'
import { usePersonTypeCreate } from '@/features/person-type'
import { FieldType } from '@/types'
import { PersonType } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export type PersonTypeCreatePanelRef = {
  submit: () => void
}

export type PersonTypeCreatePanelProps = {
  onCreated?: (data: PersonType) => void
}

export const PersonTypeCreatePanel = forwardRef(
  ({ onCreated }: PersonTypeCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null)
    const { data: localeEnabled } = useLocaleListEnabled()
    const { t } = useTranslation(['person-types', 'actions'])
    const { mutateAsync: createPersonType } = usePersonTypeCreate()

    useImperativeHandle(
      ref,
      () => ({
        submit: () => {
          formRef.current?.submit()
        },
      }),
      [formRef]
    )

    return (
      <FormPanel
        ref={formRef}
        fields={[
          {
            name: 'slug',
            label: { text: t('slug', { ns: 'translation' }) },
            type: EnumFieldType.TEXT,
            required: true,
          },
          ...(localeEnabled?.data?.map(({ code }) => ({
            name: `${code}-name`,
            label: {
              text: t('name', { ns: 'translation' }),
              ...(localeEnabled.data.length > 1 ? { small: code } : {}),
            },
            type: EnumFieldType.TEXT as FieldType,
            required: false,
          })) || []),
        ]}
        button={{ text: t('create', { ns: 'actions' }) }}
        onSubmit={async (data) => {
          const createdData = await createPersonType(data)
          if (typeof onCreated === 'function') {
            onCreated(createdData)
          }
        }}
      />
    )
  }
)
