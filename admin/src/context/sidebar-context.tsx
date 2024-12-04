import React, { createContext, useContext, useEffect, useState } from 'react'
import { useSettingGroup } from '@/features/setting'
import { getIcon } from '@/lib/get-icon'

interface SidebarContextType {
  sidebarNavItems: { title: string; icon: JSX.Element; href: string }[]
  isLoading: boolean
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { data, isLoading } = useSettingGroup()
  const [sidebarNavItems, setSidebarNavItems] = useState<
    { title: string; icon: JSX.Element; href: string }[]
  >([])

  useEffect(() => {
    if (data) {
      setSidebarNavItems(
        data.data.data.map(({ icon, slug, name }: any) => ({
          title: name,
          icon: getIcon(icon),
          href: `/management/setting/${slug}`,
        }))
      )
    }
  }, [data])

  return (
    <SidebarContext.Provider value={{ sidebarNavItems, isLoading }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar deve ser usado dentro de um SidebarProvider')
  }
  return context
}
