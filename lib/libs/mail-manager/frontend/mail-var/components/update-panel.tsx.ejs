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
import { EnumFieldType } from '@/enums/EnumFieldType'

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
