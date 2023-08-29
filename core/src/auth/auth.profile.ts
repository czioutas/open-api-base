import { LocalUserDto } from '@app/auth/dto/local-user.dto';
import { TokenPayloadDto } from '@app/auth/dto/token-payload.dto';
import { createMap, forMember, mapFrom, Mapper, MappingProfile } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@timonmasberg/automapper-nestjs';

@Injectable()
export class AuthProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(
        mapper,
        TokenPayloadDto,
        LocalUserDto,
        forMember(
          (dest) => dest.applicationUserId,
          mapFrom((target) => target.sub),
        ),
      );
    };
  }
}
