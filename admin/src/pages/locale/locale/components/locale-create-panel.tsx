import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import { useLocaleCreate } from '@/features/locale/locale'
import { Locale } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export type LocaleCreatePanelRef = {
  submit: () => void
}

export type LocaleCreatePanelProps = {
  onCreated?: (data: Locale) => void
}

const LocaleCreatePanel = forwardRef(
  ({ onCreated }: LocaleCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null)
    const { t } = useTranslation(['actions'])
    const { mutateAsync: createLocale } = useLocaleCreate()

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
            name: 'code',
            label: { text: t('code', { ns: 'translation' }) },
            type: EnumFieldType.TEXT,
            required: true,
          },

          {
            name: 'region',
            label: { text: t('region', { ns: 'translation' }) },
            type: EnumFieldType.TEXT,
            required: true,
          },

          {
            name: 'enabled',
            label: { text: t('enabled', { ns: 'translation' }) },
            type: EnumFieldType.TEXT,
            required: true,
          },
        ]}
        button={{ text: t('create', { ns: 'actions' }) }}
        onSubmit={async (data) => {
          const createdData = await createLocale(data)
          if (typeof onCreated === 'function') {
            onCreated(createdData)
          }
        }}
      />
    )
  }
)

LocaleCreatePanel.displayName = 'LocaleCreatePanel'

export default LocaleCreatePanel
