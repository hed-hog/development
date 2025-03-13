import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { Overlay } from '@/components/custom/overlay'
import { TabPanel } from '@/components/panels/tab-panel'
import { usePaymentGet, usePaymentUpdate } from '@/features/payment/payment'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { Payment } from '@/types/models'
import { useState, forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { useApp } from '@/hooks/use-app'
import { isPlural } from '@/lib/utils'
import { PaymentItem } from '@/types/models/PaymentItem.ts'
import { usePaymentItemDelete } from '@/features/payment/payment-item'
import PaymentItemCreatePanel from '@/pages/management/payment/payment-item/components/payment-item-create-panel'
import PaymentItemUpdatePanel from '@/pages/management/payment/payment-item/components/payment-item-update-panel'
import { PaymentValue } from '@/types/models/PaymentValue.ts'
import { usePaymentValueDelete } from '@/features/payment/payment-value'
import PaymentValueCreatePanel from '@/pages/management/payment/payment-value/components/payment-value-create-panel'
import PaymentValueUpdatePanel from '@/pages/management/payment/payment-value/components/payment-value-update-panel'
import { PaymentNotification } from '@/types/models/PaymentNotification.ts'
import { usePaymentNotificationDelete } from '@/features/payment/payment-notification'
import PaymentNotificationCreatePanel from '@/pages/management/payment/payment-notification/components/payment-notification-create-panel'
import PaymentNotificationUpdatePanel from '@/pages/management/payment/payment-notification/components/payment-notification-update-panel'
import { PaymentCouponItem } from '@/types/models/PaymentCouponItem.ts'
import { usePaymentCouponItemDelete } from '@/features/payment/payment-coupon-item'
import PaymentCouponItemCreatePanel from '@/pages/management/payment/payment-coupon-item/components/payment-coupon-item-create-panel'
import PaymentCouponItemUpdatePanel from '@/pages/management/payment/payment-coupon-item/components/payment-coupon-item-update-panel'
import DataPanel from '@/components/panels/data-panel'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { EnumFieldType } from '@/enums/EnumFieldType'

export type PaymentUpdatePanelProps = {
  data: Payment
  onUpdated?: (data: Payment) => void
}

const PaymentUpdatePanel = forwardRef(
  ({ data, onUpdated }: PaymentUpdatePanelProps, ref) => {
    const { t } = useTranslation([
      'actions',
      'fields',
      'translations',
      'payment.payment-item',
      'payment.payment-value',
      'payment.payment-notification',
      'payment.payment-coupon-item',
    ])
    const { data: item, isLoading } = usePaymentGet(data.id as number)
    const { mutate: paymentUpdate } = usePaymentUpdate()
    const formRef = useRef<FormPanelRef>(null)

    const { openDialog, confirm, closeDialog } = useApp()
    const [, setSelectedItems] = useState<any[]>([])
    const paymentItemRef = useRef<any>(null)
    const { mutate: paymentItemDelete } = usePaymentItemDelete()
    const openCreatePaymentItem = () => {
      const id = openDialog({
        title: t('create', { ns: 'payment.payment-item' }),
        description: t('createText', { ns: 'payment.payment-item' }),
        children: () => (
          <PaymentItemCreatePanel
            id={Number(data.id)}
            onCreated={() => closeDialog(id)}
          />
        ),
      })

      return id
    }
    const openUpdatePaymentItem = (itemPaymentItem: PaymentItem) => {
      const id = openDialog({
        children: () => (
          <PaymentItemUpdatePanel
            id={Number(item?.id)}
            data={itemPaymentItem}
            onUpdated={() => closeDialog(id)}
          />
        ),
        title: t('edit', { ns: 'payment.payment-item' }),
        description: t('editText', { ns: 'payment.payment-item' }),
      })

      return id
    }
    const openDeletePaymentItem = (items: PaymentItem[]) => {
      return confirm({
        title: `${t('delete', { ns: 'actions' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
        description: t('deleteText', { ns: 'payment.payment-item' }),
      })
        .then(() =>
          paymentItemDelete({
            id: Number(data.id),
            ids: items.map((item) => item.id).filter((id) => id !== undefined),
          })
        )
        .catch(() => setSelectedItems(items))
    }
    const paymentValueRef = useRef<any>(null)
    const { mutate: paymentValueDelete } = usePaymentValueDelete()
    const openCreatePaymentValue = () => {
      const id = openDialog({
        title: t('create', { ns: 'payment.payment-value' }),
        description: t('createText', { ns: 'payment.payment-value' }),
        children: () => (
          <PaymentValueCreatePanel
            id={Number(data.id)}
            onCreated={() => closeDialog(id)}
          />
        ),
      })

      return id
    }
    const openUpdatePaymentValue = (itemPaymentValue: PaymentValue) => {
      const id = openDialog({
        children: () => (
          <PaymentValueUpdatePanel
            id={Number(item?.id)}
            data={itemPaymentValue}
            onUpdated={() => closeDialog(id)}
          />
        ),
        title: t('edit', { ns: 'payment.payment-value' }),
        description: t('editText', { ns: 'payment.payment-value' }),
      })

      return id
    }
    const openDeletePaymentValue = (items: PaymentValue[]) => {
      return confirm({
        title: `${t('delete', { ns: 'actions' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
        description: t('deleteText', { ns: 'payment.payment-value' }),
      })
        .then(() =>
          paymentValueDelete({
            id: Number(data.id),
            ids: items.map((item) => item.id).filter((id) => id !== undefined),
          })
        )
        .catch(() => setSelectedItems(items))
    }
    const paymentNotificationRef = useRef<any>(null)
    const { mutate: paymentNotificationDelete } = usePaymentNotificationDelete()
    const openCreatePaymentNotification = () => {
      const id = openDialog({
        title: t('create', { ns: 'payment.payment-notification' }),
        description: t('createText', { ns: 'payment.payment-notification' }),
        children: () => (
          <PaymentNotificationCreatePanel
            id={Number(data.id)}
            onCreated={() => closeDialog(id)}
          />
        ),
      })

      return id
    }
    const openUpdatePaymentNotification = (
      itemPaymentNotification: PaymentNotification
    ) => {
      const id = openDialog({
        children: () => (
          <PaymentNotificationUpdatePanel
            id={Number(item?.id)}
            data={itemPaymentNotification}
            onUpdated={() => closeDialog(id)}
          />
        ),
        title: t('edit', { ns: 'payment.payment-notification' }),
        description: t('editText', { ns: 'payment.payment-notification' }),
      })

      return id
    }
    const openDeletePaymentNotification = (items: PaymentNotification[]) => {
      return confirm({
        title: `${t('delete', { ns: 'actions' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
        description: t('deleteText', { ns: 'payment.payment-notification' }),
      })
        .then(() =>
          paymentNotificationDelete({
            id: Number(data.id),
            ids: items.map((item) => item.id).filter((id) => id !== undefined),
          })
        )
        .catch(() => setSelectedItems(items))
    }
    const paymentCouponItemRef = useRef<any>(null)
    const { mutate: paymentCouponItemDelete } = usePaymentCouponItemDelete()
    const openCreatePaymentCouponItem = () => {
      const id = openDialog({
        title: t('create', { ns: 'payment.payment-coupon-item' }),
        description: t('createText', { ns: 'payment.payment-coupon-item' }),
        children: () => (
          <PaymentCouponItemCreatePanel
            id={Number(data.id)}
            onCreated={() => closeDialog(id)}
          />
        ),
      })

      return id
    }
    const openUpdatePaymentCouponItem = (
      itemPaymentCouponItem: PaymentCouponItem
    ) => {
      const id = openDialog({
        children: () => (
          <PaymentCouponItemUpdatePanel
            id={Number(item?.id)}
            data={itemPaymentCouponItem}
            onUpdated={() => closeDialog(id)}
          />
        ),
        title: t('edit', { ns: 'payment.payment-coupon-item' }),
        description: t('editText', { ns: 'payment.payment-coupon-item' }),
      })

      return id
    }
    const openDeletePaymentCouponItem = (items: PaymentCouponItem[]) => {
      return confirm({
        title: `${t('delete', { ns: 'actions' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
        description: t('deleteText', { ns: 'payment.payment-coupon-item' }),
      })
        .then(() =>
          paymentCouponItemDelete({
            id: Number(data.id),
            ids: items.map((item) => item.id).filter((id) => id !== undefined),
          })
        )
        .catch(() => setSelectedItems(items))
    }

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
                      type: EnumFieldType.TEXT,
                      label: {
                        text: t('payment.slug', { ns: 'fields' }),
                      },
                      required: true,
                    },
                    {
                      name: 'person_id',
                      type: EnumFieldType.COMBOBOX,
                      label: {
                        text: t('payment.person_id', { ns: 'fields' }),
                      },
                      url: '/person',
                      displayName: 'name',
                      valueName: 'id',
                    },
                    {
                      name: 'gateway_id',
                      type: EnumFieldType.COMBOBOX,
                      label: {
                        text: t('payment.gateway_id', { ns: 'fields' }),
                      },
                      required: true,
                      url: '/payment-gateway',
                      displayName: 'name',
                      valueName: 'id',
                    },
                    {
                      name: 'amount',
                      type: EnumFieldType.NUMBER,
                      label: {
                        text: t('payment.amount', { ns: 'fields' }),
                      },
                      required: true,
                    },
                    {
                      name: 'status_id',
                      type: EnumFieldType.COMBOBOX,
                      label: {
                        text: t('payment.status_id', { ns: 'fields' }),
                      },
                      required: true,
                      url: '/payment-status',
                      displayName: 'name',
                      valueName: 'id',
                    },
                    {
                      name: 'document',
                      type: EnumFieldType.TEXT,
                      label: {
                        text: t('payment.document', { ns: 'fields' }),
                      },
                    },
                    {
                      name: 'payment_at',
                      type: EnumFieldType.DATEPICKER,
                      label: {
                        text: t('payment.payment_at', { ns: 'fields' }),
                      },
                    },
                    {
                      name: 'currency',
                      type: EnumFieldType.TEXT,
                      label: {
                        text: t('payment.currency', { ns: 'fields' }),
                      },
                      required: true,
                    },
                    {
                      name: 'method_id',
                      type: EnumFieldType.COMBOBOX,
                      label: {
                        text: t('payment.method_id', { ns: 'fields' }),
                      },
                      url: '/payment-method',
                      displayName: 'name',
                      valueName: 'id',
                    },
                    {
                      name: 'brand_id',
                      type: EnumFieldType.COMBOBOX,
                      label: {
                        text: t('payment.brand_id', { ns: 'fields' }),
                      },
                      url: '/payment-card-brand',
                      displayName: 'name',
                      valueName: 'id',
                    },
                    {
                      name: 'installments',
                      type: EnumFieldType.NUMBER,
                      label: {
                        text: t('payment.installments', { ns: 'fields' }),
                      },
                    },
                    {
                      name: 'delivered',
                      type: EnumFieldType.NUMBER,
                      label: {
                        text: t('payment.delivered', { ns: 'fields' }),
                      },
                    },
                    {
                      name: 'coupon_id',
                      type: EnumFieldType.COMBOBOX,
                      label: {
                        text: t('payment.coupon_id', { ns: 'fields' }),
                      },
                      url: '/payment-coupon',
                      displayName: 'code',
                      valueName: 'id',
                    },
                    {
                      name: 'discount',
                      type: EnumFieldType.TEXT,
                      label: {
                        text: t('payment.discount', { ns: 'fields' }),
                      },
                    },
                  ]}
                  button={{ text: t('save', { ns: 'actions' }) }}
                  onSubmit={(data) => {
                    paymentUpdate({
                      id: data.id,
                      data: {
                        ...data,
                        amount: parseFloat(data.amount),
                        discount: parseFloat(data.discount),
                        installments: parseInt(data.installments),
                        delivered: parseInt(data.delivered),
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
          {
            title: t('payment_item', { ns: 'modules' }),
            children: (
              <DataPanel
                ref={paymentItemRef}
                selectable
                multiple
                layout='list'
                id={`payment-item-${item?.id}`}
                url={`/payment/${item?.id}/payment-item`}
                render={(item: PaymentItem) => (
                  <div className='flex flex-row gap-2'>
                    <span className='relative px-[0.3rem] py-[0.2rem] text-sm'>
                      Preço: {item.unit_price}
                    </span>
                  </div>
                )}
                menuActions={[
                  {
                    icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
                    label: t('edit', { ns: 'actions' }),
                    tooltip: t('editTooltip', { ns: 'payment.payment-item' }),
                    handler: (items: PaymentItem[]) => {
                      if (items.length === 1) openUpdatePaymentItem(items[0])
                    },
                    show: 'once',
                  },
                  {
                    icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
                    label: t('delete', { ns: 'actions' }),
                    tooltip: t('deleteTooltip', { ns: 'payment.payment-item' }),
                    variant: 'destructive',
                    handler: (items: PaymentItem[]) => {
                      openDeletePaymentItem(items)
                    },
                    show: 'some',
                  },
                  {
                    icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
                    label: t('create', { ns: 'actions' }),
                    tooltip: t('createTooltip', { ns: 'payment.payment-item' }),
                    variant: 'default',
                    handler: () => {
                      openCreatePaymentItem()
                    },
                    show: 'none',
                  },
                ]}
              />
            ),
          },
          {
            title: t('payment_value', { ns: 'modules' }),
            children: (
              <DataPanel
                ref={paymentValueRef}
                selectable
                multiple
                layout='list'
                id={`payment-value-${item?.id}`}
                url={`/payment/${item?.id}/payment-value`}
                render={(item: PaymentValue) => (
                  <div className='flex flex-row gap-2'>
                    <span className='relative px-[0.3rem] py-[0.2rem] text-sm'>
                      {item.name}
                    </span>
                  </div>
                )}
                menuActions={[
                  {
                    icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
                    label: t('edit', { ns: 'actions' }),
                    tooltip: t('editTooltip', { ns: 'payment.payment-value' }),
                    handler: (items: PaymentValue[]) => {
                      if (items.length === 1) openUpdatePaymentValue(items[0])
                    },
                    show: 'once',
                  },
                  {
                    icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
                    label: t('delete', { ns: 'actions' }),
                    tooltip: t('deleteTooltip', {
                      ns: 'payment.payment-value',
                    }),
                    variant: 'destructive',
                    handler: (items: PaymentValue[]) => {
                      openDeletePaymentValue(items)
                    },
                    show: 'some',
                  },
                  {
                    icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
                    label: t('create', { ns: 'actions' }),
                    tooltip: t('createTooltip', {
                      ns: 'payment.payment-value',
                    }),
                    variant: 'default',
                    handler: () => {
                      openCreatePaymentValue()
                    },
                    show: 'none',
                  },
                ]}
              />
            ),
          },
          {
            title: t('payment_notification', { ns: 'modules' }),
            children: (
              <DataPanel
                ref={paymentNotificationRef}
                selectable
                multiple
                layout='list'
                id={`payment-notification-${item?.id}`}
                url={`/payment/${item?.id}/payment-notification`}
                render={(item: PaymentNotification) => (
                  <div className='flex flex-row gap-2'>
                    <span className='relative px-[0.3rem] py-[0.2rem] text-sm'>
                      {item.log}
                    </span>
                  </div>
                )}
                menuActions={[
                  {
                    icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
                    label: t('edit', { ns: 'actions' }),
                    tooltip: t('editTooltip', {
                      ns: 'payment.payment-notification',
                    }),
                    handler: (items: PaymentNotification[]) => {
                      if (items.length === 1)
                        openUpdatePaymentNotification(items[0])
                    },
                    show: 'once',
                  },
                  {
                    icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
                    label: t('delete', { ns: 'actions' }),
                    tooltip: t('deleteTooltip', {
                      ns: 'payment.payment-notification',
                    }),
                    variant: 'destructive',
                    handler: (items: PaymentNotification[]) => {
                      openDeletePaymentNotification(items)
                    },
                    show: 'some',
                  },
                  {
                    icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
                    label: t('create', { ns: 'actions' }),
                    tooltip: t('createTooltip', {
                      ns: 'payment.payment-notification',
                    }),
                    variant: 'default',
                    handler: () => {
                      openCreatePaymentNotification()
                    },
                    show: 'none',
                  },
                ]}
              />
            ),
          },
          {
            title: t('payment_coupon_item', { ns: 'modules' }),
            children: (
              <DataPanel
                ref={paymentCouponItemRef}
                selectable
                multiple
                layout='list'
                id={`payment-coupon-item-${item?.id}`}
                url={`/payment-coupon/${item?.id}/payment-coupon-item`}
                render={(item: PaymentCouponItem) => (
                  <div className='flex flex-row gap-2'>
                    <span className='relative px-[0.3rem] py-[0.2rem] text-sm'>
                      {item.item?.name}
                    </span>
                  </div>
                )}
                menuActions={[
                  {
                    icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
                    label: t('edit', { ns: 'actions' }),
                    tooltip: t('editTooltip', {
                      ns: 'payment.payment-notification',
                    }),
                    handler: (items: PaymentCouponItem[]) => {
                      if (items.length === 1)
                        openUpdatePaymentCouponItem(items[0])
                    },
                    show: 'once',
                  },
                  {
                    icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
                    label: t('delete', { ns: 'actions' }),
                    tooltip: t('deleteTooltip', {
                      ns: 'payment.payment-notification',
                    }),
                    variant: 'destructive',
                    handler: (items: PaymentCouponItem[]) => {
                      openDeletePaymentCouponItem(items)
                    },
                    show: 'some',
                  },
                  {
                    icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
                    label: t('create', { ns: 'actions' }),
                    tooltip: t('createTooltip', {
                      ns: 'payment.payment-notification',
                    }),
                    variant: 'default',
                    handler: () => {
                      openCreatePaymentCouponItem()
                    },
                    show: 'none',
                  },
                ]}
              />
            ),
          },
        ]}
      />
    )
  }
)

PaymentUpdatePanel.displayName = 'PaymentUpdatePanel'

export default PaymentUpdatePanel
