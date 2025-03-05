import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from '@/components/panels/form-panel'
import { Overlay } from '@/components/custom/overlay'
import { TabPanel } from '@/components/panels/tab-panel'
import {
  useMultifactorGet,
  useMultifactorUpdate,
} from '@/features/admin/multifactor'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { Multifactor } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export type MultifactorUpdatePanelProps = {
  data: Multifactor
  onUpdated?: (data: Multifactor) => void
}

const MultifactorUpdatePanel = forwardRef(
  ({ data, onUpdated }: MultifactorUpdatePanelProps, ref) => {
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { data: item, isLoading } = useMultifactorGet(data.id as number)
    const { mutate: multifactorUpdate } = useMultifactorUpdate()
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
                  fields={[...getFieldsLocale([{ name: 'name' }], item)]}
                  button={{ text: t('save', { ns: 'actions' }) }}
                  onSubmit={(data) => {
                    multifactorUpdate({
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

MultifactorUpdatePanel.displayName = 'MultifactorUpdatePanel'

export default MultifactorUpdatePanel
