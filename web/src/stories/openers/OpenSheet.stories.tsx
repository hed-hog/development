import { useContext } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { AppContext } from '@/lib/app-provider'
import { Button } from '@/components/custom/button'

// Definindo o Meta para a história
const meta: Meta<typeof Button> = {
  title: 'Openers/OpenSheet',
  tags: ['autodocs'],
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: `Opens a sheet with the specified properties.
        <br/><br/>
          <h3>Props:</h3>
          <ul>
            <li><strong>title</strong> (string, optional): The title of the sheet.</li>
            <li><strong>description</strong> (string, optional): The description of the sheet.</li>
            <li><strong>children</strong> (ReactNode): The content to be displayed inside the sheet.</li>
            <li><strong>side</strong> (string): The side of the screen where the sheet should be positioned ('top', 'right', 'bottom', 'left').</li>
            <li><strong>buttons</strong> (Array of ButtonProps): An array of buttons to be displayed in the sheet's footer.
              <ul>
                <li><strong>variant</strong> (string, optional): The variant of the button (e.g., 'destructive').</li>
                <li><strong>text</strong> (string): The text to be displayed on the button.</li>
                <li><strong>onClick</strong> (function): The function to be called when the button is clicked.</li>
              </ul>
            </li>
          </ul>
        `,
      },
    },
  },
}

export default meta

// Componente de exemplo para a história
export const SheetStory: StoryObj<typeof Button> = {
  render: () => {
    const { openSheet, closeSheet } = useContext(AppContext)

    const handleOpenSheet = () => {
      const id = openSheet({
        title: 'Test Sheet',
        description: 'This is a test sheet.',
        children: () => <div>Sheet Content</div>,
        side: 'top',
        buttons: [
          {
            variant: 'destructive',
            text: 'Cancel',
            onClick: () => {
              closeSheet(id)
            },
          },
          {
            text: 'Save',
            onClick: () => console.log('Saved'),
          },
        ],
      })
    }

    return (
      <div>
        <Button onClick={handleOpenSheet}>Open Sheet</Button>
      </div>
    )
  },
}
