import { PageTitle } from '@/components/custom/page-title'
import DataPanel from '@/components/panels/data-panel'
import { usePaymentCouponDelete } from '@/features/payment/payment-coupon'
import { useApp } from '@/hooks/use-app'
import { isPlural } from '@/lib/utils'
import { PaymentCoupon } from '@/types/models'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PaymentCouponCreatePanel from './components/payment-coupon-create-panel'
import PaymentCouponUpdatePanel from './components/payment-coupon-update-panel'
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  ChevronDown,
  ChevronUp,
  DollarSign,
  Percent,
  ShoppingBag,
} from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<PaymentCoupon[]>([])
  const { mutate: deletePaymentCoupon } = usePaymentCouponDelete()
  const { openSheet, confirm, closeSheet } = useApp()
  const { t } = useTranslation([
    'payment.payment-coupon',
    'modules',
    'actions',
    'fields',
  ])
  const [openItems, setOpenItems] = useState<{ [key: number]: boolean }>({})

  const toggleCollapsible = (couponId: number) => {
    setOpenItems((prevState) => ({
      ...prevState,
      [couponId]: !prevState[couponId],
    }))
  }

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'payment.payment-coupon' }),
      description: t('createText', { ns: 'payment.payment-coupon' }),
      children: () => (
        <PaymentCouponCreatePanel onCreated={() => closeSheet(id)} />
      ),
    })

    return id
  }

  const openDelete = (items: PaymentCoupon[]) => {
    return confirm({
      title: `${t('delete', { ns: 'payment.payment-coupon' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', { ns: 'payment.payment-coupon' }),
    })
      .then(() =>
        deletePaymentCoupon(
          items.map((item) => item.id).filter((id) => id !== undefined)
        )
      )
      .catch(() => setSelectedItems(items))
  }

  const openUpdate = (item: PaymentCoupon) => {
    const id = openSheet({
      children: () => (
        <PaymentCouponUpdatePanel
          data={item}
          onUpdated={() => closeSheet(id)}
        />
      ),
      title: t('edit', { ns: 'payment.payment-coupon' }),
      description: t('editText', { ns: 'payment.payment-coupon' }),
    })

    return id
  }

  return (
    <>
      <PageTitle title={t('payment_coupon', { ns: 'modules' })} />
      <DataPanel
        url='/payment-coupon'
        layout='grid'
        id='payment-coupon'
        selectable
        responsiveColumns={{
          default: 1,
          sm: 2,
          md: 1,
          lg: 2,
          xl: 3,
        }}
        render={(item: PaymentCoupon) => (
          <div className='w-full'>
            <CardHeader className='px-4 pb-3'>
              <div className='flex items-start justify-between'>
                <div>
                  <CardTitle className='text-2xl font-bold'>
                    {item.code}
                  </CardTitle>
                  <CardDescription className='mt-1'>Detalhes</CardDescription>
                </div>
                <Badge
                  variant={item.active ? 'default' : 'secondary'}
                  className={
                    item.active
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-gray-400 hover:bg-gray-500'
                  }
                >
                  {item.active ? 'Ativo' : 'Inativo'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className='space-y-4 px-4'>
              <div className='space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span className='text-foreground'>Uso</span>
                  <span className='font-medium'>
                    {item.uses_qtd} / {item.uses_limit}
                  </span>
                </div>
                <Progress
                  value={
                    (Number(item.uses_qtd) / Number(item.uses_limit)) * 100
                  }
                  className='h-2'
                />
              </div>

              <div className='flex flex-row justify-between'>
                <div className='space-y-3'>
                  <span className='flex items-center gap-1 text-sm text-foreground'>
                    Tipo de Desconto
                  </span>
                  <Badge variant='outline' className='font-medium'>
                    {item.discount_type?.name ===
                    'Desconto com valor percentual' ? (
                      <Percent className='mr-1 h-3.5 w-3.5' />
                    ) : (
                      <DollarSign className='mr-1 h-3.5 w-3.5' />
                    )}
                    {item.discount_type?.name ===
                    'Desconto com valor percentual'
                      ? 'Porcentagem'
                      : 'Valor fixo'}
                  </Badge>
                </div>
                <div className='space-y-1'>
                  <span className='text-sm text-foreground'>Valor</span>
                  <p className='text-lg font-medium'>
                    {item.discount_type?.name ===
                    'Desconto com valor percentual'
                      ? `${item.value}%`
                      : `R$${Number(item.value).toFixed(2)}`}
                  </p>
                </div>
              </div>

              <div className='space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span className='text-foreground'>Válido de</span>
                  <span className='font-medium'>
                    {new Date(item.starts_at).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-foreground'>Até</span>
                  <span className='font-medium'>
                    {item.ends_at
                      ? new Date(item.ends_at).toLocaleDateString('pt-BR')
                      : 'Sempre'}
                  </span>
                </div>
              </div>

              <Separator className='my-2' />

              {item.payment_coupon_item?.length && (
                <Collapsible
                  open={openItems[Number(item.id)] || false}
                  onOpenChange={() => toggleCollapsible(Number(item.id))}
                  className='space-y-2'
                >
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2 text-sm font-medium'>
                      <ShoppingBag className='h-4 w-4' />
                      Produtos Associados ({item.payment_coupon_item?.length})
                    </div>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='w-4 min-w-4 p-0 hover:bg-none'
                      >
                        {openItems[Number(item.id)] ? (
                          <ChevronUp className='h-4 w-4' />
                        ) : (
                          <ChevronDown className='h-4 w-4' />
                        )}
                        <span className='sr-only'>Toggle products</span>
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent className='space-y-2'>
                    <div className='rounded-md border p-2'>
                      <div className='flex flex-wrap gap-2'>
                        {item.payment_coupon_item?.map((product) => (
                          <Badge key={product.id} variant='secondary'>
                            {product.item?.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )}
            </CardContent>
          </div>
        )}
        selected={selectedItems as PaymentCoupon[]}
        multiple
        hasSearch
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', { ns: 'payment.payment-coupon' }),
            handler: (items: PaymentCoupon[]) => {
              if (items.length === 1) openUpdate(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', { ns: 'payment.payment-coupon' }),
            variant: 'destructive',
            handler: (items: PaymentCoupon[]) => {
              openDelete(items)
            },
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', { ns: 'payment.payment-coupon' }),
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
