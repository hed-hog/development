'use client';

import {
  Activity,
  Calendar,
  Clock,
  Mail,
  MapPin,
  Shield,
  Smartphone,
  Users,
  X,
} from 'lucide-react';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

import { AVAILABLE_ROLES, MOCK_ACCESS_LOGS, MOCK_LOGIN_HISTORY } from '../data';
import type { User } from '../types';

interface UserDetailsPanelProps {
  user: User;
  onClose: () => void;
}

export function UserDetailsPanel({ user, onClose }: UserDetailsPanelProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const userLoginHistory = MOCK_LOGIN_HISTORY.filter(
    (log) => log.userId === user.id,
  );
  const userAccessLogs = MOCK_ACCESS_LOGS.filter(
    (log) => log.userId === user.id,
  );

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'blocked':
        return 'bg-red-500';
      case 'pending':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: User['status']) => {
    switch (status) {
      case 'active':
        return 'Ativo';
      case 'blocked':
        return 'Bloqueado';
      case 'pending':
        return 'Pendente';
      default:
        return 'Desconhecido';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="w-96 border-l bg-card h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Detalhes do Usuário</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4">
          {/* User Header */}
          <div className="text-center mb-6">
            <Avatar className="h-20 w-20 mx-auto mb-3">
              <AvatarImage
                src={user.avatar || '/placeholder.svg'}
                alt={user.name}
              />
              <AvatarFallback className="text-lg">
                {user.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-semibold">{user.name}</h3>
            <p className="text-muted-foreground">{user.email}</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <Badge variant="outline" className="text-xs">
                <div
                  className={cn(
                    'w-2 h-2 rounded-full mr-1',
                    getStatusColor(user.status),
                  )}
                />
                {getStatusText(user.status)}
              </Badge>
              {user.mfaEnabled && (
                <Badge variant="default" className="text-xs bg-green-600">
                  <Shield className="w-3 h-3 mr-1" />
                  MFA
                </Badge>
              )}
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Geral</TabsTrigger>
              <TabsTrigger value="activity">Atividade</TabsTrigger>
              <TabsTrigger value="security">Segurança</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 mt-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Departamento:</span>
                  <span className="text-sm">
                    {user.department || 'Não informado'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Telefone:</span>
                  <span className="text-sm">
                    {user.phone || 'Não informado'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Criado em:</span>
                  <span className="text-sm">{formatDate(user.createdAt)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Último login:</span>
                  <span className="text-sm">
                    {user.lastLogin ? formatDate(user.lastLogin) : 'Nunca'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Total de logins:</span>
                  <span className="text-sm font-semibold">
                    {user.loginCount}
                  </span>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-medium mb-2">Roles Atribuídas</h4>
                <div className="space-y-2">
                  {user.roles.map((roleId) => {
                    const role = AVAILABLE_ROLES.find((r) => r.id === roleId);
                    return role ? (
                      <div
                        key={roleId}
                        className="flex items-center gap-2 p-2 border rounded"
                      >
                        <div
                          className={cn('w-3 h-3 rounded-full', role.color)}
                        />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{role.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {role.description}
                          </div>
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="space-y-4 mt-4">
              <div>
                <h4 className="text-sm font-medium mb-3">
                  Histórico de Logins
                </h4>
                <div className="space-y-2">
                  {userLoginHistory.slice(0, 5).map((login) => (
                    <div key={login.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">
                          {login.success ? 'Login realizado' : 'Falha no login'}
                        </span>
                        <Badge
                          variant={login.success ? 'default' : 'destructive'}
                          className="text-xs"
                        >
                          {login.method.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDate(login.timestamp)}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {login.location}
                        </div>
                        <div>IP: {login.ipAddress}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-medium mb-3">Log de Acessos</h4>
                <div className="space-y-2">
                  {userAccessLogs.slice(0, 5).map((access) => (
                    <div key={access.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">
                          {access.action}
                        </span>
                        <Badge
                          variant={access.success ? 'default' : 'destructive'}
                          className="text-xs"
                        >
                          {access.success ? 'Sucesso' : 'Falha'}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>Recurso: {access.resource}</div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDate(access.timestamp)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-4 mt-4">
              <div>
                <h4 className="text-sm font-medium mb-3">
                  Autenticação Multifator (MFA)
                </h4>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Status do MFA</span>
                    <Badge
                      variant={user.mfaEnabled ? 'default' : 'destructive'}
                      className="text-xs"
                    >
                      {user.mfaEnabled ? 'Ativado' : 'Desativado'}
                    </Badge>
                  </div>
                  {user.mfaEnabled && (
                    <div className="text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        {user.mfaMethod === 'email' ? (
                          <Mail className="h-3 w-3" />
                        ) : (
                          <Smartphone className="h-3 w-3" />
                        )}
                        Método:{' '}
                        {user.mfaMethod === 'email'
                          ? 'Email'
                          : 'Aplicativo Autenticador'}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3">
                  Informações de Segurança
                </h4>
                <div className="space-y-2">
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm font-medium mb-1">
                      Último IP de Acesso
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {userLoginHistory[0]?.ipAddress || 'Nenhum registro'}
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="text-sm font-medium mb-1">
                      Tentativas de Login
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Sucessos:{' '}
                      {userLoginHistory.filter((l) => l.success).length} |
                      Falhas:{' '}
                      {userLoginHistory.filter((l) => !l.success).length}
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="text-sm font-medium mb-1">
                      Localização Comum
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {userLoginHistory[0]?.location || 'Nenhum registro'}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
}
