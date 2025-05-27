"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export const useTheme = () => {
  const { theme, setTheme } = React.useContext(React.createContext({ theme: "", setTheme: (theme: string) => {} }))

  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted) {
    return { theme: "light", setTheme }
  }

  return { theme, setTheme }
}
