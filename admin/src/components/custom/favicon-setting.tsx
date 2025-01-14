import { useApp } from '@/hooks/use-app'
import { useEffect } from 'react'

export default function FaviconSetting() {
  const { systemInfo } = useApp()

  const setFavicon = (faviconUrl: string) => {
    if (!faviconUrl) {
      console.warn('Favicon URL is not provided.')
      return
    }

    const updatedFaviconUrl = `${faviconUrl}?v=${new Date().getTime()}`

    let linkElement = document.querySelector(
      "link[rel='icon']"
    ) as HTMLLinkElement

    if (linkElement) {
      linkElement.href = updatedFaviconUrl
    } else {
      linkElement = document.createElement('link')
      linkElement.rel = 'icon'
      linkElement.href = updatedFaviconUrl
      document.head.appendChild(linkElement)
    }
  }

  useEffect(() => {
    if (systemInfo?.imageUrl) {
      setFavicon(systemInfo.imageUrl)
      console.log('Favicon updated:', systemInfo.imageUrl)
    } else {
      console.warn('Favicon URL is not available.')
    }
  }, [systemInfo?.imageUrl])

  return null
}
