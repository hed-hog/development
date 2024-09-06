import { Meta, StoryObj } from '@storybook/react'
import FormPanel from '@/components/custom/form-panel'
import { useForm } from 'react-hook-form'
import { EnumFieldType } from '@/enums/EnumFieldType'

const meta: Meta<typeof FormPanel> = {
  title: 'Panels/FormPanel',
  component: FormPanel,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'object',
    },
    subtitle: {
      control: 'object',
    },
    button: {
      control: 'object',
    },
    form: {
      control: 'object',
    },
    onSubmit: {
      action: 'submitted',
    },
  },
}

export default meta
type Story = StoryObj<typeof FormPanel>

const countryOptionExample = [
  { label: 'United States', value: 'us' },
  { label: 'Canada', value: 'ca' },
  { label: 'Brazil', value: 'br' },
]

const cityOptionExample = [
  { label: 'New York', value: 'ny' },
  { label: 'Toronto', value: 'to' },
  { label: 'São Paulo', value: 'sp' },
]

const fields = [
  {
    name: 'username',
    defaultValue: 'John Doe',
    label: {
      text: 'Username',
      style: { fontWeight: 'bold' },
    },
    type: EnumFieldType.TEXT,
    required: true,
    description: {
      text: 'This is your public display name.',
      style: { color: 'gray' },
    },
  },
  {
    name: 'email',
    defaultValue: 'test@test.com',
    label: {
      text: 'Email',
      style: { fontWeight: 'bold' },
    },
    type: EnumFieldType.TEXT,
    required: true,
  },
  {
    name: 'birthdate',
    label: {
      text: 'Birthdate',
      style: { fontWeight: 'bold' },
    },
    type: EnumFieldType.DATEPICKER,
    required: true,
  },
  {
    name: 'country',
    label: {
      text: 'Country',
      style: { fontWeight: 'bold', color: 'white' },
    },
    type: EnumFieldType.SELECT,
    required: true,
    options: countryOptionExample,
  },
  {
    name: 'color',
    label: {
      text: 'Color',
      style: { fontWeight: 'bold' },
    },
    type: EnumFieldType.COLOR,
    required: true,
  },
  {
    name: 'description',
    label: {
      text: 'Description',
      style: { fontWeight: 'bold' },
    },
    type: EnumFieldType.RICHTEXT,
    required: false,
  },
  {
    name: 'city',
    label: {
      text: 'City',
      style: { fontWeight: 'bold' },
    },
    type: EnumFieldType.MULTISELECT,
    required: true,
    options: cityOptionExample,
  },
  {
    name: 'cities',
    label: {
      text: 'Cities',
      style: { fontWeight: 'bold' },
    },
    type: EnumFieldType.SHEETPICKER,
    required: false,
    options: cityOptionExample,
  },
  {
    name: 'files',
    label: {
      text: 'Arquivos',
      style: { fontWeight: 'bold' },
    },
    type: EnumFieldType.FILE,
    required: false,
  },
  {
    name: 'cidades',
    label: {
      text: 'Cidades',
      style: { fontWeight: 'bold', color: 'white' },
    },
    type: EnumFieldType.RADIO,
    options: cityOptionExample,
    required: false,
  },
  {
    name: 'terms',
    type: EnumFieldType.CHECKBOX,
    options: [
      {
        value: 'terms',
        label: 'Aceite os termos de uso.',
      },
    ],
    required: false,
  },
  {
    name: 'percentage',
    label: {
      text: 'Milhar',
      style: { fontWeight: 'bold' },
    },
    type: EnumFieldType.RANGE,
    required: false,
    sliderOptions: {
      defaultValue: [500],
      max: 1000,
      step: 100,
    },
  },
  {
    name: 'password',
    label: {
      text: 'Sua Senha',
    },
    type: EnumFieldType.PASSWORD,
    required: true,
  },
]

const Template: Story = {
  render: (args) => {
    const form = useForm()
    return <FormPanel {...args} form={form} onSubmit={args.onSubmit} />
  },
}

export const Example: Story = {
  ...Template,
  args: {
    title: {
      text: 'User Registration',
      style: {
        fontSize: '1.5rem',
        paddingTop: '1rem',
        fontWeight: 'bold',
      },
    },
    subtitle: {
      text: 'Please fill in the form to register.',
      style: { fontSize: '1rem', color: 'gray' },
    },
    button: {
      text: 'Register',
      style: { backgroundColor: '#007bff', color: 'white' },
    },
    fields,
  },
}
