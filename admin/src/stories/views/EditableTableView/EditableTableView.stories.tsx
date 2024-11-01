import EditableTableView from '@/components/views/editable-table-view'
import { EnumFieldType } from '@/enums/EnumFieldType'
import type { Meta, StoryObj } from '@storybook/react'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Views/EditableTableView',
  component: EditableTableView,
  parameters: {
    docs: {
      description: {
        component: `**EditableTableView** is a flexible and highly customizable table component that allows inline editing of data in a tabular format. 
        It supports multiple field types (text, select, date picker, color picker, etc.) to accommodate various types of data, and it is suitable for forms, admin panels, or any UI where user need to view and edit multiple rows of data. 
        <br/><br/>
        <h3>Key Features:</h3>
        <ul style={{ listStyle: 'none '}}>
          <li>**Editable Fields**: Supports multiple field types like text, select, checkbox, date picker, and file upload.</li>
          <li>**Dynamic Column Definitions**: The table columns are dynamically configured based on the provided configuration.</li>
          <li>**Save Changes Callback**: A customizable save changes handler allows the integration of backend API calls or local state updates.</li>
          <li>**Property Table Mode**: A special mode for property-style tables with simple key-value pairs.</li>
        </ul>
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isPropertyTable: {
      control: 'boolean',
      description: 'If true, the table behaves as a key-value property table.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    data: {
      control: 'object',
      description:
        'The data to display in the table, where each object represents a row.',
      table: {
        type: { summary: 'Array<object>' },
        defaultValue: { summary: '[]' },
      },
    },
    columns: {
      control: 'object',
      description:
        'An array defining the table columns, with each column specifying the key, header, and field type.',
      table: {
        type: {
          summary:
            'Array<{ key: string, header: string, type: EnumFieldType, options?: Array<{ label: string, value: string }> }>',
        },
      },
    },
    caption: {
      control: 'text',
      description: 'A caption for the table, which appears above the table.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    onSaveChanges: {
      type: 'function',
      description: 'Callback function invoked when the user saves changes.',
      action: 'saveChanges',
      table: {
        type: { summary: 'function' },
      },
    },
  },
} satisfies Meta<typeof EditableTableView>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const PropertyVersion: Story = {
  args: {
    isPropertyTable: true,
    data: [
      {
        name: 'Item 1',
        category: 'option1',
      },
      {
        name: 'Item 2',
        category: 'option2',
      },
    ],
    columns: [
      { key: 'name', header: 'Nome', type: EnumFieldType.TEXT },
      {
        key: 'category',
        header: 'Categoria',
        type: EnumFieldType.SELECT,
        options: [
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
        ],
      },
    ],
    onSaveChanges: (updatedData: any) =>
      console.log('Dados atualizados:', updatedData),
  },
}

export const FullVersion: Story = {
  args: {
    isPropertyTable: false,
    data: [
      {
        id: 1,
        name: 'John Doe',
        role: 'admin',
        isActive: true,
        description: 'Sr. John',
        date: new Date('2024-08-31'),
        color: '#ff0000',
      },
      {
        id: 2,
        name: 'Jane Smith',
        role: 'user',
        isActive: false,
        description: 'Sra. Jane',
        date: new Date('2024-08-31'),
        color: '#00ff00',
      },
      {
        id: 3,
        name: 'John Doe',
        role: 'admin',
        isActive: true,
        description: 'Sr. John',
        date: new Date('2024-08-31'),
        color: '#ff0000',
      },
      {
        id: 4,
        name: 'Jane Smith',
        role: 'user',
        isActive: false,
        description: 'Sra. Jane',
        date: new Date('2024-08-31'),
        color: '#00ff00',
      },
    ],
    columns: [
      {
        header: 'Nome',
        key: 'name',
        type: EnumFieldType.TEXT,
      },
      {
        header: 'Cargo',
        key: 'role',
        type: EnumFieldType.SELECT,
        options: [
          { label: 'User', value: 'user' },
          { label: 'Admin', value: 'admin' },
        ],
      },
      {
        header: 'Ativo',
        key: 'isActive',
        options: [
          {
            value: 'confirms',
            label: 'Confirmar?',
          },
        ],
        type: EnumFieldType.CHECKBOX,
      },
      {
        header: 'Cor Favorita',
        key: 'color',
        type: EnumFieldType.COLOR,
      },
      { header: 'Descrição', key: 'description', type: EnumFieldType.TEXT },
      { header: 'Arquivo', key: 'file', type: EnumFieldType.FILE },
      {
        header: 'Date',
        key: 'date',
        type: EnumFieldType.DATEPICKER,
      },
    ],
    onSaveChanges: (updatedData: any) =>
      console.log('Dados atualizados:', updatedData),
  },
}
