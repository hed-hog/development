import { ReactNode, useEffect, useRef, useState } from 'react'
import { Button, ButtonProps } from '@/components/ui/button'
import {
  Tabs,
  TabsBody,
  TabsContent,
  TabsFooter,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

export type TabPanelItem = {
  title: string
  children: ReactNode
  buttons?: (ButtonProps & { text: string; name?: string })[]
}

export type TabPanelProps = {
  tabs: TabPanelItem[]
  activeTabIndex?: number
  buttons?: (ButtonProps & { text: string })[]
}

export const TabPanel = ({
  tabs,
  activeTabIndex = 0,
  buttons: tabButtons,
}: TabPanelProps) => {
  const [activeTab, setActiveTab] = useState(activeTabIndex)
  const tabsListRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  useEffect(() => {
    const handleResize = () => {
      if (tabsListRef.current) {
        const tabsList = tabsListRef.current
        const hasOverflow = tabsList.scrollWidth > tabsList.clientWidth

        if (hasOverflow) {
          tabsList.style.overflowX = 'auto'
        } else {
          tabsList.style.overflowX = 'unset'
        }
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const tabsList = tabsListRef.current

    if (tabsList) {
      const onMouseDown = (e: MouseEvent) => {
        isDragging.current = true
        startX.current = e.pageX - tabsList.offsetLeft
        scrollLeft.current = tabsList.scrollLeft
        tabsList.style.cursor = 'grabbing'
      }

      const onMouseLeaveOrUp = () => {
        isDragging.current = false
        tabsList.style.cursor = 'grab'
      }

      const onMouseMove = (e: MouseEvent) => {
        if (!isDragging.current) return
        const x = e.pageX - tabsList.offsetLeft
        const walk = (x - startX.current) * 2 // Velocidade do arraste
        tabsList.scrollLeft = scrollLeft.current - walk
      }

      tabsList.addEventListener('mousedown', onMouseDown)
      tabsList.addEventListener('mouseleave', onMouseLeaveOrUp)
      tabsList.addEventListener('mouseup', onMouseLeaveOrUp)
      tabsList.addEventListener('mousemove', onMouseMove)

      return () => {
        tabsList.removeEventListener('mousedown', onMouseDown)
        tabsList.removeEventListener('mouseleave', onMouseLeaveOrUp)
        tabsList.removeEventListener('mouseup', onMouseLeaveOrUp)
        tabsList.removeEventListener('mousemove', onMouseMove)
      }
    }
  }, [])

  return (
    <Tabs
      defaultValue='account'
      className='tabs-flex w-full flex-1 flex-col'
      value={`tab-${activeTab}`}
      onValueChange={(value) => {
        setActiveTab(Number(value.split('-')[1]))
      }}
    >
      <TabsList
        ref={tabsListRef}
        className='scrollbar-hide flex w-full flex-row justify-start space-x-2 overflow-x-auto whitespace-nowrap'
      >
        {tabs.map(({ title }, index) => (
          <TabsTrigger
            key={`tab-trigger-${index}`}
            className='flex-1'
            value={`tab-${index}`}
            name={title}
          >
            {title}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map(({ children, buttons }, index) => (
        <TabsContent
          className='flex-1'
          key={`tab-content-${index}`}
          value={`tab-${index}`}
        >
          <TabsBody>{children}</TabsBody>
          {buttons && buttons?.length > 0 && (
            <TabsFooter>
              <div className='flex justify-end gap-2'>
                {(buttons ?? []).map(({ text, name, ...props }, index) => (
                  <Button
                    name={name}
                    key={`tab-content-${index}-button-${index}`}
                    {...props}
                  >
                    {text}
                  </Button>
                ))}
              </div>
            </TabsFooter>
          )}
        </TabsContent>
      ))}
      {(tabButtons ?? []).map(({ text, ...props }, index) => (
        <Button key={`tab-${index}-button-${index}`} {...props}>
          {text}
        </Button>
      ))}
    </Tabs>
  )
}
