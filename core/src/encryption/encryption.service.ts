import { ENCRYPTION_CONFIG, EncryptionConfig } from '@app/app.config';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import crypto from 'crypto';

@Injectable()
export class EncryptionService {
  private readonly encryptionConfig: EncryptionConfig;

  constructor(configService: ConfigService) {
    this.encryptionConfig = configService.get<EncryptionConfig>(ENCRYPTION_CONFIG);
  }

  encrypt(data: string): string {
    const encryptedData = crypto.publicEncrypt(
      {
        key: this.encryptionConfig.RSAPublicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256',
      },
      Buffer.from(data),
    );
    return encryptedData.toString('base64');
  }

  decrypt(encryptedData: string): string {
    const decryptedData = crypto.privateDecrypt(
      {
        key: this.encryptionConfig.RSAPrivateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256',
      },
      Buffer.from(encryptedData, 'base64'),
    );
    return decryptedData.toString();
  }
}
