import { IPaginationOption } from '@/types/pagination-options'
import { ISelectOption } from '@/types/select-options'
import { ITableColumn } from '@/types/table-column'
import TableView from './table-view'
import ListView from './list-view'
import GridView from './grid-view'
import { usePagination } from '@/hooks/use-pagination'
import { IStyleOption } from '@/types/style-options'
import { IResponsiveColumn } from '@/types/responsive-columns'
import { SkeletonCard } from './skeleton-card'
import { PaginationView } from './pagination-view'
import { SearchField } from '../search-field'
import { useCallback, useState } from 'react'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { SelectedItems } from './select-items'
import { useApp } from '@/hooks/use-app'
import { Button, ButtonProps } from './button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useMediaQuery } from 'usehooks-ts'
import {
  IconAdjustmentsHorizontal,
  IconDotsVertical,
} from '@tabler/icons-react'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import MenuItem from './menu-item'
import { isPlural } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

type IMenuItemAction<T> = ButtonProps & {
  show?: 'once' | 'some' | 'none' | 'any'
  label?: string
  icon: JSX.Element
  tooltip?: string
  handler: (
    items: T[],
    event: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>
  ) => void
}

type MenuOrder = {
  field: string
  label: string
  order: 'asc' | 'desc'
}

type DataPanelTypeBase<T> = {
  url: string
  id: string
  render?: (item: T, index: number) => JSX.Element
  paginationOptions?: IPaginationOption
  selectOptions?: ISelectOption
  styleOptions?: IStyleOption
  selectable?: boolean
  multiple?: boolean
  hasSearch?: boolean
  menuOrders: MenuOrder[]
  menuActions?: IMenuItemAction<T>[]
  itemClassName?: string
  selected?: T[]
  extractKey?: (item: T) => string
  onSelectionChange?: (selectedItems: Array<T>) => void
}

type DataPanelType<T> = DataPanelTypeBase<T> &
  (
    | ({
        layout?: 'table'
        onItemClick?: (
          row: T,
          index: number,
          e: React.MouseEvent<HTMLTableRowElement, MouseEvent>
        ) => void
        onItemContextMenu?: (
          row: T,
          index: number,
          e: React.MouseEvent<HTMLTableRowElement, MouseEvent>
        ) => void
      } & React.HTMLAttributes<HTMLTableRowElement>)
    | ({
        layout?: 'list' | 'grid'
        onItemClick?: (
          row: T,
          index: number,
          e: React.MouseEvent<HTMLDivElement, MouseEvent>
        ) => void
        onItemContextMenu?: (
          row: T,
          index: number,
          e: React.MouseEvent<HTMLDivElement, MouseEvent>
        ) => void
      } & React.HTMLAttributes<HTMLDivElement>)
  )

export type DataPanelProps<T> = DataPanelType<T> &
  (
    | {
        layout: 'list'
        columns?: never
        sortable?: never
        caption?: never
        responsiveColumns?: never
      }
    | {
        layout: 'table'
        columns: ITableColumn<T>[]
        sortable?: boolean
        caption?: string
        responsiveColumns?: never
      }
    | {
        layout?: 'grid'
        responsiveColumns?: IResponsiveColumn
        columns?: never
        sortable?: never
        caption?: never
      }
  )

