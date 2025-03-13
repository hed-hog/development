import { Overlay } from '@/components/custom/overlay'
import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from '@/components/panels/form-panel'
import { TabPanel } from '@/components/panels/tab-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import { useFaqGet, useFaqUpdate } from '@/features/faq'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { Faq } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export type FaqUpdatePanelProps = {
  data: Faq
  onUpdated?: (data: Faq) => void
}

const FaqUpdatePanel = forwardRef(
  ({ data, onUpdated }: FaqUpdatePanelProps, ref) => {
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { data: item, isLoading } = useFaqGet(data.id as number)
    const { mutate: faqUpdate } = useFaqUpdate()
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
                    ...getFieldsLocale(
                      [
                        { name: 'question' },
                        { name: 'answer', type: EnumFieldType.HTML },
                      ],
                      item
                    ),
                  ]}
                  button={{ text: t('save', { ns: 'actions' }) }}
                  onSubmit={(data) => {
                    faqUpdate({
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

FaqUpdatePanel.displayName = 'FaqUpdatePanel'

export default FaqUpdatePanel
