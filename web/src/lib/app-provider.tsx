import { useToast } from '@/components/ui/use-toast'
import useLocalStorage, { LocalStorageKeys } from '@/hooks/use-local-storage'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import {
  createContext,
  Fragment,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { Toaster } from 'sonner'
import { decodeToken } from './decodeToken'
import { QueryClientProvider } from './query-provider'
import { useMediaQuery } from 'usehooks-ts'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Button } from '@/components/custom/button'
import { v4 as uuidv4 } from 'uuid'

type DialogType = {
  id: string
  open: boolean
  dialog: OpenDialogType
}

type OpenDialogType = {
  title?: string
  description?: string
  children: ReactNode
}

const BASE_URL = 'http://localhost:3000'

type AppContextType = {
  logout: () => void
  login: (email: string, password: string) => Promise<void>
  user: any
  request: <T extends {}>(
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T, any>>
  openDialog: (props: OpenDialogType) => string
  closeDialog: (id: string) => void
}

export const AppContext = createContext<AppContextType>({
  logout: () => {},
  login: () => Promise.resolve(),
  user: {},
  request: () => new Promise(() => {}),
  openDialog: () => '',
  closeDialog: () => {},
})

type RequestLoginType = {
  token: string
}

export type AppProviderProps = {
  children: ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const { toast } = useToast()
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const [dialogs, setDialogs] = useState<DialogType[]>([])

  const [token, setToken] = useLocalStorage({
    defaultValue: '',
    key: LocalStorageKeys.Token,
  })
  const [user, setUser] = useLocalStorage({
    defaultValue: {},
    key: LocalStorageKeys.User,
  })

  const closeDialog = useCallback(
    (id: string) => {
      setDialogs([...dialogs].filter((dialog) => dialog.id !== id))
    },
    [dialogs]
  )

  const openDialog = useCallback(
    (dialog: OpenDialogType) => {
      const id = uuidv4()

      const data: DialogType = {
        id,
        open: true,
        dialog,
      }

      setDialogs([...dialogs, data])

      return id
    },
    [dialogs]
  )

  const handleError = (error: any) => {
    console.log('handleError', error)
    switch (error.code) {
      case 'ERR_NETWORK':
        toast({
          title: 'Servidor indisponível',
          description: `Por favor tente novamente mais tarde`,
          variant: 'destructive',
        })
        break
      default:
        toast({
          title: 'Error',
          description: 'An error occurred',
          variant: 'destructive',
        })
    }
  }

  const request = useCallback(
    <T extends {}>(config?: AxiosRequestConfig) => {
      const instance = axios.create({ baseURL: BASE_URL })

      instance.interceptors.request.use(
        (cnf) => {
          if (token) {
            console.info('setting token in request')
            cnf.headers['Authorization'] = `Bearer ${token}`
          }
          return cnf
        },
        (error) => {
          handleError(error)
          return Promise.reject(error)
        }
      )

      instance.interceptors.response.use(
        (response) => {
          return response
        },
        (error) => {
          handleError(error)
          return Promise.reject(error)
        }
      )

      return instance.request<T>(config ?? {})
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [token]
  )

  const parseToken = (token: string) => {
    if (token) {
      try {
        const decoded = decodeToken(token)
        const parsed = JSON.parse(decoded)

        if (parsed.exp * 1000 < Date.now()) {
          toast({
            title: 'Error',
            description: 'Token expired',
            variant: 'destructive',
          })
          setToken('')
        }

        setUser(parsed.user)
      } catch (error) {
        handleError(error)
      }
    }
  }

  const login = (email: string, password: string) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const { data } = await request<RequestLoginType>({
          method: 'POST',
          url: '/auth/login',
          data: {
            email,
            password,
          },
        })

        if (data.token) {
          setToken(data.token)
          toast({
            title: 'Success',
            description: 'Logged in successfully',
            variant: 'default',
          })
        }

        resolve()
      } catch (error) {
        toast({
          title: 'Error',
          description: (error as any).response.data.message,
          variant: 'destructive',
        })
        reject()
      }
    })
  }

  const logout = () => {
    setToken('')
    setUser({})
    window.location.href = '/login'
  }

  useEffect(() => {
    console.log(dialogs)
  }, [dialogs])

  useEffect(() => {
    parseToken(token)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])
  return (
    <>
      <AppContext.Provider
        value={{ login, user, request, logout, openDialog, closeDialog }}
      >
        <QueryClientProvider>
          {dialogs.map(
            ({ id, open, dialog: { title, children, description } }) => (
              <Fragment key={id}>
                {isDesktop ? (
                  <Dialog
                    open={open}
                    onOpenChange={(value) => !value && closeDialog(id)}
                  >
                    <DialogContent className='sm:max-w-[425px]'>
                      {(title || description) && (
                        <DialogHeader>
                          {title && <DialogTitle>{title}</DialogTitle>}
                          {description && (
                            <DialogDescription>{description}</DialogDescription>
                          )}
                        </DialogHeader>
                      )}
                      {children}
                      <DialogFooter className='sm:justify-start'>
                        <DialogClose asChild>
                          <Button type='button' variant='secondary'>
                            Close
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <Drawer
                    open={open}
                    onOpenChange={(value) => !value && closeDialog(id)}
                  >
                    <DrawerContent>
                      {(title || description) && (
                        <DrawerHeader className='text-left'>
                          {title && <DrawerTitle>{title}</DrawerTitle>}
                          {description && (
                            <DrawerDescription>{description}</DrawerDescription>
                          )}
                        </DrawerHeader>
                      )}
                      {children}
                      <DrawerFooter className='pt-2'>
                        <DrawerClose asChild>
                          <Button variant='outline'>Cancel</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                )}
              </Fragment>
            )
          )}

          {children}
        </QueryClientProvider>
        <Toaster richColors />
      </AppContext.Provider>
    </>
  )
}
