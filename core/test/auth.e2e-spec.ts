import { AuthService } from '@app/auth/auth.service';
import { EmailService } from '@app/communication/email.service';
import { createMock } from '@golevelup/ts-jest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let authService: AuthService;

  const emailServiceMock = createMock<EmailService>();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    })
      .overrideProvider(EmailService)
      .useValue(emailServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    authService = await moduleFixture.resolve<AuthService>(AuthService);
  });

  it('request-email-login for existing user should return 204', async () => {
    const path = `/auth/request-email-login?email=bob%40bob.com`;
    return request(app.getHttpServer()).get(path).expect(204);
  });

  it('request-email-login for non-existing user should return 404', () => {
    const path = `/auth/request-email-login?email=NONUSER%40bob.com`;
    return request(app.getHttpServer()).get(path).expect(404);
  });

  it('magiclink-callback with invalid token should return 200', async () => {
    const magiclinkToken = await authService.createTokenForMagicLinkAsync({
      id: '',
      email: 'bob@bob.com',
      firstName: 'bob',
      lastName: 'ross',
    });
    const path = `/auth/magiclink-callback?token=${magiclinkToken}`;
    return request(app.getHttpServer()).get(path).expect(200);
  });

  it('magiclink-callback with invalid token should return 401', () => {
    const path = `/auth/magiclink-callback?token=false-token`;
    return request(app.getHttpServer()).get(path).expect(401);
  });

  it('refresh-id-token with invalid token should return 200', async () => {
    const token = await authService.generateAuthenticatedTokenBundleAsync({
      id: '751d2f8c-7d11-4003-816c-0081c5797cdd',
      email: 'bob@bob.com',
      firstName: 'bob',
      lastName: 'ross',
    });

    const path = `/auth/refresh-id-token?token=${token.refreshToken}`;
    return request(app.getHttpServer()).get(path).expect(200);
  });

  it('refresh-id-token with invalid token should return 401', () => {
    const path = `/auth/refresh-id-token?token=false-refresh-token`;
    return request(app.getHttpServer()).get(path).expect(401);
  });
});
