import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from '@/components/panels/form-panel'
import { Overlay } from '@/components/custom/overlay'
import { TabPanel } from '@/components/panels/tab-panel'
import { useScreenGet, useScreenUpdate } from '@/features/admin/screen'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { Screen } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export type ScreenUpdatePanelProps = {
  data: Screen
  onUpdated?: (data: Screen) => void
}

const ScreenUpdatePanel = forwardRef(
  ({ data, onUpdated }: ScreenUpdatePanelProps, ref) => {
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { data: item, isLoading } = useScreenGet(data.id as number)
    const { mutate: screenUpdate } = useScreenUpdate()
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
                    screenUpdate({
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

ScreenUpdatePanel.displayName = 'ScreenUpdatePanel'

export default ScreenUpdatePanel
