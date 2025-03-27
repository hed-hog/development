import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { Overlay } from '@/components/custom/overlay'
import { TabPanel } from '@/components/panels/tab-panel'
import { useInstanceGet, useInstanceUpdate } from '@/features/page/instance'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { Instance } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export type InstanceUpdatePanelProps = {
  data: Instance
  onUpdated?: (data: Instance) => void
}

const InstanceUpdatePanel = forwardRef(
  ({ data, onUpdated }: InstanceUpdatePanelProps, ref) => {
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { data: item, isLoading } = useInstanceGet(data.id as number)
    const { mutate: instanceUpdate } = useInstanceUpdate()
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
                    instanceUpdate({
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

InstanceUpdatePanel.displayName = 'InstanceUpdatePanel'

export default InstanceUpdatePanel
