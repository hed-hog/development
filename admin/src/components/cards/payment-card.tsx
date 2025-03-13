'use client'

import { useState } from 'react'
import {
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  User,
  Wallet,
  Tag,
  Building,
  Calendar,
  Info,
} from 'lucide-react'
import { CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Payment } from '@/types'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'
import { IconId } from '@tabler/icons-react'
import { formatCurrency } from '@/lib/format-currency'

export default function PaymentCard({ item }: { item: Payment }) {
  const [expanded, setExpanded] = useState(false)

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'PAID':
        return {
          icon: <CheckCircle2 className='h-4 w-4' />,
          label: 'Pago',
          color: 'bg-green-500 hover:bg-green-600',
        }
      case 'REJECTED':
        return {
          icon: <XCircle className='h-4 w-4' />,
          label: 'Rejeitado',
          color: 'bg-red-500 hover:bg-red-600',
        }
      case 'PENDING':
        return {
          icon: <Clock className='h-4 w-4' />,
          label: 'Pendente',
          color: 'bg-yellow-500 hover:bg-yellow-600',
        }
      case 'PROCESSING':
        return {
          icon: <AlertCircle className='h-4 w-4' />,
          label: 'Processando',
          color: 'bg-blue-500 hover:bg-blue-600',
        }
      case 'CANCELED':
        return {
          icon: <XCircle className='h-4 w-4' />,
          label: 'Cancelado',
          color: 'bg-gray-500 hover:bg-gray-600',
        }
      case 'EXPIRED':
        return {
          icon: <AlertCircle className='h-4 w-4' />,
          label: 'Expirado',
          color: 'bg-orange-500 hover:bg-orange-600',
        }
      case 'REFUNDED':
        return {
          icon: <CheckCircle2 className='h-4 w-4' />,
          label: 'Reembolsado',
          color: 'bg-purple-500 hover:bg-purple-600',
        }
      default:
        return {
          icon: <AlertCircle className='h-4 w-4' />,
          label: 'Desconhecido',
          color: 'bg-gray-500 hover:bg-gray-600',
        }
    }
  }

  const statusConfig = getStatusConfig(String(item.payment_status?.slug))

  return (
    <TooltipProvider delayDuration={0}>
      <div className='w-full max-w-md overflow-hidden border-0 p-0 shadow-lg'>
        <div className='relative pb-2'>
          <div className='absolute right-0 top-0 -mr-1 -mt-1'>
            <Badge
              className={`${statusConfig.color} text-white`}
              style={{ borderTopRightRadius: 20 }}
            >
              <span className='flex items-center gap-1'>
                {statusConfig.icon}
                {statusConfig.label}
              </span>
            </Badge>
          </div>
        </div>
        <div className='p-0 pb-2 pt-6'>
          <div className='space-y-4'>
            <div className='flex items-center'>
              <Tooltip>
                <TooltipTrigger className='mr-2'>
                  <User className='h-5 w-5' />
                </TooltipTrigger>
                <TooltipContent>Cliente</TooltipContent>
              </Tooltip>
              <span className='font-medium'>{item.person?.name}</span>
            </div>
            <div className='flex items-center'>
              <Tooltip>
                <TooltipTrigger className='mr-2'>
                  <Wallet className='h-5 w-5' />
                </TooltipTrigger>
                <TooltipContent>Método</TooltipContent>
              </Tooltip>
              <div className='flex items-center gap-2'>
                <span className='font-medium'>{item.payment_method?.name}</span>
                {item.brand_id && (
                  <Badge variant='outline' className='font-normal'>
                    {item.payment_card_brand?.name}
                  </Badge>
                )}
              </div>
            </div>
            <div className='flex items-center'>
              <Tooltip>
                <TooltipTrigger className='mr-2'>
                  <Building className='h-5 w-5' />
                </TooltipTrigger>
                <TooltipContent>Gateway</TooltipContent>
              </Tooltip>
              <span className='font-medium'>{item.payment_gateway?.name}</span>
            </div>
            <Separator />
            <div className='space-y-2'>
              <div className='flex items-center'>
                <Tooltip>
                  <TooltipTrigger className='mr-2'>
                    <Info className='h-5 w-5' />
                  </TooltipTrigger>
                  <TooltipContent>Valor Inicial</TooltipContent>
                </Tooltip>
                <span className='font-medium'>
                  {formatCurrency(Number(item.amount))}
                </span>
              </div>

              <div className='flex items-center'>
                <Tooltip>
                  <TooltipTrigger className='mr-2'>
                    <Info className='h-5 w-5 text-green-600' />
                  </TooltipTrigger>
                  <TooltipContent>Desconto</TooltipContent>
                </Tooltip>
                <span className='font-medium text-green-600'>
                  - {formatCurrency(item.discount)}
                </span>
              </div>

              <div className='flex items-center'>
                <Tooltip>
                  <TooltipTrigger className='mr-2'>
                    <Info className='h-5 w-5 text-primary' />
                  </TooltipTrigger>
                  <TooltipContent>Total</TooltipContent>
                </Tooltip>
                <span className='font-bold text-primary'>
                  {formatCurrency(Number(item.amount) - Number(item.discount))}
                </span>
              </div>
            </div>
          </div>
        </div>
        <CardFooter className='flex w-full flex-col items-stretch p-0'>
          <Button
            variant='ghost'
            className='flex items-center justify-center gap-1 text-sm'
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>
                <ChevronUp className='h-4 w-4' />
                Menos detalhes
              </>
            ) : (
              <>
                <ChevronDown className='h-4 w-4' />
                Mais detalhes
              </>
            )}
          </Button>

          {expanded && (
            <div className='mt-2 space-y-2 text-sm'>
              <div className='flex items-center'>
                <Tooltip>
                  <TooltipTrigger className='mr-2'>
                    <IconId className='h-5 w-5' />
                  </TooltipTrigger>
                  <TooltipContent>CPF do titular</TooltipContent>
                </Tooltip>
                <span className='font-medium'>
                  {item.document?.replace(
                    /(\d{3})(\d{3})(\d{3})(\d{2})/,
                    '$1.$2.$3-$4'
                  )}
                </span>
              </div>
              <Separator />
              <div className='flex items-center'>
                <Tooltip>
                  <TooltipTrigger className='mr-2'>
                    <Tag className='h-5 w-5' />
                  </TooltipTrigger>
                  <TooltipContent>ID do pagamento</TooltipContent>
                </Tooltip>
                <span className='font-medium'>{item.slug}</span>
              </div>
              <Separator />
              <div className='flex items-center'>
                <Tooltip>
                  <TooltipTrigger className='mr-2'>
                    <Calendar className='h-5 w-5' />
                  </TooltipTrigger>
                  <TooltipContent>Datar</TooltipContent>
                </Tooltip>
                <div>
                  {new Date(String(item.created_at)).toLocaleDateString(
                    'pt-BR'
                  )}
                </div>
              </div>
            </div>
          )}
        </CardFooter>
      </div>
    </TooltipProvider>
  )
}
