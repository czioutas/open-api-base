import { CLOUD_STORAGE_CONFIG, CloudStorageConfig } from '@app/app.config';
import { CloudStorageRepository } from '@app/cloud-storage/cloud-storage.repository';
import { CreatedResponseDto } from '@app/cloud-storage/dto/created-response.dto';
import { UploadFileDto } from '@app/cloud-storage/dto/upload-file.dto';
import { CloudStorageEntity } from '@app/cloud-storage/entities/cloud-storage.entity';
import { saveFileToTmpAsync } from '@app/lib/fs-utilities';
import { Mapper } from '@automapper/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectMapper } from '@timonmasberg/automapper-nestjs';
import { S3 } from 'aws-sdk';
import { Readable } from 'stream';
import https = require('https');

@Injectable()
export class CloudStorageService {
  private readonly cloudStorageConfig: CloudStorageConfig;
  private S3: AWS.S3;
  private BUCKET: string;

  constructor(
    @InjectMapper() private readonly classMapper: Mapper,
    private readonly cloudStorageRepository: CloudStorageRepository,
    configService: ConfigService,
  ) {
    this.cloudStorageConfig = configService.get<CloudStorageConfig>(CLOUD_STORAGE_CONFIG);

    this.S3 = new S3({
      // Your config options
      accessKeyId: this.cloudStorageConfig.accessKey,
      secretAccessKey: this.cloudStorageConfig.secretAccessKey,
      endpoint: this.cloudStorageConfig.endpoint,
      httpOptions: {
        agent: new https.Agent({ rejectUnauthorized: false }),
      },
    });

    this.BUCKET = this.cloudStorageConfig.bucket;
  }

  async putBlobAsync(uploadFileDto: UploadFileDto): Promise<CreatedResponseDto> {
    const params = {
      Bucket: this.BUCKET,
      Key: this.calculateFileKey(uploadFileDto.blobName, uploadFileDto.folder),
      Body: uploadFileDto.blob,
    };

    const uploadedBlob = await this.S3.putObject(params).promise();

    const createdResponseDto = new CreatedResponseDto();
    createdResponseDto.etag = uploadedBlob.ETag.replace('"', '').replace('"', '');
    createdResponseDto.bucket = params.Bucket;
    createdResponseDto.location = this.cloudStorageConfig.endpoint;
    createdResponseDto.key = params.Key;

    createdResponseDto.id = await this.createEntityAsync(createdResponseDto, uploadFileDto.mimeType);

    return createdResponseDto;
  }

  async getFileByIdAsync(id: string): Promise<Readable> {
    const cloudStorageEntity = await this.cloudStorageRepository.findOneBy({
      id: id,
    });

    if (cloudStorageEntity == null) {
      throw new NotFoundException();
    }

    return await this.getBlobAsync(cloudStorageEntity.key);
  }

  private async createEntityAsync(createdResponseDto: CreatedResponseDto, mimeType: string): Promise<string> {
    const entity = this.classMapper.map(createdResponseDto, CreatedResponseDto, CloudStorageEntity);
    entity.fileMimeType = mimeType;

    await this.cloudStorageRepository.save(entity);

    return entity.id;
  }

  private async getBlobAsync(key: string): Promise<Readable> {
    try {
      const params = { Bucket: this.BUCKET, Key: key };
      const blob = await this.S3.getObject(params).promise();

      return Readable.from(blob.Body as Readable);
    } catch (e) {
      throw new Error(`Could not retrieve file from S3: ${e}`);
    }
  }

  /**
   * Downloads file to a temporary folder and location
   * @param key The key of the file - it is also used as the filename in localstorage but only the last segment
   * @returns {string} The location of the file on the filesystem
   */
  async downloadFileToTmpLocationAsync(key: string): Promise<string> {
    const esopPoolDocumentTemplate = await this.getBlobAsync(key);

    const lastSegment = key.split('/').pop();

    return await saveFileToTmpAsync(esopPoolDocumentTemplate, lastSegment);
  }

  private calculateFileKey(fileName: string, folder: string): string {
    return folder + '/' + fileName;
  }
}
