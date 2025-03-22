import { PageTitle } from '@/components/custom/page-title'
import {
  Cpu,
  Database,
  HardDrive,
  Package,
  Server,
  User,
  Users,
} from 'lucide-react'
import { useEffect, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useApp } from '@/hooks/use-app'
import { bytesToHuman } from '@/lib/bytes-to-human'
import { secondsToHuman } from '@/lib/seconds-to-human'
import { useNavigate } from 'react-router-dom'

type CodeResponse = {
  os: {
    name: string
    platform: string
    version: string
    architecture: string
    uptime: number
    cpu: {
      model: string
      speed: number
      physicalCores: number
      virtualCores: number
    }
    memory: {
      total: number
      free: number
    }
    disk: Array<{
      filesystem: string
      size: number
      free: number
    }>
  }
  modules: Array<{
    name: string
    version: string
    latestVersion: string
    upToDate: boolean
  }>
  users: {
    total: number
    admin: number
    active: number
    activities: Array<any>
  }
  database: {
    connections: number
    size: number
    queriesPerSecond: number
  }
}

export default function Page() {
  const navigate = useNavigate()

  const { request } = useApp()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [data, setData] = useState<CodeResponse>({
    os: {
      name: '',
      platform: '',
      version: '',
      architecture: '',
      uptime: 0,
      cpu: {
        model: '',
        speed: 0,
        physicalCores: 0,
        virtualCores: 0,
      },
      memory: {
        total: 0,
        free: 0,
      },
      disk: [],
    },
    modules: [],
    users: {
      total: 0,
      admin: 0,
      active: 0,
      activities: [],
    },
    database: {
      connections: 0,
      size: 0,
      queriesPerSecond: 0,
    },
  } as CodeResponse)

  const load = async () => {
    setIsRefreshing(true)
    const { data } = await request<CodeResponse>({
      url: '/core',
    })

    setData(data)

    setIsRefreshing(false)
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <>
      <PageTitle title={'Dashboard'} />
      <div className='mt-4 space-y-6 '>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {/* System Information Card */}
          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='flex items-center'>
                <Server className='mr-2 h-5 w-5 text-primary' />
                Informações do Sistema
              </CardTitle>
              <CardDescription>
                Detalhes do sistema operacional e hardware
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isRefreshing ? (
                <div className='space-y-4'>
                  <div className='animate-pulse'>
                    <div className='mb-2 h-4 w-3/4 rounded bg-gray-200'></div>
                    <div className='mb-2 h-4 w-1/2 rounded bg-gray-200'></div>
                    <div className='mb-2 h-4 w-1/4 rounded bg-gray-200'></div>
                    <div className='mb-2 h-4 w-2/3 rounded bg-gray-200'></div>
                  </div>
                  <Separator />
                  <div className='animate-pulse'>
                    <div className='mb-2 h-4 w-3/4 rounded bg-gray-200'></div>
                    <div className='mb-2 h-4 w-1/2 rounded bg-gray-200'></div>
                    <div className='mb-2 h-4 w-1/4 rounded bg-gray-200'></div>
                    <div className='mb-2 h-4 w-2/3 rounded bg-gray-200'></div>
                  </div>
                </div>
              ) : (
                <div className='space-y-4'>
                  <div>
                    <h3 className='flex items-center text-sm font-medium'>
                      <HardDrive className='mr-2 h-4 w-4 text-muted-foreground' />
                      Sistema Operacional
                    </h3>
                    <div className='mt-1 grid grid-cols-2 gap-1 text-sm'>
                      <div className='text-muted-foreground'>Nome:</div>
                      <div>{data.os.name}</div>
                      <div className='text-muted-foreground'>Versão:</div>
                      <div>{data.os.version}</div>
                      <div className='text-muted-foreground'>Arquitetura:</div>
                      <div>{data.os.architecture}</div>
                      <div className='text-muted-foreground'>Tempo ativo:</div>
                      <div>{secondsToHuman(data.os.uptime, true)}</div>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h3 className='flex items-center text-sm font-medium'>
                      <Cpu className='mr-2 h-4 w-4 text-muted-foreground' />
                      Hardware
                    </h3>
                    <div className='mt-1 grid grid-cols-2 gap-1 text-sm'>
                      <div className='text-muted-foreground'>CPU:</div>
                      <div>{data.os.cpu.model}</div>
                      <div className='text-muted-foreground'>Memória:</div>
                      <div>{bytesToHuman(data.os.memory.total)}</div>
                      {data.os.disk.map((disk) => (
                        <>
                          <div className='text-muted-foreground'>
                            Disco {disk.filesystem}:
                          </div>
                          <div>
                            {bytesToHuman(disk.size)} ({bytesToHuman(disk.free)}{' '}
                            free)
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Modules Card */}
          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='flex items-center'>
                <Package className='mr-2 h-5 w-5 text-primary' />
                Módulos Instalados
              </CardTitle>
              <CardDescription>Módulos e suas versões</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {data.modules.map((module, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between'
                  >
                    <div>
                      <div className='font-medium'>{module.name}</div>
                      <div className='text-sm text-muted-foreground'>
                        v{String(module.version).replace(/\^/g, '')}
                      </div>
                    </div>
                    <Badge variant={module.upToDate ? 'outline' : 'secondary'}>
                      {module.upToDate
                        ? 'Atualizado'
                        : 'Atualização disponível'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Users Summary Card */}
          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='flex items-center'>
                <Users className='mr-2 h-5 w-5 text-primary' />
                Resumo de Usuários
              </CardTitle>
              <CardDescription>
                Visão geral dos usuários do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='grid grid-cols-3 gap-4'>
                  <div className='flex flex-col items-center justify-center rounded-lg bg-primary/10 p-3'>
                    <div className='text-2xl font-bold'>{data.users.total}</div>
                    <div className='text-xs text-muted-foreground'>Total</div>
                  </div>
                  <div className='flex flex-col items-center justify-center rounded-lg bg-primary/10 p-3'>
                    <div className='text-2xl font-bold'>{data.users.admin}</div>
                    <div className='text-xs text-muted-foreground'>Admins</div>
                  </div>
                  <div className='flex flex-col items-center justify-center rounded-lg bg-primary/10 p-3'>
                    <div className='text-2xl font-bold'>
                      {data.users.active}
                    </div>
                    <div className='text-xs text-muted-foreground'>Ativos</div>
                  </div>
                </div>
                {data.users.activities.length > 0 && (
                  <div>
                    <h3 className='mb-2 text-sm font-medium'>
                      Atividade Recente
                    </h3>

                    <div className='space-y-2'>
                      {data.users.activities.map((activity, index) => (
                        <div
                          key={index}
                          className='flex items-center justify-between text-sm'
                        >
                          <div className='flex items-center'>
                            <User className='mr-2 h-4 w-4 text-muted-foreground' />
                            <span>{activity.user.name}</span>
                          </div>
                          <div className='text-muted-foreground'>
                            {activity.created_at}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant='outline'
                size='sm'
                className='w-full'
                onClick={() => navigate('/management/user')}
              >
                <User className='mr-2 h-4 w-4' />
                Ver Todos Usuários
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center'>
              <Database className='mr-2 h-5 w-5 text-primary' />
              Estatísticas do Banco de Dados
            </CardTitle>
            <CardDescription>
              Informações sobre o banco de dados do sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
              <div className='rounded-lg border p-4'>
                <div className='text-sm font-medium text-muted-foreground'>
                  Conexões
                </div>
                <div className='mt-1 text-2xl font-bold'>
                  {data.database.connections}
                </div>
              </div>
              <div className='rounded-lg border p-4'>
                <div className='text-sm font-medium text-muted-foreground'>
                  Tamanho
                </div>
                <div className='mt-1 text-2xl font-bold'>
                  {bytesToHuman(data.database.size)}
                </div>
              </div>
              <div className='rounded-lg border p-4'>
                <div className='text-sm font-medium text-muted-foreground'>
                  Consultas/min
                </div>
                <div className='mt-1 text-2xl font-bold'>
                  {data.database.queriesPerSecond}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
