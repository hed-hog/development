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
                  fields={[]}
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
