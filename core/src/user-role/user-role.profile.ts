import { CreateUserRoleDto } from '@app/user-role/dto/create-user-role.dto';
import { UserRoleDto } from '@app/user-role/dto/user-role.dto';
import { UserRoleEntity } from '@app/user-role/entities/user-role.entity';
import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@timonmasberg/automapper-nestjs';

@Injectable()
export class UserRoleProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, UserRoleEntity, UserRoleDto);
      createMap(mapper, UserRoleDto, UserRoleEntity);
      createMap(mapper, CreateUserRoleDto, UserRoleEntity);
      createMap(mapper, UserRoleEntity, CreateUserRoleDto);
    };
  }
}
