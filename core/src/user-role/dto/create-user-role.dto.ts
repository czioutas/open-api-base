import { Permission } from '@app/auth/permission.enum';
import { AutoMap } from '@automapper/classes';

export class CreateUserRoleDto {
  constructor(name: string, permissions?: Permission[]) {
    this.name = name;
    this.permissions = permissions;
  }

  @AutoMap()
  name: string;

  @AutoMap()
  permissions: Permission[];
}
