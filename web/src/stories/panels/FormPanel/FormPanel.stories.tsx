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
      description:
        'Configuration for the form panel title, including text and styles.',
    },
    subtitle: {
      control: 'object',
      description:
        'Configuration for the form panel subtitle, including text and styles.',
    },
    button: {
      control: 'object',
      description:
        'Configuration for the submit button, including text and styles.',
    },
    form: {
      control: 'object',
      description:
        'React Hook Form instance used to manage form state and validation.',
    },
    fields: {
      control: { summary: 'array' },
      description: `Array of field configurations used to render form fields.`,
    },
    onSubmit: {
      action: 'submitted',
      description: 'Callback function triggered when the form is submitted.',
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `FormPanel component provides a versatile form interface with various field types and customizable options. It integrates seamlessly with React Hook Form to handle form submission and validation. 
      <br/> <br/> 
      <h3>Key Features:</h3>
      <ul style={{ listStyle: 'none '}}>
        <li>**Customizable Fields**: Includes various field types such as text, date, select, multi-select, and more.</li>
        <li>**Dynamic Rendering**: Fields are rendered dynamically based on provided configuration, allowing for flexible form designs.</li>
        <li>**Validation**: Supports form validation with required fields and custom validation rules.</li>
        <li>**Integration with React Hook Form**: Easily integrates with React Hook Form for efficient form handling and validation.</li>
        <li>**Customizable UI**: Customize form title, subtitle, button text, and individual field labels and descriptions.</li>
      </ul>
      Ideal for use in applications requiring complex forms with various input types and validation requirements, such as user registration, surveys, and settings forms.
      `,
      },
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

export const Default: Story = {
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
