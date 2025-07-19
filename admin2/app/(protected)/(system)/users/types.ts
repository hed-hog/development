export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  roles: string[];
  status: 'active' | 'blocked' | 'pending';
  lastLogin?: Date;
  createdAt: Date;
  mfaEnabled: boolean;
  mfaMethod?: 'email' | 'app';
  loginCount: number;
  department?: string;
  phone?: string;
}

export interface LoginHistory {
  id: string;
  userId: string;
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
  location: string;
  success: boolean;
  method: 'password' | 'mfa' | 'sso';
}

export interface AccessLog {
  id: string;
  userId: string;
  timestamp: Date;
  action: string;
  resource: string;
  ipAddress: string;
  success: boolean;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  color: string;
  permissions: string[];
}
