'use client';

import PasswordField from '@/components/password-field';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconSettingsUp } from '@tabler/icons-react';
import { useState } from 'react';
import { Form, FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

const FormSchema = z.object({
  appName: z.string().min(1, 'O nome da aplicação é obrigatório.'),
  primaryColor: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, 'Cor inválida.'),
  logoIcon: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || ['image/png', 'image/svg+xml'].includes(file.type),
      'O ícone do logo deve ser um arquivo PNG ou SVG.',
    ),
  logoFull: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || ['image/png', 'image/svg+xml'].includes(file.type),
      'O logotipo completo deve ser um arquivo PNG ou SVG.',
    ),
  language: z
    .array(z.enum(['pt-BR', 'en-US', 'es-ES', 'fr-FR', 'de-DE']))
    .min(1, 'Pelo menos um idioma deve ser selecionado.'),
  modules: z
    .array(
      z.object({
        id: z.string(),
        label: z.string(),
        description: z.string(),
      }),
    )
    .optional(),
  selectedModules: z.array(z.string()).optional(),
  rootEmail: z.string().email('E-mail inválido.'),
  rootPassword: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
});

export default function SetupWizard() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      appName: '',
      primaryColor: '#FF760C',
      logoIcon: undefined,
      logoFull: undefined,
      language: [],
      modules: [],
    },
  });
  const [appName, setAppName] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#FF760C');
  const [logoIcon, setLogoIcon] = useState<File | null>(null);
  const [logoFull, setLogoFull] = useState<File | null>(null);
  const [modules, setModules] = useState([
    { id: 'module-1', label: 'Módulo 1', description: 'Descrição do módulo 1' },
    { id: 'module-2', label: 'Módulo 2', description: 'Descrição do módulo 2' },
    { id: 'module-3', label: 'Módulo 3', description: 'Descrição do módulo 3' },
  ]);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 text-foreground flex items-center justify-center p-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-start">
          <div className="text-center md:text-left">
            <div className="md:fixed md:top-0 mt-4 md:h-full md:w-1/2 flex items-center justify-center md:justify-start">
              <div className="pr-10">
                <img
                  src="/logo.svg"
                  alt="HedHog Logo"
                  className="w-full md:w-32 h-16 mb-4"
                />
                <h1 className="text-4xl font-bold text-white mb-4 text-shadow-lg">
                  Bem-vindo ao HedHog!
                </h1>
                <p className="text-lg text-white/90 text-shadow-lg">
                  Configure os primeiros detalhes do seu sistema para começar.
                </p>
              </div>
            </div>
          </div>
          <FormProvider {...form}>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
              >
                <Card className="w-full shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">
                      Configuração Inicial
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Preencha as informações abaixo para continuar.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="appName">Nome da Aplicação</Label>
                      <Input
                        id="appName"
                        placeholder="Ex: HedHog Class"
                        value={appName}
                        onChange={(e) => setAppName(e.target.value)}
                        autoFocus
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="primaryColor">Cor Primária</Label>
                      <Input
                        id="primaryColor"
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="h-10 w-24 p-0 border-none bg-transparent"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="logoIcon">
                        Ícone do Logo{' '}
                        <span className="text-gray-500">
                          (SVG ou PNG de 512x512 recomendado)
                        </span>
                      </Label>
                      <Input
                        id="logoIcon"
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setLogoIcon(e.target.files?.[0] ?? null)
                        }
                      />

                      {logoIcon && (
                        <p className="text-xs text-muted-foreground">
                          Selecionado: {logoIcon.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="logoFull">
                        Logotipo Completo{' '}
                        <span className="text-gray-500">
                          (SVG ou PNG de 1280x512 recomendado)
                        </span>
                      </Label>
                      <Input
                        id="logoFull"
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setLogoFull(e.target.files?.[0] ?? null)
                        }
                      />
                      {logoFull && (
                        <p className="text-xs text-muted-foreground">
                          Selecionado: {logoFull.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Idioma do Sistema</Label>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="language-pt-BR" />
                          <Label htmlFor="language-pt-BR" className="text-sm">
                            Português (Brasil)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="language-en-US" />
                          <Label htmlFor="language-en-US" className="text-sm">
                            Inglês (EUA)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="language-es-ES" />
                          <Label htmlFor="language-es-ES" className="text-sm">
                            Espanhol (Espanha)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="language-fr-FR" />
                          <Label htmlFor="language-fr-FR" className="text-sm">
                            Francês (França)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="language-de-DE" />
                          <Label htmlFor="language-de-DE" className="text-sm">
                            Alemão (Alemanha)
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-lg font-semibold">
                        Módulos Disponíveis
                      </Label>
                      <div className="space-y-3">
                        {modules.map((module) => (
                          <FormField
                            key={module.id}
                            control={form.control}
                            name={`module_${module.id}`}
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">
                                    {module.label}
                                  </FormLabel>
                                  <FormDescription>
                                    {module.description}
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={(checked) => {
                                      field.onChange(checked);
                                      setSelectedModules((prev) =>
                                        checked
                                          ? [...prev, module.id]
                                          : prev.filter(
                                              (id) => id !== module.id,
                                            ),
                                      );
                                    }}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-lg font-semibold">
                        Usuário Root
                      </Label>
                      <div className="space-y-2">
                        <Label htmlFor="rootEmail">E-mail</Label>
                        <Input
                          id="rootEmail"
                          type="email"
                          placeholder="exemplo@dominio.com"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rootPassword">Senha</Label>
                        <PasswordField
                          id="rootPassword"
                          placeholder="Digite uma senha segura"
                          required
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full mt-4 flex gap-2">
                      <IconSettingsUp className="h-4 w-4" /> Configurar HedHog
                    </Button>
                  </CardContent>
                </Card>
              </form>
            </Form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
