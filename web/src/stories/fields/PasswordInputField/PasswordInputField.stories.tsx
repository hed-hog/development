import { Meta, StoryObj } from '@storybook/react'
import { PasswordInput as PasswordInputField } from '@/components/custom/password-input-field'
import React from 'react'

const meta: Meta<typeof PasswordInputField> = {
  title: 'Fields/PasswordInputField',
  component: PasswordInputField,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    value: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof PasswordInputField>

// História padrão do PasswordInput
export const Default: Story = {
  render: (args) => {
    const [passwordValue, setPasswordValue] = React.useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordValue(e.target.value)
      if (args.onChange) {
        args.onChange(e)
      }
    }

    return (
      <PasswordInputField
        {...args}
        value={passwordValue}
        onChange={handleChange}
      />
    )
  },
  args: {
    placeholder: 'Enter your password',
  },
}
