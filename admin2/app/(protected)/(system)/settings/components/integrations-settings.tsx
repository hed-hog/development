'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

import type { SystemSettings } from '../types';
import { SettingGroup, SettingItem, SettingsSection } from './settings-section';

interface IntegrationsSettingsProps {
  settings: SystemSettings;
  onUpdate: (key: keyof SystemSettings, value: any) => void;
}

export function IntegrationsSettings({
  settings,
  onUpdate,
}: IntegrationsSettingsProps) {
  const [showApiKey, setShowApiKey] = useState(false);

  return (
    <SettingsSection
      title="Integrações"
      description="Configure APIs e serviços externos"
    >
      <SettingGroup>
        <SettingItem
          title="Integração com Slack"
          description="Enviar notificações para o Slack"
        >
          <Switch
            checked={settings.slackIntegration}
            onCheckedChange={(checked) => onUpdate('slackIntegration', checked)}
          />
        </SettingItem>

        <SettingItem
          title="Provedor de Email"
          description="Serviço para envio de emails"
        >
          <Select
            value={settings.emailProvider}
            onValueChange={(value) => onUpdate('emailProvider', value)}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="smtp">SMTP</SelectItem>
              <SelectItem value="sendgrid">SendGrid</SelectItem>
              <SelectItem value="mailgun">Mailgun</SelectItem>
            </SelectContent>
          </Select>
        </SettingItem>

        <SettingItem
          title="Provedor de Armazenamento"
          description="Serviço para armazenamento de arquivos"
        >
          <Select
            value={settings.storageProvider}
            onValueChange={(value) => onUpdate('storageProvider', value)}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="local">Local</SelectItem>
              <SelectItem value="s3">Amazon S3</SelectItem>
              <SelectItem value="gcs">Google Cloud Storage</SelectItem>
            </SelectContent>
          </Select>
        </SettingItem>
      </SettingGroup>

      <SettingGroup>
        <SettingItem
          title="URL do Webhook"
          description="Endpoint para receber webhooks"
        >
          <Input
            value={settings.webhookUrl}
            onChange={(e) => onUpdate('webhookUrl', e.target.value)}
            placeholder="https://api.exemplo.com/webhook"
            className="w-[300px]"
          />
        </SettingItem>

        <SettingItem
          title="Chave da API"
          description="Chave para autenticação da API"
        >
          <div className="flex items-center gap-2">
            <Input
              type={showApiKey ? 'text' : 'password'}
              value={settings.apiKey}
              onChange={(e) => onUpdate('apiKey', e.target.value)}
              placeholder="sk-..."
              className="w-[250px]"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setShowApiKey(!showApiKey)}
            >
              {showApiKey ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </SettingItem>
      </SettingGroup>
    </SettingsSection>
  );
}
