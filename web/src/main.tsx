import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import '@/index.css'
import { AppProvider } from '@/lib/app-provider'
import router from '@/router'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <AppProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AppProvider>
    </ThemeProvider>
  </React.StrictMode>
)
