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
import {
  IconEdit,
  IconInfoCircle,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react'
import { useCreateUser, useDeleteUser, useEditUser } from '@/features/users'
import FormPanel from './form-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import { FieldValues, useForm } from 'react-hook-form'

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
  itemClassName?: string
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
  ...props
}: DataPanelProps<T>) => {
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
  } = usePagination({
    url,
    id,
    paginationOptions,
    selectOptions,
  })

  const [selectedItems, setSelectedItems] = useState<T[]>([])

  const form = useForm<FieldValues>({
    defaultValues: {
      id: '',
      name: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  })

  const { mutate: deleteUsers } = useDeleteUser()
  const { mutate: createUser } = useCreateUser()
  const { mutate: editUser } = useEditUser()
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

  const getSelectedItemsPanelProps = useCallback(() => {
    switch (layout) {
      case 'table':
        return {
          columns: columns as ITableColumn<T>[],
          data: selectedItems,
          sortable,
          caption,
          isLoading,
          itemClassName,
          extractKey,
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

  useEffectAfterFirstUpdate(() => {
    if (typeof onSelectionChange === 'function') {
      onSelectionChange(selectedItems)
    }
  }, [selectedItems])

  const openInfoDialog = () => {
    const id = openDialog({
      children: () => {
        return selectedItems.map((item: any) => (
          <div key={item.email} className='mb-5 border-b'>
            <div className='flex flex-row items-center'>
              <span className='mr-1 text-xs'>ID:</span>
              <h3 className='text-md font-semibold'>{item.id}</h3>
            </div>
            <div className='flex flex-row items-center'>
              <span className='mr-1 text-xs'>Nome:</span>
              <h3 className='text-md font-semibold'>{item.name}</h3>
            </div>
            <div className='flex flex-row items-center'>
              <span className='mr-1 text-xs'>Email:</span>
              <h3 className='text-md font-semibold'>{item.email}</h3>
            </div>
          </div>
        ))
      },
      title: 'Informações de Usuário',
      description: 'Confira mais informações sobre os usuários selecionados.',
    })

    return id
  }

  const openCreateDialog = () => {
    const id = openDialog({
      title: 'Criar Usuário',
      description: 'Preencha as informações do usuário.',
      children: () => (
        <FormPanel
          fields={[
            {
              name: 'name',
              label: { text: 'Nome' },
              type: EnumFieldType.TEXT,
              required: true,
            },
            {
              name: 'email',
              label: { text: 'Email' },
              type: EnumFieldType.TEXT,
              required: true,
            },
            {
              name: 'password',
              label: { text: 'Password' },
              type: EnumFieldType.PASSWORD,
              required: true,
            },
          ]}
          form={form}
          button={{ text: 'Criar' }}
          onSubmit={(data) => {
            createUser(data)
            closeDialog(id)
          }}
        />
      ),
    })

    return id
  }

  const openEditDialog = () => {
    if (!selectedItems.length) return

    form.reset({
      id: (selectedItems as any)[0]?.id || '',
      name: (selectedItems as any)[0]?.name || '',
      email: (selectedItems as any)[0]?.email || '',
    })

    const id = openDialog({
      children: () => (
        <FormPanel
          fields={[
            {
              name: 'name',
              label: { text: 'Nome' },
              type: EnumFieldType.TEXT,
              required: false,
            },
            {
              name: 'email',
              label: { text: 'Email' },
              type: EnumFieldType.TEXT,
              required: false,
            },
          ]}
          form={form}
          button={{ text: 'Editar' }}
          onSubmit={(data) => {
            editUser({ id: data.id, data })
            closeDialog(id)
          }}
        />
      ),
      title: 'Editar Usuário',
      description: 'Atualize as informações do usuário.',
    })

    return id
  }

  const openDeleteDialog = () => {
    const id = openDialog({
      children: () => {
        return selectedItems.map((item: any) => (
          <div key={item.email} className='mb-5'>
            <h3 className='text-md font-semibold'>{item.name}</h3>
            <p className='text-xs'>{item.email}</p>
          </div>
        ))
      },
      title: 'Excluir Usuário',
      description: 'Tem certeza de que deseja deletar estes usuários?',
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
          text: 'Deletar',
          variant: 'destructive',
          onClick: () => {
            deleteUsers(selectedItems.map((item: any) => item.id))
            setSelectedItems([])
            closeDialog(id)
          },
        },
      ],
    })

    return id
  }

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
        <div className='flex min-w-fit flex-row items-center justify-end rounded-lg bg-[#3b82f6] p-1'>
          {selectedItems.length ? (
            <>
              {' '}
              <IconInfoCircle
                className='mx-2 cursor-pointer'
                onClick={openInfoDialog}
              />
              {selectedItems.length === 1 && (
                <IconEdit
                  className='mx-2 cursor-pointer'
                  onClick={openEditDialog}
                />
              )}
              <IconTrash
                className='mx-2 cursor-pointer'
                onClick={openDeleteDialog}
              />
            </>
          ) : (
            <IconPlus
              className='mx-2 cursor-pointer'
              onClick={openCreateDialog}
            />
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
