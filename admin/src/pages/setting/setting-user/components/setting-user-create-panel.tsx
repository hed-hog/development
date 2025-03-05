import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import { useSettingUserCreate } from '@/features/setting/setting-user'
import { SettingUser } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export type SettingUserCreatePanelRef = {
  submit: () => void
}

export type SettingUserCreatePanelProps = {
  onCreated?: (data: SettingUser) => void
}

const SettingUserCreatePanel = forwardRef(
  ({ onCreated }: SettingUserCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null)
    const { t } = useTranslation(['actions'])
    const { mutateAsync: createSettingUser } = useSettingUserCreate()

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
            name: 'user_id',
            label: { text: t('user_id', { ns: 'translation' }) },
            type: EnumFieldType.TEXT,
            required: true,
          },

          {
            name: 'setting_id',
            label: { text: t('setting_id', { ns: 'translation' }) },
            type: EnumFieldType.TEXT,
            required: true,
          },

          {
            name: 'value',
            label: { text: t('value', { ns: 'translation' }) },
            type: EnumFieldType.TEXT,
            required: true,
          },
        ]}
        button={{ text: t('create', { ns: 'actions' }) }}
        onSubmit={async (data) => {
          const createdData = await createSettingUser(data)
          if (typeof onCreated === 'function') {
            onCreated(createdData)
          }
        }}
      />
    )
  }
)

SettingUserCreatePanel.displayName = 'SettingUserCreatePanel'

export default SettingUserCreatePanel
