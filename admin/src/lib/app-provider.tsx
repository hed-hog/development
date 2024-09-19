import { useToast } from '@/components/ui/use-toast'
import useLocalStorage, { LocalStorageKeys } from '@/hooks/use-local-storage'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import React, {
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
import { Button } from '@/components/custom/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { DialogType, OpenDialogType } from '@/types/dialog'
import { OpenSheetType, SheetType } from '@/types/sheet'
import { useDialog } from '@/hooks/use-dialog'
import { useSheet } from '@/hooks/use-sheet'
import { getBaseURL } from './getBaseURL'

export const BASE_URL = getBaseURL()

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

  const { openDialog, closeDialog } = useDialog(dialogs, setDialogs)
  const { openSheet, closeSheet } = useSheet(sheets, setSheets)

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
          console.log('request error', error)
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
              dialog: { title, children, description, buttons, props },
            }) => {
              if (typeof props !== 'object') {
                props = {}
              }

              return (
                <Fragment key={id}>
                  {isDesktop ? (
                    <Dialog
                      open={open}
                      onOpenChange={(value) => !value && closeDialog(id)}
                    >
                      <DialogContent className='flex max-h-full flex-col sm:max-w-[425px]'>
                        {(title || description) && (
                          <DialogHeader>
                            {title && <DialogTitle>{title}</DialogTitle>}
                            {description && (
                              <DialogDescription>
                                {description}
                              </DialogDescription>
                            )}
                          </DialogHeader>
                        )}
                        <div className='flex-1 overflow-y-auto'>
                          {React.createElement(children, {
                            ...props,
                            block: children,
                          })}
                        </div>
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
                              <DrawerDescription>
                                {description}
                              </DrawerDescription>
                            )}
                          </DrawerHeader>
                        )}
                        <div className='px-4'>
                          {React.createElement(children, {
                            ...props,
                            block: children,
                          })}
                        </div>
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
            }
          )}

          {sheets.map(
            ({
              id,
              open,
              sheet: { children, side, description, title, buttons, props },
            }) => (
              <Fragment key={id}>
                <Sheet
                  open={open}
                  onOpenChange={(value) => !value && closeSheet(id)}
                >
                  <SheetContent
                    className={`flex flex-col ${['bottom', 'top'].includes(side) && 'max-h-full'}`}
                    side={side}
                  >
                    {(title || description) && (
                      <SheetHeader>
                        {title && <SheetTitle>{title}</SheetTitle>}
                        {description && (
                          <SheetDescription>{description}</SheetDescription>
                        )}
                      </SheetHeader>
                    )}
                    <div className='flex-1 overflow-y-auto'>
                      {React.createElement(children, {
                        ...props,
                        block: children,
                      })}
                    </div>
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
