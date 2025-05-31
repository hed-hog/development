'use client';

import { useSystem } from '@/components/provider/system-provider';
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
  const { loginWithMFA } = useSystem();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      code: '',
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log('onSubmit', values);
    loginWithMFA(values.code)
      .then(() => {
        // Redirecionar ou mostrar mensagem de sucesso
        console.log('Login com MFA bem-sucedido');
      })
      .catch((error) => {
        form.setError('code', {
          type: 'manual',
          message:
            error?.response?.data?.message || 'Erro ao fazer login com MFA',
        });
      });
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
                <div className="space-y-2 text-center">
                  <Label htmlFor="otp" className="font-bold">
                    Código MFA
                  </Label>
                  <div className="flex items-center justify-center space-x-2">
                    <InputOTP maxLength={6} {...form.register('code')}>
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

                {form.formState.errors.code && (
                  <div className="mb-4 rounded bg-red-100 p-2">
                    <p className="text-sm text-red-600">
                      {form.formState.errors.code.message}
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  loading={form.formState.isSubmitting}
                >
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
