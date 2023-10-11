import { Permission } from '@app/auth/permission.enum';

// Define a type for the mapping between roles and permissions
type UserRolePermissionMap = {
  role: string;
  permissions: Permission[];
};

enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

// Create an array of role-to-permission mappings
const rolePermissionMappings: UserRolePermissionMap[] = [
  {
    role: Role.USER,
    permissions: [Permission.CREATE_COMPANY],
  },
  // Add more mappings as needed
];

export { Role, UserRolePermissionMap, rolePermissionMappings };