export const DataPanel = <T extends any>({
  layout = 'grid',
  extractKey = (item: T) => {
    try {
      return 'id' in (item as any) ? String((item as any).id) : ''
    } catch (e) {
      return ''
    }
  },
  url,
  id,
  hasSearch = false,
  selectable = false,
  multiple = false,
  selected = [],
  paginationOptions = {
    pageSizeOptions: [10, 20, 30, 40],
    maxPages: 3,
  },
  selectOptions,
  styleOptions = {
    gap: 1,
    padding: 0,
  },
  render,
  columns,
  sortable = false,
  caption,
  onItemClick,
  onItemContextMenu,
  responsiveColumns,
  itemClassName,
  onSelectionChange,
  menuOrders = [],
  menuActions = [],
  ...props
}: DataPanelProps<T>) => {
  const isDesktop = useMediaQuery('(min-width: 992px)')

  const {
    isLoading,
    items,
    page,
    setPage,
    pageSize,
    setPageSize,
    search,
    setSearch,
    totalItems,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
  } = usePagination({
    url,
    id,
    paginationOptions,
    selectOptions,
  })

  const [order, setOrder] = useState(`${sortOrder}-${sortField}`)
  const [selectedItems, setSelectedItems] = useState<T[]>(selected)
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false)
  const { openDialog, closeDialog } = useApp()

  const handleSelect = useCallback(
    (item: T) => setSelectedItems((value) => [...value, item]),
    []
  )

  const handleUnselect = useCallback(
    (item: T) =>
      setSelectedItems((value) =>
        value.filter((v) => extractKey(v) !== extractKey(item))
      ),
    [extractKey]
  )

  const onSortChange = (field: string, order: 'asc' | 'desc') => {
    setSortField(field)
    setSortOrder(order)
  }

  const getSelectedItemsPanelProps = useCallback(() => {
    switch (layout) {
      case 'table':
        return {
          columns,
          data: selectedItems,
          sortable,
          caption,
          isLoading,
          itemClassName,
          extractKey,
          render,
          selectable,
          onSortChange,
          multiple,
          selectedIds: selectedItems.map((item) => extractKey(item)),
          onSelectionChange: (items: T[]) => {
            console.log('onSelectionChange', items)
            setSelectedItems(items)
          },
          ...(props as any),
        }
      case 'list':
        return {
          itemClassName,
          data: selectedItems,
          styleOptions,
          render,
          selectable,
          multiple,
          selectedIds: selectedItems.map((item) => extractKey(item)),
          onSelectionChange: (items: T[]) => {
            console.log('onSelectionChange', items)
            setSelectedItems(items)
          },
          ...(props as any),
        }
      case 'grid':
        return {
          itemClassName,
          data: selectedItems,
          responsiveColumns,
          styleOptions,
          render,
          selectable,
          multiple,
          selectedIds: selectedItems.map((item) => extractKey(item)),
          onSelectionChange: (items: T[]) => {
            console.log('onSelectionChange', items)
            setSelectedItems(items)
          },
          ...(props as any),
        }
    }
  }, [selectedItems])

  const getSelectedItemsPanel = useCallback(() => {
    switch (layout) {
      case 'table':
        return TableView<T>
      case 'list':
        return ListView<T>
      case 'grid':
        return GridView<T>
    }
  }, [selectedItems, layout])

  const showSelectedItems = useCallback(() => {
    if (!selectedItems.length) return

    const id = openDialog({
      children: getSelectedItemsPanel(),
      props: getSelectedItemsPanelProps(),
      buttons: [
        {
          variant: 'secondary',
          text: 'Cancelar',
          onClick: () => {
            setSelectedItems(selectedItems)
            closeDialog(id)
          },
        },
        {
          text: 'Aplicar',
          onClick: () => {
            closeDialog(id)
          },
        },
      ],
      title: 'Itens selecionados',
      description: 'Confira ou remova os itens selecionados',
    })
  }, [selectedItems, getSelectedItemsPanel])

  const showButtons = useCallback(
    <T extends any>({ show }: IMenuItemAction<T>): boolean => {
      if (
        (show === 'once' && selectedItems.length !== 1) ||
        (show === 'some' && !selectedItems.length) ||
        (show === 'none' && selectedItems.length)
      ) {
        return true
      }

      return false
    },
    [selectedItems]
  )

  useEffectAfterFirstUpdate(() => {
    if (typeof onSelectionChange === 'function') {
      onSelectionChange(selectedItems)
    }
  }, [selectedItems])

  return (
    <>
      <div
        className={`my-4 flex w-full flex-row justify-${hasSearch ? 'between' : 'end'} gap-4`}
      >
        {hasSearch && (
          <div className='w-1/4 min-w-80'>
            <SearchField
              placeholder='Buscar...'
              value={search}
              onSearch={(value) => {
                setSearch(value)
              }}
            />
          </div>
        )}
        <div className='flex items-center justify-end space-x-4 rounded-md'>
          {isDesktop &&
            menuActions.map((btn, index) => {
              const { label, handler, tooltip, icon, show, ...props } = btn
              return (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        disabled={showButtons(btn)}
                        variant='secondary'
                        size='sm'
                        aria-label={label}
                        onClick={(e) => {
                          typeof handler === 'function' &&
                            handler(selectedItems, e)
                          setSelectedItems([])
                        }}
                        {...props}
                      >
                        {icon} {label}
                      </Button>
                    </TooltipTrigger>
                    {tooltip && (
                      <TooltipContent>
                        <p>{tooltip}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              )
            })}
          {isDesktop && Boolean(menuOrders.length) && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline'>
                  <IconAdjustmentsHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuRadioGroup value={order} onValueChange={setOrder}>
                  {menuOrders.map((order) => (
                    <DropdownMenuRadioItem
                      className='cursor-pointer'
                      onClick={() => {
                        setSortField(order.field)
                        setSortOrder(order.order)
                        setOrder(`${order.order}-${order.field}`)
                      }}
                      value={`${order.order}-${order.field}`}
                    >
                      {order.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {!isDesktop && (
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant='outline' size='icon'>
                  <IconDotsVertical className='h-4 w-4' />
                </Button>
              </DrawerTrigger>
              <DrawerContent className='w-full gap-4 pb-4'>
                <DrawerHeader className='text-left'>
                  <DrawerTitle>Opções</DrawerTitle>
                  <DrawerDescription>
                    {(selectedItems ?? []).length} ite
                    {isPlural(selectedItems.length, 'm', 'ns')} selecionado
                    {isPlural(selectedItems.length)}
                  </DrawerDescription>
                </DrawerHeader>
                {!isDesktop && (
                  <Drawer
                    open={isOrderDrawerOpen}
                    onOpenChange={setIsOrderDrawerOpen}
                  >
                    <DrawerTrigger asChild>
                      <MenuItem
                        label={'Ordenar'}
                        icon={
                          <IconAdjustmentsHorizontal className='mr-1 w-8 cursor-pointer' />
                        }
                      />
                    </DrawerTrigger>
                    <DrawerContent className='w-full gap-4 pb-4'>
                      <DrawerHeader className='text-left'>
                        <DrawerTitle>Ordenar por</DrawerTitle>
                      </DrawerHeader>
                      <div className='space-y-2'>
                        <DropdownMenuRadioGroup
                          value={order}
                          onValueChange={setOrder}
                        >
                          {menuOrders.map((order) => (
                            <MenuItem
                              key={`${order.order}-${order.field}`}
                              aria-label={order.label}
                              onClick={() => {
                                setIsOrderDrawerOpen(false)
                                setSortField(order.field)
                                setSortOrder(order.order)
                                setOrder(`${order.order}-${order.field}`)
                              }}
                              label={order.label}
                            />
                          ))}
                        </DropdownMenuRadioGroup>
                      </div>
                    </DrawerContent>
                  </Drawer>
                )}
                {menuActions
                  .filter((btn) => !showButtons(btn))
                  .map(
                    (
                      { icon, label, handler, variant, size, className },
                      index
                    ) => (
                      <MenuItem
                        key={index}
                        aria-label={label}
                        variant={variant}
                        size={size}
                        className={className}
                        onClick={(e) => {
                          typeof handler === 'function' &&
                            handler(selectedItems, e)
                          setSelectedItems([])
                        }}
                        icon={icon}
                        label={String(label)}
                      />
                    )
                  )}
              </DrawerContent>
            </Drawer>
          )}
        </div>
      </div>

      {layout === 'table' && (
        <>
          {isLoading ? (
            <TableView<T>
              columns={columns as ITableColumn<T>[]}
              data={[]}
              sortable={sortable}
              caption={caption}
              isLoading={isLoading}
              itemClassName={itemClassName}
              extractKey={extractKey}
              {...(props as any)}
            />
          ) : (
            <TableView<T>
              itemClassName={itemClassName}
              selectable={selectable}
              multiple={multiple}
              columns={columns as ITableColumn<T>[]}
              data={items}
              sortable={sortable}
              caption={caption}
              onItemClick={onItemClick}
              onItemContextMenu={onItemContextMenu}
              isLoading={isLoading}
              onSortChange={onSortChange}
              onSelect={handleSelect}
              onUnselect={handleUnselect}
              extractKey={extractKey}
              selectedIds={selectedItems.map((item) => extractKey(item))}
            />
          )}
        </>
      )}
      {layout === 'list' && (
        <>
          {isLoading ? (
            <ListView<T>
              itemClassName={itemClassName}
              data={Array.from({
                length: paginationOptions?.pageSizeOptions[0] ?? 10,
              })}
              styleOptions={{
                gap: styleOptions.gap,
                padding: styleOptions.padding,
              }}
              render={() => <SkeletonCard key={Math.random()} />}
              {...(props as any)}
            />
          ) : (
            <ListView<T>
              itemClassName={itemClassName}
              selectable={selectable}
              multiple={multiple}
              data={items}
              styleOptions={{
                gap: styleOptions.gap,
                padding: styleOptions.padding,
              }}
              render={render}
              onSelect={handleSelect}
              onUnselect={handleUnselect}
              selectedIds={selectedItems.map((item) => extractKey(item))}
              {...(props as any)}
            />
          )}
        </>
      )}
      {layout === 'grid' && (
        <>
          {isLoading ? (
            <GridView<T>
              itemClassName={itemClassName}
              data={Array.from({
                length: paginationOptions?.pageSizeOptions[0] ?? 10,
              })}
              responsiveColumns={responsiveColumns}
              styleOptions={{
                gap: styleOptions.gap,
                padding: styleOptions.padding,
              }}
              render={() => <SkeletonCard key={Math.random()} />}
              {...(props as any)}
            />
          ) : (
            <GridView<T>
              itemClassName={itemClassName}
              selectable={selectable}
              multiple={multiple}
              data={items}
              responsiveColumns={responsiveColumns}
              styleOptions={{
                gap: styleOptions.gap,
                padding: styleOptions.padding,
              }}
              render={render}
              selectedIds={selectedItems.map((item) => extractKey(item))}
              onSelect={handleSelect}
              onUnselect={handleUnselect}
              {...(props as any)}
            />
          )}
        </>
      )}

      <PaginationView
        page={page}
        pageSize={pageSize}
        total={totalItems}
        variant='default'
        maxPages={paginationOptions?.maxPages}
        onPageChange={(page) => setPage(page)}
        pageSizeOptions={paginationOptions?.pageSizeOptions}
        onPageSizeChange={(value) => {
          setPageSize(Number(value))
          setPage(1)
        }}
        padding={0}
      />

      {selectable && multiple && (
        <SelectedItems
          selectedItems={selectedItems}
          onClick={() => showSelectedItems()}
        />
      )}
    </>
  )
}
