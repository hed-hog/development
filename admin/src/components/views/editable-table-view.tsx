import TableView from '@/components/views/table-view'
import {
  FieldType,
  ICalendarProps,
  IFormFieldOption,
  IFormFieldPropsBase,
} from '@/types/form-panel'
import React, { useState } from 'react'
import Field from '@/components/fields/field'
import { Button } from '@/components/ui/button'

export interface IEditableTableViewColumn
  extends Omit<
    IFormFieldPropsBase,
    'name' | 'type' | 'defaultValue' | 'required'
  > {
  header: string
  key: string
  type: FieldType
  options?: IFormFieldOption[]
  calendar?: ICalendarProps
}

export interface IEditableTableViewProps {
  data: any[]
  columns: IEditableTableViewColumn[]
  caption?: string
  onSaveChanges: (updatedData: any[]) => void
  isPropertyTable?: boolean // New prop
}

const EditableTableView: React.FC<IEditableTableViewProps> = ({
  data,
  columns,
  caption = '',
  onSaveChanges,
  isPropertyTable = false, // Default to false
}) => {
  const [editedData, setEditedData] = useState(data)

  const handleFieldChange = (index: number, fieldName: string, value: any) => {
    if (typeof value === 'object' && !(value instanceof Date)) {
      value = value.target.value
    }
    setEditedData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, [fieldName]: value } : item
      )
    )
  }

  const renderField = (
    type: FieldType,
    name: string,
    item: any,
    options: IFormFieldOption[] = [],
    index: number,
    column: IEditableTableViewColumn
  ) => {
    return (
      <Field
        type={type}
        value={item[name]}
        onChange={(value: any) => handleFieldChange(index, name, value)}
        options={options}
        label={column.label}
        required={false}
      />
    )
  }

  const tableData = editedData.map((item, index) =>
    columns.reduce(
      (acc, column) => ({
        ...acc,
        [column.key]:
          isPropertyTable && column.key === columns[0].key
            ? item[column.key] // Fixed value for the first column
            : renderField(
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
  )

  const tableColumns = isPropertyTable
    ? [
        { header: columns[0].header, key: columns[0].key, isEditable: false },
        { header: columns[1].header, key: columns[1].key, isEditable: true },
      ]
    : columns.map((column) => ({
        header: column.header,
        key: column.key,
      }))

  return (
    <div className='flex flex-col'>
      <TableView data={tableData} columns={tableColumns} caption={caption} />
      <Button
        onClick={() => onSaveChanges(editedData)}
        className='mt-4 self-end'
      >
        Save Changes
      </Button>
    </div>
  )
}

export default EditableTableView
