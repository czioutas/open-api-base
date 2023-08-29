import { JWT_CONFIG, JwtConfig } from '@app/app.config';
import { RefreshUserDto } from '@app/auth/dto/refresh-user.dto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export const JwtRefreshStrategyName = 'jwt-refresh-strategy';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, JwtRefreshStrategyName) {
  constructor(configService: ConfigService) {
    const { refreshIdTokenSecret } = configService.get<JwtConfig>(JWT_CONFIG);
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
      ignoreExpiration: false,
      secretOrKey: refreshIdTokenSecret,
    });
  }

  validate(payload: any): RefreshUserDto {
    return {
      id: payload.sub,
    };
  }
}
