import { CloudStorageController } from '@app/cloud-storage/cloud-storage.controller';
import { CloudStorageProfile } from '@app/cloud-storage/cloud-storage.profile';
import { CloudStorageRepository } from '@app/cloud-storage/cloud-storage.repository';
import { CloudStorageService } from '@app/cloud-storage/cloud-storage.service';
import { CloudStorageEntity } from '@app/cloud-storage/entities/cloud-storage.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CloudStorageEntity])],
  providers: [CloudStorageService, CloudStorageRepository, CloudStorageProfile],
  controllers: [CloudStorageController],
  exports: [CloudStorageService],
})
export class CloudStorageModule {}
