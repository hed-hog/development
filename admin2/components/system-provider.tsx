'use client';

import { createContext, useCallback, useContext, useState } from 'react';

interface UserData {
  [key: string]: any;
}

interface SystemContextProps {
  token: string | null;
  userData: UserData | null;
  login: (jwtToken: string) => void;
  forget: () => void;
  reset: () => void;
  loginWithMFA: (jwtToken: string) => void;
}

const SystemContext = createContext<SystemContextProps | undefined>(undefined);

type SystemProviderProps = {
  children: React.ReactNode;
};

export const SystemProvider = ({ children }: SystemProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

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
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Erro ao decodificar o token JWT:', error);
      return null;
    }
  };

  const login = useCallback((jwtToken: string) => {
    const decoded = decodeToken(jwtToken);
    if (decoded) {
      setToken(jwtToken);
      setUserData(decoded);
      // Você pode adicionar outras lógicas de login aqui
    }
  }, []);

  const forget = useCallback(() => {
    // Lógica para "esquecer" o login, limpando o state
    setToken(null);
    setUserData(null);
  }, []);

  const reset = useCallback(() => {
    // Lógica para resetar os dados do usuário sem remover o token (se necessário)
    setUserData(null);
  }, []);

  const loginWithMFA = useCallback((jwtToken: string) => {
    // Lógica específica para login com MFA, se necessário
    const decoded = decodeToken(jwtToken);
    if (decoded) {
      setToken(jwtToken);
      setUserData(decoded);
      // Você pode adicionar passos adicionais para MFA aqui
    }
  }, []);

  return (
    <SystemContext.Provider
      value={{ token, userData, login, forget, reset, loginWithMFA }}
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
