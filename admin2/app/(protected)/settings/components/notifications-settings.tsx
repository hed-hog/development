'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';

import type { SystemSettings } from '../types';
import { SettingGroup, SettingItem, SettingsSection } from './settings-section';

interface NotificationsSettingsProps {
  settings: SystemSettings;
  onUpdate: (key: keyof SystemSettings, value: any) => void;
}

export function NotificationsSettings({
  settings,
  onUpdate,
}: NotificationsSettingsProps) {
  const handleNotificationTypeChange = (
    type: keyof SystemSettings['notificationTypes'],
    checked: boolean,
  ) => {
    onUpdate('notificationTypes', {
      ...settings.notificationTypes,
      [type]: checked,
    });
  };

  return (
    <SettingsSection
      title="Configurações de Notificações"
      description="Gerencie como e quando você recebe notificações"
    >
      <SettingGroup>
        <SettingItem
          title="Notificações por Email"
          description="Receber notificações via email"
        >
          <Switch
            checked={settings.emailNotifications}
            onCheckedChange={(checked) =>
              onUpdate('emailNotifications', checked)
            }
          />
        </SettingItem>

        <SettingItem
          title="Notificações Push"
          description="Receber notificações push no navegador"
        >
          <Switch
            checked={settings.pushNotifications}
            onCheckedChange={(checked) =>
              onUpdate('pushNotifications', checked)
            }
          />
        </SettingItem>

        <SettingItem
          title="Sons de Notificação"
          description="Reproduzir sons para notificações"
        >
          <Switch
            checked={settings.soundEnabled}
            onCheckedChange={(checked) => onUpdate('soundEnabled', checked)}
          />
        </SettingItem>
      </SettingGroup>

      <div className="space-y-4">
        <h4 className="text-sm font-medium">Tipos de Notificação</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="security"
              checked={settings.notificationTypes.security}
              onCheckedChange={(checked) =>
                handleNotificationTypeChange('security', checked as boolean)
              }
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="security"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Segurança
              </label>
              <p className="text-xs text-muted-foreground">
                Alertas de segurança e tentativas de login
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="updates"
              checked={settings.notificationTypes.updates}
              onCheckedChange={(checked) =>
                handleNotificationTypeChange('updates', checked as boolean)
              }
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="updates"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Atualizações do Sistema
              </label>
              <p className="text-xs text-muted-foreground">
                Novos recursos e atualizações
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="marketing"
              checked={settings.notificationTypes.marketing}
              onCheckedChange={(checked) =>
                handleNotificationTypeChange('marketing', checked as boolean)
              }
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="marketing"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Marketing
              </label>
              <p className="text-xs text-muted-foreground">
                Promoções e novidades
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="reports"
              checked={settings.notificationTypes.reports}
              onCheckedChange={(checked) =>
                handleNotificationTypeChange('reports', checked as boolean)
              }
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="reports"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Relatórios
              </label>
              <p className="text-xs text-muted-foreground">
                Relatórios automáticos e resumos
              </p>
            </div>
          </div>
        </div>
      </div>
    </SettingsSection>
  );
}
