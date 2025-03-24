import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'

import { useMailSentCreate } from '@/features/mail-manager/mail-sent'
import { MailSent } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export type MailSentCreatePanelRef = {
  submit: () => void
}

export type MailSentCreatePanelProps = {
  onCreated?: (data: MailSent) => void
}

const MailSentCreatePanel = forwardRef(
  ({ onCreated }: MailSentCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null)
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { mutateAsync: createMailSent } = useMailSentCreate()

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
            name: 'mail_id',
            label: {
              text: t('mail_manager.mail_id', { ns: 'fields' }),
            },
            type: EnumFieldType.COMBOBOX,
            required: true,
            url: '/mail',
            displayName: 'mail',
            valueName: 'id',
          },
          {
            name: 'subject',
            label: { text: t('mail_manager.subject', { ns: 'fields' }) },
            type: EnumFieldType.TEXT,
            required: true,
          },
          {
            name: 'from',
            label: { text: t('mail_manager.from', { ns: 'fields' }) },
            type: EnumFieldType.TEXT,
            required: true,
          },
          {
            name: 'to',
            label: { text: t('mail_manager.to', { ns: 'fields' }) },
            type: EnumFieldType.TEXT,
            required: true,
          },
          {
            name: 'cc',
            label: { text: t('mail_manager.cc', { ns: 'fields' }) },
            type: EnumFieldType.TEXT,
            required: true,
          },
          {
            name: 'bcc',
            label: { text: t('mail_manager.bcc', { ns: 'fields' }) },
            type: EnumFieldType.TEXT,
            required: true,
          },
          {
            name: 'body',
            label: { text: t('mail_manager.body', { ns: 'fields' }) },
            type: EnumFieldType.TEXTAREA,
            required: true,
          },
        ]}
        button={{ text: t('create', { ns: 'actions' }) }}
        onSubmit={async (data) => {
          const createdData = await createMailSent({
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

MailSentCreatePanel.displayName = 'MailSentCreatePanel'

export default MailSentCreatePanel
