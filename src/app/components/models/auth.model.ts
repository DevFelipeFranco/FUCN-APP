export interface LoginModel {
    username: string;
    password: string;
}

export interface UserLoged {
    idUser?: number;
    username: string;
    password: string;
    email: string;
    profileImageUrl: string;
    lastLoginDate: string;
    lastLoginDateDisplay: string;
    joinDate: string;
    roles: RoleModel[];
}

export interface RoleModel {
    idRole?: number;
    name: string;
    description: string;
    permissions: PermissionModel[]
}

export interface PermissionModel {
    idPermission: number;
    name: string;
    description: string;
}