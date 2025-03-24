import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from '@/components/panels/form-panel'

import { useMailCreate } from '@/features/mail-manager/mail'
import { Mail } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { EnumFieldType } from '@/enums/EnumFieldType'

export type MailCreatePanelRef = {
  submit: () => void
}

export type MailCreatePanelProps = {
  onCreated?: (data: Mail) => void
}

const MailCreatePanel = forwardRef(
  ({ onCreated }: MailCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null)
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { mutateAsync: createMail } = useMailCreate()

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
            label: { text: t('mail_manager.slug', { ns: 'fields' }) },
            type: EnumFieldType.TEXT,
            required: true,
          },
          ...getFieldsLocale([{ name: 'subject' }]),
          ...getFieldsLocale([{ name: 'body' }]),
        ]}
        button={{ text: t('create', { ns: 'actions' }) }}
        onSubmit={async (data) => {
          const createdData = await createMail({
            data,
          })
          if (typeof onCreated === 'function') {
            onCreated(createdData as any)
          }
        }}
      />
    )
  }
)

MailCreatePanel.displayName = 'MailCreatePanel'

export default MailCreatePanel
