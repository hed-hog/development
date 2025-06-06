import type { SettingsCategory, SystemSettings } from './types';

export const DEFAULT_SETTINGS: SystemSettings = {
  // Localização
  language: 'pt-BR',
  timezone: 'America/Sao_Paulo',
  dateFormat: 'DD/MM/YYYY',
  currency: 'BRL',
  numberFormat: '1.234,56',

  // Tema e Aparência
  theme: 'system',
  primaryColor: 'blue',
  fontSize: 'medium',
  compactMode: false,
  animations: true,

  // Notificações
  emailNotifications: true,
  pushNotifications: true,
  soundEnabled: true,
  notificationTypes: {
    security: true,
    updates: true,
    marketing: false,
    reports: true,
  },

  // Segurança
  twoFactorAuth: false,
  sessionTimeout: 30,
  passwordExpiry: 90,
  loginAttempts: 5,
  ipWhitelist: false,

  // Pagamentos
  defaultPaymentMethod: 'credit_card',
  autoRenewal: true,
  invoiceEmail: '',
  taxIncluded: true,
  currency_payment: 'BRL',

  // Sistema
  autoBackup: true,
  backupFrequency: 'daily',
  logLevel: 'info',
  maintenanceMode: false,
  apiRateLimit: 1000,

  // Integração
  webhookUrl: '',
  apiKey: '',
  slackIntegration: false,
  emailProvider: 'smtp',
  storageProvider: 'local',
};

export const SETTINGS_CATEGORIES: SettingsCategory[] = [
  {
    id: 'localization',
    title: 'Localização',
    description: 'Idioma, fuso horário e formatos regionais',
    icon: 'Globe',
  },
  {
    id: 'appearance',
    title: 'Tema e Aparência',
    description: 'Personalização visual da interface',
    icon: 'Palette',
  },
  {
    id: 'notifications',
    title: 'Notificações',
    description: 'Configurações de alertas e comunicações',
    icon: 'Bell',
  },
  {
    id: 'security',
    title: 'Segurança',
    description: 'Autenticação e políticas de segurança',
    icon: 'Shield',
  },
  {
    id: 'payments',
    title: 'Pagamentos',
    description: 'Métodos de pagamento e faturamento',
    icon: 'CreditCard',
  },
  {
    id: 'system',
    title: 'Sistema',
    description: 'Configurações técnicas e manutenção',
    icon: 'Settings',
  },
  {
    id: 'integrations',
    title: 'Integrações',
    description: 'APIs e serviços externos',
    icon: 'Plug',
  },
];

export const LANGUAGE_OPTIONS = [
  { value: 'pt-BR', label: 'Português (Brasil)' },
  { value: 'en-US', label: 'English (US)' },
  { value: 'es-ES', label: 'Español' },
  { value: 'fr-FR', label: 'Français' },
];

export const TIMEZONE_OPTIONS = [
  { value: 'America/Sao_Paulo', label: 'São Paulo (UTC-3)' },
  { value: 'America/New_York', label: 'New York (UTC-5)' },
  { value: 'Europe/London', label: 'London (UTC+0)' },
  { value: 'Europe/Paris', label: 'Paris (UTC+1)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (UTC+9)' },
];

export const CURRENCY_OPTIONS = [
  { value: 'BRL', label: 'Real Brasileiro (R$)' },
  { value: 'USD', label: 'US Dollar ($)' },
  { value: 'EUR', label: 'Euro (€)' },
  { value: 'GBP', label: 'British Pound (£)' },
];

export const COLOR_OPTIONS = [
  { value: 'blue', label: 'Azul', color: 'bg-blue-500' },
  { value: 'green', label: 'Verde', color: 'bg-green-500' },
  { value: 'purple', label: 'Roxo', color: 'bg-purple-500' },
  { value: 'red', label: 'Vermelho', color: 'bg-red-500' },
  { value: 'orange', label: 'Laranja', color: 'bg-orange-500' },
];
