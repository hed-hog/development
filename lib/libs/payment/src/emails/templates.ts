export const defaults = {
  header: (title: string) => `
    <div style="text-align: center; margin-bottom: 30px;">
      <img style="margin-bottom: 16px" src="https://coinbitclub.vip/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcoinbitclub-logo.b29de722.png&w=640&q=75" alt="Coinbitclub Logo" />
      <h1 style="color: #2c3e50; font-size: 26px; margin: 0;">${title}</h1>
    </div>
  `,
  default_body: (
    content: string[],
  ) => `<body style="font-family: Arial, sans-serif; background-color: #eef2f7; color: #333; margin: 0; padding: 1px;">
      <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border: 1px solid #dcdfe6; border-radius: 10px; padding: 40px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);">
        ${content.join('')}
      </div>
    </body>`,
  footer: () => `
    <div style="text-align: center; font-size: 13px; color: #95a5a6; margin-top: 40px; border-top: 1px solid #ecf0f1; padding-top: 20px;">
      <p>Este email foi enviado automaticamente. Por favor, não responda.</p>
    </div>
  `,
};

export type PaymentItemType = {
  quantity: number;
  name: string;
  price: number;
  unitPrice: number;
};

export type PaymentApprovedType = {
  items: PaymentItemType[];
  total: number;
  discount: number;
  message: string;
  title: string;
  method: 'pix' | 'credit-card';
};

export const bodies = {
  payment: (data: PaymentApprovedType) => {
    const formatCurrency = (value: number) =>
      value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });

    return `
      <p style="margin-bottom: 30px;">${data.message}</p>

      <p>Detalhes do pagamento com ${data.method === 'pix' ? 'Pix' : 'Cartão de Crédito'}.</p>

      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <th style="background-color: #f2f2f2; padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Qtd</th>
          <th style="background-color: #f2f2f2; padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Descrição
          </th>
          <th style="background-color: #f2f2f2; padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Preço
            Unitário</th>
          <th style="background-color: #f2f2f2; padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Preço</th>
        </tr>
        ${data.items
          .map((item) => {
            return `
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.quantity}x</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${formatCurrency(item.unitPrice)}</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${formatCurrency(item.price)}</td>
            </tr>
          `;
          })
          .join('')}
        <tr>
          <td style="padding: 8px;"></td>
          <td style="padding: 8px;"></td>
          <td style="padding: 8px;"></td>
          <td style="padding: 8px; text-align: right; font-weight: bold;">Desconto</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${formatCurrency(data.discount)}</td>
        </tr>
        <tr>
          <td style="padding: 8px;"></td>
          <td style="padding: 8px;"></td>
          <td style="padding: 8px;"></td>
          <td style="padding: 8px; text-align: right; font-weight: bold;">Total</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">${formatCurrency(data.total)}</td>
        </tr>
      </table>

      <p>Se você não reconhece essa ação, entre em contato conosco imediatamente para garantir a segurança de sua conta.</p>
  `;
  },
};
