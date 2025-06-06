'use client';

import { Activity, Shield, UserCheck, Users } from 'lucide-react';
import { useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { UserDetailsPanel } from './components/user-details-panel';
import { UserFormDialog } from './components/user-form-dialog';
import { UserTable } from './components/user-table';
import { MOCK_USERS } from './data';
import type { User } from './types';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleCreateUser = () => {
    setEditingUser(null);
    setIsFormOpen(true);
  };

  const handleSaveUser = (userData: Partial<User>) => {
    if (editingUser) {
      // Editar usuário existente
      setUsers((prev) =>
        prev.map((user) =>
          user.id === editingUser.id ? { ...user, ...userData } : user,
        ),
      );
      toast({
        title: 'Usuário atualizado',
        description: 'As informações do usuário foram atualizadas com sucesso.',
      });
    } else {
      // Criar novo usuário
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        ...userData,
        createdAt: new Date(),
        loginCount: 0,
        mfaEnabled: userData.mfaEnabled || false,
      } as User;

      setUsers((prev) => [...prev, newUser]);
      toast({
        title: 'Usuário criado',
        description: 'O novo usuário foi criado com sucesso.',
      });
    }
  };

  const handleDeleteUser = (userId: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId));
    if (selectedUser?.id === userId) {
      setSelectedUser(null);
    }
    toast({
      title: 'Usuário excluído',
      description: 'O usuário foi removido do sistema.',
      variant: 'destructive',
    });
  };

  const handleToggleStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === 'blocked' ? 'active' : 'blocked',
            }
          : user,
      ),
    );

    const user = users.find((u) => u.id === userId);
    const newStatus = user?.status === 'blocked' ? 'ativo' : 'bloqueado';

    toast({
      title: 'Status alterado',
      description: `Usuário ${newStatus} com sucesso.`,
    });
  };

  const handleSimulateLogin = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    toast({
      title: 'Login simulado',
      description: `Login simulado para ${user?.name} realizado com sucesso.`,
    });
  };

  const handleResetPassword = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    toast({
      title: 'Senha redefinida',
      description: `Nova senha enviada para ${user?.email}.`,
    });
  };

  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
  };

  const activeUsers = users.filter((user) => user.status === 'active').length;
  const blockedUsers = users.filter((user) => user.status === 'blocked').length;
  const mfaEnabledUsers = users.filter((user) => user.mfaEnabled).length;
  const totalLogins = users.reduce((sum, user) => sum + user.loginCount, 0);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Gerenciamento de Usuários</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie usuários, permissões e configurações de segurança
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Usuários
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">
              Usuários cadastrados no sistema
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Usuários Ativos
            </CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {activeUsers}
            </div>
            <p className="text-xs text-muted-foreground">
              {((activeUsers / users.length) * 100).toFixed(1)}% do total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">MFA Ativado</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {mfaEnabledUsers}
            </div>
            <p className="text-xs text-muted-foreground">
              {((mfaEnabledUsers / users.length) * 100).toFixed(1)}% com MFA
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Logins
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLogins}</div>
            <p className="text-xs text-muted-foreground">
              Média de {Math.round(totalLogins / users.length)} por usuário
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="flex gap-6">
        <div className={selectedUser ? 'flex-1' : 'w-full'}>
          <Card>
            <CardHeader>
              <CardTitle>Lista de Usuários</CardTitle>
              <CardDescription>
                Gerencie todos os usuários do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserTable
                users={users}
                onEditUser={handleEditUser}
                onDeleteUser={handleDeleteUser}
                onToggleStatus={handleToggleStatus}
                onSimulateLogin={handleSimulateLogin}
                onResetPassword={handleResetPassword}
                onViewDetails={handleViewDetails}
                onCreateUser={handleCreateUser}
              />
            </CardContent>
          </Card>
        </div>

        {selectedUser && (
          <UserDetailsPanel
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
          />
        )}
      </div>

      {/* User Form Dialog */}
      <UserFormDialog
        user={editingUser}
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSave={handleSaveUser}
      />
    </div>
  );
}
