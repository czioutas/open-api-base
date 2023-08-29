import { Permission } from '@app/users/enums/permissions.enum';
import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEY = 'permissions';
export const Permissions = (...permissions: Permission[]): CustomDecorator<string> =>
  SetMetadata(PERMISSIONS_KEY, permissions);
