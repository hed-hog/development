import { Meta, StoryObj } from '@storybook/react'
import { PasswordInput as PasswordInputField } from '@/components/custom/password-input-field'
import React from 'react'

const meta: Meta<typeof PasswordInputField> = {
  title: 'Fields/PasswordInputField',
  component: PasswordInputField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `The PasswordInputField component is a secure and user-friendly input field for passwords. It features a toggle button to show or hide the password text, enhancing usability. Ideal for any form requiring password input, it supports various states such as disabled and customizable placeholder text.`,
      },
    },
  },
  argTypes: {
    className: {
      description: 'Additional CSS classes to apply to the input field.',
      control: 'text',
    },
    placeholder: {
      description: 'Placeholder text displayed when the input is empty.',
      control: 'text',
    },
    disabled: {
      description:
        'If true, the input field will be disabled and not interactive.',
      control: 'boolean',
    },
    value: {
      description: 'The current value of the input field.',
      control: 'text',
    },
    onChange: {
      description: 'Callback function triggered when the input value changes.',
      action: 'changed',
    },
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
    disabled: false,
  },
}
