import { ThemeProvider } from '@/components/app/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import '@/index.css'
import { AppProvider } from '@/lib/app-provider'
import router from '@/router'
import i18n from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { initReactI18next } from 'react-i18next'
import { RouterProvider } from 'react-router-dom'

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
      </ThemeProvider>
    </AppProvider>
  </React.StrictMode>
)
