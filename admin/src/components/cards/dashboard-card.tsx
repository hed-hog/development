'use client'

import { useState } from 'react'
import {
  LayoutDashboard,
  FileCode,
  Calendar,
  Copy,
  Check,
  Info,
  Grid,
  Maximize2,
  Move,
  Link2,
  ArrowRight,
  ArrowDown,
  Layers,
  Clock,
  Code,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dashboard } from '@/types'
import { formatDate } from '@/lib/date-string'

export default function DashboardInfoCard({ item }: { item: Dashboard }) {
  const [copied, setCopied] = useState<string | null>(null)
  const [selectedItemId, setSelectedItemId] = useState<number | null>(
    item.dashboard_item?.length ? (item.dashboard_item[0]?.id ?? null) : null
  )

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopied(field)
    setTimeout(() => setCopied(null), 2000)
  }

  const getTimeSinceCreation = (dateString?: string): string => {
    if (!dateString) return 'N/A'

    const createdDate = new Date(dateString)
    const now = new Date()
    const diffInMs = now.getTime() - createdDate.getTime()

    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
    const diffInHours = Math.floor(
      (diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )

    if (diffInDays > 0) {
      return `${diffInDays} dia${diffInDays !== 1 ? 's' : ''}`
    } else {
      return `${diffInHours} hora${diffInHours !== 1 ? 's' : ''}`
    }
  }

  return (
    <Card className='w-full overflow-hidden'>
      <CardHeader className='bg-gradient-to-r from-purple-600 to-indigo-700 pb-3'>
        <div className='flex items-center justify-between'>
          <CardTitle className='flex items-center gap-2 text-white'>
            <LayoutDashboard className='h-5 w-5' />
            {item.name}
            <Badge
              variant='outline'
              className='ml-2 border-purple-400 bg-purple-500/30 text-white'
            >
              Dashboard
            </Badge>
          </CardTitle>
          <div className='flex items-center gap-2'>
            <Badge
              variant='outline'
              className='border-purple-400 bg-purple-500/30 text-white'
            >
              {item.dashboard_item?.length} Item
              {item.dashboard_item?.length !== 1 ? 's' : ''}
            </Badge>
            {item.id && (
              <Badge
                variant='outline'
                className='border-purple-400 bg-purple-500/30 text-white'
              >
                ID: {item.id}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className='p-6'>
        <div className='space-y-6'>
          <div>
            <h3 className='mb-3 flex items-center gap-2 text-sm font-medium text-foreground'>
              <LayoutDashboard className='h-4 w-4' />
              Informações do Dashboard
            </h3>
            <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
              <InfoItem
                label='Nome'
                value={String(item.name)}
                icon={<LayoutDashboard className='h-4 w-4' />}
                onCopy={() => copyToClipboard(String(item.name), 'name')}
                copied={copied === 'name'}
              />
              <InfoItem
                label='Slug'
                value={item.slug}
                icon={<Link2 className='h-4 w-4' />}
                onCopy={() => copyToClipboard(item.slug, 'slug')}
                copied={copied === 'slug'}
              />
              <InfoItem
                label='Criado'
                value={formatDate(String(item.created_at))}
                icon={<Calendar className='h-4 w-4' />}
              />
              <InfoItem
                label='Atualizado'
                value={formatDate(String(item.updated_at))}
                icon={<Calendar className='h-4 w-4' />}
              />
              {item.created_at && (
                <InfoItem
                  label='Tempo ativo'
                  value={getTimeSinceCreation(item.created_at)}
                  icon={<Clock className='h-4 w-4' />}
                />
              )}
              <InfoItem
                label='Total de Itens'
                value={Number(item.dashboard_item?.length)}
                icon={<Layers className='h-4 w-4' />}
              />
            </div>
          </div>

          <Separator />

          <div>
            <h3 className='mb-3 flex items-center gap-2 text-sm font-medium text-foreground'>
              <Grid className='h-4 w-4' />
              Visualização do Dashboard
            </h3>

            <div className='relative h-64 overflow-hidden rounded-md border bg-slate-50 p-4'>
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

              {item.dashboard_item?.map((dashboardItem) => (
                <div
                  key={dashboardItem.id}
                  className={`absolute flex cursor-pointer items-center justify-center rounded-md border-2 font-medium text-white transition-all duration-200 ${
                    selectedItemId === dashboardItem.id
                      ? 'z-20 border-purple-600 bg-purple-500/80 ring-2 ring-purple-300'
                      : 'border-indigo-600 bg-indigo-500/60 hover:bg-indigo-500/70'
                  }`}
                  style={{
                    left: `${(dashboardItem.x_axis / 12) * 100}%`,
                    top: `${(dashboardItem.y_axis / 12) * 100}%`,
                    width: `${(dashboardItem.width / 12) * 100}%`,
                    height: `${(dashboardItem.height / 12) * 100}%`,
                    minWidth: '20px',
                    minHeight: '20px',
                  }}
                  onClick={() => setSelectedItemId(Number(dashboardItem.id))}
                >
                  <div className='max-w-full truncate p-1 text-xs'>
                    {dashboardItem.dashboard_component?.name ||
                      `Item ${dashboardItem.id}`}
                  </div>
                </div>
              ))}

              <div className='absolute bottom-2 right-2 rounded bg-white/80 px-2 py-1 text-xs text-slate-600'>
                Grid 12x12 • {item.dashboard_item?.length} item
                {item.dashboard_item?.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <div className='mb-3 flex items-center justify-between'>
              <h3 className='flex items-center gap-2 text-sm font-medium text-foreground'>
                <Layers className='h-4 w-4' />
                Itens do Dashboard
              </h3>
              <Badge
                variant='outline'
                className='border-indigo-200 bg-indigo-100 text-indigo-800'
              >
                {item.dashboard_item?.length} item
                {item.dashboard_item?.length !== 1 ? 's' : ''}
              </Badge>
            </div>

            {(item.dashboard_item?.length ?? 0) > 0 ? (
              <>
                <Tabs
                  defaultValue={selectedItemId?.toString() || ''}
                  value={selectedItemId?.toString() || ''}
                  onValueChange={(value) => setSelectedItemId(Number(value))}
                >
                  <TabsList className='mb-3 flex h-auto flex-wrap'>
                    {item.dashboard_item?.map((item) => (
                      <TabsTrigger
                        key={item.id}
                        value={item.id?.toString() as string}
                        className='mb-1 text-xs'
                      >
                        {item.dashboard_component?.slug || `Item ${item.id}`}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {item.dashboard_item?.map((filteredItem: any) => (
                    <TabsContent
                      key={filteredItem.id}
                      value={filteredItem.id.toString()}
                    >
                      <div className='space-y-4'>
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center gap-2'>
                            <Layers className='h-5 w-5 text-indigo-600' />
                            <h4 className='text-lg font-semibold'>
                              {filteredItem.dashboard_component?.name ||
                                `Item ${filteredItem.id}`}
                            </h4>
                          </div>
                          <Badge
                            variant='outline'
                            className='border-indigo-200 bg-indigo-100 text-indigo-800'
                          >
                            ID: {filteredItem.id}
                          </Badge>
                        </div>

                        <div className='grid grid-cols-1 gap-3'>
                          <InfoItem
                            label='ID'
                            value={filteredItem.id}
                            icon={<Code className='h-4 w-4' />}
                          />
                          <InfoItem
                            label='Componente ID'
                            value={filteredItem.component_id}
                            icon={<FileCode className='h-4 w-4' />}
                          />
                          <InfoItem
                            label='Dashboard ID'
                            value={filteredItem.dashboard_id}
                            icon={<LayoutDashboard className='h-4 w-4' />}
                          />
                          <InfoItem
                            label='Criado'
                            value={formatDate(String(filteredItem.created_at))}
                            icon={<Calendar className='h-4 w-4' />}
                          />
                          <InfoItem
                            label='Atualizado'
                            value={formatDate(String(filteredItem.updated_at))}
                            icon={<Calendar className='h-4 w-4' />}
                          />
                        </div>

                        <div className='grid grid-cols-2 gap-3'>
                          <InfoItem
                            label='Posição X'
                            value={`${filteredItem.x_axis}px`}
                            icon={<ArrowRight className='h-4 w-4' />}
                          />
                          <InfoItem
                            label='Posição Y'
                            value={`${filteredItem.y_axis}px`}
                            icon={<ArrowDown className='h-4 w-4' />}
                          />
                          <InfoItem
                            label='Largura'
                            value={`${filteredItem.width}px`}
                            icon={<Move className='h-4 w-4' />}
                          />
                          <InfoItem
                            label='Altura'
                            value={`${filteredItem.height}px`}
                            icon={<Maximize2 className='h-4 w-4' />}
                          />
                        </div>

                        {filteredItem.dashboard_component ? (
                          <Collapsible defaultOpen>
                            <CollapsibleTrigger className='flex w-full items-center justify-between'>
                              <h3 className='flex items-center gap-2 text-sm font-medium text-foreground'>
                                <FileCode className='h-4 w-4' />
                                Componente
                              </h3>
                              <Button variant='ghost' size='sm'>
                                <Info className='h-4 w-4' />
                              </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent className='pt-3'>
                              <div className='space-y-4'>
                                <div className='flex items-center justify-between'>
                                  <div className='flex items-center gap-2'>
                                    <FileCode className='h-5 w-5 text-indigo-600' />
                                    <h4 className='text-lg font-semibold'>
                                      {filteredItem.dashboard_component.slug}
                                    </h4>
                                  </div>
                                  <Badge
                                    variant='outline'
                                    className='border-indigo-200 bg-indigo-100 text-indigo-800'
                                  >
                                    {filteredItem.dashboard_component
                                      .is_resizable
                                      ? 'Redimensionável'
                                      : 'Tamanho Fixo'}
                                  </Badge>
                                </div>

                                <div className='grid grid-cols-1 gap-3'>
                                  <InfoItem
                                    label='Slug'
                                    value={
                                      filteredItem.dashboard_component.slug
                                    }
                                    icon={<Link2 className='h-4 w-4' />}
                                    onCopy={() =>
                                      copyToClipboard(
                                        String(
                                          filteredItem.dashboard_component?.slug
                                        ),
                                        `component_slug_${filteredItem.id}`
                                      )
                                    }
                                    copied={
                                      copied ===
                                      `component_slug_${filteredItem.id}`
                                    }
                                  />
                                  <InfoItem
                                    label='ID'
                                    value={filteredItem.dashboard_component.id}
                                    icon={<Code className='h-4 w-4' />}
                                  />
                                  <InfoItem
                                    label='Caminho'
                                    value={
                                      filteredItem.dashboard_component.path
                                    }
                                    icon={<FileCode className='h-4 w-4' />}
                                    onCopy={() =>
                                      copyToClipboard(
                                        String(
                                          filteredItem.dashboard_component?.path
                                        ),
                                        `component_path_${filteredItem.id}`
                                      )
                                    }
                                    copied={
                                      copied ===
                                      `component_path_${filteredItem.id}`
                                    }
                                  />
                                </div>

                                <div className='grid grid-cols-2 gap-3'>
                                  <InfoItem
                                    label='Largura Padrão'
                                    value={`${filteredItem.dashboard_component.width}px`}
                                    icon={<Move className='h-4 w-4' />}
                                    highlight={
                                      filteredItem.width !==
                                      filteredItem.dashboard_component.width
                                    }
                                  />
                                  <InfoItem
                                    label='Altura Padrão'
                                    value={`${filteredItem.dashboard_component.height}px`}
                                    icon={<Maximize2 className='h-4 w-4' />}
                                    highlight={
                                      filteredItem.height !==
                                      filteredItem.dashboard_component.height
                                    }
                                  />
                                  <InfoItem
                                    label='Largura Mín.'
                                    value={`${filteredItem.dashboard_component.min_width}px`}
                                    icon={<Move className='h-4 w-4' />}
                                  />
                                  <InfoItem
                                    label='Largura Máx.'
                                    value={`${filteredItem.dashboard_component.max_width}px`}
                                    icon={<Move className='h-4 w-4' />}
                                  />
                                  <InfoItem
                                    label='Altura Mín.'
                                    value={`${
                                      filteredItem.dashboard_component
                                        .min_height
                                    }px`}
                                    icon={<Maximize2 className='h-4 w-4' />}
                                  />
                                  <InfoItem
                                    label='Altura Máx.'
                                    value={`${
                                      filteredItem.dashboard_component
                                        .max_height
                                    }px`}
                                    icon={<Maximize2 className='h-4 w-4' />}
                                  />
                                  <InfoItem
                                    label='Criado'
                                    value={formatDate(
                                      String(
                                        filteredItem.dashboard_component
                                          .created_at
                                      )
                                    )}
                                    icon={<Calendar className='h-4 w-4' />}
                                  />
                                  <InfoItem
                                    label='Atualizado'
                                    value={formatDate(
                                      String(
                                        filteredItem.dashboard_component
                                          .updated_at
                                      )
                                    )}
                                    icon={<Calendar className='h-4 w-4' />}
                                  />
                                </div>

                                {filteredItem.dashboard_component
                                  .is_resizable && (
                                  <div className='mt-4'>
                                    <h5 className='mb-2 text-sm font-medium text-foreground'>
                                      Restrições de Tamanho
                                    </h5>
                                    <div className='relative h-32 overflow-hidden rounded-md border bg-slate-50 p-4'>
                                      <div className='absolute inset-0 grid grid-cols-12 grid-rows-12 gap-0.5'>
                                        {Array.from({ length: 12 }).map(
                                          (_, rowIndex) =>
                                            Array.from({ length: 12 }).map(
                                              (_, colIndex) => (
                                                <div
                                                  key={`${rowIndex}-${colIndex}`}
                                                  className='border border-slate-200'
                                                />
                                              )
                                            )
                                        )}
                                      </div>

                                      <div
                                        className='absolute flex items-center justify-center rounded-md border-2 border-purple-600 bg-purple-500/70 font-medium text-white'
                                        style={{
                                          left: '0%',
                                          top: '0%',
                                          width: `${(filteredItem.width / 12) * 100}%`,
                                          height: `${(filteredItem.height / 12) * 100}%`,
                                          minWidth: '20px',
                                          minHeight: '20px',
                                        }}
                                      >
                                        {filteredItem.width}x
                                        {filteredItem.height}
                                      </div>

                                      {(filteredItem.width !==
                                        filteredItem.dashboard_component
                                          .width ||
                                        filteredItem.height !==
                                          filteredItem.dashboard_component
                                            .height) && (
                                        <div
                                          className='absolute flex items-center justify-center rounded-md border-2 border-dashed border-blue-600 bg-blue-500/40 font-medium text-blue-800'
                                          style={{
                                            left: '0%',
                                            top: '0%',
                                            width: `${(filteredItem.dashboard_component.width / 12) * 100}%`,
                                            height: `${(filteredItem.dashboard_component.height / 12) * 100}%`,
                                            minWidth: '20px',
                                            minHeight: '20px',
                                          }}
                                        >
                                          Padrão
                                        </div>
                                      )}

                                      <div
                                        className='absolute rounded-md border border-dashed border-green-600 bg-green-500/30'
                                        style={{
                                          left: '0%',
                                          top: '0%',
                                          width: `${(filteredItem.dashboard_component.min_width / 12) * 100}%`,
                                          height: `${(filteredItem.dashboard_component.min_height / 12) * 100}%`,
                                          minWidth: '10px',
                                          minHeight: '10px',
                                        }}
                                      />

                                      <div
                                        className='absolute rounded-md border border-dashed border-red-600 bg-red-500/20'
                                        style={{
                                          left: '0%',
                                          top: '0%',
                                          width: `${(filteredItem.dashboard_component.max_width / 12) * 100}%`,
                                          height: `${(filteredItem.dashboard_component.max_height / 12) * 100}%`,
                                          minWidth: '10px',
                                          minHeight: '10px',
                                          zIndex: -1,
                                        }}
                                      />

                                      <div className='absolute bottom-2 left-2 rounded bg-white/80 px-2 py-1 text-xs text-slate-600'>
                                        Min:{' '}
                                        {
                                          filteredItem.dashboard_component
                                            .min_width
                                        }
                                        x
                                        {
                                          filteredItem.dashboard_component
                                            .min_height
                                        }{' '}
                                        • Max:{' '}
                                        {
                                          filteredItem.dashboard_component
                                            .max_width
                                        }
                                        x
                                        {
                                          filteredItem.dashboard_component
                                            .max_height
                                        }
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        ) : (
                          <div className='rounded-md border p-4 text-center text-foreground'>
                            Informações do componente não disponíveis
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </>
            ) : (
              <div className='rounded-md border p-4 text-center text-foreground'>
                Este dashboard não possui itens
              </div>
            )}
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
  highlight = false,
  defaultValue,
}: {
  label: string
  value: string | number
  icon: React.ReactNode
  onCopy?: () => void
  copied?: boolean
  action?: React.ReactNode
  highlight?: boolean
  defaultValue?: string | number
}) {
  return (
    <div
      className={`flex items-center justify-between rounded-md border p-3 ${highlight ? 'border-amber-200' : ''}`}
    >
      <div className='flex items-center gap-2'>
        {icon}
        <span className='text-sm text-foreground'>{label}</span>
      </div>
      <div className='flex items-center gap-2'>
        <span className='max-w-64 overflow-hidden text-ellipsis font-medium'>
          {value}
          {highlight && defaultValue !== undefined && (
            <span className='ml-1 text-xs text-foreground'>
              (Padrão: {defaultValue})
            </span>
          )}
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
