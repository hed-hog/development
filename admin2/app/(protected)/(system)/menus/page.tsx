'use client';

import { Download, Plus } from 'lucide-react';

import {
  Page,
  PageContent,
  PageHeader,
  PageHeaderButtons,
} from '@/components/page';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SortableTree } from './SortableTree';
import { AVAILABLE_ROLES } from './utils';

export default function MenuManager() {
  return (
    <Page className="md:h-screen">
      <PageHeader
        title="Gerenciador de Menu"
        subtitle="Organize a estrutura hierárquica do menu do sistema"
        rightComponent={
          <PageHeaderButtons>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Menu
            </Button>
          </PageHeaderButtons>
        }
      />
      <PageContent className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1">
        <div className="lg:col-span-3">
          <div className="border rounded-lg bg-card h-full flex flex-col">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Estrutura do Menu</h2>
              <p className="text-sm text-muted-foreground">
                Arraste os itens para reorganizar a hierarquia
              </p>
            </div>

            <ScrollArea className="max-h-[calc(100vh-213px)] flex-1">
              <div id="menu" className="p-4">
                <SortableTree collapsible indicator removable />
              </div>
            </ScrollArea>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border rounded-lg bg-card p-4">
            <h3 className="font-semibold mb-3">Estatísticas</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Total de Menus
                </span>
                <span className="font-medium">{0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Menus Raiz
                </span>
                <span className="font-medium">{0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Níveis Máximos
                </span>
                <span className="font-medium">0</span>
              </div>
            </div>
          </div>

          <div className="border rounded-lg bg-card p-4">
            <h3 className="font-semibold mb-3">Roles Disponíveis</h3>
            <div className="space-y-2">
              {AVAILABLE_ROLES.map((role) => (
                <div key={role.id} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${role.color}`} />
                  <div className="flex-1">
                    <div className="font-medium text-sm">{role.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {role.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border rounded-lg bg-card p-4">
            <h3 className="font-semibold mb-3">Instruções</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Arraste os itens para reordenar</p>
              <p>• Mova para a direita para criar subitens</p>
              <p>• Clique no ícone de edição para modificar</p>
              <p>• Use o botão + para adicionar subitens</p>
              <p>• Configure as roles para controlar acesso</p>
            </div>
          </div>
        </div>
      </PageContent>
    </Page>
  );
}
