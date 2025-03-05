import { bodies, defaults, PaymentApprovedType } from './templates';

const getBodyWrapper = (content: string[]) => {
  return defaults.default_body(content);
};

// auth/login
export const getPaymentEmail = (data: PaymentApprovedType) => {
  const body = bodies['payment'];
  const content = [defaults.header(data.title), body(data), defaults.footer()];
  return getBodyWrapper(content);
};
