import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from '@/components/panels/form-panel'
import { Overlay } from '@/components/custom/overlay'
import { TabPanel } from '@/components/panels/tab-panel'
import {
  useComponentPropTypeGet,
  useComponentPropTypeUpdate,
} from '@/features/page/component-prop-type'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { ComponentPropType } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export type ComponentPropTypeUpdatePanelProps = {
  data: ComponentPropType
  onUpdated?: (data: ComponentPropType) => void
}

const ComponentPropTypeUpdatePanel = forwardRef(
  ({ data, onUpdated }: ComponentPropTypeUpdatePanelProps, ref) => {
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { data: item, isLoading } = useComponentPropTypeGet(data.id as number)
    const { mutate: componentPropTypeUpdate } = useComponentPropTypeUpdate()
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
                    componentPropTypeUpdate({
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

ComponentPropTypeUpdatePanel.displayName = 'ComponentPropTypeUpdatePanel'

export default ComponentPropTypeUpdatePanel
