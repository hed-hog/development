'use client';

import { MenuItem } from '@/types/menu-item';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import { useRouter } from 'next/navigation';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

interface ResponseToken {
  token: string;
  mfa: boolean;
}

interface UserData {
  [key: string]: any;
}

interface SystemContextProps {
  token: string | null;
  userData: UserData | null;
  login: (
    email: string,
    password: string,
  ) => Promise<ResponseToken | undefined>;
  forget: (email: string) => Promise<void>;
  reset: (
    newPassword: string,
    confirmNewPassword: string,
    code: string,
  ) => Promise<ResponseToken>;
  loginWithMFA: (code: string) => Promise<ResponseToken>;
  request: <T extends {}>(config?: AxiosRequestConfig) => Promise<T>;
  logout: () => void;
  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<ResponseToken>;
  menu: MenuItem[] | undefined;
  error: Error | null;
}

const SystemContext = createContext<SystemContextProps | undefined>(undefined);

type SystemProviderProps = {
  children: React.ReactNode;
};

export const SystemProvider = ({ children }: SystemProviderProps) => {
  const [error, setError] = useState<Error | null>(null);
  const [tempToken, setTempToken] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [language, setLanguage] = useState<string>('en');
  const router = useRouter();

  const { data: menu } = useQuery<MenuItem[]>({
    queryKey: ['menu-system', language],
    queryFn: () =>
      request({
        url: `/menu/system`,
      }),
    enabled: token !== null,
  });

  const decodeToken = (jwtToken: string): UserData | null => {
    try {
      const parts = jwtToken.split('.');
      if (parts.length !== 3) {
        throw new Error('Token inválido');
      }
      const base64Url = parts[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join(''),
      );
      return JSON.parse(jsonPayload)?.user;
    } catch (error) {
      console.error('Erro ao decodificar o token JWT:', error);
      return null;
    }
  };

  const setSuccessLogin = useCallback((data: ResponseToken) => {
    const jwtToken = data.token;
    const decoded = decodeToken(jwtToken);

    if (decoded) {
      setToken(jwtToken);
      setUserData(decoded);
    } else {
      console.error('Token inválido ou não decodificável');
    }
    return data;
  }, []);

  const login = useCallback((email: string, password: string) => {
    return request<ResponseToken>({
      method: 'POST',
      url: '/auth/login',
      data: { email, password },
    }).then((data) => {
      if (data.mfa) {
        setTempToken(data.token);
        router.push('/mfa');
        return data;
      } else if (data.token) {
        return setSuccessLogin(data);
      }
    });
  }, []);

  const forget = useCallback((email: string) => {
    return request({
      method: 'POST',
      url: '/auth/forget',
      data: { email },
    }).then(() => {});
  }, []);

  const register = useCallback(
    (name: string, email: string, password: string) => {
      return request<ResponseToken>({
        method: 'POST',
        url: '/auth/register',
        data: {
          name,
          email,
          password,
        },
      }).then((data) => setSuccessLogin(data));
    },
    [],
  );

  const reset = useCallback(
    (newPassword: string, confirmNewPassword: string, code: string) => {
      return request<ResponseToken>({
        method: 'POST',
        url: '/auth/reset',
        data: { newPassword, confirmNewPassword, code },
      }).then((data) => setSuccessLogin(data));
    },
    [],
  );

  const loginWithMFA = useCallback(
    (code: string) => {
      return request<ResponseToken>({
        method: 'POST',
        url: '/auth/login-code',
        data: { token: tempToken, code },
      }).then((data) => setSuccessLogin(data));
    },
    [tempToken],
  );

  const logout = useCallback(() => {
    setToken(null);
    setUserData(null);
    setTempToken(null);
    try {
      localStorage.removeItem('authData');
    } catch (error) {
      console.error('Falha ao remover os dados de autenticação:', error);
    }
  }, []);

  const request = <T extends {}>(config?: AxiosRequestConfig) => {
    try {
      const axiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      axiosInstance.interceptors.request.use(
        (config) => {
          config.headers = config.headers || {};
          if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
          }
          config.headers['language'] = language;
          console.log('Intercepted request:', config);
          return config;
        },
        (error) => {
          return Promise.reject(error);
        },
      );

      axiosInstance.interceptors.response.use(
        (response) => {
          console.log('Intercepted response:', response);

          setError(null);

          return response;
        },
        (error) => {
          setError(error?.response?.data || error?.message || error);

          console.error('Response error intercepted:', error);
          return Promise.reject(error);
        },
      );

      return axiosInstance
        .request<T>(config ?? {})
        .then((response) => response.data);
    } catch (error: any) {
      setError(error?.message || error);
      return Promise.reject(error);
    }
  };

  useEffect(() => {
    if (token && userData) {
      try {
        localStorage.setItem('authData', JSON.stringify({ token, userData }));
      } catch (error) {
        console.error('Falha ao armazenar os dados de autenticação:', error);
      }
    }
  }, [token, userData]);

  useEffect(() => {
    const storedData = localStorage.getItem('authData');
    if (storedData) {
      try {
        const { token: storedToken, userData: storedUserData } =
          JSON.parse(storedData);
        if (storedToken) {
          setToken(storedToken);
        }
        if (storedUserData) {
          setUserData(storedUserData);
        }
      } catch (error) {
        console.error('Falha ao recuperar os dados de autenticação:', error);
      }
    }
  }, []);

  useEffect(() => {
    console.log({ menu });
  }, [menu]);

  return (
    <SystemContext.Provider
      value={{
        token,
        userData,
        login,
        forget,
        reset,
        loginWithMFA,
        request,
        logout,
        register,
        menu,
        error,
      }}
    >
      {children}
    </SystemContext.Provider>
  );
};

export const useSystem = (): SystemContextProps => {
  const context = useContext(SystemContext);
  if (context === undefined) {
    throw new Error('useSystem deve ser usado dentro de um SystemProvider');
  }
  return context;
};
