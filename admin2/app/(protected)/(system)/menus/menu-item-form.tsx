'use client';

import type React from 'react';

import { PlusCircle } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MenuItem } from './types';
import { AVAILABLE_ICONS, getIconByName } from './utils';

interface MenuItemFormProps {
  item: MenuItem;
  onUpdate: (item: MenuItem) => void;
  onAddChild: (parentId: string) => void;
}

type ScreenTemplate = 'blank' | 'table' | 'list' | 'gridlist' | 'grid';

export function MenuItemForm({
  item,
  onUpdate,
  onAddChild,
}: MenuItemFormProps) {
  const [formData, setFormData] = useState<MenuItem>({ ...item });

  const handleChange = (field: keyof MenuItem, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Detalhes da Tela</h3>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onAddChild(item.id)}
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Adicionar Subtela
          </Button>
          <Button type="submit" size="sm">
            Salvar Alterações
          </Button>
        </div>
      </div>

      <Tabs defaultValue="basic">
        <TabsList>
          <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
          <TabsTrigger value="template">Template</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Título da tela"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="path">Caminho (Path)</Label>
              <Input
                id="path"
                value={formData.path}
                onChange={(e) => handleChange('path', e.target.value)}
                placeholder="/caminho/da/tela"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon">Ícone</Label>
            <Select
              value={formData.icon}
              onValueChange={(value) => handleChange('icon', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um ícone" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {AVAILABLE_ICONS.map((iconName) => {
                  const Icon = getIconByName(iconName);
                  return (
                    <SelectItem key={iconName} value={iconName}>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <span>{iconName}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </TabsContent>

        <TabsContent value="template" className="pt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Template da Tela</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {(
                  [
                    'blank',
                    'table',
                    'list',
                    'gridlist',
                    'grid',
                  ] as ScreenTemplate[]
                ).map((template) => {
                  const isSelected = formData.template === template;
                  return (
                    <div
                      key={template}
                      className={cn(
                        'border rounded-lg p-4 cursor-pointer transition-all',
                        isSelected
                          ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
                          : 'hover:border-primary/50',
                      )}
                      onClick={() => handleChange('template', template)}
                    >
                      <div className="h-20 bg-muted rounded flex items-center justify-center mb-2">
                        <TemplatePreview template={template} />
                      </div>
                      <p className="text-center font-medium capitalize">
                        {template}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Descrição do Template</h4>
              <p className="text-sm text-muted-foreground">
                {getTemplateDescription(formData.template)}
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </form>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

function TemplatePreview({ template }: { template: ScreenTemplate }) {
  switch (template) {
    case 'blank':
      return <div className="w-full h-full bg-background rounded" />;
    case 'table':
      return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-1">
          <div className="w-full h-2 bg-background rounded" />
          <div className="w-full h-2 bg-background rounded" />
          <div className="w-full h-2 bg-background rounded" />
        </div>
      );
    case 'list':
      return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-1">
          <div className="w-full h-3 bg-background rounded" />
          <div className="w-full h-3 bg-background rounded" />
          <div className="w-full h-3 bg-background rounded" />
        </div>
      );
    case 'gridlist':
      return (
        <div className="w-full h-full grid grid-cols-2 gap-1 p-1">
          <div className="bg-background rounded" />
          <div className="bg-background rounded" />
          <div className="bg-background rounded" />
          <div className="bg-background rounded" />
        </div>
      );
    case 'grid':
      return (
        <div className="w-full h-full grid grid-cols-2 gap-1 p-1">
          <div className="bg-background rounded" />
          <div className="bg-background rounded" />
          <div className="bg-background rounded" />
          <div className="bg-background rounded" />
        </div>
      );
    default:
      return null;
  }
}

function getTemplateDescription(template: ScreenTemplate): string {
  switch (template) {
    case 'blank':
      return 'Uma tela em branco para conteúdo personalizado. Ideal para dashboards, formulários ou páginas de detalhes.';
    case 'table':
      return 'Uma tela com uma tabela de dados. Perfeita para exibir e gerenciar conjuntos de dados estruturados.';
    case 'list':
      return 'Uma tela com uma lista vertical de itens. Ótima para exibir coleções de itens em formato de lista.';
    case 'gridlist':
      return 'Uma tela com uma lista em formato de grade. Ideal para exibir itens com imagens ou cards.';
    case 'grid':
      return 'Uma tela com layout em grade. Perfeita para dashboards com múltiplos widgets ou cards.';
    default:
      return 'Selecione um template para ver sua descrição.';
  }
}
