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

export type PaymentApprovedType = {
  planName: string;
  linkMySubscriptions: string;
};

export const bodies = {
  subscription_created: (data: PaymentApprovedType) => {
    return `
      <p>Sua assinatura do plano ${data.planName} foi criada e já está disponível.</p>

      <p>Para mais informações, acesse <a href="${data.linkMySubscriptions}">Minhas Assinaturas</a>.</p>      

      <p>Se você não reconhece essa ação, entre em contato conosco imediatamente para garantir a segurança de sua conta.</p>
  `;
  },
  subscription_canceled: (data: PaymentApprovedType) => {
    return `
      <p>Sua assinatura do plano ${data.planName} foi cancelada.</p>

      <p>Para mais informações, acesse <a href="${data.linkMySubscriptions}">Minhas Assinaturas</a>.</p>      

      <p>Se você não reconhece essa ação, entre em contato conosco imediatamente para garantir a segurança de sua conta.</p>
  `;
  },
};
