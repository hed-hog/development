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

import type { SystemSettings as SystemSettingsType } from '../types';
import { SettingGroup, SettingItem, SettingsSection } from './settings-section';

interface SystemSettingsProps {
  settings: SystemSettingsType;
  onUpdate: (key: keyof SystemSettingsType, value: any) => void;
}

export function SystemSettings({ settings, onUpdate }: SystemSettingsProps) {
  return (
    <SettingsSection
      title="Configurações do Sistema"
      description="Configurações técnicas e de manutenção"
    >
      <SettingGroup>
        <SettingItem
          title="Backup Automático"
          description="Realizar backup automático dos dados"
        >
          <Switch
            checked={settings.autoBackup}
            onCheckedChange={(checked) => onUpdate('autoBackup', checked)}
          />
        </SettingItem>

        <SettingItem
          title="Frequência do Backup"
          description="Com que frequência fazer backup"
        >
          <Select
            value={settings.backupFrequency}
            onValueChange={(value) => onUpdate('backupFrequency', value)}
            disabled={!settings.autoBackup}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Diário</SelectItem>
              <SelectItem value="weekly">Semanal</SelectItem>
              <SelectItem value="monthly">Mensal</SelectItem>
            </SelectContent>
          </Select>
        </SettingItem>

        <SettingItem
          title="Modo de Manutenção"
          description="Ativar modo de manutenção do sistema"
        >
          <Switch
            checked={settings.maintenanceMode}
            onCheckedChange={(checked) => onUpdate('maintenanceMode', checked)}
          />
        </SettingItem>
      </SettingGroup>

      <SettingGroup>
        <SettingItem
          title="Nível de Log"
          description="Detalhamento dos logs do sistema"
        >
          <Select
            value={settings.logLevel}
            onValueChange={(value) => onUpdate('logLevel', value)}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="error">Error</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="debug">Debug</SelectItem>
            </SelectContent>
          </Select>
        </SettingItem>

        <SettingItem
          title="Limite de Taxa da API"
          description={`${settings.apiRateLimit} requisições por minuto`}
        >
          <div className="w-[200px] space-y-2">
            <Slider
              value={[settings.apiRateLimit]}
              onValueChange={(value) => onUpdate('apiRateLimit', value[0])}
              max={5000}
              min={100}
              step={100}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>100</span>
              <span>5000</span>
            </div>
          </div>
        </SettingItem>
      </SettingGroup>
    </SettingsSection>
  );
}
