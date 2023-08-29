import { Permission } from '@app/users/enums/permissions.enum';
import { AutoMap } from '@automapper/classes';
import { IsUUID } from 'class-validator';

export class LocalUserDto {
  @AutoMap()
  name: string;

  @AutoMap()
  given_name: string;

  @AutoMap()
  family_name: string;

  @AutoMap()
  email: string;

  @AutoMap()
  @IsUUID()
  applicationUserId: string;

  @AutoMap()
  companyUserId: string;

  @AutoMap()
  roles: string[];

  @AutoMap()
  permissions: Permission[];

  @AutoMap()
  executing_company: string;
}
