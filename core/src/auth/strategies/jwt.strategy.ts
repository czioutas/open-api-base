import { JWT_CONFIG, JwtConfig } from '@app/app.config';
import { LocalUserDto } from '@app/auth/dto/local-user.dto';
import { TokenPayloadDto } from '@app/auth/dto/token-payload.dto';
import { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectMapper } from '@timonmasberg/automapper-nestjs';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {
    const jwtConfig = configService.get<JwtConfig>(JWT_CONFIG);
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret,
    });
  }

  validate(payload: TokenPayloadDto): LocalUserDto {
    const user = this.classMapper.map(payload, TokenPayloadDto, LocalUserDto);
    user.permissions = payload.permissions;

    return user;
  }
}
