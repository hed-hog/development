import { bodies, defaults, PaymentApprovedType } from "./templates";

const getBodyWrapper = (content: string[]) => {
  return defaults.default_body(content)
}

// auth/login
export const getPaymentConfirmedEmail = (data: PaymentApprovedType) => {
  const body = bodies['payment_approved']
  const content = [defaults.header('Pagamento aprovado'), body(data), defaults.footer()]
  return getBodyWrapper(content);
}
