import { JWT_CONFIG, JwtConfig } from '@app/app.config';
import { AuthenticatedUserDto } from '@app/auth/dto/authenticated-user.dto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export const JwtMagiclinkStrategy = 'jwt-magiclink-strategy';

@Injectable()
export class JwtMagicLinkStrategy extends PassportStrategy(Strategy, JwtMagiclinkStrategy) {
  constructor(configService: ConfigService) {
    const { magicLinkTokenSecret } = configService.get<JwtConfig>(JWT_CONFIG);
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
      ignoreExpiration: false,
      secretOrKey: magicLinkTokenSecret,
    });
  }

  async validate(payload: any): Promise<AuthenticatedUserDto> {
    return {
      id: payload.sub,
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
    };
  }
}
