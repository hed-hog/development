import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { Overlay } from '@/components/custom/overlay'
import { TabPanel } from '@/components/panels/tab-panel'
import {
  useMailSentGet,
  useMailSentUpdate,
} from '@/features/mail-manager/mail-sent'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { MailSent } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { EnumFieldType } from '@/enums/EnumFieldType'

export type MailSentUpdatePanelProps = {
  data: MailSent
  onUpdated?: (data: MailSent) => void
}

const MailSentUpdatePanel = forwardRef(
  ({ data, onUpdated }: MailSentUpdatePanelProps, ref) => {
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { data: item, isLoading } = useMailSentGet(data.id as number)
    const { mutate: mailSentUpdate } = useMailSentUpdate()
    const formRef = useRef<FormPanelRef>(null)

    useEffectAfterFirstUpdate(() => {
      if (item && formRef.current) {
        formRef.current.setValuesFromItem(item)
      }
    }, [item])

    useImperativeHandle(ref, () => ({}))

    return (
      <TabPanel
        activeTabIndex={0}
        tabs={[
          {
            title: t('details', { ns: 'actions' }),
            children: (
              <Overlay loading={isLoading}>
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
                      label: {
                        text: t('mail_manager.subject', { ns: 'fields' }),
                      },
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
                  button={{ text: t('save', { ns: 'actions' }) }}
                  onSubmit={(data) => {
                    mailSentUpdate({
                      id: data.id,
                      data,
                    })
                    if (typeof onUpdated === 'function') {
                      onUpdated(data)
                    }
                  }}
                />
              </Overlay>
            ),
          },
        ]}
      />
    )
  }
)

MailSentUpdatePanel.displayName = 'MailSentUpdatePanel'

export default MailSentUpdatePanel
