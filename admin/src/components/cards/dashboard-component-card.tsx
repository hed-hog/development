'use client'

import type React from 'react'
import {
  Code,
  Maximize2,
  Minimize2,
  ArrowRightIcon as ArrowsMaximize,
  ArrowLeftIcon as ArrowsMinimize,
  Ruler,
  FileCode,
  Check,
  X,
  Copy,
} from 'lucide-react'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { DashboardComponent } from '@/types/models/DashboardComponent'

export default function ComponentInfoCard({
  item,
}: {
  item: DashboardComponent
}) {
  const [copied, setCopied] = useState<string | null>(null)
  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopied(field)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <Card className='w-full overflow-hidden'>
      <CardHeader className='bg-gradient-to-r from-slate-700 to-slate-900 pb-3 pt-3'>
        <div className='flex items-center justify-between'>
          <CardTitle className='flex items-center gap-2 text-white'>
            <FileCode className='h-5 w-5' />
            {item.name}
          </CardTitle>
          <Badge
            variant='outline'
            className='border-slate-600 bg-slate-800 text-white'
          >
            {item.is_resizable ? 'Redimensionável' : 'Tamanho Fixo'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className='p-6'>
        <div className='space-y-6'>
          <div className='space-y-3'>
            <h3 className='text-sm font-medium text-foreground'>
              Identificação
            </h3>
            <div className='grid grid-cols-1 gap-3'>
              <InfoItem
                label='Nome'
                value={item.name}
                icon={<Code className='h-4 w-4' />}
                onCopy={() => copyToClipboard(item.name, 'name')}
                copied={copied === 'name'}
              />
              <InfoItem
                label='Slug'
                value={item.slug}
                icon={<Code className='h-4 w-4' />}
                onCopy={() => copyToClipboard(item.slug, 'slug')}
                copied={copied === 'slug'}
              />
              <InfoItem
                label='Caminho'
                value={item.path}
                icon={<FileCode className='h-4 w-4' />}
                onCopy={() => copyToClipboard(item.path, 'path')}
                copied={copied === 'path'}
              />
            </div>
          </div>

          <Separator />

          <div className='space-y-3'>
            <h3 className='text-sm font-medium text-foreground'>Dimensões</h3>
            <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
              <InfoItem
                label='Largura'
                value={item.width !== undefined ? `${item.width}px` : 'Auto'}
                icon={<Ruler className='h-4 w-4' />}
              />
              <InfoItem
                label='Altura'
                value={item.height !== undefined ? `${item.height}px` : 'Auto'}
                icon={<Ruler className='h-4 w-4 rotate-90' />}
              />
              <InfoItem
                label='Largura Mínima'
                value={
                  item.min_width !== undefined
                    ? `${item.min_width}px`
                    : 'Não definida'
                }
                icon={<ArrowsMinimize className='h-4 w-4' />}
              />
              <InfoItem
                label='Largura Máxima'
                value={
                  item.max_width !== undefined
                    ? `${item.max_width}px`
                    : 'Não definida'
                }
                icon={<ArrowsMaximize className='h-4 w-4' />}
              />
              <InfoItem
                label='Altura Mínima'
                value={
                  item.min_height !== undefined
                    ? `${item.min_height}px`
                    : 'Não definida'
                }
                icon={<Minimize2 className='h-4 w-4' />}
              />
              <InfoItem
                label='Altura Máxima'
                value={
                  item.max_height !== undefined
                    ? `${item.max_height}px`
                    : 'Não definida'
                }
                icon={<Maximize2 className='h-4 w-4' />}
              />
            </div>
          </div>

          <Separator />

          <div className='space-y-3'>
            <h3 className='text-sm font-medium text-foreground'>
              Propriedades
            </h3>
            <div className='grid grid-cols-1 gap-3'>
              <div className='flex items-center justify-between rounded-md border p-3'>
                <div className='flex items-center gap-2'>
                  {item.is_resizable ? (
                    <Check className='h-4 w-4 text-green-500' />
                  ) : (
                    <X className='h-4 w-4 text-red-500' />
                  )}
                  <span>Redimensionável</span>
                </div>
                <Badge
                  variant={item.is_resizable ? 'default' : 'destructive'}
                  className={`
                  ${
                    item.is_resizable
                      ? 'bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800'
                      : 'bg-red-100 text-red-800 hover:bg-red-100 hover:text-red-800'
                  }
                `}
                >
                  {item.is_resizable ? 'Sim' : 'Não'}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function InfoItem({
  label,
  value,
  icon,
  onCopy,
  copied,
  action,
}: {
  label: string
  value: string | number
  icon: React.ReactNode
  onCopy?: () => void
  copied?: boolean
  action?: React.ReactNode
}) {
  return (
    <div className='flex items-center justify-between rounded-md border p-3'>
      <div className='flex items-center gap-2'>
        {icon}
        <span className='text-sm text-foreground'>{label}</span>
      </div>
      <div className='flex items-center gap-2'>
        <span className='max-w-64 overflow-hidden text-ellipsis font-medium'>
          {value}
        </span>
        {onCopy && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='h-6 w-6 min-w-6'
                  onClick={onCopy}
                >
                  {copied ? (
                    <Check className='h-3 w-3 text-green-500' />
                  ) : (
                    <Copy className='h-3 w-3' />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{copied ? 'Copiado!' : 'Copiar'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {action}
      </div>
    </div>
  )
}
