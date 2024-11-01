import { Button, ButtonProps } from '@/components/ui/button'
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useDialog } from '@/hooks/use-dialog'
import useLocalStorage, { LocalStorageKeys } from '@/hooks/use-local-storage'
import { useSheet } from '@/hooks/use-sheet'
import { DialogType, OpenDialogType } from '@/types/dialog'
import { OpenSheetType, SheetType } from '@/types/sheet'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import React, {
  createContext,
  Fragment,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import { toast, Toaster } from 'sonner'
import { useMediaQuery } from 'usehooks-ts'
import { decodeToken } from './decode-token'
import { getBaseURL } from './get-base-url'
import { QueryClientProvider } from './query-provider'

export const BASE_URL = getBaseURL()

export type AppConfirmDialogType = {
  title?: string
  description?: string
  cancelButton?: ButtonProps & { text: string }
  okButton?: ButtonProps & { text: string }
}

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
  showToastHandler: (
    type: 'success' | 'error',
    name: string,
    action: string,
    error?: any
  ) => void
  confirm: (props: AppConfirmDialogType) => Promise<void>
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
  showToastHandler: () => {},
  confirm: () => new Promise(() => {}),
})

type RequestLoginType = {
  token: string
}

export type AppProviderProps = {
  children: ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const { t } = useTranslation(['module', 'success', 'error'])
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

  const confirm = useCallback(
    ({ title, description, okButton, cancelButton }: AppConfirmDialogType) => {
      return new Promise<void>((resolve, reject) => {
        const id = openDialog({
          title,
          description,
          buttons: [
            cancelButton ?? {
              text: t('cancel', { ns: 'actions' }),
              variant: 'secondary',
              onClick: () => {
                closeDialog(id)
                reject()
              },
            },
            okButton ?? {
              text: t('ok', { ns: 'actions' }),
              variant: 'default',
              onClick: () => {
                closeDialog(id)
                resolve()
              },
            },
          ],
        })
      })
    },
    []
  )

  const handleError = (error: any) => {
    switch (error.code) {
      case 'ERR_NETWORK':
        toast.error('Network error')
        break
      default:
        toast.error(
          error?.response?.data?.message ??
            error?.message ??
            'An error occurred'
        )
    }
  }

  const request = useCallback(
    <T extends {}>(config?: AxiosRequestConfig) => {
      const instance = axios.create({ baseURL: BASE_URL })

      instance.interceptors.request.use(
        (cnf) => {
          if (token) {
            cnf.headers['Authorization'] = `Bearer ${token}`
          }

          cnf.headers['Accept-Language'] =
            localStorage.getItem('i18nextLng') ?? 'en'
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
          toast.error('Token expired')
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
          toast.success('Login successful')
        }

        resolve()
      } catch (error) {
        toast.error('Login failed')
        reject()
      }
    })
  }

  const showToastHandler = (
    type: 'success' | 'error',
    name: string,
    action: string,
    error: any = null
  ) => {
    switch (type) {
      case 'success':
        return toast.success(
          `${t(name, { ns: 'module' })} ${t(action, { ns: 'success' })}`
        )
      case 'error':
        toast.error(
          `${t(action, { ns: 'error' })} ${t(name, { ns: 'module' })}` +
            error.message
        )
    }
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
          showToastHandler,
          confirm,
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
                        {children && (
                          <div
                            key={`${id}-body`}
                            className='mt-8 flex flex-1 overflow-y-auto'
                          >
                            {React.createElement(children, {
                              ...props,
                              block: children,
                            })}
                          </div>
                        )}
                        {!children && (
                          <div key={`${id}-space`} className='h-4' />
                        )}
                        <DialogFooter className='gap-1 sm:justify-end'>
                          {(buttons ?? []).map(({ text, ...props }, index) => (
                            <Button
                              key={`${id}-footer-btn-${index}`}
                              {...props}
                            >
                              {text}
                            </Button>
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
                        {children && (
                          <div key={`${id}-body`} className='px-4'>
                            {React.createElement(children, {
                              ...props,
                              block: children,
                            })}
                          </div>
                        )}
                        {!children && (
                          <div key={`${id}-space`} className='h-4' />
                        )}
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
                    className={`flex flex-col ${['bottom', 'top'].includes(side ?? '') && 'max-h-full'}`}
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
                    {children && (
                      <div
                        key={`${id}-body`}
                        className='mt-8 flex flex-1 overflow-y-auto'
                      >
                        {React.createElement(children, {
                          ...props,
                          block: children,
                        })}
                      </div>
                    )}
                    {!children && <div key={`${id}-space`} className='h-4' />}
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
