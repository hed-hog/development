'use client';

import { useSystem } from '@/components/provider/system-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import z from 'zod';

export default function Page() {
  const FormSchema = z.object({
    email: z.string().email('E-mail inválido'),
  });
  const { forget } = useSystem();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: 'root@hedhog.com',
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log('onSubmit', values);
    forget(values.email)
      .then(() => {
        // Redirecionar ou mostrar mensagem de sucesso
        console.log('Instruções de recuperação enviadas');
      })
      .catch((error) => {
        form.setError('root', {
          type: 'manual',
          message:
            error?.response?.data?.message ||
            'Erro ao enviar instruções de recuperação',
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
              <h1 className="text-2xl font-bold">Recuperar senha</h1>
              <p className="text-sm text-muted-foreground">
                Informe seu e-mail para receber as instruções de recuperação de
                senha ou{' '}
                <Link href="/login" className="underline hover:text-primary">
                  volte para o login
                </Link>
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@exemplo.com"
                    {...form.register('email')}
                  />
                </div>

                {form.formState.errors.code && (
                  <div className="mb-4 rounded bg-red-100 p-2">
                    <p className="text-sm text-red-600">
                      {form.formState.errors.code.message}
                    </p>
                  </div>
                )}

                <Button type="submit" className="w-full">
                  Enviar
                </Button>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  Você receberá um e-mail com as instruções para redefinir sua
                  senha.
                </p>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
