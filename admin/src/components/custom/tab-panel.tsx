import { ReactNode, useState } from 'react'
import { Button, ButtonProps } from './button'
import {
  Tabs,
  TabsBody,
  TabsContent,
  TabsFooter,
  TabsList,
  TabsTrigger,
} from '../ui/tabs'

export type TabPanelItem = {
  title: string
  children: ReactNode
  buttons?: (ButtonProps & { text: string })[]
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

  return (
    <Tabs
      defaultValue='account'
      className='tabs-flex w-full flex-1 flex-col'
      value={`tab-${activeTab}`}
      onValueChange={(value) => {
        setActiveTab(Number(value.split('-')[1]))
      }}
    >
      <TabsList className='grid w-full grid-cols-2'>
        {tabs.map(({ title }, index) => (
          <TabsTrigger key={`tab-trigger-${index}`} value={`tab-${index}`}>
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
                {(buttons ?? []).map(({ text, ...props }, index) => (
                  <Button
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
