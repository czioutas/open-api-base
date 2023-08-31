import { AuthService } from '@app/auth/auth.service';
import { EmailService } from '@app/communication/email.service';
import { UserService } from '@app/users/user.service';
import { createMock } from '@golevelup/ts-jest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AuthController (e2e)', () => {
  const userEmail = 'bob@bob.com';
  const encodedUserEmail = encodeURI(userEmail);
  let app: INestApplication;
  let authService: AuthService;
  let userService: UserService;

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
    userService = await moduleFixture.resolve<UserService>(UserService);
  });

  it('request-email-login for non-existing user should return 204', () => {
    const path = `/auth/request-email-login?email=${encodedUserEmail}`;
    return request(app.getHttpServer()).get(path).expect(204);
  });

  it('request-email-login for existing user should return 204', async () => {
    const path = `/auth/request-email-login?email=${encodedUserEmail}`;
    return request(app.getHttpServer()).get(path).expect(204);
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

  it('refresh-id-token with valid token should return 200', async () => {
    const user = await userService.findOneByEmailAsync(userEmail);
    const token = await authService.generateAuthenticatedTokenBundleAsync(user);

    const path = `/auth/refresh-id-token?token=${token.refreshToken}`;
    return request(app.getHttpServer()).get(path).expect(200);
  });

  it('refresh-id-token with invalid token should return 401', () => {
    const path = `/auth/refresh-id-token?token=false-refresh-token`;
    return request(app.getHttpServer()).get(path).expect(401);
  });
});
