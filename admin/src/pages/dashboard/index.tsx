import { useState, useEffect } from 'react'
import GridLayout from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { useQuery } from '@tanstack/react-query'
import { useApp } from '@/hooks/use-app'
import DynamicComponentLoader from '@/components/loaders/dynamic-component-loader'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Check, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { DashboardComponent, DashboardItem } from '@/types'
import { toast } from 'sonner'

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
  const [dashboardComponents, setDashboardComponents] = useState<any[]>([])
  const [loadingComponent, setLoadingComponent] = useState(false)
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: number }>(
    {}
  )

  const { data: dashboardData, refetch } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => request<any[]>({ url: `/dashboard` }),
  })

  const {
    data: itemsData,
    isLoading: isLoadingItems,
    error,
  } = useQuery({
    queryKey: ['dashboard-components'],
    queryFn: () => request<any[]>({ url: `/dashboard-component` }),
  })

  useEffect(() => {
    if (dashboardData) {
      const selectedMap: { [key: string]: number } = {}
      const paths: string[] = []

      ;(dashboardData.data as any).data.forEach((item: any) => {
        item.dashboard_item.forEach((dashboardItem: DashboardItem) => {
          const path = dashboardItem.dashboard_component?.path
          if (path) {
            selectedMap[path] = dashboardItem.id
            paths.push(path)
          }
        })
      })

      setSelectedItems(selectedMap)
      setDashboardComponents(paths)
    }
  }, [dashboardData])

  useEffect(() => {
    if (dashboardComponents.length > 0) {
      const generatedLayout = dashboardComponents.map((_, index) => ({
        i: String(index + 1),
        x: index % 4,
        y: Math.floor(index / 4) * 2,
        w: 1,
        h: 2,
      }))
      setLayout(generatedLayout)
    }
  }, [dashboardComponents])

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
      setScreenHeight(window.innerHeight)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleSelect = (path: string, componentId: number) => {
    if (selectedItems[path]) {
      handleRemoveComponent(path, selectedItems[path])
    } else {
      handleAddComponent(path, componentId)
    }
  }

  const handleAddComponent = (path: string, componentId: number) => {
    setLoadingComponent(true)

    request({
      url: '/dashboard-item',
      method: 'POST',
      data: {
        dashboard_id: 14,
        component_id: componentId,
        x_axis: 0,
        y_axis: 0,
        width: 1,
        height: 2,
      },
    })
      .then((data) => {
        setSelectedItems((prev) => ({ ...prev, [path]: (data as any).id }))
        toast.success('Componente adicionado com sucesso.')
        refetch()
      })
      .catch((error) => console.log(`Erro ao adicionar componente:`, error))
      .finally(() => setLoadingComponent(false))
  }

  const handleRemoveComponent = (path: string, itemId: number) => {
    request({
      url: `/dashboard-item`,
      method: 'DELETE',
      data: { ids: [itemId] },
    }).then(() => {
      setSelectedItems((prev) => {
        const updated = { ...prev }
        delete updated[path]
        return updated
      })
      toast.success('Componente removido com sucesso.')
      refetch()
    })
  }

  return (
    <div className='flex flex-col p-4'>
      <h1 className='mb-4 text-xl font-bold'>Dashboard</h1>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='icon'
            className='self-end'
            disabled={loadingComponent}
          >
            {loadingComponent ? (
              <button
                className='rounded-full p-2 transition-colors hover:bg-amber-100 disabled:opacity-50'
                aria-label='Atualizar contagem'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='animate-spin'
                >
                  <path d='M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8' />
                  <path d='M21 3v5h-5' />
                  <path d='M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16' />
                  <path d='M3 21v-5h5' />
                </svg>
              </button>
            ) : (
              <>
                <Settings className='h-5 w-5' />
                <span className='sr-only'>Abrir cards disponíveis</span>
              </>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Cards Disponíveis</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {isLoadingItems && (
            <>
              <DropdownMenuItem disabled>
                <Skeleton className='h-4 w-24' />
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <Skeleton className='h-4 w-28' />
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <Skeleton className='h-4 w-20' />
              </DropdownMenuItem>
            </>
          )}

          {error && (
            <DropdownMenuItem disabled className='text-destructive'>
              Erro ao carregar itens
            </DropdownMenuItem>
          )}

          {!isLoadingItems &&
            !error &&
            (itemsData?.data as any).data.map((item: DashboardComponent) => {
              const isSelected = Boolean(selectedItems[item.path as string])

              return (
                <DropdownMenuItem
                  key={item.id}
                  onClick={() =>
                    handleSelect(item.path as string, item.component_id)
                  }
                >
                  {isSelected && (
                    <Check className='mr-2 h-4 w-4 text-green-500' />
                  )}
                  {item.name}
                </DropdownMenuItem>
              )
            })}
        </DropdownMenuContent>
      </DropdownMenu>

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
        {dashboardComponents.map((path, index) => (
          <div key={String(index + 1)}>
            <DynamicComponentLoader path={path} />
          </div>
        ))}
      </GridLayout>
    </div>
  )
}
