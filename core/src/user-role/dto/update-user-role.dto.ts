import { Permission } from '@app/auth/permission.enum';
import { AutoMap } from '@automapper/classes';

export class UpdateUserRoleDto {
  @AutoMap()
  name: string;

  @AutoMap()
  permissions: Permission[];
}
