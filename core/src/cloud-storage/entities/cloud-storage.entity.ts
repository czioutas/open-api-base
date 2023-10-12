import { BaseEntity } from '@app/lib/base.entity';
import { AutoMap } from '@automapper/classes';
import { Column, Entity } from 'typeorm';

@Entity()
export class CloudStorageEntity extends BaseEntity {
  @Column()
  @AutoMap()
  etag: string;

  @Column()
  @AutoMap()
  bucket: string;

  @Column()
  @AutoMap()
  location: string;

  @Column()
  @AutoMap()
  key: string;

  @Column()
  @AutoMap()
  fileMimeType: string;
}
