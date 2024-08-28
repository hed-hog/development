import React, { useState } from 'react'
import TableView from '@/components/custom/table-view'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { ColorPicker } from './color-picker'
import { Checkbox } from '../ui/checkbox'
import { Button } from './button'
import DatePicker from '../ui/date-picker'
import { CalendarIcon } from 'lucide-react'
import {
  ICalendarProps,
  IFormFieldOption,
  IFormFieldPropsBase,
} from '@/types/form-panel'

interface IPropertyTableViewColumn
  extends Omit<IFormFieldPropsBase, 'name' | 'type' | 'defaultValue'> {
  header: string
  key: string
  type: string
  options?: IFormFieldOption[]
  calendar?: ICalendarProps
}

interface IPropertyTableViewProps {
  data: any[]
  columns: IPropertyTableViewColumn[]
  pagination?: boolean
  itemsPerPage?: number
  caption?: string
  onSaveChanges: (updatedData: any[]) => void
}

const PropertyTableView: React.FC<IPropertyTableViewProps> = ({
  data,
  columns,
  pagination = true,
  itemsPerPage = 10,
  caption = '',
  onSaveChanges,
}) => {
  const [editedData, setEditedData] = useState(data)

  const handleFieldChange = (index: number, fieldName: string, value: any) => {
    setEditedData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, [fieldName]: value } : item
      )
    )
  }

  const renderField = (
    type: string,
    name: string,
    item: any,
    options: IFormFieldOption[] = [],
    index: number,
    column: IPropertyTableViewColumn
  ) => {
    const { input = {}, label = {}, calendar = {}, container = {} } = column

    switch (type) {
      case 'text':
        return (
          <Input
            value={item[name] || ''}
            onChange={(e) => handleFieldChange(index, name, e.target.value)}
            className={input.className}
            style={input.style}
          />
        )
      case 'color':
        return (
          <ColorPicker
            value={item[name]}
            onChange={(value) => handleFieldChange(index, name, value)}
          />
        )
      case 'checkbox':
        return (
          <Checkbox
            checked={item[name] || false}
            onCheckedChange={(checked) =>
              handleFieldChange(index, name, checked)
            }
            className={input.className}
            style={input.style}
          />
        )
      case 'select':
        return (
          <Select
            value={item[name]}
            onValueChange={(value) => handleFieldChange(index, name, value)}
          >
            <SelectTrigger style={input.style}>
              <SelectValue placeholder={label?.text} />
            </SelectTrigger>
            <SelectContent
              className={container.className}
              style={container.style}
            >
              <SelectGroup>
                {options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )

      case 'datepicker':
        return (
          <DatePicker
            calendar={calendar}
            className={`${input.className} w-full`}
            style={{ width: '100%', ...input.style }}
            label={String()}
            icon={<CalendarIcon className='mr-2 h-4 w-4' />}
            date={item[name] ? new Date(item[name]) : undefined}
            onDateChange={(date) => handleFieldChange(index, name, date)}
          />
        )

      case 'file':
        return (
          <Input
            type='file'
            onChange={(e) => handleFieldChange(index, name, e.target.files)}
            className={input.className}
            style={input.style}
          />
        )
      // Adicione mais casos conforme necessário
      default:
        return null
    }
  }

  return (
    <div className='flex flex-col'>
      <TableView
        data={editedData.map((item, index) =>
          columns.reduce(
            (acc, column) => ({
              ...acc,
              [column.key]: renderField(
                column.type,
                column.key,
                item,
                column.options || [],
                index,
                column
              ),
            }),
            {}
          )
        )}
        columns={columns.map((column) => ({
          header: column.header,
          key: column.key,
        }))}
        searchable={false}
        pagination={pagination}
        itemsPerPage={itemsPerPage}
        caption={caption}
      />
      <Button
        onClick={() => onSaveChanges(editedData)}
        className='mt-4 self-end'
      >
        Save Changes
      </Button>
    </div>
  )
}

export default PropertyTableView
