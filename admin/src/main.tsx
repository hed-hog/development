import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { AppProvider } from '@/lib/app-provider'
import router from '@/router'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import '@/index.css'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import ThemeEditor from 'shadcn-theme-editor'

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('i18nextLng', lng)
})

i18n
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      async (language: string, namespace: string) =>
        import(`./locales/${language}/${namespace}.json`)
    )
  )
  .init({
    fallbackLng: 'en',
    lng: localStorage.getItem('i18nextLng') || 'en',
  })

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <RouterProvider router={router} />
        <Toaster />
        <ThemeEditor />
      </ThemeProvider>
    </AppProvider>
  </React.StrictMode>
)
