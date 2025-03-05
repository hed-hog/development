import { useCallback, useEffect, useState } from 'react'
import ListView from '../views/list-view'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import DataPanel from '../panels/data-panel'

type PickerFieldProps<T> = {
  url: string
  render?: (item: any) => JSX.Element
  textTitle?: string
  textEmpty?: string
  textLoading?: string
  textSelectingButton?: string
  textRemoveButton?: string
  textAddButton?: string
  value?: T[]
  onChange?: (value: T[]) => void
  columnName?: string
}

export const PickerField = <T extends {}>({
  url,
  render,
  textTitle = 'Selecting...',
  textEmpty = 'Empty list',
  textLoading = 'Loading...',
  textSelectingButton = 'Select',
  textRemoveButton = 'Remove',
  textAddButton = 'Add',
  value = [],
  onChange,
  columnName,
}: PickerFieldProps<T>) => {
  if (typeof render !== 'function') {
    render = (item: T) => {
      if (typeof item === 'string') {
        return <div>{item}</div>
      }
      return <div>{(item as any).name}</div>
    }
  }

  const [addDialog, setAddDialog] = useState(false)
  const [itemsToAdd, setItemsToAdd] = useState<T[]>([])
  const [items, setItems] = useState<T[]>([])
  const [selectedItems, setSelectedItems] = useState<T[]>([])

  const handleOnChange = useCallback(
    (items: T[]) => {
      if (typeof onChange === 'function') {
        onChange(items)
      }
    },
    [onChange]
  )

  useEffect(() => {
    setItems(value)
  }, [value])

  return (
    <div>
      <Dialog
        open={addDialog}
        onOpenChange={() => {
          setAddDialog(false)
        }}
        modal={true}
      >
        <DialogContent
          className='flex max-h-full flex-col sm:max-w-[425px]'
          aria-describedby='data-panel-person'
        >
          <DialogHeader>
            <DialogTitle>{textTitle ?? 'Selecting...'}</DialogTitle>
          </DialogHeader>
          <DialogDescription></DialogDescription>
          <div className='h-4' />
          <DataPanel<T>
            url={url}
            id='data-panel-person'
            layout='list'
            selectable={true}
            render={render}
            onSelectionChange={(selection) => {
              const items = new Set([
                ...(selection.map((s) => JSON.stringify(s)) as string[]),
              ])
              setItemsToAdd(Array.from(items).map((i) => JSON.parse(i) as T))
            }}
          />
          <div className='h-4' />
          <DialogFooter className='gap-1 sm:justify-end'>
            <Button
              type='button'
              onClick={() => {
                setItems([...items, ...itemsToAdd])
                handleOnChange([...items, ...itemsToAdd])
                setItemsToAdd([])
                setAddDialog(false)
              }}
            >
              {textSelectingButton ?? 'Select'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className='flex items-center justify-between pb-4'>
        <Button type='button' onClick={() => setAddDialog(true)}>
          {textAddButton ?? 'Add'}
        </Button>
        <Button
          disabled={selectedItems.length === 0}
          type='button'
          onClick={() => {
            const values = items.filter((item) => !selectedItems.includes(item))
            setItems(values)
            handleOnChange(values)
            setSelectedItems([])
          }}
        >
          {textRemoveButton ?? 'Remove'}
        </Button>
      </div>
      <ListView<T>
        data={items}
        selectable={true}
        render={(item) => <div>{(item as any).name}</div>}
        textEmpty={textEmpty}
        textLoading={textLoading}
        columnName={columnName}
        onSelectionChange={(selection) => {
          setSelectedItems(selection)
        }}
      />
    </div>
  )
}
