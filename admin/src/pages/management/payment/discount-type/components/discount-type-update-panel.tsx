import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { Overlay } from '@/components/custom/overlay'
import { TabPanel } from '@/components/panels/tab-panel'
import {
  useDiscountTypeGet,
  useDiscountTypeUpdate,
} from '@/features/payment/discount-type'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { DiscountType } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { EnumFieldType } from '@/enums/EnumFieldType'

export type DiscountTypeUpdatePanelProps = {
  data: DiscountType
  onUpdated?: (data: DiscountType) => void
}

const DiscountTypeUpdatePanel = forwardRef(
  ({ data, onUpdated }: DiscountTypeUpdatePanelProps, ref) => {
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { data: item, isLoading } = useDiscountTypeGet(data.id as number)
    const { mutate: discountTypeUpdate } = useDiscountTypeUpdate()
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
                      label: {
                        text: t('discount_type.name', { ns: 'fields' }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },
                    {
                      name: 'slug',
                      label: {
                        text: t('discount_type.slug', { ns: 'fields' }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },
                  ]}
                  button={{ text: t('save', { ns: 'actions' }) }}
                  onSubmit={(data) => {
                    discountTypeUpdate({
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

DiscountTypeUpdatePanel.displayName = 'DiscountTypeUpdatePanel'

export default DiscountTypeUpdatePanel
