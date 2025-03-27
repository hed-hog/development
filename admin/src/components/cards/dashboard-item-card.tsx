'use client'

import type React from 'react'

import { useState } from 'react'
import {
  Move,
  Maximize2,
  ArrowRight,
  ArrowDown,
  Grid,
  FileCode,
  LayoutDashboard,
  Calendar,
  Copy,
  Check,
  Info,
} from 'lucide-react'
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { DashboardItem } from '@/types'
import { formatDate } from '@/lib/date-string'

export default function DashboardItemCard({ item }: { item: DashboardItem }) {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopied(field)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <Card className='w-full overflow-hidden'>
      <CardHeader className='bg-gradient-to-r from-indigo-600 to-purple-700 py-3'>
        <div className='flex items-center justify-between'>
          <CardTitle className='flex items-center gap-2 text-white'>
            <Grid className='h-5 w-5' />
            Item de Dashboard
            {item.dashboard_component && (
              <Badge
                variant='outline'
                className='ml-2 border-indigo-400 bg-indigo-500/30 text-white'
              >
                {item.dashboard_component.name}
              </Badge>
            )}
          </CardTitle>
          <Badge
            variant='outline'
            className='border-indigo-400 bg-indigo-500/30 text-white'
          >
            {item.width}x{item.height}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className='p-6'>
        <div className='space-y-6'>
          <div className='relative h-48 overflow-hidden rounded-md border bg-slate-50 p-4'>
            <div className='absolute inset-0 grid grid-cols-12 grid-rows-12 gap-0.5'>
              {Array.from({ length: 12 }).map((_, rowIndex) =>
                Array.from({ length: 12 }).map((_, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className='border border-slate-200'
                  />
                ))
              )}
            </div>

            <div
              className='absolute flex items-center justify-center rounded-md border-2 border-indigo-600 bg-indigo-500/70 font-medium text-white'
              style={{
                left: `${(item.x_axis / 12) * 100}%`,
                top: `${(item.y_axis / 12) * 100}%`,
                width: `${(item.width / 12) * 100}%`,
                height: `${(item.height / 12) * 100}%`,
                minWidth: '20px',
                minHeight: '20px',
              }}
            >
              {item.width}x{item.height}
            </div>

            <div className='absolute bottom-2 right-2 rounded bg-white/80 px-2 py-1 text-xs text-slate-600'>
              Grid 12x12
            </div>
          </div>

          <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
            <InfoItem
              label='Posição X'
              value={item.x_axis}
              icon={<ArrowRight className='h-4 w-4' />}
              onCopy={() => copyToClipboard(item.x_axis.toString(), 'x_axis')}
              copied={copied === 'x_axis'}
            />
            <InfoItem
              label='Posição Y'
              value={item.y_axis}
              icon={<ArrowDown className='h-4 w-4' />}
              onCopy={() => copyToClipboard(item.y_axis.toString(), 'y_axis')}
              copied={copied === 'y_axis'}
            />
            <InfoItem
              label='Largura'
              value={item.width}
              icon={<Move className='h-4 w-4' />}
              onCopy={() => copyToClipboard(item.width.toString(), 'width')}
              copied={copied === 'width'}
            />
            <InfoItem
              label='Altura'
              value={item.height}
              icon={<Maximize2 className='h-4 w-4' />}
              onCopy={() => copyToClipboard(item.height.toString(), 'height')}
              copied={copied === 'height'}
            />
          </div>

          <Separator />

          {item.dashboard_component ? (
            <Collapsible defaultOpen>
              <CollapsibleTrigger className='flex w-full items-center justify-between'>
                <h3 className='flex items-center gap-2 text-sm font-medium text-foreground'>
                  <FileCode className='h-4 w-4' />
                  Componente
                </h3>
                <Button variant='ghost' size='sm' className='min-w-6'>
                  <Info className='h-4 w-4' />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className='pt-3'>
                <div className='space-y-3'>
                  <InfoItem
                    label='Slug'
                    value={item.dashboard_component.slug}
                    icon={<FileCode className='h-4 w-4' />}
                    onCopy={() =>
                      copyToClipboard(
                        String(item.dashboard_component?.slug),
                        'component_slug'
                      )
                    }
                    copied={copied === 'component_slug'}
                  />
                  <InfoItem
                    label='Caminho'
                    value={item.dashboard_component.path}
                    icon={<FileCode className='h-4 w-4' />}
                    onCopy={() =>
                      copyToClipboard(
                        String(item.dashboard_component?.path),
                        'component_path'
                      )
                    }
                    copied={copied === 'component_path'}
                  />
                  <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
                    <InfoItem
                      label='Largura Mín.'
                      value={Number(item.dashboard_component.min_width)}
                      icon={<Move className='h-4 w-4' />}
                    />
                    <InfoItem
                      label='Largura Máx.'
                      value={Number(item.dashboard_component.max_width)}
                      icon={<Move className='h-4 w-4' />}
                    />
                    <InfoItem
                      label='Altura Mín.'
                      value={Number(item.dashboard_component.min_height)}
                      icon={<Maximize2 className='h-4 w-4' />}
                    />
                    <InfoItem
                      label='Altura Máx.'
                      value={Number(item.dashboard_component.max_height)}
                      icon={<Maximize2 className='h-4 w-4' />}
                    />
                  </div>
                  <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
                    <InfoItem
                      label='Criado'
                      value={formatDate(
                        String(item.dashboard_component.created_at)
                      )}
                      icon={<Calendar className='h-4 w-4' />}
                    />
                    <InfoItem
                      label='Atualizado'
                      value={formatDate(
                        String(item.dashboard_component.updated_at)
                      )}
                      icon={<Calendar className='h-4 w-4' />}
                    />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <div className='rounded-md border p-4 text-center text-muted-foreground'>
              Nenhum componente associado a este item
            </div>
          )}

          <Separator />

          {item.dashboard ? (
            <Collapsible defaultOpen>
              <CollapsibleTrigger className='flex w-full items-center justify-between'>
                <h3 className='flex items-center gap-2 text-sm font-medium text-foreground'>
                  <LayoutDashboard className='h-4 w-4' />
                  Dashboard
                </h3>
                <Button variant='ghost' size='sm' className='min-w-6'>
                  <Info className='h-4 w-4' />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className='pt-3'>
                <div className='space-y-3'>
                  <InfoItem
                    label='ID'
                    value={item.dashboard.id || 'N/A'}
                    icon={<LayoutDashboard className='h-4 w-4' />}
                  />
                  <InfoItem
                    label='Slug'
                    value={item.dashboard.slug}
                    icon={<LayoutDashboard className='h-4 w-4' />}
                    onCopy={() =>
                      copyToClipboard(
                        String(item.dashboard?.slug),
                        'dashboard_slug'
                      )
                    }
                    copied={copied === 'dashboard_slug'}
                  />
                  <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
                    <InfoItem
                      label='Criado'
                      value={formatDate(String(item.dashboard.created_at))}
                      icon={<Calendar className='h-4 w-4' />}
                    />
                    <InfoItem
                      label='Atualizado'
                      value={formatDate(String(item.dashboard.updated_at))}
                      icon={<Calendar className='h-4 w-4' />}
                    />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <div className='rounded-md border p-4 text-center text-foreground'>
              Nenhum dashboard associado a este item
            </div>
          )}
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
