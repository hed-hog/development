export type Permission = {
  id: number;
  name: string;
  slug: string;
  description: string;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type Role = {
  id: number;
  name: string;
  slug: string;
  description: string;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type RolePermission = {
  id: number;
  role_id: number;
  permission_id: number;
  created_at: string;
  updated_at: string;
};

export type RoleUser = {
  id: number;
  role_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
};
