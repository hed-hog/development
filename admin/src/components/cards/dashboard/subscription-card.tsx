'use client'

import { useState, useEffect } from 'react'
import { ClipboardCheck } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useQuery } from '@tanstack/react-query'
import { useApp } from '@/hooks/use-app'

export default function SubscriptionCard() {
  const { request } = useApp()
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['subscription'],
    queryFn: () =>
      request<any[]>({
        url: `/subscription/active`,
      }),
  })
  const [count, setCount] = useState<number | null>(isLoading ? null : 0)

  useEffect(() => {
    if (data?.data) {
      setCount((data?.data as any).total)
    }
  }, [data, isLoading])

  return (
    <Card className='overflow-hidden'>
      <CardHeader className='bg-gradient-to-r from-emerald-500 to-green-600 pb-2 pt-4'>
        <CardTitle className='flex items-center gap-2 text-white'>
          <ClipboardCheck className='h-6 w-6' />
          Assinaturas Ativas
        </CardTitle>
      </CardHeader>
      <CardContent className='p-6'>
        <div className='flex items-center justify-between'>
          <div>
            {count === null || isLoading ? (
              <Skeleton className='h-14 w-24' />
            ) : (
              <div className='text-4xl font-bold'>{count}</div>
            )}
            <p className='mt-1 text-sm text-foreground'>Total no sistema</p>
          </div>

          <button
            onClick={() => refetch()}
            disabled={isLoading}
            className='rounded-full p-2 transition-colors hover:bg-green-100 disabled:opacity-50'
            aria-label='Atualizar contagem'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className={`${isLoading ? 'animate-spin' : ''}`}
            >
              <path d='M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8' />
              <path d='M21 3v5h-5' />
              <path d='M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16' />
              <path d='M3 21v-5h5' />
            </svg>
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
