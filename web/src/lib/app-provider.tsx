import { useToast } from '@/components/ui/use-toast'
import useLocalStorage, { LocalStorageKeys } from '@/hooks/use-local-storage'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { createContext, ReactNode, useCallback, useEffect } from 'react'
import { Toaster } from 'sonner'
import { decodeToken } from './decodeToken'
import { QueryClientProvider } from './query-provider'

const BASE_URL = 'http://localhost:3000'

type AppContextType = {
  logout: () => void
  login: (email: string, password: string) => Promise<void>
  user: any
  request: <T extends {}>(
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T, any>>
}

export const AppContext = createContext<AppContextType>({
  logout: () => {},
  login: () => Promise.resolve(),
  user: {},
  request: () => new Promise(() => {}),
})

type RequestLoginType = {
  token: string
}

export type AppProviderProps = {
  children: ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const { toast } = useToast()

  const [token, setToken] = useLocalStorage({
    defaultValue: '',
    key: LocalStorageKeys.Token,
  })
  const [user, setUser] = useLocalStorage({
    defaultValue: {},
    key: LocalStorageKeys.User,
  })

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
      <AppContext.Provider value={{ login, user, request, logout }}>
        <QueryClientProvider>{children}</QueryClientProvider>
        <Toaster richColors />
      </AppContext.Provider>
    </>
  )
}
