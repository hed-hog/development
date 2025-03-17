import { Overlay } from '@/components/custom/overlay'
import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { TabPanel } from '@/components/panels/tab-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import { useItemGet, useItemUpdate } from '@/features/payment/item'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { Item } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

export type ItemUpdatePanelProps = {
  data: Item
  onUpdated?: (data: Item) => void
}

const ItemUpdatePanel = forwardRef(
  ({ data, onUpdated }: ItemUpdatePanelProps, ref) => {
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { data: item, isLoading } = useItemGet(data.id as number)
    const { mutate: ItemUpdate } = useItemUpdate()
    const formRef = useRef<FormPanelRef>(null)
    const [selectedIds, setSelectedIds] = useState<Record<string, any>[]>([])

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
                      name: 'slug',
                      label: {
                        text: t('item.slug', {
                          ns: 'fields',
                        }),
                      },
                      required: true,
                      type: EnumFieldType.TEXT,
                    },
                    {
                      name: 'name',
                      label: {
                        text: t('item.name', {
                          ns: 'fields',
                        }),
                      },
                      required: true,
                      type: EnumFieldType.TEXT,
                    },
                    {
                      name: 'price',
                      label: {
                        text: t('item.price', {
                          ns: 'fields',
                        }),
                      },
                      required: true,
                      type: EnumFieldType.NUMBER,
                    },
                    {
                      name: 'coupons',
                      type: EnumFieldType.PICKER,
                      label: {
                        text: t('payment.coupon_id', { ns: 'fields' }),
                      },
                      required: true,
                      url: '/payment-coupon',
                      value: selectedIds,
                      onChange: setSelectedIds,
                      columnName: t('payment.coupon_id', { ns: 'fields' }),
                    },
                  ]}
                  button={{ text: t('save', { ns: 'actions' }) }}
                  onSubmit={(data) => {
                    ItemUpdate({
                      id: data.id,
                      data: {
                        ...data,
                        price: Number(data.price),
                        coupon_ids: data.coupons.map(
                          (coupon: any) => coupon.id
                        ),
                      },
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

ItemUpdatePanel.displayName = 'ItemUpdatePanel'

export default ItemUpdatePanel
