import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'

import { useMailVarCreate } from '@/features/mail-manager/mail-var'
import { MailVar } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export type MailVarCreatePanelRef = {
  submit: () => void
}

export type MailVarCreatePanelProps = {
  onCreated?: (data: MailVar) => void
}

const MailVarCreatePanel = forwardRef(
  ({ onCreated }: MailVarCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null)
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { mutateAsync: createMailVar } = useMailVarCreate()

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
            name: 'name',
            label: { text: t('mail_manager.name', { ns: 'fields' }) },
            type: EnumFieldType.TEXT,
            required: true,
          },
        ]}
        button={{ text: t('create', { ns: 'actions' }) }}
        onSubmit={async (data) => {
          const createdData = await createMailVar({
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

MailVarCreatePanel.displayName = 'MailVarCreatePanel'

export default MailVarCreatePanel
