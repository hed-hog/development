import '@/index.css'
import type { Preview } from '@storybook/react'
import React from 'react'
import { themes } from 'storybook/internal/theming'
import { ThemeProvider } from '../src/components/theme-provider'
import { Toaster } from '../src/components/ui/toaster'
import { AppProvider } from '../src/lib/app-provider'

const preview: Preview = {
  parameters: {
    docs: {
      theme: themes.dark,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    // 👇 Defining the decorator in the preview file applies it to all stories
    (Story) => {
      return (
        <AppProvider>
          <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
            <Story />
            <Toaster />
          </ThemeProvider>
        </AppProvider>
      )
    },
  ],
}

export default preview
