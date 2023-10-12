import { CreatedResponseDto } from '@app/cloud-storage/dto/created-response.dto';
import { CloudStorageEntity } from '@app/cloud-storage/entities/cloud-storage.entity';
import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@timonmasberg/automapper-nestjs';

@Injectable()
export class CloudStorageProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, CreatedResponseDto, CloudStorageEntity);
    };
  }
}
