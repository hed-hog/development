export const defaults = {
  header: (title: string) => `
    <div style="text-align: center; margin-bottom: 30px;">
      <img style="margin-bottom: 16px" src="https://coinbitclub.vip/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcoinbitclub-logo.b29de722.png&w=640&q=75" alt="Coinbitclub Logo" />
      <h1 style="color: #2c3e50; font-size: 26px; margin: 0;">${title}</h1>
    </div>
  `,
  default_body: (content: string[]) => `<body style="font-family: Arial, sans-serif; background-color: #eef2f7; color: #333; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border: 1px solid #dcdfe6; border-radius: 10px; padding: 40px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);">
        ${content.join("")}
      </div>
    </body>`,
  footer: () => `
    <div style="text-align: center; font-size: 13px; color: #95a5a6; margin-top: 40px; border-top: 1px solid #ecf0f1; padding-top: 20px;">
      <p>Este email foi enviado automaticamente. Por favor, não responda.</p>
    </div>
  `
}

export type PaymentApprovedType = {
  name: string;
  price: number;
  method: 'pix' | 'credit-card';
  brand?: string;
}

export const bodies = {
  payment_approved: (data: PaymentApprovedType) => {
    const priceFormatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    const methodFormatter = data.method === 'pix' ? 'Pix' : 'Cartão de crédito'
    return `
    <div style="line-height: 1.8; font-size: 16px; color: #555; text-align: justify;">
      <p>Seu pagamento foi aprovado com sucesso. Confira os detalhes abaixo:</p>

      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr style="background-color: #f8f9fa;">
          <th style="border: 1px solid #dcdfe6; padding: 10px; text-align: left;">Produto</th>
          <th style="border: 1px solid #dcdfe6; padding: 10px; text-align: left;">Valor Cobrado</th>
          <th style="border: 1px solid #dcdfe6; padding: 10px; text-align: left;">Método de Pagamento</th>
          ${data.method !== 'pix' ? `<th style="border: 1px solid #dcdfe6; padding: 10px; text-align: left;">Bandeira</th>` : ''}
        </tr>
        <tr>
          <td style="border: 1px solid #dcdfe6; padding: 10px;">${data.name}</td>
          <td style="border: 1px solid #dcdfe6; padding: 10px;">${priceFormatter.format(data.price)}</td>
          <td style="border: 1px solid #dcdfe6; padding: 10px;">${methodFormatter}</td>
          ${data.method !== 'pix' ? `<td style="border: 1px solid #dcdfe6; padding: 10px;">${data.brand}</td>` : ''}
        </tr>
      </table>

      <p>Se você tiver qualquer dúvida, entre em contato conosco.</p>
    </div>
  `
  },
}
