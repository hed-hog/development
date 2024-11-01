import { Button } from '@/components/ui/button'
import { AppContext } from '@/lib/app-provider'
import { Meta, StoryObj } from '@storybook/react'
import { useContext } from 'react'

// Definindo o Meta para a história
const meta: Meta<typeof Button> = {
  title: 'Openers/OpenDialog',
  tags: ['autodocs'],
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: `Opens a dialog with the specified properties.
            <br/><br/>
          <h3>Props:</h3>
          <ul>
            <li><strong>title</strong> (string, optional): The title of the dialog.</li>
            <li><strong>description</strong> (string, optional): The description of the dialog.</li>
            <li><strong>children</strong> (ReactNode): The content to be displayed inside the dialog.</li>
            <li><strong>buttons</strong> (Array of ButtonProps): An array of buttons to be displayed in the dialog's footer.
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
export const DialogStory: StoryObj<typeof Button> = {
  render: () => {
    const { openDialog, closeDialog } = useContext(AppContext)

    const handleOpenDialog = () => {
      const id = openDialog({
        title: 'Test Dialog',
        description: 'This is a test dialog.',
        children: () => <span>Dialog Content</span>,
        buttons: [
          {
            variant: 'destructive',
            text: 'Cancel',
            onClick: () => {
              closeDialog(id)
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
        <Button onClick={handleOpenDialog}>Open Dialog</Button>
      </div>
    )
  },
}
