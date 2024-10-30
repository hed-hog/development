import { EnumFieldType } from '@/enums/EnumFieldType'
import { useLocales } from '@/features/locales'
import { useCreateRole } from '@/features/roles'
import { FieldType } from '@/types/form-panel'
import { Roles } from '@/types/models'
import { forwardRef } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { FormPanel } from './form-panel'

export type RoleCreateProps = {
  onCreate?: (data: Roles) => void
}

export const RoleCreatePanel = forwardRef(({ onCreate }: RoleCreateProps) => {
  const { t } = useTranslation(['actions', 'roles', 'translation'])
  const { data: localesEnabled } = useLocales()
  const { mutate: createRole } = useCreateRole()
  const form = useForm<FieldValues>({
    mode: 'onSubmit',
  })

  return (
    <FormPanel
      fields={[
        {
          name: 'slug',
          label: { text: t('slug', { ns: 'translation' }) },
          type: EnumFieldType.TEXT,
          required: true,
        },
        ...(localesEnabled?.data.data
          .map((item) => item.code)
          .map((code) => ({
            name: `${code}-name`,
            label: {
              text: t('name', { ns: 'translation' }),
              ...(localesEnabled?.data.data.length > 1 ? { small: code } : {}),
            },
            type: EnumFieldType.TEXT as FieldType,
            required: true,
          })) || []),
        ...(localesEnabled?.data.data
          .map((item) => item.code)
          .map((code) => ({
            name: `${code}-description`,
            label: {
              text: t('description', { ns: 'translation' }),
              ...(localesEnabled?.data.data.length > 1 ? { small: code } : {}),
            },
            type: EnumFieldType.TEXT as FieldType,
            required: true,
          })) || []),
      ]}
      form={form}
      button={{ text: t('create', { ns: 'actions' }) }}
      onSubmit={(data: Roles) => {
        createRole(data)
        if (typeof onCreate === 'function') {
          onCreate(data)
        }
      }}
    />
  )
})
