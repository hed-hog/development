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
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Button, ButtonProps } from '@/components/custom/button'
import { v4 as uuidv4 } from 'uuid'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

type DialogType = {
  id: string
  open: boolean
  dialog: OpenDialogType
}

type OpenDialogType = {
  title?: string
  description?: string
  children: ReactNode
  buttons?: (ButtonProps & { text: string })[]
}

type OpenSheetType = {
  side: 'top' | 'right' | 'bottom' | 'left'
} & OpenDialogType

type SheetType = {
  id: string
  open: boolean
  sheet: OpenSheetType
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
  openSheet: (props: OpenSheetType) => string
  closeSheet: (id: string) => void
}

export const AppContext = createContext<AppContextType>({
  logout: () => {},
  login: () => Promise.resolve(),
  user: {},
  request: () => new Promise(() => {}),
  openDialog: () => '',
  closeDialog: () => {},
  openSheet: () => '',
  closeSheet: () => {},
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
  const [sheets, setSheets] = useState<SheetType[]>([])

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

  const closeSheet = useCallback(
    (id: string) => {
      setSheets([...sheets].filter((sheet) => sheet.id !== id))
    },
    [sheets]
  )

  const openSheet = useCallback(
    (sheet: OpenSheetType) => {
      const id = uuidv4()

      const data: SheetType = {
        id,
        open: true,
        sheet,
      }

      setSheets([...sheets, data])

      return id
    },
    [sheets]
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
    parseToken(token)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])
  return (
    <>
      <AppContext.Provider
        value={{
          login,
          user,
          request,
          logout,
          openDialog,
          closeDialog,
          openSheet,
          closeSheet,
        }}
      >
        <QueryClientProvider>
          {dialogs.map(
            ({
              id,
              open,
              dialog: { title, children, description, buttons },
            }) => (
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
                      <DialogFooter className='gap-1 sm:justify-end'>
                        {(buttons ?? []).map(({ text, ...props }) => (
                          <Button {...props}>{text}</Button>
                        ))}
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
                      <div className='px-4'>{children}</div>
                      <DrawerFooter className='gap-1 sm:justify-end'>
                        {(buttons ?? []).map(({ text, ...props }) => (
                          <Button {...props}>{text}</Button>
                        ))}
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                )}
              </Fragment>
            )
          )}

          {sheets.map(
            ({
              id,
              open,
              sheet: { children, side, description, title, buttons },
            }) => (
              <Fragment key={id}>
                <Sheet
                  open={open}
                  onOpenChange={(value) => !value && closeSheet(id)}
                >
                  <SheetContent side={side}>
                    {(title || description) && (
                      <SheetHeader>
                        {title && <SheetTitle>{title}</SheetTitle>}
                        {description && (
                          <SheetDescription>{description}</SheetDescription>
                        )}
                      </SheetHeader>
                    )}

                    {children}
                    <SheetFooter>
                      {(buttons ?? []).map(({ text, ...props }) => (
                        <Button {...props}>{text}</Button>
                      ))}
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
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
