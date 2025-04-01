import DynamicComponentLoader from '@/components/loaders/dynamic-component-loader'
import { useApp } from '@/hooks/use-app'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import GridLayout from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

export default function Dashboard() {
  const { request } = useApp()
  const [layout, setLayout] = useState([
    { i: '1', x: 0, y: 0, w: 1, h: 2 },
    { i: '2', x: 1, y: 0, w: 1, h: 2 },
    { i: '3', x: 2, y: 0, w: 1, h: 2 },
    { i: '4', x: 3, y: 0, w: 1, h: 2 },
    { i: '5', x: 0, y: 2, w: 2, h: 2 },
    { i: '6', x: 2, y: 2, w: 2, h: 2 },
  ])

  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const [screenHeight, setScreenHeight] = useState(window.innerHeight)
  const [dashboardCards, setDashboardCards] = useState<any[]>([])

  const { data } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () =>
      request<any[]>({
        url: `/dashboard`,
      }),
  })

  useEffect(() => {
    if (data) {
      setDashboardCards((data.data as any).data)
    }
  }, [data])

  useEffect(() => {
    if (dashboardCards.length > 0) {
      const generatedLayout = dashboardCards.map((_, index) => {
        if (index < 4) {
          return {
            i: String(index + 1),
            x: index,
            y: 0,
            w: 1,
            h: 2,
          }
        } else {
          return {
            i: String(index + 1),
            x: (index - 4) * 2,
            y: 2,
            w: 2,
            h: 2,
          }
        }
      })

      setLayout(generatedLayout)
    }
  }, [dashboardCards])

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
      setScreenHeight(window.innerHeight)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className='p-4'>
      <h1 className='mb-4 text-xl font-bold'>Dashboard</h1>
      <GridLayout
        layout={layout}
        cols={4}
        rowHeight={70}
        width={screenWidth - 350}
        style={{ width: screenWidth - 350, height: screenHeight }}
        onLayoutChange={(newLayout) => setLayout(newLayout)}
        isResizable
        isDraggable
      >
        {Boolean(dashboardCards.length) &&
          dashboardCards.map((card, index) => (
            <div key={String(index + 1)}>
              <DynamicComponentLoader path={card.path} />
            </div>
          ))}
      </GridLayout>
    </div>
  )
}
