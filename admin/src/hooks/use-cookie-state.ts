import { useState, useEffect, useCallback } from 'react'

function useCookieState(
  key: string,
  initialValue: string,
  options: { days?: number; domain?: string } = {}
) {
  const { days = 7, domain = '' } = options // Valor padrão de 7 dias e domínio vazio
  const [value, setValue] = useState<string>(() => {
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${key}=`))
    return cookieValue
      ? decodeURIComponent(cookieValue.split('=')[1])
      : initialValue
  })

  const updateCookie = useCallback(
    (newValue: string) => {
      setValue(newValue)

      let expires = ''
      if (days) {
        const date = new Date()
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000) // Converte dias para milissegundos
        expires = `; expires=${date.toUTCString()}`
      }

      const cookieDomain = domain ? `; domain=${domain}` : ''
      document.cookie = `${key}=${encodeURIComponent(newValue)}${expires}; path=/${cookieDomain}`
    },
    [key, days, domain]
  )

  useEffect(() => {
    updateCookie(value)
  }, [value, updateCookie])

  return [value, updateCookie] as const
}

export default useCookieState
