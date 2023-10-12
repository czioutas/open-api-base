import { CloudStorageService } from '@app/cloud-storage/cloud-storage.service';
import { CreatedResponseDto } from '@app/cloud-storage/dto/created-response.dto';
import { UploadFileDto } from '@app/cloud-storage/dto/upload-file.dto';
import { Controller, Get, HttpCode, Param, Post, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import mime from 'mime-types';

@ApiTags('Cloud Storage')
@Controller({
  path: 'cloud-storage',
  version: '1',
})
export class CloudStorageController {
  constructor(private readonly cloudStorageService: CloudStorageService) {}

  @Post(':folder')
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Param('folder') folder: string,
  ): Promise<CreatedResponseDto> {
    const fileExtension: string = mime.extension(file.mimetype);

    const uploadFileDto: UploadFileDto = {
      blob: file.buffer,
      blobName: file.originalname,
      folder: folder,
      mimeType: fileExtension,
    };

    return await this.cloudStorageService.putBlobAsync(uploadFileDto);
  }

  @Get(':fileId')
  async get(@Param('fileId') fileId: string): Promise<StreamableFile> {
    const a = await this.cloudStorageService.getFileByIdAsync(fileId);
    return new StreamableFile(a);
  }
}
