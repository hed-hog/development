import { useSystem } from '@/components/system-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'; // Assuming this is the correct import path for Input OTP
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

export default function Page() {
  const FormSchema = z.object({
    code: z.string().length(6, 'O código deve ter 6 dígitos'),
  });
  const { login } = useSystem();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      code: '',
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log('onSubmit', values);
  }
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
                Utilize o código MFA enviado para o seu e-mail para acessar
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
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

                <div className="space-y-2 text-center">
                  <Label htmlFor="otp" className="font-bold">
                    Código MFA
                  </Label>
                  <div className="flex items-center justify-center space-x-2">
                    <InputOTP maxLength={6}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Entrar
                </Button>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  Ao continuar, você concorda com os Termos de Uso e a Política
                  de Privacidade.
                </p>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
