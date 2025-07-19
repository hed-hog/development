'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

import { CURRENCY_OPTIONS } from '../data';
import type { SystemSettings } from '../types';
import { SettingGroup, SettingItem, SettingsSection } from './settings-section';

interface PaymentsSettingsProps {
  settings: SystemSettings;
  onUpdate: (key: keyof SystemSettings, value: any) => void;
}

export function PaymentsSettings({
  settings,
  onUpdate,
}: PaymentsSettingsProps) {
  return (
    <SettingsSection
      title="Configurações de Pagamento"
      description="Gerencie métodos de pagamento e faturamento"
    >
      <SettingGroup>
        <SettingItem
          title="Método de Pagamento Padrão"
          description="Método preferido para cobranças"
        >
          <Select
            value={settings.defaultPaymentMethod}
            onValueChange={(value) => onUpdate('defaultPaymentMethod', value)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="credit_card">Cartão de Crédito</SelectItem>
              <SelectItem value="debit_card">Cartão de Débito</SelectItem>
              <SelectItem value="bank_transfer">
                Transferência Bancária
              </SelectItem>
              <SelectItem value="pix">PIX</SelectItem>
              <SelectItem value="boleto">Boleto</SelectItem>
            </SelectContent>
          </Select>
        </SettingItem>

        <SettingItem
          title="Renovação Automática"
          description="Renovar assinatura automaticamente"
        >
          <Switch
            checked={settings.autoRenewal}
            onCheckedChange={(checked) => onUpdate('autoRenewal', checked)}
          />
        </SettingItem>

        <SettingItem
          title="Incluir Impostos"
          description="Incluir impostos nos valores exibidos"
        >
          <Switch
            checked={settings.taxIncluded}
            onCheckedChange={(checked) => onUpdate('taxIncluded', checked)}
          />
        </SettingItem>
      </SettingGroup>

      <SettingGroup>
        <SettingItem
          title="Email para Faturas"
          description="Email para receber faturas e recibos"
        >
          <Input
            value={settings.invoiceEmail}
            onChange={(e) => onUpdate('invoiceEmail', e.target.value)}
            placeholder="financeiro@empresa.com"
            className="w-[250px]"
          />
        </SettingItem>

        <SettingItem
          title="Moeda para Pagamentos"
          description="Moeda utilizada nas transações"
        >
          <Select
            value={settings.currency_payment}
            onValueChange={(value) => onUpdate('currency_payment', value)}
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
      </SettingGroup>
    </SettingsSection>
  );
}
