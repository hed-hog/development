import React, { useState } from 'react'
import TableView from '@/components/custom/table-view'
import { Button } from './button'
import {
  FieldType,
  ICalendarProps,
  IFormFieldOption,
  IFormFieldPropsBase,
} from '@/types/form-panel'
import Field from './field'

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
}

const EditableTableView: React.FC<IEditableTableViewProps> = ({
  data,
  columns,
  caption = '',
  onSaveChanges,
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
    const { label = {} } = column

    return (
      <Field
        type={type}
        value={item[name]}
        onChange={(value: any) => handleFieldChange(index, name, value)}
        options={options}
        label={label}
        required={false}
      />
    )
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

export default EditableTableView
