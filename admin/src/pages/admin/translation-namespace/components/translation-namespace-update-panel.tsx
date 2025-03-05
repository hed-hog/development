import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { Overlay } from '@/components/custom/overlay'
import { TabPanel } from '@/components/panels/tab-panel'
import {
  useTranslationNamespaceGet,
  useTranslationNamespaceUpdate,
} from '@/features/admin/translation-namespace'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { TranslationNamespace } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export type TranslationNamespaceUpdatePanelProps = {
  data: TranslationNamespace
  onUpdated?: (data: TranslationNamespace) => void
}

const TranslationNamespaceUpdatePanel = forwardRef(
  ({ data, onUpdated }: TranslationNamespaceUpdatePanelProps, ref) => {
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { data: item, isLoading } = useTranslationNamespaceGet(
      data.id as number
    )
    const { mutate: translationNamespaceUpdate } =
      useTranslationNamespaceUpdate()
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
                    translationNamespaceUpdate({
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

TranslationNamespaceUpdatePanel.displayName = 'TranslationNamespaceUpdatePanel'

export default TranslationNamespaceUpdatePanel
