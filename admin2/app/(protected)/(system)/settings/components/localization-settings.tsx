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

import { CURRENCY_OPTIONS, LANGUAGE_OPTIONS, TIMEZONE_OPTIONS } from '../data';
import type { SystemSettings } from '../types';
import { SettingGroup, SettingItem, SettingsSection } from './settings-section';

interface LocalizationSettingsProps {
  settings: SystemSettings;
  onUpdate: (key: keyof SystemSettings, value: any) => void;
}

export function LocalizationSettings({
  settings,
  onUpdate,
}: LocalizationSettingsProps) {
  return (
    <SettingsSection
      title="Configurações de Localização"
      description="Configure idioma, fuso horário e formatos regionais"
    >
      <SettingGroup>
        <SettingItem
          title="Idioma"
          description="Idioma da interface do sistema"
        >
          <Select
            value={settings.language}
            onValueChange={(value) => onUpdate('language', value)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </SettingItem>

        <SettingItem
          title="Fuso Horário"
          description="Fuso horário para exibição de datas e horários"
        >
          <Select
            value={settings.timezone}
            onValueChange={(value) => onUpdate('timezone', value)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TIMEZONE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </SettingItem>

        <SettingItem
          title="Formato de Data"
          description="Como as datas serão exibidas"
        >
          <RadioGroup
            value={settings.dateFormat}
            onValueChange={(value) => onUpdate('dateFormat', value)}
            className="flex gap-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="DD/MM/YYYY" id="date-br" />
              <Label htmlFor="date-br">DD/MM/AAAA</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="MM/DD/YYYY" id="date-us" />
              <Label htmlFor="date-us">MM/DD/AAAA</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="YYYY-MM-DD" id="date-iso" />
              <Label htmlFor="date-iso">AAAA-MM-DD</Label>
            </div>
          </RadioGroup>
        </SettingItem>

        <SettingItem
          title="Moeda"
          description="Moeda padrão para exibição de valores"
        >
          <Select
            value={settings.currency}
            onValueChange={(value) => onUpdate('currency', value)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CURRENCY_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </SettingItem>

        <SettingItem
          title="Formato de Números"
          description="Como os números serão formatados"
        >
          <RadioGroup
            value={settings.numberFormat}
            onValueChange={(value) => onUpdate('numberFormat', value)}
            className="flex gap-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1.234,56" id="number-br" />
              <Label htmlFor="number-br">1.234,56</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1,234.56" id="number-us" />
              <Label htmlFor="number-us">1,234.56</Label>
            </div>
          </RadioGroup>
        </SettingItem>
      </SettingGroup>
    </SettingsSection>
  );
}
