import { EnumFieldType } from '@/enums/EnumFieldType'
import { useLocaleListEnabled } from '@/features/locale'
import { useCreateRole } from '@/features/role'
import { FieldType } from '@/types/form-panel'
import { Role } from '@/types/models'
import { forwardRef, useImperativeHandle } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import FormPanel from '@/components/panels/form-panel'

export type RoleCreateProps = {
  onCreate?: (data: Role) => void
}

const RoleCreatePanel = forwardRef(({ onCreate }: RoleCreateProps, ref) => {
  const { t } = useTranslation(['actions', 'role', 'translation'])
  const { data: localeEnabled } = useLocaleListEnabled()
  const { mutate: createRole } = useCreateRole()
  const form = useForm<FieldValues>({
    mode: 'onSubmit',
    values: {
      slug: '',
    },
    defaultValues: {
      slug: '',
    },
  })

  useImperativeHandle(ref, () => ({}), [])

  return (
    <FormPanel
      fields={[
        {
          name: 'slug',
          label: { text: t('slug', { ns: 'translation' }) },
          type: EnumFieldType.TEXT,
          required: true,
        },
        ...(localeEnabled?.data
          .map((item) => item.code)
          .map((code) => ({
            name: `${code}-name`,
            label: {
              text: t('name', { ns: 'translation' }),
              ...(localeEnabled?.data.length > 1 ? { small: code } : {}),
            },
            type: EnumFieldType.TEXT as FieldType,
            required: true,
          })) || []),
        ...(localeEnabled?.data
          .map((item) => item.code)
          .map((code) => ({
            name: `${code}-description`,
            label: {
              text: t('description', { ns: 'translation' }),
              ...(localeEnabled?.data.length > 1 ? { small: code } : {}),
            },
            type: EnumFieldType.TEXT as FieldType,
            required: true,
          })) || []),
      ]}
      form={form}
      button={{ text: t('create', { ns: 'actions' }) }}
      onSubmit={(data: Role) => {
        createRole(data)
        if (typeof onCreate === 'function') {
          onCreate(data)
        }
      }}
    />
  )
})

RoleCreatePanel.displayName = 'RoleCreatePanel'

export default RoleCreatePanel
