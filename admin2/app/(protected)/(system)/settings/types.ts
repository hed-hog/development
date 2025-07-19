export interface SystemSettings {
  // Localização
  language: string;
  timezone: string;
  dateFormat: string;
  currency: string;
  numberFormat: string;

  // Tema e Aparência
  theme: 'light' | 'dark' | 'system';
  primaryColor: string;
  fontSize: 'small' | 'medium' | 'large';
  compactMode: boolean;
  animations: boolean;

  // Notificações
  emailNotifications: boolean;
  pushNotifications: boolean;
  soundEnabled: boolean;
  notificationTypes: {
    security: boolean;
    updates: boolean;
    marketing: boolean;
    reports: boolean;
  };

  // Segurança
  twoFactorAuth: boolean;
  sessionTimeout: number;
  passwordExpiry: number;
  loginAttempts: number;
  ipWhitelist: boolean;

  // Pagamentos
  defaultPaymentMethod: string;
  autoRenewal: boolean;
  invoiceEmail: string;
  taxIncluded: boolean;
  currency_payment: string;

  // Sistema
  autoBackup: boolean;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
  logLevel: 'error' | 'warning' | 'info' | 'debug';
  maintenanceMode: boolean;
  apiRateLimit: number;

  // Integração
  webhookUrl: string;
  apiKey: string;
  slackIntegration: boolean;
  emailProvider: 'smtp' | 'sendgrid' | 'mailgun';
  storageProvider: 'local' | 's3' | 'gcs';
}

export interface SettingsCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
}
