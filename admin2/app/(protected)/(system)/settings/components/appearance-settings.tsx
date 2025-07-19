'use client';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

import { COLOR_OPTIONS } from '../data';
import type { SystemSettings } from '../types';
import { SettingGroup, SettingItem, SettingsSection } from './settings-section';

interface AppearanceSettingsProps {
  settings: SystemSettings;
  onUpdate: (key: keyof SystemSettings, value: any) => void;
}

export function AppearanceSettings({
  settings,
  onUpdate,
}: AppearanceSettingsProps) {
  return (
    <SettingsSection
      title="Tema e Aparência"
      description="Personalize a aparência visual da interface"
    >
      <SettingGroup>
        <SettingItem
          title="Tema"
          description="Escolha entre tema claro, escuro ou automático"
        >
          <RadioGroup
            value={settings.theme}
            onValueChange={(value) => onUpdate('theme', value)}
            className="flex gap-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="light" id="theme-light" />
              <Label htmlFor="theme-light">Claro</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dark" id="theme-dark" />
              <Label htmlFor="theme-dark">Escuro</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="system" id="theme-system" />
              <Label htmlFor="theme-system">Sistema</Label>
            </div>
          </RadioGroup>
        </SettingItem>

        <SettingItem
          title="Cor Principal"
          description="Cor de destaque da interface"
        >
          <div className="flex gap-2">
            {COLOR_OPTIONS.map((color) => (
              <button
                key={color.value}
                onClick={() => onUpdate('primaryColor', color.value)}
                className={cn(
                  'w-8 h-8 rounded-full border-2 transition-all',
                  color.color,
                  settings.primaryColor === color.value
                    ? 'border-foreground scale-110'
                    : 'border-muted-foreground/30 hover:scale-105',
                )}
                title={color.label}
              />
            ))}
          </div>
        </SettingItem>

        <SettingItem
          title="Tamanho da Fonte"
          description="Tamanho do texto na interface"
        >
          <Select
            value={settings.fontSize}
            onValueChange={(value) => onUpdate('fontSize', value)}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Pequeno</SelectItem>
              <SelectItem value="medium">Médio</SelectItem>
              <SelectItem value="large">Grande</SelectItem>
            </SelectContent>
          </Select>
        </SettingItem>

        <SettingItem
          title="Modo Compacto"
          description="Interface mais densa com menos espaçamento"
        >
          <Switch
            checked={settings.compactMode}
            onCheckedChange={(checked) => onUpdate('compactMode', checked)}
          />
        </SettingItem>

        <SettingItem
          title="Animações"
          description="Ativar animações e transições na interface"
        >
          <Switch
            checked={settings.animations}
            onCheckedChange={(checked) => onUpdate('animations', checked)}
          />
        </SettingItem>
      </SettingGroup>
    </SettingsSection>
  );
}
