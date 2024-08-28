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
import { MultiSelect } from '../ui/multi-select'
import DatePicker from '../ui/date-picker'
import { CalendarIcon } from 'lucide-react'
import { IFormFieldOption } from '@/types/form-panel'

interface IPropertyTableViewColumn {
  header: string
  key: string
  type: string
  options?: IFormFieldOption[]
}

interface IPropertyTableViewProps {
  data: any[] // Aceita qualquer tipo de dado
  columns: IPropertyTableViewColumn[]
  onSaveChanges: (updatedData: any[]) => void
}

const PropertyTableView: React.FC<IPropertyTableViewProps> = ({
  data,
  columns,
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
    index: number
  ) => {
    switch (type) {
      case 'text':
        return (
          <Input
            value={item[name] || ''}
            onChange={(e) => handleFieldChange(index, name, e.target.value)}
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
          />
        )
      case 'select':
        return (
          <Select
            value={item[name]}
            onValueChange={(value) => handleFieldChange(index, name, value)}
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Selecionar opção' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )

      case 'multiselect':
        return (
          <MultiSelect
            value={item[name] || []}
            onChange={(value) => handleFieldChange(index, name, value)}
            options={options}
          />
        )

      case 'datepicker':
        return (
          <DatePicker
            className='w-full'
            style={{ width: '100%' }}
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
                index
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
