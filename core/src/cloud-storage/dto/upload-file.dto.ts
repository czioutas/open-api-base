import { AutoMap } from '@automapper/classes';

export class UploadFileDto {
  @AutoMap()
  blobName: string;

  @AutoMap()
  blob: Buffer;

  @AutoMap()
  folder: string;

  @AutoMap()
  mimeType: string;
}
