import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useApp } from '@/hooks/use-app'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { usePagination } from '@/hooks/use-pagination'
import { isPlural } from '@/lib/utils'
import { IPaginationOption } from '@/types/pagination-options'
import { IResponsiveColumn } from '@/types/responsive-columns'
import { ISelectOption } from '@/types/select-options'
import { IStyleOption } from '@/types/style-options'
import { ITableColumn } from '@/types/table-column'
import {
  IconAdjustmentsHorizontal,
  IconDotsVertical,
} from '@tabler/icons-react'
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { v4 as uuidv4 } from 'uuid'
import { SkeletonCard } from '@/components/cards/skeleton-card'
import { SearchField } from '@/components/fields/search-field'
import MenuItem from '@/components/custom/menu-item'
import { SelectedItems } from '@/components/custom/select-items'
import { Button, ButtonProps } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import GridView from '@/components/views/grid-view'
import ListView from '@/components/views/list-view'
import { PaginationView } from '@/components/views/pagination-view'
import TableView from '@/components/views/table-view'

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
  menuOrders?: MenuOrder[]
  menuActions?: IMenuItemAction<T>[]
  itemClassName?: string
  selected?: T[]
  extractKey?: (item: T) => string
  onSelectionChange?: (selectedItems: Array<T>) => void
  checked?: (item: T) => boolean
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
        onItemDoubleClick?: (
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
        onItemDoubleClick?: (
          row: T,
          index: number,
          e: React.MouseEvent<HTMLTableRowElement, MouseEvent>
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

export type DataPanelRef<T> = {
  getSelectedItems: () => T[]
}

const DataPanelInner = <T extends any>(
  {
    layout = 'grid',
    extractKey = (item: T) => {
      try {
        return 'id' in (item as any) ? String((item as any).id) : ''
      } catch (error) {
        return uuidv4()
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
    onItemDoubleClick,
    onItemContextMenu,
    responsiveColumns,
    itemClassName,
    onSelectionChange,
    menuOrders = [],
    menuActions = [],
    checked,
    ...props
  }: DataPanelProps<T>,
  ref: React.Ref<DataPanelRef<T>>
) => {
  const refInner = useRef<any>(null)
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

  const [drawerActionsMobile, setDrawerActionsMobile] = useState(false)
  const [order, setOrder] = useState(`${sortOrder}-${sortField}`)
  const [selectedItemsArr, setSelectedItemsArr] = useState<string[]>([])
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false)
  const { openDialog, closeDialog } = useApp()

  const getSelectedItems = useCallback(() => {
    return selectedItemsArr.map((item) => JSON.parse(item))
  }, [selectedItemsArr])

  const handleSelect = useCallback(
    (item: T) => {
      setSelectedItemsArr((prev) => [...prev, JSON.stringify(item)])
    },
    [selectedItemsArr]
  )

  const handleUnselect = useCallback(
    (item: T) => {
      setSelectedItemsArr((prev) => {
        return prev.filter(
          (i) => extractKey(JSON.parse(i) as T) !== extractKey(item)
        )
      })
    },
    [extractKey, getSelectedItems]
  )

  const onSortChange = (
    field: string,
    order: 'asc' | 'desc',
    isLocale: boolean
  ) => {
    if (!isLocale) {
      setSortField(field)
      setSortOrder(order)
    }
  }

  const getSelectedItemsPanelProps = useCallback(() => {
    switch (layout) {
      case 'table':
        return {
          columns,
          data: getSelectedItems(),
          sortable,
          caption,
          isLoading,
          itemClassName,
          extractKey,
          render,
          selectable,
          onSortChange,
          multiple,
          selectedIds: getSelectedItems().map((item) => extractKey(item)),
          onSelectionChange: (items: T[]) => {
            setSelectedItemsArr(items.map((item) => JSON.stringify(item)))
          },
          ...(props as any),
        }
      case 'list':
        return {
          itemClassName,
          data: getSelectedItems(),
          styleOptions,
          render,
          selectable,
          multiple,
          selectedIds: getSelectedItems().map((item) => extractKey(item)),
          onSelectionChange: (items: T[]) => {
            setSelectedItemsArr(items.map((item) => JSON.stringify(item)))
          },
          ...(props as any),
        }
      case 'grid':
        return {
          itemClassName,
          data: getSelectedItems(),
          responsiveColumns,
          styleOptions,
          render,
          selectable,
          multiple,
          selectedIds: getSelectedItems().map((item) => extractKey(item)),
          onSelectionChange: (items: T[]) => {
            setSelectedItemsArr(items.map((item) => JSON.stringify(item)))
          },
          ...(props as any),
        }
    }
  }, [getSelectedItems])

  const getSelectedItemsPanel = useCallback(() => {
    switch (layout) {
      case 'table':
        return TableView<T>
      case 'list':
        return ListView<T>
      case 'grid':
        return GridView<T>
    }
  }, [getSelectedItems, layout])

  const showSelectedItems = useCallback(() => {
    if (!getSelectedItems().length) return

    const id = openDialog({
      children: getSelectedItemsPanel(),
      props: getSelectedItemsPanelProps(),
      buttons: [
        {
          variant: 'secondary',
          text: 'Cancelar',
          onClick: () => {
            setSelectedItemsArr(selectedItemsArr)
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
  }, [selectedItemsArr, getSelectedItemsPanel, getSelectedItems])

  useEffect(() => {
    if (checked) {
      const initiallySelected = items.filter((item) => checked(item))
      setSelectedItemsArr(initiallySelected.map((item) => JSON.stringify(item)))
    }
  }, [items, checked])

  const showButtons = useCallback(
    <T extends any>({ show }: IMenuItemAction<T>): boolean => {
      if (
        (show === 'once' && getSelectedItems().length !== 1) ||
        (show === 'some' && !getSelectedItems().length) ||
        (show === 'none' && getSelectedItems().length)
      ) {
        return true
      }

      return false
    },
    [getSelectedItems]
  )

  const setSelectedItemsInner = useCallback(() => {
    if (refInner.current) {
      refInner.current.setSelectedItems(
        selectedItemsArr.map((item) => extractKey(JSON.parse(item)))
      )
    }
  }, [refInner.current, selectedItemsArr])

  useEffect(() => {
    setSelectedItemsInner()
  }, [selectedItemsArr])

  useEffectAfterFirstUpdate(() => {
    if (typeof onSelectionChange === 'function') {
      onSelectionChange(getSelectedItems())
    }
  }, [getSelectedItems])

  useImperativeHandle(
    ref,
    () => ({
      getSelectedItems() {
        return refInner.current?.getSelectedItems()
      },
      selectAllItems() {
        return refInner.current?.selectAllItems()
      },
      toggleSelectItem(item: T, index: number, shiftKey: boolean) {
        return refInner.current?.toggleSelectItem(item, index, shiftKey)
      },
      setSelectedItems(ids: string[]) {
        return refInner.current?.setSelectedItems(ids)
      },
    }),
    [getSelectedItems]
  )

  return (
    <>
      {Boolean(hasSearch || menuActions.length) && (
        <div
          className={`my-4 flex w-full flex-row justify-${hasSearch ? 'between' : 'end'}`}
        >
          {hasSearch && (
            <div className='w-1/4 min-w-80'>
              <SearchField
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
                              handler(getSelectedItems(), e)
                            setSelectedItemsArr([])
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
                  <DropdownMenuRadioGroup
                    value={order}
                    onValueChange={setOrder}
                  >
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
            <Drawer
              open={isOrderDrawerOpen}
              onOpenChange={setIsOrderDrawerOpen}
            >
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
            {!isDesktop && (
              <Drawer
                open={drawerActionsMobile}
                onOpenChange={setDrawerActionsMobile}
              >
                <DrawerTrigger asChild>
                  <Button variant='outline' size='icon'>
                    <IconDotsVertical className='h-4 w-4' />
                  </Button>
                </DrawerTrigger>
                <DrawerContent className='w-full gap-4 pb-4'>
                  <DrawerHeader className='text-left'>
                    <DrawerTitle>Opções</DrawerTitle>
                    <DrawerDescription>
                      {(getSelectedItems() ?? []).length} ite
                      {isPlural(getSelectedItems().length, 'm', 'ns')}{' '}
                      selecionado
                      {isPlural(getSelectedItems().length)}
                    </DrawerDescription>
                  </DrawerHeader>
                  {!isDesktop && (
                    <MenuItem
                      label={'Ordenar'}
                      icon={
                        <IconAdjustmentsHorizontal className='mr-1 w-8 cursor-pointer' />
                      }
                      onClick={() => {
                        setIsOrderDrawerOpen(true)
                        setDrawerActionsMobile(false)
                      }}
                    />
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
                              handler(getSelectedItems(), e)
                            setSelectedItemsArr([])
                            setDrawerActionsMobile(false)
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
      )}

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
              ref={refInner}
              itemClassName={itemClassName}
              selectable={selectable}
              multiple={multiple}
              columns={columns as ITableColumn<T>[]}
              data={items}
              sortable={sortable}
              caption={caption}
              onItemClick={onItemClick}
              onItemContextMenu={onItemContextMenu}
              onItemDoubleClick={onItemDoubleClick}
              isLoading={isLoading}
              onSortChange={onSortChange}
              onSelect={handleSelect}
              onUnselect={handleUnselect}
              extractKey={extractKey}
            />
          )}
        </>
      )}
      {layout === 'list' && (
        <>
          {isLoading ? (
            <ListView<T>
              itemClassName={itemClassName}
              data={[]}
              styleOptions={{
                gap: styleOptions.gap,
                padding: styleOptions.padding,
              }}
              render={() => <SkeletonCard key={Math.random()} />}
              {...(props as any)}
            />
          ) : (
            <ListView<T>
              ref={refInner}
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
              onItemDoubleClick={onItemDoubleClick}
              onUnselect={handleUnselect}
              selectedIds={getSelectedItems().map((item) => extractKey(item))}
              {...(props as any)}
            />
          )}
        </>
      )}
      {layout === 'grid' && (
        <>
          {isLoading ? (
            <GridView<T>
              ref={refInner}
              itemClassName={itemClassName}
              data={[]}
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
              selectedIds={getSelectedItems().map((item) => extractKey(item))}
              onSelect={handleSelect}
              onItemDoubleClick={onItemDoubleClick}
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
          selectedItems={getSelectedItems()}
          onClick={() => showSelectedItems()}
        />
      )}
    </>
  )
}

export const DataPanel = forwardRef(DataPanelInner) as <T>(
  props: DataPanelProps<T> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement

export default DataPanel
