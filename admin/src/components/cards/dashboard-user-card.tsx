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
  User,
  Link2,
  Settings,
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DashboardUser } from '@/types'
import { formatDate } from '@/lib/date-string'

export default function DashboardUserCard({ item }: { item: DashboardUser }) {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopied(field)
    setTimeout(() => setCopied(null), 2000)
  }

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
  }

  const hasCustomPosition =
    item.dashboard_item &&
    (item.x_axis !== item.dashboard_item.x_axis ||
      item.y_axis !== item.dashboard_item.y_axis)
  const hasCustomSize =
    item &&
    (item.width !== item.dashboard_item?.width ||
      item.height !== item.dashboard_item.height)
  const hasCustomization = hasCustomPosition || hasCustomSize

  return (
    <Card className='w-full overflow-hidden'>
      <CardHeader className='bg-gradient-to-r from-cyan-600 to-blue-700 py-3'>
        <div className='flex items-center justify-between'>
          <CardTitle className='flex items-center gap-2 text-white'>
            <Settings className='h-5 w-5' />
            Personalização de Dashboard
            {item.user && (
              <Badge
                variant='outline'
                className='ml-2 border-cyan-400 bg-cyan-500/30 text-white'
              >
                {item.user.name}
              </Badge>
            )}
          </CardTitle>
          <Badge
            variant='outline'
            className='border-cyan-400 bg-cyan-500/30 text-white'
          >
            ID: {item.id}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className='p-6'>
        <div className='space-y-6'>
          <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
            <InfoItem
              label='ID'
              value={Number(item.id)}
              icon={<Link2 className='h-4 w-4' />}
              onCopy={() =>
                copyToClipboard(item.id?.toString() as string, 'id')
              }
              copied={copied === 'id'}
            />
            <InfoItem
              label='Item ID'
              value={Number(item.dashboard_item?.id)}
              icon={<LayoutDashboard className='h-4 w-4' />}
              onCopy={() =>
                copyToClipboard(
                  String(item.dashboard_item?.id).toString(),
                  'item_id'
                )
              }
              copied={copied === 'item_id'}
            />
            <InfoItem
              label='Usuário ID'
              value={item.user_id}
              icon={<User className='h-4 w-4' />}
              onCopy={() => copyToClipboard(item.user_id.toString(), 'user_id')}
              copied={copied === 'user_id'}
            />
            <InfoItem
              label='Atualizado'
              value={formatDate(String(item.updated_at))}
              icon={<Calendar className='h-4 w-4' />}
            />
          </div>

          <Separator />

          <Tabs defaultValue='user' className='w-full'>
            <div className='mb-3 flex items-center justify-between'>
              <h3 className='flex items-center gap-2 text-sm font-medium text-foreground'>
                <Grid className='h-4 w-4' />
                Visualização da Posição
              </h3>
              <TabsList>
                <TabsTrigger value='user' className='text-xs'>
                  Personalizada
                </TabsTrigger>
                {item && (
                  <TabsTrigger value='default' className='text-xs'>
                    Padrão
                  </TabsTrigger>
                )}
                {hasCustomization && (
                  <TabsTrigger value='comparison' className='text-xs'>
                    Comparação
                  </TabsTrigger>
                )}
              </TabsList>
            </div>

            <TabsContent value='user'>
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
                  className='absolute flex items-center justify-center rounded-md border-2 border-cyan-600 bg-cyan-500/70 font-medium text-white'
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
                  Configuração do Usuário
                </div>
              </div>
            </TabsContent>

            {item && (
              <TabsContent value='default'>
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
                    Configuração Padrão
                  </div>
                </div>
              </TabsContent>
            )}

            {hasCustomization && (
              <TabsContent value='comparison'>
                <div className='relative h-48 overflow-hidden rounded-md border p-4'>
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
                    className='absolute flex items-center justify-center rounded-md border-2 border-dashed border-indigo-600 bg-indigo-500/40 font-medium text-indigo-800'
                    style={{
                      left: `${(item!.x_axis / 12) * 100}%`,
                      top: `${(item!.y_axis / 12) * 100}%`,
                      width: `${(item!.width / 12) * 100}%`,
                      height: `${(item!.height / 12) * 100}%`,
                      minWidth: '20px',
                      minHeight: '20px',
                    }}
                  >
                    Padrão
                  </div>

                  <div
                    className='absolute flex items-center justify-center rounded-md border-2 border-cyan-600 bg-cyan-500/70 font-medium text-white'
                    style={{
                      left: `${(item.x_axis / 12) * 100}%`,
                      top: `${(item.y_axis / 12) * 100}%`,
                      width: `${(item.width / 12) * 100}%`,
                      height: `${(item.height / 12) * 100}%`,
                      minWidth: '20px',
                      minHeight: '20px',
                      zIndex: 10,
                    }}
                  >
                    Personalizado
                  </div>

                  <div className='absolute bottom-2 right-2 rounded bg-white/80 px-2 py-1 text-xs text-slate-600'>
                    Comparação
                  </div>
                </div>
              </TabsContent>
            )}
          </Tabs>

          <div>
            <h3 className='mb-3 flex items-center gap-2 text-sm font-medium text-foreground'>
              <Settings className='h-4 w-4' />
              Configurações Personalizadas
              {hasCustomization && (
                <Badge
                  variant='outline'
                  className='ml-2 border-amber-200 bg-amber-100 text-amber-800'
                >
                  Personalizado
                </Badge>
              )}
            </h3>
            <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
              <InfoItem
                label='Eixo X'
                value={item.x_axis}
                icon={<ArrowRight className='h-4 w-4' />}
                onCopy={() => copyToClipboard(item.x_axis.toString(), 'x_axis')}
                copied={copied === 'x_axis'}
                highlight={item && item.dashboard_item?.x_axis !== item.x_axis}
                defaultValue={item?.x_axis}
              />
              <InfoItem
                label='Eixo Y'
                value={item.y_axis}
                icon={<ArrowDown className='h-4 w-4' />}
                onCopy={() => copyToClipboard(item.y_axis.toString(), 'y_axis')}
                copied={copied === 'y_axis'}
                highlight={item && item.dashboard_item?.y_axis !== item.y_axis}
                defaultValue={item?.y_axis}
              />
              <InfoItem
                label='Largura'
                value={item.width}
                icon={<Move className='h-4 w-4' />}
                onCopy={() => copyToClipboard(item.width.toString(), 'width')}
                copied={copied === 'width'}
                highlight={item && item.dashboard_item?.width !== item.width}
                defaultValue={item?.width}
              />
              <InfoItem
                label='Altura'
                value={item.height}
                icon={<Maximize2 className='h-4 w-4' />}
                onCopy={() => copyToClipboard(item.height.toString(), 'height')}
                copied={copied === 'height'}
                highlight={item && item.dashboard_item?.height !== item.height}
                defaultValue={item?.height}
              />
            </div>
          </div>

          <Separator />

          {item.user ? (
            <Collapsible defaultOpen>
              <CollapsibleTrigger className='flex w-full items-center justify-between'>
                <h3 className='flex items-center gap-2 text-sm font-medium text-foreground'>
                  <User className='h-4 w-4' />
                  Usuário
                </h3>
                <Button variant='ghost' size='sm' className='min-w-6'>
                  <Info className='h-4 w-4' />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className='pt-3'>
                <div className='mb-4 flex items-center gap-4'>
                  <Avatar className='h-16 w-16'>
                    <AvatarImage
                      src={`/placeholder.svg?height=64&width=64`}
                      alt={item.user.name}
                    />
                    <AvatarFallback className='text-lg'>
                      {getInitials(item.user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className='text-lg font-semibold'>{item.user.name}</h4>
                    <p className='flex items-center gap-1 text-sm text-foreground'>
                      <Mail className='h-3 w-3' /> {item.user.email}
                    </p>
                    <p className='mt-1 text-xs text-foreground'>
                      ID: {item.user.id}
                    </p>
                  </div>
                </div>
                <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
                  <InfoItem
                    label='Criado em'
                    value={formatDate(String(item.user.created_at))}
                    icon={<Calendar className='h-4 w-4' />}
                  />
                  <InfoItem
                    label='Atualizado'
                    value={formatDate(String(item.user.updated_at))}
                    icon={<Calendar className='h-4 w-4' />}
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <div className='rounded-md border p-4 text-center text-foreground'>
              Informações do usuário não disponíveis
            </div>
          )}

          <Separator />

          {item.dashboard_item ? (
            <Collapsible defaultOpen>
              <CollapsibleTrigger className='flex w-full items-center justify-between'>
                <h3 className='flex items-center gap-2 text-sm font-medium text-foreground'>
                  <LayoutDashboard className='h-4 w-4' />
                  Item de Dashboard
                </h3>
                <Button variant='ghost' size='sm' className='min-w-6'>
                  <Info className='h-4 w-4' />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className='pt-3'>
                <div className='space-y-3'>
                  <InfoItem
                    label='ID do Item'
                    value={Number(item.dashboard_item.id)}
                    icon={<LayoutDashboard className='h-4 w-4' />}
                  />

                  {item.dashboard_item.dashboard_component && (
                    <div className='rounded-md border p-3'>
                      <div className='mb-2 flex items-center gap-2'>
                        <FileCode className='h-4 w-4' />
                        <span className='font-medium'>Componente</span>
                      </div>
                      <div className='space-y-2'>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm text-foreground'>ID:</span>
                          <span className='font-medium'>
                            {item.dashboard_item.dashboard_component.id}
                          </span>
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm text-foreground'>Slug:</span>
                          <span className='font-medium'>
                            {item.dashboard_item.dashboard_component.slug}
                          </span>
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm text-foreground'>Path:</span>
                          <span className='font-medium'>
                            {item.dashboard_item.dashboard_component.path}
                          </span>
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm text-foreground'>
                            Redimensionável:
                          </span>
                          <span className='font-medium'>
                            {item.dashboard_item.dashboard_component
                              .is_resizable
                              ? 'Sim'
                              : 'Não'}
                          </span>
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm text-foreground'>
                            Largura:
                          </span>
                          <span className='font-medium'>
                            {item.dashboard_item.dashboard_component.width}px
                          </span>
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm text-foreground'>
                            Altura:
                          </span>
                          <span className='font-medium'>
                            {item.dashboard_item.dashboard_component.height}px
                          </span>
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm text-foreground'>
                            Altura Máxima:
                          </span>
                          <span className='font-medium'>
                            {item.dashboard_item.dashboard_component.max_height}
                            px
                          </span>
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm text-foreground'>
                            Largura Máxima:
                          </span>
                          <span className='font-medium'>
                            {item.dashboard_item.dashboard_component.max_width}
                            px
                          </span>
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm text-foreground'>
                            Altura Mínima:
                          </span>
                          <span className='font-medium'>
                            {item.dashboard_item.dashboard_component.min_height}
                            px
                          </span>
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm text-foreground'>
                            Largura Mínima:
                          </span>
                          <span className='font-medium'>
                            {item.dashboard_item.dashboard_component.min_width}
                            px
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
                    <InfoItem
                      label='Criado em'
                      value={formatDate(String(item.dashboard_item.created_at))}
                      icon={<Calendar className='h-4 w-4' />}
                    />
                    <InfoItem
                      label='Atualizado'
                      value={formatDate(String(item.dashboard_item.updated_at))}
                      icon={<Calendar className='h-4 w-4' />}
                    />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <div className='rounded-md border p-4 text-center text-foreground'>
              Informações do item de dashboard não disponíveis
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
        <span className='max-w-64 overflow-hidden text-ellipsis text-sm font-medium'>
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

function Mail(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <rect width='20' height='16' x='2' y='4' rx='2' />
      <path d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7' />
    </svg>
  )
}
