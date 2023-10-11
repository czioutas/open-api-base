import { Permission } from '@app/auth/permission.enum';
import { AutoMap } from '@automapper/classes';
import { IsUUID } from 'class-validator';

export class UserRoleDto {
  @IsUUID()
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;

  @AutoMap()
  permissions: Permission[];
}
