import { PageTitle } from '@/components/custom/page-title'
import DataPanel from '@/components/panels/data-panel'
import { useSubscriptionPlanItemDelete } from '@/features/subscription/subscription-plan-item'
import { useApp } from '@/hooks/use-app'
import { isPlural } from '@/lib/utils'
import { Item } from '@/types/models'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import SubscriptionPlanItemCreatePanel from './components/subscription-plan-item-create-panel'
import SubscriptionPlanItemUpdatePanel from './components/subscription-plan-item-update-panel'
import { CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ChevronDown, Tag, Ticket } from 'lucide-react'

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<Item[]>([])
  const { mutate: deleteSubscriptionPlanItem } = useSubscriptionPlanItemDelete()
  const { openSheet, confirm, closeSheet } = useApp()
  const { t } = useTranslation([
    'subscription.subscription-plan-item',
    'modules',
    'actions',
    'fields',
  ])

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'subscription.subscription-plan-item' }),
      description: t('createText', {
        ns: 'subscription.subscription-plan-item',
      }),
      children: () => (
        <SubscriptionPlanItemCreatePanel onCreated={() => closeSheet(id)} />
      ),
    })

    return id
  }

  const openDelete = (items: Item[]) => {
    return confirm({
      title: `${t('delete', { ns: 'subscription.subscription-plan-item' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', {
        ns: 'subscription.subscription-plan-item',
      }),
    })
      .then(() =>
        deleteSubscriptionPlanItem(
          items.map((item) => item.id).filter((id) => id !== undefined)
        )
      )
      .catch(() => setSelectedItems(items))
  }

  const openUpdate = (item: Item) => {
    const id = openSheet({
      children: () => (
        <SubscriptionPlanItemUpdatePanel
          data={item}
          onUpdated={() => closeSheet(id)}
        />
      ),
      title: t('edit', { ns: 'subscription.subscription-plan-item' }),
      description: t('editText', { ns: 'subscription.subscription-plan-item' }),
    })

    return id
  }

  return (
    <>
      <PageTitle title={t('subscription_plan_item', { ns: 'modules' })} />
      <DataPanel
        url='/item'
        layout='grid'
        id='subscription-plan-item'
        selectable
        selected={selectedItems as Item[]}
        multiple
        hasSearch
        responsiveColumns={{
          default: 1,
          sm: 2,
          md: 1,
          lg: 2,
          xl: 3,
        }}
        render={(item: Item) => (
          <div className='w-full overflow-hidden'>
            <CardHeader className='p-4'>
              <div className='space-y-1'>
                <h3 className='text-xl font-semibold'>{item.name}</h3>
                <p className='text-sm text-muted-foreground'>
                  Slug: {item.slug}
                </p>
              </div>
            </CardHeader>

            <CardContent className='p-4 pt-0'>
              <div className='mb-4 flex items-center justify-between'>
                <div className='text-2xl font-bold'>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(item.price)}
                </div>
                {Boolean(item.payment_method_item?.length) && (
                  <div className='flex flex-col items-end'>
                    {item.payment_method_item?.map((itemPayment) => (
                      <Badge
                        key={itemPayment.id}
                        variant='destructive'
                        className='ml-2'
                      >
                        {itemPayment.discount_type?.name ===
                        'Desconto com valor percentual'
                          ? `${itemPayment.value}% OFF no ${itemPayment.payment_method?.name}`
                          : `R$${Number(itemPayment.value).toFixed(2)} no ${itemPayment.payment_method?.name}`}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {Boolean(item.payment_coupon_item?.length) && (
                <>
                  <Separator className='my-3' />
                  <Collapsible className='w-full'>
                    <CollapsibleTrigger className='flex w-full items-center gap-1 text-sm font-medium'>
                      <Ticket className='h-4 w-4' />
                      <span>Cupons disponíveis</span>
                      <ChevronDown className='collapsible-open:rotate-180 ml-auto h-4 w-4 transition-transform duration-200' />
                    </CollapsibleTrigger>
                    <CollapsibleContent className='mt-2'>
                      <div className='flex flex-wrap gap-2'>
                        {item.payment_coupon_item?.map((coupon, index) => (
                          <div
                            key={index}
                            className='flex items-center gap-1 rounded-md bg-background px-2 py-1 text-xs'
                          >
                            <Tag className='h-3 w-3' />
                            <span className='font-mono'>
                              {coupon.payment_coupon?.code}
                            </span>
                            <span className='text-foreground'>
                              {coupon.payment_coupon?.discount_type?.name ===
                              'Desconto com valor percentual'
                                ? `(${coupon.payment_coupon?.value}% OFF)`
                                : `(R$${coupon.payment_coupon?.value} de desconto)`}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </>
              )}
            </CardContent>
          </div>
        )}
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', {
              ns: 'subscription.subscription-plan-item',
            }),
            handler: (items: Item[]) => {
              if (items.length === 1) openUpdate(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', {
              ns: 'subscription.subscription-plan-item',
            }),
            variant: 'destructive',
            handler: (items: Item[]) => {
              openDelete(items)
            },
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', {
              ns: 'subscription.subscription-plan-item',
            }),
            variant: 'default',
            handler: () => {
              openCreate()
            },
            show: 'none',
          },
        ]}
      />
    </>
  )
}
