'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

import type { SystemSettings } from '../types';
import { SettingGroup, SettingItem, SettingsSection } from './settings-section';

interface SecuritySettingsProps {
  settings: SystemSettings;
  onUpdate: (key: keyof SystemSettings, value: any) => void;
}

export function SecuritySettings({
  settings,
  onUpdate,
}: SecuritySettingsProps) {
  return (
    <SettingsSection
      title="Configurações de Segurança"
      description="Gerencie políticas de segurança e autenticação"
    >
      <SettingGroup>
        <SettingItem
          title="Autenticação de Dois Fatores"
          description="Ativar 2FA para maior segurança"
        >
          <Switch
            checked={settings.twoFactorAuth}
            onCheckedChange={(checked) => onUpdate('twoFactorAuth', checked)}
          />
        </SettingItem>

        <SettingItem
          title="Lista Branca de IPs"
          description="Restringir acesso a IPs específicos"
        >
          <Switch
            checked={settings.ipWhitelist}
            onCheckedChange={(checked) => onUpdate('ipWhitelist', checked)}
          />
        </SettingItem>
      </SettingGroup>

      <SettingGroup>
        <SettingItem
          title="Timeout de Sessão"
          description={`Sessão expira após ${settings.sessionTimeout} minutos de inatividade`}
        >
          <div className="w-[200px] space-y-2">
            <Slider
              value={[settings.sessionTimeout]}
              onValueChange={(value) => onUpdate('sessionTimeout', value[0])}
              max={120}
              min={5}
              step={5}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>5 min</span>
              <span>120 min</span>
            </div>
          </div>
        </SettingItem>

        <SettingItem
          title="Expiração de Senha"
          description={`Senhas expiram após ${settings.passwordExpiry} dias`}
        >
          <div className="w-[200px] space-y-2">
            <Slider
              value={[settings.passwordExpiry]}
              onValueChange={(value) => onUpdate('passwordExpiry', value[0])}
              max={365}
              min={30}
              step={30}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>30 dias</span>
              <span>365 dias</span>
            </div>
          </div>
        </SettingItem>

        <SettingItem
          title="Tentativas de Login"
          description="Máximo de tentativas antes do bloqueio"
        >
          <Select
            value={settings.loginAttempts.toString()}
            onValueChange={(value) =>
              onUpdate('loginAttempts', Number.parseInt(value))
            }
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
            </SelectContent>
          </Select>
        </SettingItem>
      </SettingGroup>
    </SettingsSection>
  );
}
