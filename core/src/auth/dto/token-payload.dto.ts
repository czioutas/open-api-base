import { Permission } from '@app/users/enums/permissions.enum';
import { AutoMap } from '@automapper/classes';

/**
 * This class represents what is inside the id Token or Access Token
 */
export class TokenPayloadDto {
  @AutoMap()
  iss?: string;

  @AutoMap()
  sub: string;

  @AutoMap()
  aud?: string;

  @AutoMap()
  iat?: number;

  @AutoMap()
  name: string;

  @AutoMap()
  given_name: string;

  @AutoMap()
  family_name: string;

  @AutoMap()
  email: string;

  @AutoMap()
  permissions: Permission[];

  @AutoMap()
  roles: string[];
}
