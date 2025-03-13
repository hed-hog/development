'use client'

import { useEffect, useState } from 'react'
import {
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useQuery } from '@tanstack/react-query'
import { useApp } from '@/hooks/use-app'
import { Payment } from '@/types'
import { formatDate } from '@/lib/date-string'

function PaymentStatusBadge({ status }: { status: string }) {
  const getStatusConfig = () => {
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

  const statusConfig = getStatusConfig()

  return (
    <Badge
      className={`${statusConfig.color} text-white`}
      style={{ borderTopRightRadius: 20 }}
    >
      <span className='flex items-center gap-1'>
        {statusConfig.icon}
        {statusConfig.label}
      </span>
    </Badge>
  )
}

export default function RecentPayments() {
  const { request } = useApp()
  const [payments, setPayments] = useState<Payment[]>([])
  const { data, isLoading } = useQuery({
    queryKey: ['recent-payment'],
    queryFn: () =>
      request<any[]>({
        url: `/payment?sortOrder=desc&pageSize=10`,
      }),
  })

  useEffect(() => {
    if (data) {
      setPayments((data.data as any).data)
    }
  }, [data])

  return (
    <Card className='w-full'>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-xl'>Pagamentos Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className='space-y-3'>
            {[...Array(10)].map((_, i) => (
              <div key={i} className='flex items-center space-x-4'>
                <Skeleton className='h-12 w-full' />
              </div>
            ))}
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Método</TableHead>
                  <TableHead>Gateway</TableHead>
                  <TableHead>Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className='font-medium'>
                      R$ {payment.amount - payment.discount}
                    </TableCell>
                    <TableCell>
                      <PaymentStatusBadge
                        status={String(payment.payment_status?.slug)}
                      />
                    </TableCell>
                    <TableCell>{payment.person?.name}</TableCell>
                    <TableCell>
                      <div className='flex items-center'>
                        {payment.payment_method?.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span>{payment.payment_gateway?.name}</span>
                    </TableCell>
                    <TableCell className='text-foreground'>
                      <div className='flex items-center'>
                        <Calendar className='mr-1 h-3 w-3' />
                        {formatDate(String(payment.created_at))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
