import { Permission } from '@app/auth/permission.enum';
import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEY = 'permissions';
export const Permissions = (...permission: Permission[]): CustomDecorator<string> =>
  SetMetadata(PERMISSIONS_KEY, permission);
