import PasswordField from '@/components/password-field';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function LoginPage() {
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
              <h1 className="text-2xl font-bold">Acessar plataforma</h1>
              <p className="text-sm text-muted-foreground">
                Utilize seu e-mail e senha para acessar
              </p>
            </div>

            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@exemplo.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <PasswordField />
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember">Lembrar-me</Label>
                </div>
                <Link href="/forget" className="text-primary hover:underline">
                  Esqueci minha senha
                </Link>
              </div>

              <Button type="submit" className="w-full">
                Entrar
              </Button>

              <p className="text-xs text-center text-muted-foreground mt-4">
                Ao continuar, você concorda com os Termos de Uso e a Política de
                Privacidade.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
