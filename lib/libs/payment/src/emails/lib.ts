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

/*
 console.log(
  getPaymentConfirmedEmail({
    items: [
      {
        name: 'Assinatura CoinBitClub',
        quantity: 2,
        unitPrice: 990,
        method: 'pix',
        price: 1800,
      },
      {
        name: 'Investimentos',
        quantity: 1,
        unitPrice: 990,
        method: 'credit-card',
        price: 1800,
      },
    ],
    discount: 9,
    total: 1290,
  })
);
 */
