import PasswordField from '@/components/password-field';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Imagem lateral visível somente em md+ */}
      <div className="hidden md:flex md:w-1/2 bg-muted items-center justify-center relative">
        <img
          src="/bg-login.jpg"
          alt="Imagem institucional"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Área de formulário */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-6">
        <Card className="w-full max-w-md shadow-none border-none">
          <CardContent className="space-y-6 p-0">
            <div className="mb-6 text-center">
              <img
                src="/logo.svg"
                alt="Logo da Hcode"
                className="mx-auto h-12 mb-4"
              />
              <h1 className="text-2xl font-bold">Redefinir senha</h1>
              <p className="text-sm text-muted-foreground">
                Informe sua nova senha e confirme para redefinir.
              </p>
            </div>

            <form className="space-y-4">
              <div className="flex items-center space-x-4 bg-primary/5 p-4 rounded-lg">
                <img
                  src="https://ui.shadcn.com/avatars/shadcn.jpg"
                  alt="Foto do Usuário"
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div>
                  <p className="text-lg font-bold">Nome do Usuário</p>
                  <p className="text-sm text-muted-foreground">
                    usuario@exemplo.com
                  </p>
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <Label htmlFor="new-password">Nova senha</Label>
                <PasswordField
                  id="new-password"
                  placeholder="Digite sua nova senha"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar nova senha</Label>
                <PasswordField
                  id="confirm-password"
                  placeholder="Confirme sua nova senha"
                />
              </div>

              <Button type="submit" className="w-full">
                Redefinir senha
              </Button>

              <p className="text-xs text-center text-muted-foreground mt-4">
                Sua senha será redefinida após a confirmação.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
