import { CloudStorageEntity } from '@app/cloud-storage/entities/cloud-storage.entity';
import { Injectable, Scope } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable({ scope: Scope.REQUEST })
export class CloudStorageRepository extends Repository<CloudStorageEntity> {
  companyId: string;

  constructor(dataSource: DataSource) {
    super(CloudStorageEntity, dataSource.createEntityManager());
  }
}
