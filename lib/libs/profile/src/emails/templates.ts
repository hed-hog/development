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

export const bodies = {
  user_create: () => `
    <div style="line-height: 1.8; font-size: 16px; color: #555; text-align: justify;">
      <p>Obrigado por se cadastrar em nosso sistema!</p>
      <p>Se você não fez essa solicitação, entre em contato conosco imediatamente para garantir a segurança de sua conta.</p>
    </div>
  `,
  user_close_account: () => `
    <div style="line-height: 1.8; font-size: 16px; color: #555; text-align: justify;">
      <p>Informamos que foi confirmada a exclusão da sua conta do sistema CoinBitClub. Vamos sentir sua falta!</p>
      <p>Se você não fez essa solicitação, entre em contato conosco imediatamente para garantir a segurança de sua conta.</p>
    </div>
  `,
  user_update: () => `
    <div style="line-height: 1.8; font-size: 16px; color: #555; text-align: justify;">
      <p>Recentemente seu perfil foi atualizado no CoinBitClub. Acesse a dashboard para ver seus dados.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://coinbitclub.vip/my-account?tab=personal-info" style="display: inline-block; padding: 15px 30px; background-color: #3498db; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);">Acessar Dashboard</a>
        </div>
      <p>Se você não fez essa solicitação, entre em contato conosco imediatamente para garantir a segurança de sua conta.</p>
    </div>
    `,
};
