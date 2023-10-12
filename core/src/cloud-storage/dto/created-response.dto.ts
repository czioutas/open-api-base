import { AutoMap } from '@automapper/classes';

export class CreatedResponseDto {
  @AutoMap()
  id: string;

  @AutoMap()
  etag: string;

  @AutoMap()
  location: string;

  @AutoMap()
  key: string;

  @AutoMap()
  bucket: string;
}
