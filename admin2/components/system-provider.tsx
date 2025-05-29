'use client';

import axios, { AxiosRequestConfig } from 'axios';
import { createContext, useCallback, useContext, useState } from 'react';

interface ResponseToken {
  token: string;
}

interface UserData {
  [key: string]: any;
}

interface SystemContextProps {
  token: string | null;
  userData: UserData | null;
  login: (email: string, password: string) => Promise<ResponseToken>;
  forget: (email: string) => Promise<void>;
  reset: (
    newPassword: string,
    confirmNewPassword: string,
    code: string,
  ) => Promise<ResponseToken>;
  loginWithMFA: (token: string, code: string) => Promise<ResponseToken>;
  request: <T extends {}>(config?: AxiosRequestConfig) => Promise<T>;
}

const SystemContext = createContext<SystemContextProps | undefined>(undefined);

type SystemProviderProps = {
  children: React.ReactNode;
};

export const SystemProvider = ({ children }: SystemProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [language, setLanguage] = useState<string>('en');

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

  const login = useCallback((email: string, password: string) => {
    return request<ResponseToken>({
      method: 'POST',
      url: '/auth/login',
      data: { email, password },
    }).then((data) => {
      const jwtToken = data.token;
      const decoded = decodeToken(jwtToken);

      if (decoded) {
        setToken(jwtToken);
        setUserData(decoded);
      } else {
        console.error('Token inválido ou não decodificável');
      }
      return data;
    });
  }, []);

  const forget = useCallback((email: string) => {
    return request({
      method: 'POST',
      url: '/auth/forget',
      data: { email },
    }).then(() => {});
  }, []);

  const reset = useCallback(
    (newPassword: string, confirmNewPassword: string, code: string) => {
      return request<ResponseToken>({
        method: 'POST',
        url: '/auth/reset',
        data: { newPassword, confirmNewPassword, code },
      }).then((data) => data);
    },
    [],
  );

  const loginWithMFA = useCallback((token: string, code: string) => {
    return request<ResponseToken>({
      method: 'POST',
      url: '/auth/login-code',
      data: { token, code },
    }).then((data) => {
      const jwtToken = data.token;
      const decoded = decodeToken(jwtToken);

      if (decoded) {
        setToken(jwtToken);
        setUserData(decoded);
      } else {
        console.error('Token inválido ou não decodificável');
      }
      return data;
    });
  }, []);

  const request = <T extends {}>(config?: AxiosRequestConfig) => {
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
        return response;
      },
      (error) => {
        console.error('Response error intercepted:', error);
        return Promise.reject(error);
      },
    );

    return axiosInstance
      .request<T>(config ?? {})
      .then((response) => response.data);
  };

  return (
    <SystemContext.Provider
      value={{ token, userData, login, forget, reset, loginWithMFA, request }}
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
