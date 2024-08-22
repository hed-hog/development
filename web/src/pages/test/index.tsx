import { useForm } from 'react-hook-form'
import FormPanel from '@/components/custom/form-panel'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/custom/button'

export default function MyForm() {
  const form = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  const countryOptionExample = [
    { value: 'usa', label: 'USA' },
    { value: 'canada', label: 'Canada' },
  ]

  const cityOptionExample = [
    { value: 'sp', label: 'São Paulo' },
    { value: 'rj', label: 'Rio de Janeiro' },
  ]

  const fields = [
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      required: true,
      description: 'This is your public display name.',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'text',
      required: true,
    },
    {
      name: 'birthdate',
      label: 'Birthdate',
      type: 'datepicker',
      required: true,
    },
    {
      name: 'country',
      label: 'Country',
      type: 'select',
      required: true,
      options: countryOptionExample,
    },
    {
      name: 'color',
      label: 'Color',
      type: 'color',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'richtext',
    },
    {
      name: 'city',
      label: 'City',
      type: 'multiselect',
      required: true,
      options: cityOptionExample,
    },
    {
      name: 'cities',
      label: 'Cities',
      type: 'pickersheet',
      options: cityOptionExample,
    },
    {
      name: 'files',
      label: 'Arquivos',
      type: 'file',
    },
    {
      name: 'cidades',
      label: 'Cidades',
      type: 'radio',
      options: cityOptionExample,
    },
    {
      name: 'terms',
      // label: 'Aceite os termos de uso',
      type: 'checkbox',
      options: [
        {
          value: 'terms',
          label: 'Aceite os termos de uso.',
        },
      ],
    },
    {
      label: 'Milhar',
      name: 'percentage',
      type: 'range',
      sliderOptions: {
        defaultValue: [500],
        max: 1000,
        step: 100,
      },
    },
  ]

  return (
    <Card className='mx-auto w-[620px]'>
      <CardContent>
        <FormPanel
          title='User Registration'
          subtitle='Please fill in the form to register.'
          fields={fields}
          form={form}
          onSubmit={onSubmit}
        />
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button variant='outline'>Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  )
}
