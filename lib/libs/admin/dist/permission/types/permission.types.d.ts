export type PermissionType = {
    id: number;
    name: string;
    slug: string;
    description: string;
    active: boolean;
    created_at: string;
    updated_at: string;
};
export type RoleType = {
    id: number;
    name: string;
    slug: string;
    description: string;
    active: boolean;
    created_at: string;
    updated_at: string;
};
export type RolePermissionType = {
    id: number;
    role_id: number;
    permission_id: number;
    created_at: string;
    updated_at: string;
};
export type RoleUserType = {
    id: number;
    role_id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
};
//# sourceMappingURL=permission.types.d.ts.map