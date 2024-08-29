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
import { ColorPickerField } from './color-picker-field'
import { Checkbox } from '../ui/checkbox'
import { Button } from './button'
import { DatePickerField } from '../ui/date-picker-field'
import { IFormFieldOption } from '@/types/form-panel'

interface IPropertyTableColumn {
  key: string
  header: string
  type: string
  options?: IFormFieldOption[]
}

interface IPropertyTableProps {
  columns: IPropertyTableColumn[]
  data: Array<Record<string, any>>
  caption?: string
  onSaveChanges: (updatedData: any[]) => void
}

const PropertyTable: React.FC<IPropertyTableProps> = ({
  columns,
  data,
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
          <ColorPickerField
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
            <SelectTrigger>
              <SelectValue placeholder='Select an option' />
            </SelectTrigger>
            <SelectContent>
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
          <DatePickerField
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
      default:
        return null
    }
  }

  // Prepare columns for TableView
  const tableColumns = columns.map((column, index) => ({
    header: column.header,
    key: column.key,
    // First column is non-editable
    isEditable: index !== 0,
  }))

  const tableData = editedData.map((item, index) =>
    columns.reduce(
      (acc, column) => ({
        ...acc,
        [column.key]:
          column.key === columns[0].key
            ? item[column.key] // Fixed value for the first column
            : renderField(
                column.type,
                column.key,
                item,
                column.options || [],
                index
              ),
      }),
      {}
    )
  )

  return (
    <div className='flex flex-col'>
      <TableView
        data={tableData}
        columns={tableColumns}
        searchable={false}
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

export default PropertyTable
