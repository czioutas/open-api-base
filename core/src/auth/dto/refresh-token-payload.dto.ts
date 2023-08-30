import { AutoMap } from '@automapper/classes';

export class RefreshTokenPayload {
  @AutoMap()
  iss?: string;

  @AutoMap()
  sub?: string;

  @AutoMap()
  aud?: string;

  @AutoMap()
  iat?: number;
}
