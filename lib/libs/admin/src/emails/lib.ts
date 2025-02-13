import { bodies, defaults, UserCreateEmailType } from './templates';

const getBodyWrapper = (content: string[]) => {
  return defaults.default_body(content);
};

// auth/login
export const getUserLoginEmail = () => {
  const body = bodies['user_login'];
  const content = [
    defaults.header('Novo login no CoinBitClub'),
    body(),
    defaults.footer(),
  ];
  return getBodyWrapper(content);
};

// auth/forget
export const getForgetPasswordEmail = (url: string) => {
  const body = bodies['user_forget_password'];
  const content = [
    defaults.header('Recuperação de senha'),
    body(url),
    defaults.footer(),
  ];
  return getBodyWrapper(content);
};

// auth/change-password
export const getChangePasswordEmail = () => {
  const body = bodies['user_change_password'];
  const content = [
    defaults.header('Senha alterada'),
    body(),
    defaults.footer(),
  ];
  return getBodyWrapper(content);
};

// auth/change-email
export const getChangeEmailEmail = () => {
  const body = bodies['user_change_email'];
  const content = [
    defaults.header('Email alterado'),
    body(),
    defaults.footer(),
  ];
  return getBodyWrapper(content);
};

// auth/reset
export const getResetPasswordEmail = () => {
  const body = bodies['user_reset_password'];
  const content = [
    defaults.header('Senha recuperada'),
    body(),
    defaults.footer(),
  ];
  return getBodyWrapper(content);
};

export const getCreateUserEmail = (data: UserCreateEmailType) => {
  const body = bodies['user_create'];
  const content = [
    defaults.header('Conta criada'),
    body(data),
    defaults.footer(),
  ];
  return getBodyWrapper(content);
};
