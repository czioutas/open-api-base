import { Module } from '@nestjs/common';
import { EncryptionService } from '@app/encryption/encryption.service';

@Module({
  providers: [EncryptionService],
  exports: [EncryptionService],
})
export class EncryptionModule {}
