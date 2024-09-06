import EditableTableView from '@/components/custom/editable-table-view'
import { EnumFieldType } from '@/components/custom/field'
import type { Meta, StoryObj } from '@storybook/react'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Views/EditableTableView',
  component: EditableTableView,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
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
