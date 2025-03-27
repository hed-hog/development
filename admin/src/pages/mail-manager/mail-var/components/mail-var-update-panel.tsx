import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { Overlay } from '@/components/custom/overlay'
import { TabPanel } from '@/components/panels/tab-panel'
import {
  useMailVarGet,
  useMailVarUpdate,
} from '@/features/mail-manager/mail-var'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { MailVar } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export type MailVarUpdatePanelProps = {
  data: MailVar
  onUpdated?: (data: MailVar) => void
}

const MailVarUpdatePanel = forwardRef(
  ({ data, onUpdated }: MailVarUpdatePanelProps, ref) => {
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { data: item, isLoading } = useMailVarGet(data.id as number)
    const { mutate: mailVarUpdate } = useMailVarUpdate()
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
                    mailVarUpdate({
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

MailVarUpdatePanel.displayName = 'MailVarUpdatePanel'

export default MailVarUpdatePanel
