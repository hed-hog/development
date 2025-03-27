import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { Overlay } from '@/components/custom/overlay'
import { TabPanel } from '@/components/panels/tab-panel'
import {
  useTranslationGet,
  useTranslationUpdate,
} from '@/features/admin/translation'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { Translation } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export type TranslationUpdatePanelProps = {
  data: Translation
  onUpdated?: (data: Translation) => void
}

const TranslationUpdatePanel = forwardRef(
  ({ data, onUpdated }: TranslationUpdatePanelProps, ref) => {
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { data: item, isLoading } = useTranslationGet(data.id as number)
    const { mutate: translationUpdate } = useTranslationUpdate()
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
                    translationUpdate({
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

TranslationUpdatePanel.displayName = 'TranslationUpdatePanel'

export default TranslationUpdatePanel
