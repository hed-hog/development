export const getBody = (url: string): string => {
  return `
        <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #ddd; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                <div style="text-align: center; margin-bottom: 20px;">
                        <h1 style="color: #555;">Recuperação de Senha</h1>
                </div>
                <div style="line-height: 1.6; text-align: center;">
                        <p>Olá,</p>
                        <p>Recebemos uma solicitação para redefinir sua senha. Caso não tenha solicitado essa alteração, ignore este email.</p>
                        <p>Para redefinir sua senha, clique no botão abaixo:</p>
                        <a href="${url}" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 4px; font-size: 16px;">Redefinir Senha</a>
                </div>
                <div style="text-align: center; font-size: 12px; color: #999; margin-top: 20px;">
                        <p>Este email foi enviado automaticamente. Por favor, não responda.</p>
                </div>
        </div>`
}
