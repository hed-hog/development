import React, { useState } from 'react'
import TableView from '@/components/custom/table-view'
import { Button } from './button'
import { IFormFieldOption } from '@/types/form-panel'
import Field, { EnumFieldType } from './field'

interface IPropertyTableColumn {
  key: string
  header: string
  type: EnumFieldType
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
    type: EnumFieldType,
    name: string,
    item: any,
    options: IFormFieldOption[] = [],
    index: number
  ) => {
    return (
      <Field
        type={type}
        value={item[name]}
        onChange={(value: any) => handleFieldChange(index, name, value)}
        options={options}
        required={false}
      />
    )
  }

  // Prepare columns for TableView
  const tableColumns = columns.slice(0, 2).map((column, index) => ({
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
