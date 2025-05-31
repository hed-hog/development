'use client';

import PasswordField from '@/components/field/password-field';
import { useSystem } from '@/components/provider/system-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  if (!searchParams.get('code')) {
    window.location.href = '/login';
    return null;
  }

  const FormSchema = z.object({
    newPassword: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    confirmNewPassword: z
      .string()
      .min(6, 'A confirmação de senha deve ter pelo menos 6 caracteres'),
  });
  const { reset } = useSystem();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log('onSubmit', values);

    const code = searchParams.get('code');
    reset(values.newPassword, values.confirmNewPassword, String(code))
      .then(() => {
        console.log('Senha redefinida com sucesso');
        router.push('/');
      })
      .catch((error) => {
        form.setError('root', {
          type: 'manual',
          message:
            error?.response?.data?.message || 'Erro ao redefinir a senha',
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
              <h1 className="text-2xl font-bold">Redefinir senha</h1>
              <p className="text-sm text-muted-foreground">
                Informe sua nova senha e confirme para redefinir.
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

                <div className="space-y-2 mt-4">
                  <Label htmlFor="new-password">Nova senha</Label>
                  <PasswordField
                    id="new-password"
                    placeholder="Digite sua nova senha"
                    autoFocus
                    {...form.register('newPassword', {
                      required: 'A nova senha é obrigatória',
                    })}
                    autoComplete="new-password"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar nova senha</Label>
                  <PasswordField
                    id="confirm-password"
                    placeholder="Confirme sua nova senha"
                    {...form.register('confirmNewPassword', {
                      required: 'A confirmação de senha é obrigatória',
                      validate: (value) =>
                        value === form.getValues('newPassword') ||
                        'As senhas não coincidem',
                    })}
                    autoComplete="new-password"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                  />
                </div>

                {form.formState.errors.root && (
                  <div className="mb-4 rounded bg-red-100 p-2">
                    <p className="text-sm text-red-600">
                      {form.formState.errors.root.message}
                    </p>
                  </div>
                )}

                <Button type="submit" className="w-full">
                  Redefinir senha
                </Button>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  Sua senha será redefinida após a confirmação.
                </p>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
