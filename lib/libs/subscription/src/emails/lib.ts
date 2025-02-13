import { bodies, defaults, PaymentApprovedType } from './templates';

const getBodyWrapper = (content: string[]) => {
  return defaults.default_body(content);
};

export const getSubscriptionCreatedEmail = (data: PaymentApprovedType) => {
  const body = bodies['subscription_created'];
  const content = [
    defaults.header('Assinatura Criada'),
    body(data),
    defaults.footer(),
  ];
  return getBodyWrapper(content);
};

export const getSubscriptionCanceledEmail = (data: PaymentApprovedType) => {
  const body = bodies['subscription_canceled'];
  const content = [
    defaults.header('Assinatura Cancelada'),
    body(data),
    defaults.footer(),
  ];
  return getBodyWrapper(content);
};
