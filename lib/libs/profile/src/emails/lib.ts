import { bodies, defaults } from "./templates";

const getBodyWrapper = (content: string[]) => {
  return defaults.default_body(content)
}

// profile/signup
export const getCreateUserEmail = (userName: string) => {
  const body = bodies['user_create'];
  const content = [defaults.header(`Bem-vindo ao CoinBitClub ${userName}!`), body(), defaults.footer()]
  return getBodyWrapper(content);
}

// profile/update
export const getUpdateUserEmail = () => {
  const body = bodies['user_update'];
  const content = [defaults.header(`Seu perfil foi atualizado`), body(), defaults.footer()]
  return getBodyWrapper(content);
}

// profile/close-account
export const getCloseAccountEmail = () => {
  const body = bodies['user_close_account'];
  const content = [defaults.header('Conta excluída'), body(), defaults.footer()]
  return getBodyWrapper(content);
}
