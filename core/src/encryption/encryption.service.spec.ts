import { EncryptionService } from '@app/encryption/encryption.service';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

describe('EncryptionService', () => {
  let service: EncryptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EncryptionService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(() => {
              return {
                RSAPublicKey:
                  '-----BEGIN PUBLIC KEY-----\n' +
                  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCKeU/RnE2tXe/QVXs4BfG+vsfv\n' +
                  'SBMA5p4CxP2IDqVr8ff0ObByyE6Ny1UQGExcPfPEtR71JlbrOuyLKESH4zvvvfbN\n' +
                  'M8Xmqfw3KK40NXFoQwUB+Qo3r77RhANMGi63ggQqqvTIiPoqrNiNLvXaZohpUIcq\n' +
                  'kkxB6J1/FQ0xb5CEaQIDAQAB\n' +
                  '-----END PUBLIC KEY-----',
                RSAPrivateKey:
                  '-----BEGIN RSA PRIVATE KEY-----\n' +
                  'MIICXgIBAAKBgQCKeU/RnE2tXe/QVXs4BfG+vsfvSBMA5p4CxP2IDqVr8ff0ObBy\n' +
                  'yE6Ny1UQGExcPfPEtR71JlbrOuyLKESH4zvvvfbNM8Xmqfw3KK40NXFoQwUB+Qo3\n' +
                  'r77RhANMGi63ggQqqvTIiPoqrNiNLvXaZohpUIcqkkxB6J1/FQ0xb5CEaQIDAQAB\n' +
                  'AoGAFv6sLY+6Knb18u+vBY+fJGDEDM04MqcZSDZ0L5rXB4Tn+wt1bKosuUkxt/mA\n' +
                  '/LRg/aJiIK2cM3XWgAlQ0AwBEME/j06xa+CkKA0vq/NzfMNEfwt9UeVMzTuHhYeN\n' +
                  'WnE95cupLqnZNAZUm/iZpH6vKH6ND93FPJm6cLITFItLoY0CQQC9Lhk5LdT6fSg4\n' +
                  'sNLATogNEDCkQIZv7VlNChSYN8wMXWEwCzWyfV9lXCz0jPwhRTOzQplQqD4uchUE\n' +
                  'oNsVkbfbAkEAu2JLb+K9rwZqnyvn42C8cCtiL4rgihBPcRS2t8mpaq6MeNfIWg3o\n' +
                  '897V9JpJpSBqMeVoSI3S3vVfR061F9I6CwJBAIiKLhBT4QUNsisAjIvZ4l4zUjgq\n' +
                  'jh1YnHx7CxQ2KWK/PvcTECWMUX7xwUycORm2PbNjHQ7W71JMapkVlCqEKsMCQQCh\n' +
                  'a2Og1qqgg96Fj8UK0uKBnl3OpswXI0XMHBPq7wXKqOLJltk4+pKawnN9awvV+75/\n' +
                  'jSfwmHv3JVkWjG7kPm1RAkEAqpWOxmKNvhUU856xqCUDQngEnhlpPTCXAEwqb9XT\n' +
                  'l34G0cC/lnd9FSFdHwiVk1QFpV+AlSFyHei8Wirp70XnyA==\n' +
                  '-----END RSA PRIVATE KEY-----',
              };
            }),
          },
        },
      ],
    }).compile();

    service = module.get<EncryptionService>(EncryptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should encrypt and decrypt RSA multiple times', () => {
    let encrypted = service.encrypt('Hello world');
    let decrypted = service.decrypt(encrypted);
    expect(decrypted).toBe('Hello world');

    encrypted = service.encrypt('Hello world again');
    decrypted = service.decrypt(encrypted);
    expect(decrypted).toBe('Hello world again');
  });
});
