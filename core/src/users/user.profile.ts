import { CreateUserDto } from '@app/users/dto/create-user.dto';
import { UserDto } from '@app/users/dto/user.dto';
import { UserEntity } from '@app/users/user.entity';
import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@timonmasberg/automapper-nestjs';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, UserEntity, UserDto);
      createMap(mapper, UserDto, UserEntity);
      createMap(mapper, CreateUserDto, UserEntity);
      createMap(mapper, UserEntity, CreateUserDto);
    };
  }
}
