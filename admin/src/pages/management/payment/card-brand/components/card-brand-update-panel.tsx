import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { Overlay } from '@/components/custom/overlay'
import { TabPanel } from '@/components/panels/tab-panel'
import {
  useCardBrandGet,
  useCardBrandUpdate,
} from '@/features/payment/card-brand'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { PaymentCardBrand } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { EnumFieldType } from '@/enums/EnumFieldType'

export type CardBrandUpdatePanelProps = {
  data: PaymentCardBrand
  onUpdated?: (data: PaymentCardBrand) => void
}

const CardBrandUpdatePanel = forwardRef(
  ({ data, onUpdated }: CardBrandUpdatePanelProps, ref) => {
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { data: item, isLoading } = useCardBrandGet(data.id as number)
    const { mutate: cardBrandUpdate } = useCardBrandUpdate()
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
                      name: 'name',
                      label: { text: t('card_brand.name', { ns: 'fields' }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },
                  ]}
                  button={{ text: t('save', { ns: 'actions' }) }}
                  onSubmit={(data) => {
                    cardBrandUpdate({
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

CardBrandUpdatePanel.displayName = 'CardBrandUpdatePanel'

export default CardBrandUpdatePanel
