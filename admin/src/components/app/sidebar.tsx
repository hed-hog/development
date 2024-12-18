import { Button } from '@/components/ui/button'
import { Layout } from '@/components/ui/layout'
import { useApp } from '@/hooks/use-app'
import { getSideLinks } from '@/lib/get-sidelinks'
import { cn } from '@/lib/utils'
import { IconChevronsLeft, IconMenu2, IconX } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Nav from '../navs/nav'
import { getValue } from '@/lib/get-property-value'

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  isCollapsed: boolean
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Sidebar({
  className,
  isCollapsed,
  setIsCollapsed,
}: SidebarProps) {
  const {
    i18n: { language },
  } = useTranslation()
  const { request } = useApp()
  const [navOpened, setNavOpened] = useState(false)
  const [systemName, setSystemName] = useState<string>('')
  const [systemSlogan, setSystemSlogan] = useState<string>('')
  const [imageUrl, setImageUrl] = useState<string>('')
  const { data } = useQuery({
    queryKey: ['menu-system', language],
    queryFn: () =>
      request({
        url: `/menu/system`,
      }),
  })

  const refreshValues = () => {
    setImageUrl(getValue('--image-url'))
    setSystemName(getValue('--system-name'))
    setSystemSlogan(getValue('--system-slogan'))
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'style') {
        refreshValues()
      }
    })
  })

  useEffect(() => {
    refreshValues()
    observer.observe(document.documentElement, {
      attributes: true,
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  let sideLinks = getSideLinks((data?.data as any[]) || [])

  if (!(sideLinks instanceof Array)) {
    sideLinks = []
  }

  /* Make body not scrollable when navBar is opened */
  useEffect(() => {
    if (navOpened) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [navOpened])

  return (
    <aside
      className={cn(
        `fixed left-0 right-0 top-0 z-40 w-full border-r-2 transition-[width] md:bottom-0 md:right-auto md:h-svh ${isCollapsed ? 'md:w-14' : 'md:w-[var(--menu-width)]'}`,
        className
      )}
    >
      {/* Overlay in mobile */}
      <div
        onClick={() => setNavOpened(false)}
        className={`absolute inset-0 transition-[opacity] delay-100 duration-700 ${navOpened ? 'h-svh opacity-50' : 'h-0 opacity-0'} w-full bg-black md:hidden`}
      />

      <Layout fixed className={navOpened ? 'h-svh' : ''}>
        {/* Header */}
        <Layout.Header
          sticky
          className='flex justify-between px-4 py-3 shadow-sm md:px-4'
        >
          <div className={`flex items-center ${!isCollapsed ? 'gap-2' : ''}`}>
            <img
              src={imageUrl}
              alt='Logo'
              className={`transition-all ${isCollapsed ? 'h-6 w-6' : 'h-8 w-8'}`}
            />
            <div
              className={`flex flex-col justify-end truncate ${isCollapsed ? 'invisible w-0' : 'visible w-auto'}`}
            >
              <span className='font-medium'>{systemName}</span>
              <span className='text-xs'>{systemSlogan}</span>
            </div>
          </div>

          {/* Toggle Button in mobile */}
          <Button
            variant='ghost'
            size='icon'
            className='md:hidden'
            aria-label='Toggle Navigation'
            aria-controls='sidebar-menu'
            aria-expanded={navOpened}
            onClick={() => setNavOpened((prev) => !prev)}
          >
            {navOpened ? <IconX /> : <IconMenu2 />}
          </Button>
        </Layout.Header>

        {/* Navigation links */}
        <Nav
          id='sidebar-menu'
          className={`z-40 h-full flex-1 overflow-auto ${navOpened ? 'max-h-screen' : 'max-h-0 py-0 md:max-h-screen md:py-2'}`}
          closeNav={() => setNavOpened(false)}
          isCollapsed={isCollapsed}
          links={sideLinks}
        />

        {/* Scrollbar width toggle button */}
        <Button
          onClick={() => setIsCollapsed((prev) => !prev)}
          size='icon'
          variant='outline'
          className='absolute -right-5 top-1/2 z-50 hidden min-w-2 rounded-full md:inline-flex'
        >
          <IconChevronsLeft
            stroke={1.5}
            className={`h-5 w-5 ${isCollapsed ? 'rotate-180' : ''}`}
          />
        </Button>
      </Layout>
    </aside>
  )
}
